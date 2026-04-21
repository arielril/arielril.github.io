# ariel-ril — Personal Website

Terminal-aesthetic personal security portfolio.

## Project Structure

```
site/
├── index.html              # Main page (all sections)
├── css/
│   ├── style.css           # Main stylesheet
│   └── blog.css            # Blog-specific styles + code highlighting
├── js/
│   └── main.js             # Typewriter, cursor, scroll animations
├── blog/
│   ├── index.html          # Blog post listing
│   └── posts/
│       ├── kaet-kubernetes-breach-assessment.html
│       ├── purple-team-k8s.html
│       ├── api-pentest-methodology.html
│       ├── eks-cluster-games.html
│       └── oscp-prep.html
└── assets/
    └── favicon.svg
```

## Run Locally

Any static file server works. Options:

### Python (built-in, fastest)
```bash
cd site
python3 -m http.server 8080
# → open http://localhost:8080
```

### Node (if you have npx)
```bash
cd site
npx serve .
```

### VS Code
Install the **Live Server** extension, right-click `index.html` → "Open with Live Server".

---

## Customizing

### Add a new blog post
1. Create `blog/posts/your-post.html` — copy an existing post as template
2. Add an entry to `blog/index.html` in the posts section
3. Add a preview entry to `index.html` in the `#blog` section

### Update experience / tools
Edit the relevant section in `index.html` directly.

### Typewriter sequence
Edit the `initHeroTypewriter()` function in `js/main.js`.

---

## Design System

| Token | Value | Use |
|-------|-------|-----|
| `--green` | `#00e676` | Primary accent, prompts |
| `--amber` | `#ffb300` | Commands, secondary accent |
| `--cyan` | `#00e5ff` | Info, Go code |
| `--purple` | `#b388ff` | Keywords, learning |
| `--red` | `#ff3d57` | Errors, numbers |
| `--text` | `#c8d6cc` | Body text |
| `--text-dim` | `#6b8476` | Subdued text |
| `--bg` | `#080c0a` | Page background |

## Code Syntax

Blog posts use manual inline CSS classes for syntax coloring (no dependency):

```html
<span class="kw">const</span>   <!-- keywords: purple -->
<span class="fn">foo</span>    <!-- functions: cyan -->
<span class="str">"bar"</span>  <!-- strings: amber -->
<span class="cm"># comment</span> <!-- comments: muted -->
<span class="num">42</span>     <!-- numbers: red -->
<span class="flag">-v</span>    <!-- CLI flags: green -->
<span class="path">/etc</span>  <!-- paths: amber -->
<span class="op">===</span>    <!-- operators: green -->
```

