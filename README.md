# Profile website template

Single-file static site: `index.html` (HTML + CSS + JS). No build step.

## Fill in
1. Search `index.html` for placeholder text ("Your Name", "Company name", `#` links) and replace.
2. To add or remove entries, copy or delete a whole block. Each section has a comment above it naming the block.
3. Header: replace the name, tagline, location, and the 4 proof-bar items. Keep exactly 4 proof items so the grid stays even.
4. Put images in `assets/` using the file names in the HTML. Any slot without a file shows a grey placeholder, so missing images never look broken.

| File | Recommended size |
|---|---|
| `assets/portrait.png` | 800 × 1000+, background removed, head and shoulders |
| `assets/og-image.jpg` | 1200 × 630 (link preview on LinkedIn etc.) |
| Project screenshots | 16:10 |
| Logos | square PNG |
| `assets/cv.pdf` | your CV (or delete the button) |

Compress photos before uploading (e.g. squoosh.app); aim for under 300 KB each.

## Deploy on GitHub Pages
1. Create a repo and push `index.html`, `assets/`, and this README.
2. Repo Settings → Pages → Source: deploy from branch `main`, folder `/ (root)`.
3. Custom domain: enter your domain in Pages settings (GitHub creates a `CNAME` file), then at your registrar add the DNS records from GitHub's docs: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
4. Tick "Enforce HTTPS" once the certificate is issued.
5. Update the `og:url` and `og:image` meta tags to your real domain.
