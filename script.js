// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mobile dropdown support - toggle on click
function setupMobileDropdowns() {
    if (window.innerWidth <= 768) {
        const dropdownParents = document.querySelectorAll('.has-dropdown > a.nav-link');
        
        dropdownParents.forEach(link => {
            link.addEventListener('click', function(e) {
                const parent = this.parentElement;
                const dropdown = parent.querySelector('.dropdown');
                
                if (dropdown) {
                    // If clicking to toggle dropdown (not navigate)
                    const isOpen = dropdown.style.display === 'block';
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown').forEach(d => {
                        d.style.display = 'none';
                    });
                    
                    // Toggle this dropdown
                    if (!isOpen) {
                        e.preventDefault(); // Prevent navigation
                        dropdown.style.display = 'block';
                    }
                    // If already open, let it navigate
                }
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.has-dropdown')) {
                document.querySelectorAll('.dropdown').forEach(d => {
                    d.style.display = 'none';
                });
            }
        });
    }
}

// Initialize mobile dropdowns
setupMobileDropdowns();

// Reinitialize on window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        setupMobileDropdowns();
    }, 250);
});

// Global storage for parsed publications (for citation lookup)
let globalPublications = [];

// BibTeX Parser
function parseBibtex(bibtexText) {
    const entries = [];
    // Match each BibTeX entry
    const entryRegex = /@(\w+)\{([^,]+),\s*([\s\S]*?)\n\}/g;
    let match;

    while ((match = entryRegex.exec(bibtexText)) !== null) {
        const entryType = match[1];
        const citeKey = match[2];
        const fieldsText = match[3];

        const entry = {
            type: entryType,
            key: citeKey,
            fields: {}
        };

        // Parse fields
        const fieldRegex = /(\w+)\s*=\s*\{([^}]*)\}|(\w+)\s*=\s*"([^"]*)"/g;
        let fieldMatch;

        while ((fieldMatch = fieldRegex.exec(fieldsText)) !== null) {
            const fieldName = (fieldMatch[1] || fieldMatch[3]).toLowerCase();
            const fieldValue = fieldMatch[2] || fieldMatch[4];
            entry.fields[fieldName] = fieldValue.trim();
        }

        entries.push(entry);
    }

    return entries;
}

// Format authors for display
function formatAuthors(authors) {
    if (!authors) return 'Unknown Authors';
    
    // Split by 'and' and clean up
    const authorList = authors.split(' and ').map(a => a.trim());
    
    if (authorList.length === 1) {
        return authorList[0];
    } else if (authorList.length === 2) {
        return authorList.join(' and ');
    } else {
        const lastAuthor = authorList.pop();
        return authorList.join(', ') + ', and ' + lastAuthor;
    }
}

// Get first author's last name for citation
function getFirstAuthorLastName(authors) {
    if (!authors) return 'Unknown';
    const firstAuthor = authors.split(' and ')[0].trim();
    // Try to get last name (assumes "First Last" or "Last, First" format)
    const parts = firstAuthor.split(',');
    if (parts.length > 1) {
        return parts[0].trim();
    }
    const nameParts = firstAuthor.split(' ');
    return nameParts[nameParts.length - 1];
}

// Format a citation for in-text use
function formatInTextCitation(entry) {
    if (!entry) return '[Citation not found]';
    const author = getFirstAuthorLastName(entry.fields.author);
    const year = entry.fields.year || 'n.d.';
    return `${author} et al. (${year})`;
}

// Find publication by citation key
function findPublicationByKey(key) {
    return globalPublications.find(pub => pub.key === key);
}

// Process citations in markdown text before rendering
function processCitations(markdownText) {
    // Find all citations in the format [@citekey]
    const citationRegex = /\[@([^\]]+)\]/g;
    const citations = [];
    
    let processedText = markdownText.replace(citationRegex, (match, citekey) => {
        const pub = findPublicationByKey(citekey.trim());
        if (pub) {
            citations.push(pub);
            const citationText = formatInTextCitation(pub);
            // Create a link to the publication in the publications section
            return `<a href="#pub-${pub.key}" class="citation-link" title="Click to view full publication details">${citationText}</a>`;
        }
        return `<span class="citation-missing">[${citekey}?]</span>`;
    });
    
    return { processedText, citations };
}

// Generate a references section for a project
function generateReferencesSection(citations) {
    if (citations.length === 0) return '';
    
    // Remove duplicates
    const uniqueCitations = Array.from(new Set(citations.map(c => c.key)))
        .map(key => citations.find(c => c.key === key));
    
    let html = '<div class="project-references"><h4>References</h4><ul>';
    
    uniqueCitations.forEach(pub => {
        const authors = formatAuthors(pub.fields.author);
        const year = pub.fields.year || 'n.d.';
        const title = pub.fields.title || 'Untitled';
        const venue = pub.fields.journal || pub.fields.booktitle || '';
        
        html += `<li class="reference-item">`;
        html += `${authors} (${year}). <em>${title}</em>.`;
        if (venue) html += ` ${venue}.`;
        
        // Add links
        if (pub.fields.doi) {
            html += ` <a href="https://doi.org/${pub.fields.doi}" target="_blank">[DOI]</a>`;
        }
        if (pub.fields.url) {
            html += ` <a href="${pub.fields.url}" target="_blank">[Link]</a>`;
        }
        if (pub.fields.pdf) {
            html += ` <a href="${pub.fields.pdf}" target="_blank">[PDF]</a>`;
        }
        html += `</li>`;
    });
    
    html += '</ul></div>';
    return html;
}

// Render publications
function renderPublications(entries) {
    const container = document.getElementById('publications-list');
    const loading = document.getElementById('publications-loading');
    
    if (entries.length === 0) {
        loading.textContent = 'No publications found.';
        return;
    }

    loading.style.display = 'none';

    // Sort by year (descending)
    entries.sort((a, b) => {
        const yearA = parseInt(a.fields.year) || 0;
        const yearB = parseInt(b.fields.year) || 0;
        return yearB - yearA;
    });

    // Group publications by year
    const publicationsByYear = {};
    entries.forEach(entry => {
        const year = entry.fields.year || 'Unknown';
        if (!publicationsByYear[year]) {
            publicationsByYear[year] = [];
        }
        publicationsByYear[year].push(entry);
    });

    // Get sorted years
    const years = Object.keys(publicationsByYear).sort((a, b) => {
        if (a === 'Unknown') return 1;
        if (b === 'Unknown') return -1;
        return parseInt(b) - parseInt(a);
    });

    // Populate navigation dropdown with years
    populatePublicationsDropdown(years);

    // Create year filter navigation
    const yearFilter = document.getElementById('year-filter');
    if (yearFilter && years.length > 1) {
        yearFilter.innerHTML = '<strong>Jump to year:</strong> ';
        years.forEach((year, index) => {
            const link = document.createElement('a');
            link.href = `#year-${year}`;
            link.textContent = year;
            link.className = 'year-link';
            yearFilter.appendChild(link);
            
            if (index < years.length - 1) {
                yearFilter.appendChild(document.createTextNode(' | '));
            }
        });
        yearFilter.style.display = 'block';
    }

    // Render publications grouped by year
    years.forEach(year => {
        // Year heading with anchor
        const yearHeading = document.createElement('h3');
        yearHeading.className = 'year-heading';
        yearHeading.id = `year-${year}`;
        yearHeading.textContent = year;
        container.appendChild(yearHeading);

        // Render publications for this year
        publicationsByYear[year].forEach(entry => {
            const pub = document.createElement('div');
            pub.className = 'publication';
            // Add ID for citation linking
            pub.id = `pub-${entry.key}`;

            // Title
            const title = document.createElement('div');
            title.className = 'publication-title';
            title.textContent = entry.fields.title || 'Untitled';
            pub.appendChild(title);

            // Authors
            if (entry.fields.author) {
                const authors = document.createElement('div');
                authors.className = 'publication-authors';
                authors.textContent = formatAuthors(entry.fields.author);
                pub.appendChild(authors);
            }

            // Venue (journal, booktitle, etc.)
            const venue = entry.fields.journal || entry.fields.booktitle || entry.fields.publisher;
            if (venue) {
                const venueDiv = document.createElement('div');
                venueDiv.className = 'publication-venue';
                venueDiv.textContent = venue;
                pub.appendChild(venueDiv);
            }

            // DOI display (if available)
            if (entry.fields.doi) {
                const doiDiv = document.createElement('div');
                doiDiv.className = 'publication-doi';
                doiDiv.innerHTML = '<strong>DOI:</strong> ' + entry.fields.doi;
                pub.appendChild(doiDiv);
            }

            // URL display (if available and no DOI)
            if (entry.fields.url && !entry.fields.doi) {
                const urlDiv = document.createElement('div');
                urlDiv.className = 'publication-url';
                urlDiv.innerHTML = '<strong>URL:</strong> ' + entry.fields.url;
                pub.appendChild(urlDiv);
            }

            // Links (DOI, URL, etc.)
            const links = document.createElement('div');
            links.className = 'publication-links';
            
            if (entry.fields.doi) {
                const doiLink = document.createElement('a');
                doiLink.href = `https://doi.org/${entry.fields.doi}`;
                doiLink.textContent = 'DOI';
                doiLink.target = '_blank';
                links.appendChild(doiLink);
            }
            
            if (entry.fields.url) {
                const urlLink = document.createElement('a');
                urlLink.href = entry.fields.url;
                urlLink.textContent = 'Link';
                urlLink.target = '_blank';
                links.appendChild(urlLink);
            }

            if (entry.fields.pdf) {
                const pdfLink = document.createElement('a');
                pdfLink.href = entry.fields.pdf;
                pdfLink.textContent = 'PDF';
                pdfLink.target = '_blank';
                links.appendChild(pdfLink);
            }

            if (links.children.length > 0) {
                pub.appendChild(links);
            }

            container.appendChild(pub);
        });
    });
}

// Populate publications dropdown in navigation
function populatePublicationsDropdown(years) {
    const dropdown = document.getElementById('publications-dropdown');
    if (!dropdown || years.length === 0) return;

    dropdown.innerHTML = '';
    
    years.forEach(year => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#year-${year}`;
        link.textContent = year;
        li.appendChild(link);
        dropdown.appendChild(li);
    });
}

// Load publications from BibTeX file
async function loadPublications() {
    try {
        const response = await fetch('publications.bib');
        if (!response.ok) {
            throw new Error('Could not load publications.bib');
        }
        const bibtexText = await response.text();
        const entries = parseBibtex(bibtexText);
        
        // Store globally for citation lookup
        globalPublications = entries;
        
        renderPublications(entries);
        
        // Load projects after publications are loaded (so citations work)
        loadProjects();
    } catch (error) {
        console.error('Error loading publications:', error);
        document.getElementById('publications-loading').textContent = 
            'Error loading publications. Make sure publications.bib exists.';
    }
}

// Load and render projects from markdown files
// Uses simple naming convention: project-1.md, project-2.md, etc.
// Or falls back to project1.md, project2.md if those exist
async function loadProjects() {
    const container = document.getElementById('projects-list');
    const loading = document.getElementById('projects-loading');

    let hasProjects = false;
    let projectNumber = 1;
    const maxAttempts = 20; // Try up to 20 projects
    const projectTitles = []; // Store project titles for navigation

    while (projectNumber <= maxAttempts) {
        // Try both naming conventions: project-1.md and project1.md
        const filenames = [`project-${projectNumber}.md`, `project${projectNumber}.md`];
        let loaded = false;

        for (const filename of filenames) {
            try {
                const response = await fetch(`projects/${filename}`);
                if (!response.ok) continue;

                const markdown = await response.text();
                
                // Extract title from markdown (first h3 heading)
                const titleMatch = markdown.match(/###\s+(.+)/);
                const projectTitle = titleMatch ? titleMatch[1].trim() : `Project ${projectNumber}`;
                const projectId = `project-${projectNumber}`;
                
                // Store title for navigation dropdown
                projectTitles.push({ title: projectTitle, id: projectId });
                
                // Process citations before converting markdown to HTML
                const { processedText, citations } = processCitations(markdown);
                
                // Convert markdown to HTML
                const html = marked.parse(processedText);
                
                // Generate references section
                const referencesHtml = generateReferencesSection(citations);

                const projectDiv = document.createElement('div');
                projectDiv.className = 'project';
                projectDiv.id = projectId; // Add ID for anchor linking
                projectDiv.innerHTML = html + referencesHtml;
                container.appendChild(projectDiv);

                hasProjects = true;
                loaded = true;
                break; // Found a file with this number, move to next
            } catch (error) {
                // File doesn't exist or failed to load, try next naming convention
            }
        }

        // If neither naming convention worked, we've found all projects
        if (!loaded) {
            break;
        }

        projectNumber++;
    }

    if (hasProjects) {
        loading.style.display = 'none';
        // Populate navigation dropdown with project titles
        populateProjectsDropdown(projectTitles);
    } else {
        loading.textContent = 'No projects found. Add markdown files named project-1.md, project-2.md, etc. to the projects/ folder.';
    }
}

// Populate projects dropdown in navigation
function populateProjectsDropdown(projects) {
    const dropdown = document.getElementById('projects-dropdown');
    if (!dropdown || projects.length === 0) return;

    dropdown.innerHTML = '';
    
    projects.forEach(project => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${project.id}`;
        link.textContent = project.title;
        // Truncate long titles for dropdown
        if (project.title.length > 50) {
            link.textContent = project.title.substring(0, 47) + '...';
            link.title = project.title; // Show full title on hover
        }
        li.appendChild(link);
        dropdown.appendChild(li);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Load publications first, then projects will load after
    // (projects need publications loaded for citation lookup)
    loadPublications();
});
