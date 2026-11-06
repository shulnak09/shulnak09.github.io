# Editing your website

This folder contains the website published at anshulnayak.com.

- `content.js`: research, publications, biography, and other home-page content.
- `app.js`: home-page layout and navigation.
- `styles.css`: colors, typography, and layouts.
- `assets/`: images, PDFs, and other files used by the site. Add your files here and refer to them as `assets/filename` in your pages.
- `blog.html` and `tutorials.html`: add posts and tutorials here, or link to new HTML files in this folder.
- `books.html`: book notes index. Edit `atomic-habits.html` and `how-to-win-friends.html` for the full notes.

To preview the site, run `node scripts/build-profile.mjs` from the repository root, then serve the generated `_site` folder with a local web server. The deployment workflow builds and publishes this folder automatically.
