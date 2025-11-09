# Quick Start Guide - Academic Website

## What You Have

Your complete academic website is ready! Here's what was created:

### Core Files
- **index.html** - Main website structure
- **style.css** - Professional styling
- **script.js** - Loads publications from BibTeX and projects from Markdown
- **publications.bib** - Your publications in BibTeX format
- **README.md** - Comprehensive documentation

### Project Files
- **projects/** folder with 3 example project markdown files
  - project1.md - Climate AI Initiative
  - project2.md - Extreme Weather Prediction System  
  - project3.md - Open Climate Data Platform

### Additional Files
- **.gitignore** - Git ignore rules
- **PROFILE_PHOTO.md** - Instructions for adding your photo

## First Steps

### 1. Customize Your Content (5 minutes)

**About and Contact sections are already set up with your information!**

The website now includes:
- ✅ Your name: Kyle Montague
- ✅ Your title: Professor at Northumbria University
- ✅ Your bio and research focus
- ✅ Your education details
- ✅ Contact information (email and office)
- ✅ Link to NorSC Research Group

**Add your photo:**
- Add a file named `profile.jpg` (400x400px recommended)
- This will appear as a circular profile photo

### 2. Add Your Publications

**Edit publications.bib:**
- Replace the example entries with your actual publications
- Use your reference manager to export BibTeX (most support this)
- Or manually format entries following the examples

The website will automatically:
- Sort publications by year (newest first)
- Format author names
- Create links for DOI, URL, and PDF fields

### 3. Update Projects

**Edit the markdown files in projects/ folder:**
- Modify the 3 example files OR
- Delete them and create your own
- Use Markdown formatting for rich text

**Use citations to link to your publications:**
```markdown
This project builds on our work [@smith2024machine].
```

Citations will automatically:
- Link to the full publication
- Display as "Author et al. (Year)"
- Generate a references section

**If you add/remove project files:**
Update the `projectFiles` array in `script.js`:
```javascript
const projectFiles = [
    'your-project-1.md',
    'your-project-2.md',
];
```

**For complete citation documentation, see `CITATIONS_GUIDE.md`**

### 4. Test Locally

Open a terminal in the website folder and run:
```bash
python -m http.server 8000
```

Then visit: http://localhost:8000

### 5. Deploy to GitHub Pages

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub first, then:
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

Enable GitHub Pages in Settings > Pages > Source: main branch

Your site will be live at: `https://yourusername.github.io/repo-name`

## Ongoing Updates

### Adding a New Publication
1. Open `publications.bib`
2. Add the BibTeX entry
3. Commit and push to GitHub
4. Website updates automatically!

### Adding a New Project
1. Create `projects/new-project.md`
2. Add filename to `projectFiles` array in `script.js`
3. Commit and push

### Updating Your Bio
1. Edit the bio section in `index.html`
2. Commit and push

## Tips

- **Keep it simple**: Update only what you need
- **BibTeX export**: Most reference managers (Zotero, Mendeley, etc.) can export BibTeX
- **Test locally first**: Always test changes before pushing to GitHub
- **Backup your .bib file**: Keep a copy in your reference manager

## Need Help?

Check the full README.md for:
- Detailed customization options
- Troubleshooting guide
- Adding social media links
- Changing colors and styling
- And more!

---

**Your website is ready to go! Just customize the content and deploy.** 🚀
