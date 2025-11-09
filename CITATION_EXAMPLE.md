# Citation System - Visual Example

## What You Write (Markdown)

```markdown
### Climate Modeling Research

This project develops machine learning approaches for climate prediction.
Our work builds on recent advances in neural networks [@smith2023neural] 
and data-driven climate analysis [@smith2022data].

We've achieved significant improvements over traditional methods, as 
described in our latest publication [@smith2024machine]. The system 
integrates techniques from extreme weather prediction [@doe2021deep] 
and regional forecasting [@smith2020forecasting].

**Impact:**
- 40% improvement in prediction accuracy
- Deployed in 5 research institutions
- Open-source implementation available
```

---

## What Appears on Your Website

### Climate Modeling Research

This project develops machine learning approaches for climate prediction. Our work builds on recent advances in neural networks **[Smith et al. (2023)](link-to-publication)** and data-driven climate analysis **[Smith et al. (2022)](link-to-publication)**.

We've achieved significant improvements over traditional methods, as described in our latest publication **[Smith et al. (2024)](link-to-publication)**. The system integrates techniques from extreme weather prediction **[Doe et al. (2021)](link-to-publication)** and regional forecasting **[Smith et al. (2020)](link-to-publication)**.

**Impact:**
- 40% improvement in prediction accuracy
- Deployed in 5 research institutions
- Open-source implementation available

---

#### References

- Smith, John and Williams, Bob (2023). *Neural Networks for Weather Prediction*. Proceedings of the International Conference on Machine Learning. [[Link]](https://example.com)

- Smith, John, Lee, Carol, and Chen, David (2022). *Data-Driven Analysis of Atmospheric Patterns*. Journal of Climate. [[DOI]](https://doi.org/10.1175/JCLI-D-21-0456.1) [[PDF]](papers/smith2022data.pdf)

- Smith, John, Doe, Jane, and Johnson, Alice (2024). *Machine Learning Approaches to Climate Modeling*. Nature Climate Change. [[DOI]](https://doi.org/10.1038/s41558-024-01234-5)

- Doe, Jane and Smith, John (2021). *Deep Learning for Extreme Weather Events*. NeurIPS 2021 Workshop on Tackling Climate Change with Machine Learning. [[Link]](https://example.com/neurips2021.pdf)

- Smith, John, Martinez, Elena, and Kumar, Raj (2020). *Forecasting Regional Climate with Advanced Statistical Methods*. Geophysical Research Letters. [[DOI]](https://doi.org/10.1029/2020GL089012)

---

## Key Features Illustrated

### 1. In-Text Citations
- **[@smith2023neural]** becomes → **Smith et al. (2023)** (clickable link in red)
- **[@smith2024machine]** becomes → **Smith et al. (2024)** (clickable link in red)

### 2. Author Formatting
- 1 author: "Smith (2023)"
- 2 authors: "Smith and Doe (2023)"
- 3+ authors: "Smith et al. (2023)"

### 3. Automatic References
- Generated automatically from BibTeX
- Only includes cited publications
- No duplicates
- Proper formatting with DOI/PDF/URL links

### 4. Interactive Links
- Click any citation → scrolls to full publication in Publications section
- Publications section highlights the selected paper
- Easy navigation back and forth

---

## What Happens Behind the Scenes

1. **BibTeX Parsing**: System reads `publications.bib` and extracts all entries
2. **Citation Detection**: Finds all `[@citekey]` patterns in markdown
3. **Citation Resolution**: Matches each citekey to BibTeX entry
4. **Formatting**: Converts to author-year format
5. **Link Creation**: Makes citations clickable
6. **References Generation**: Creates bibliography at end of project
7. **HTML Rendering**: Converts everything to beautiful HTML

---

## Comparison: Before vs After

### Without Citation System ❌

**You would manually write:**
```
According to Smith et al. (2023), neural networks show promise...

References:
1. Smith, J., Williams, B. (2023). Neural Networks for Weather 
   Prediction. ICML, pp. 1234-1245.
```

**Problems:**
- Manual formatting required
- No automatic linking
- Easy to make mistakes
- Hard to keep updated
- Tedious to maintain

### With Citation System ✅

**You simply write:**
```
According to [@smith2023neural], neural networks show promise...
```

**Benefits:**
- Automatic formatting
- Automatic linking
- No mistakes
- Always in sync with BibTeX
- One-step updates

---

## Real-World Example

When you add a new publication:

1. **Update BibTeX** (30 seconds):
```bibtex
@article{smith2025quantum,
  title={Quantum Computing for Climate Models},
  author={Smith, John and Zhang, Li},
  journal={Nature},
  year={2025}
}
```

2. **Cite in project** (10 seconds):
```markdown
Our latest breakthrough [@smith2025quantum] demonstrates...
```

3. **Push to GitHub** (10 seconds):
```bash
git commit -am "Add new paper"
git push
```

**Total time: 50 seconds**

**Result on website:**
- New publication appears in Publications section
- Citation in project links to it automatically
- References section updated automatically
- Everything properly formatted
- All links working

---

## This Saves You From:

❌ Manually updating project descriptions  
❌ Formatting citations by hand  
❌ Creating reference lists  
❌ Updating multiple places when info changes  
❌ Breaking links  
❌ Inconsistent formatting  
❌ Typos in citations  
❌ Missing references  

✅ **Everything is automatic, accurate, and always up-to-date!**
