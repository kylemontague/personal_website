# Academic Personal Website

A clean, static website for academics to showcase their publications, projects, and contact information. Designed for easy deployment to GitHub Pages.

## Features

- 📚 **Publications**: Automatically loads and displays publications from a BibTeX (.bib) file
- 🔗 **Citation System**: Reference publications from your BibTeX file within project descriptions using `[@citekey]` syntax
- 🔬 **Projects**: Renders project descriptions from Markdown files with automatic references sections
- 👤 **About Section**: Personal bio and profile photo
- 📧 **Contact Information**: Email, office address, and other contact details
- 📱 **Responsive Design**: Works well on desktop, tablet, and mobile devices
- 🎨 **Clean Academic Styling**: Professional appearance suitable for academic websites

## Quick Start

### 1. Customize Your Information

#### Update Personal Information (`index.html`)
Edit the following sections in `index.html`:

- **Page Title**: Change `<title>` tag
- **About Section**: Replace `[Your Name]`, `[Your Title]`, `[Your Institution]`, and the bio text
- **Contact Section**: Update email, office, and address information
- **Profile Photo**: Replace `profile.jpg` with your photo (or update the filename in the HTML)

#### Update Publications (`publications.bib`)
Add your publications to the `publications.bib` file in BibTeX format. The website will automatically parse and display them, sorted by year.

Example entry:
```bibtex
@article{yourname2024,
  title={Your Paper Title},
  author={Your Name and Coauthor Name},
  journal={Journal Name},
  volume={10},
  pages={1--20},
  year={2024},
  doi={10.1234/example},
  url={https://example.com/paper},
  pdf={papers/yourpaper.pdf}
}
```

Supported fields:
- `title` - Paper title (required)
- `author` - Authors separated by "and"
- `journal` or `booktitle` - Venue
- `year` - Publication year
- `doi` - DOI (will create a link)
- `url` - Paper URL (will create a "Link" button)
- `pdf` - Path to PDF file (will create a "PDF" button)

#### Update Projects (`projects/` folder)
Create or edit Markdown files in the `projects/` folder. Each `.md` file will be displayed as a separate project.

To add a new project:
1. Create a new file: `projects/my-new-project.md`
2. Write your project description in Markdown
3. Add the filename to the `projectFiles` array in `script.js`

Example project file structure:
```markdown
### Project Title

**Duration:** 2023 - Present
**Funding:** Funding Source

Project description goes here...

**Key Points:**
- Point 1
- Point 2

[Link Text](https://example.com)
```

#### Using Citations in Projects

You can cite your publications within project descriptions using `[@citekey]` syntax:

```markdown
### My Research Project

This project builds on our previous work [@smith2024machine] and 
extends the methods from [@jones2023].
```

The system will automatically:
- Convert citations to "Author et al. (Year)" format
- Make them clickable links to the full publication
- Generate a References section at the end of each project

**See `CITATIONS_GUIDE.md` for complete documentation on the citation system.**

### 2. Test Locally

To test your website locally, you need to run a local web server (browsers block file:// loading for security):

**Option 1: Python**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then visit: `http://localhost:8000`

**Option 2: Node.js**
```bash
npx serve
```

**Option 3: VS Code**
Install the "Live Server" extension and click "Go Live"

### 3. Deploy to GitHub Pages

1. **Create a GitHub repository**
   - Go to GitHub and create a new repository
   - Name it `yourusername.github.io` (for user site) or any name (for project site)

2. **Push your files**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" > "Pages"
   - Under "Source", select "main" branch
   - Click "Save"

4. **Access your site**
   - User site: `https://yourusername.github.io`
   - Project site: `https://yourusername.github.io/repo-name`

Your site will be live in a few minutes!

## File Structure

```
academic-website/
├── index.html              # Main HTML file
├── style.css               # Stylesheet
├── script.js               # JavaScript for loading publications and projects
├── publications.bib        # BibTeX file with your publications
├── profile.jpg            # Your profile photo (add this file)
├── projects/              # Folder for project markdown files
│   ├── project1.md
│   ├── project2.md
│   └── project3.md
└── README.md              # This file
```

## Customization Tips

### Changing Colors
Edit `style.css` to customize colors:
- Primary color: `#2c3e50` (dark blue-gray)
- Accent color: `#3498db` (blue)
- Background: `#f8f9fa` (light gray)

### Adding More Sections
To add a new section:
1. Add a navigation link in `index.html` under `<nav>`
2. Add the section content in `index.html` under `<main>`
3. Style it in `style.css`

### Adding a CV/Resume
Add a link in the navigation or contact section:
```html
<a href="cv.pdf" target="_blank">Download CV</a>
```

Then place `cv.pdf` in your website folder.

### Adding Social Media Links
Add to the contact section:
```html
<div class="contact-item">
    <strong>Social:</strong>
    <a href="https://twitter.com/yourhandle">Twitter</a> |
    <a href="https://linkedin.com/in/yourprofile">LinkedIn</a> |
    <a href="https://github.com/yourusername">GitHub</a>
</div>
```

## Updating Your Website

### Adding New Publications
1. Open `publications.bib`
2. Add new BibTeX entries
3. Commit and push to GitHub
4. Your website will update automatically

### Adding New Projects
1. Create a new `.md` file in `projects/` folder
2. Add the filename to the `projectFiles` array in `script.js`:
   ```javascript
   const projectFiles = [
       'project1.md',
       'project2.md',
       'project3.md',
       'new-project.md'  // Add this line
   ];
   ```
3. Commit and push to GitHub

### Editing Your Bio
1. Open `index.html`
2. Find the `<section id="about">` section
3. Edit the text in the `<div class="bio-text">` section
4. Commit and push to GitHub

## Troubleshooting

**Publications not loading:**
- Check that `publications.bib` is in the root folder
- Check the browser console (F12) for errors
- Make sure your BibTeX entries have proper formatting

**Projects not loading:**
- Check that markdown files are in the `projects/` folder
- Verify filenames match those in `script.js`
- Check browser console for errors

**Changes not showing on GitHub Pages:**
- GitHub Pages can take a few minutes to update
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check that you pushed your changes to the correct branch

## Browser Support

This website works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

Feel free to use this template for your own academic website. No attribution required.

## Questions?

If you run into issues, check:
1. Browser console for JavaScript errors (F12)
2. Network tab to see if files are loading
3. GitHub Pages settings in your repository

## Credits

Built with:
- [Marked.js](https://marked.js.org/) for Markdown parsing
- Pure HTML/CSS/JavaScript - no build process required
