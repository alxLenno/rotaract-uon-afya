# Rotaract UoN Afya

Responsive website for the Rotaract Club of UoN Afya, University of Nairobi.

Features include light and dark themes, an automatic photo slideshow, project galleries, membership information, and an EmailJS contact form.

## Run locally

Requires Python 3. From the project directory:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000 in your browser. No build step is needed.

## Project files

- `index.html` — page content and structure
- `style.css` — responsive layout and themes
- `main.js` — navigation, slideshow, gallery, and contact form
- `assets/images/` — club photography

The contact form uses the EmailJS public configuration in `main.js` and requires internet access. Configure allowed website origins in EmailJS when deploying.
