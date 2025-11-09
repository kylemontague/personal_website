# Citation System Guide

Your academic website includes a powerful citation system that allows you to reference publications from your BibTeX file directly within your project markdown files. This creates automatic links between your projects and publications.

## How It Works

### 1. Citation Syntax

Use the standard Pandoc/LaTeX citation syntax in your markdown files:

```markdown
[@citekey]
```

Where `citekey` is the citation key from your BibTeX entry.

### 2. Example Usage

In your `publications.bib`:

```bibtex
@article{smith2024machine,
  title={Machine Learning Approaches to Climate Modeling},
  author={Smith, John and Doe, Jane},
  journal={Nature Climate Change},
  year={2024},
  doi={10.1038/s41558-024-01234-5}
}
```

In your project markdown file (`projects/my-project.md`):

```markdown
### My Research Project

This project builds on our previous work in machine learning [@smith2024machine] 
and extends it to new applications. We also incorporate methods from [@jones2023] 
and [@lee2022].

The results demonstrate significant improvements over baseline approaches.
```

### 3. What Happens Automatically

When the page loads, the citation system:

1. **Parses your BibTeX file** - Loads all publications
2. **Scans project markdown** - Finds all `[@citekey]` citations
3. **Generates in-text citations** - Converts to "Author et al. (Year)" format
4. **Creates clickable links** - Links citations to full publication details
5. **Builds references section** - Automatically adds a references list at the end of each project

### 4. Citation Features

#### In-Text Citations
Citations appear as: **Smith et al. (2024)**

They are:
- Clickable links (click to jump to full publication)
- Styled in red to stand out
- Formatted automatically from BibTeX data

#### Automatic References Section
At the end of each project, a "References" section is automatically generated with:
- Full bibliographic information
- Links to DOI, PDF, and URLs (if provided in BibTeX)
- Proper formatting
- No duplicates

#### Publication Highlighting
When you click a citation link:
- The page scrolls to the full publication in the Publications section
- The publication is highlighted in yellow
- Easy to navigate back and forth

## Examples

### Example 1: Single Citation

**Markdown:**
```markdown
Our methodology is based on recent advances [@smith2024machine].
```

**Result:**
"Our methodology is based on recent advances Smith et al. (2024)."

### Example 2: Multiple Citations

**Markdown:**
```markdown
Previous work [@jones2023] and [@smith2024machine] has shown promising results.
```

**Result:**
"Previous work Jones et al. (2023) and Smith et al. (2024) has shown promising results."

### Example 3: Citations in Context

**Markdown:**
```markdown
### Data Collection Methods

We collected data using the protocols established in [@smith2022data]. 
The analysis followed the framework proposed by [@doe2021deep], with 
modifications based on [@smith2023neural].

Our approach differs from traditional methods in several key ways...
```

**Result:**
- In-text citations converted to author-year format
- Automatic references section at bottom of project
- All citations linked to publications

## Citation Key Matching

### Important: Use Exact BibTeX Keys

The citation key in your markdown **must exactly match** the key in your BibTeX file:

**BibTeX:**
```bibtex
@article{smith2024machine,
  ...
}
```

**Markdown - Correct:**
```markdown
[@smith2024machine]
```

**Markdown - Wrong:**
```markdown
[@Smith2024Machine]  ❌ (case sensitive)
[@smith2024]         ❌ (incomplete key)
[@smith_2024]        ❌ (wrong format)
```

### Missing Citations

If a citation key is not found, it will appear as: **[citekey?]** in orange text.

This helps you identify:
- Typos in citation keys
- Publications not yet added to your BibTeX file
- Case sensitivity issues

## Best Practices

### 1. Consistent Citation Keys

Use a consistent naming convention for your BibTeX keys:

**Good conventions:**
- `lastname2024keyword` (e.g., `smith2024machine`)
- `lastname2024a`, `lastname2024b` for multiple papers same year
- `firstauthor2024` 

**Avoid:**
- Special characters (use letters, numbers, and underscores only)
- Spaces
- Very long keys

### 2. Complete BibTeX Information

For best results, include in your BibTeX:

**Essential fields:**
- `author` - For proper citation formatting
- `title` - For references section
- `year` - For in-text citations
- `journal` or `booktitle` - For venue information

**Recommended fields:**
- `doi` - Creates DOI link
- `url` - Creates web link
- `pdf` - Creates PDF link
- `volume`, `pages` - For complete references

### 3. Project Organization

**Good practice:**
```markdown
### Project Introduction

Background and motivation here...

### Related Work

Prior research [@author2023] showed...
Building on [@author2022] and [@author2021]...

### Our Approach

Our method extends [@author2023] by...
```

**Result:**
- Clear context for citations
- Automatic references section at end
- Professional academic appearance

## Workflow

### Daily Workflow for Updates

1. **Add new publication to BibTeX:**
   ```bibtex
   @article{smith2025new,
     title={New Paper Title},
     author={Smith, John},
     journal={Journal Name},
     year={2025},
     doi={10.1234/example}
   }
   ```

2. **Reference it in project markdown:**
   ```markdown
   Our latest work [@smith2025new] demonstrates...
   ```

3. **Commit and push to GitHub:**
   ```bash
   git add publications.bib projects/my-project.md
   git commit -m "Add new publication and update project"
   git push
   ```

4. **Done!** Website updates automatically.

### No Manual Updates Needed

You never need to:
- ❌ Manually format citations
- ❌ Update references sections
- ❌ Create links to publications
- ❌ Format author names
- ❌ Sort references

Everything is automatic!

## Advanced Tips

### Multiple Citations in One Place

```markdown
Several studies [@smith2024machine] [@jones2023] [@doe2021deep] have shown...
```

Each will be converted to a separate clickable citation.

### Citations in Lists

```markdown
**Key References:**
- Neural networks [@smith2023neural]
- Statistical methods [@smith2020forecasting]
- Ensemble approaches [@doe2021deep]
```

Works perfectly in lists!

### Citations in Tables

If you create markdown tables with citations, they work too:

```markdown
| Method | Reference |
|--------|-----------|
| ML Approach | [@smith2024machine] |
| Statistical | [@smith2020forecasting] |
```

## Troubleshooting

### Problem: Citations show as [key?]

**Cause:** Citation key not found in BibTeX file

**Solutions:**
1. Check spelling of citation key
2. Verify key exists in `publications.bib`
3. Check case sensitivity (must match exactly)
4. Ensure BibTeX file is properly formatted

### Problem: References section not appearing

**Cause:** No valid citations found in project

**Solutions:**
1. Add at least one citation using `[@citekey]` syntax
2. Verify citation keys match BibTeX entries
3. Check browser console for JavaScript errors

### Problem: Citation doesn't link to publication

**Cause:** Publications not loaded or key mismatch

**Solutions:**
1. Ensure `publications.bib` file is accessible
2. Check browser console for loading errors
3. Verify exact key match between citation and BibTeX

### Problem: Page jumps but no highlighting

**Cause:** CSS not loading properly

**Solution:**
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Check that `style.css` is loading
3. Check browser console for CSS errors

## Technical Details

### Citation Format

The system automatically generates citations in the format:
- Single author: "Smith (2024)"
- Two authors: "Smith and Jones (2024)"
- Three+ authors: "Smith et al. (2024)"

### Processing Order

1. Page loads → BibTeX file parsed
2. Publications displayed
3. Project files loaded
4. Citations processed before Markdown conversion
5. References generated
6. HTML rendered

### Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Summary

The citation system makes it easy to:
- ✅ Link projects to publications
- ✅ Maintain professional academic style
- ✅ Update everything by editing just BibTeX and Markdown
- ✅ Automatically format citations and references
- ✅ Create navigable connections between sections

**Just use `[@citekey]` in your project files and everything else is automatic!**
