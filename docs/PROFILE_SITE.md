# Anshul Nayak’s academic website

The active profile source is `site/`, imported from `Anshul-Nayak-Website-Variations.zip`. Academic is the selected main design. The original al-folio content remains in the repository as a reference; the new deployment does not run Jekyll or alter plugin assets.

## Preview and edit

Use Node.js 22 or newer and Python 3:

```bash
node scripts/build-profile.mjs
python3 scripts/check-profile.py
python3 -m http.server 8765 --bind 127.0.0.1 --directory _site
```

Open <http://127.0.0.1:8765/> for the main profile or <http://127.0.0.1:8765/designs.html> to compare all three designs. No npm packages are needed to build the profile. Rebuild after editing; `_site/` is generated and replaced on each build.

- Edit `site/content.js` for the biography, positions, degrees, news, research, and publications.
- Edit `site/app.js` for page structure and publication filters. Teaching and service text from the supplied website is currently here.
- Edit `site/styles.css` for styling.
- Replace `site/assets/Anshul-Nayak-CV.pdf` to update the downloadable CV.
- Set a project’s `video` path in `content.js` after adding an MP4 to `site/assets/`. Empty video paths display the supplied research image without a placeholder button.

The build renders all 14 publications into HTML. JavaScript enables filters, but the profile and papers remain available without it. `/current-projects/`, `/projects/`, `/publications/`, `/about/`, `/news/`, `/teaching/`, and `/cv/` redirect to the corresponding section or CV. Other retired URLs show the custom 404 page.

The supplied résumé source confirms Honda’s role as Research Intern and the NIT Rourkela degree as B.Tech.; those corrections are included. The downloadable PDF remains the CV from the website archive, not a newly compiled version of the Overleaf archive. Publication statuses and teaching details remain as supplied in the website archive; the résumé’s selected-publications list is not treated as a replacement for the full publication list.

## GitHub Pages

Repository: <https://github.com/shulnak09/shulnak09.github.io>

The deployment workflow builds and checks `_site/`, then publishes only that directory through GitHub Pages. Pull requests build and validate without publishing. A push to `main` affecting the profile, build/check scripts, or deployment workflow publishes the site. The workflow can also be run manually from `main`.

Before the first deployment, open [Settings → Pages](https://github.com/shulnak09/shulnak09.github.io/settings/pages) and select **GitHub Actions** as the source. The previous configuration uses the `gh-pages` branch; changing the source is necessary for this workflow. Keep the existing `gh-pages` branch for rollback.

Once deployment succeeds, set the custom domain to **anshulnayak.com** in the same settings page. The included `CNAME` records the intended domain, but GitHub Actions deployments still require the custom domain to be saved in Pages settings.

## Hostinger DNS

In Hostinger hPanel, go to **Domains → Domain portfolio → anshulnayak.com → Manage → DNS / Nameservers → DNS records**. If the domain uses another provider’s nameservers, edit DNS at that provider instead.

The public DNS check on November 5, 2026 found Hostinger nameservers, website A records `195.35.60.123` and `212.1.212.28`, and `www` pointing to `www.anshulnayak.com.cdn.hstgr.net`. Replace these website destinations with the records below. If Hostinger CDN is enabled, disable it for this domain before changing the records.

Set these website records:

| Type  | Name  | Points to             |
| ----- | ----- | --------------------- |
| A     | `@`   | `185.199.108.153`     |
| A     | `@`   | `185.199.109.153`     |
| A     | `@`   | `185.199.110.153`     |
| A     | `@`   | `185.199.111.153`     |
| CNAME | `www` | `shulnak09.github.io` |

Use Hostinger’s default TTL. Replace conflicting website A/AAAA records at `@` and website records at `www`; retain email MX and TXT records. A Hostinger web hosting plan is unnecessary for this GitHub Pages setup. Keep DNS management at Hostinger.

After DNS propagates, confirm GitHub’s DNS check succeeds and enable **Enforce HTTPS**. GitHub notes DNS propagation and certificate availability can each take up to 24 hours. Both `anshulnayak.com` and `www.anshulnayak.com` should reach the profile, with the apex domain as the primary address.

References: [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), and [Hostinger DNS management](https://support.hostinger.com/en/articles/1583249-how-to-manage-dns-records-at-hostinger).

## Rollback

Select **Deploy from a branch**, `gh-pages`, `/ (root)` in Pages settings to restore the previously deployed artifact, provided that branch has not been changed. To resume Jekyll deployments, also restore `.github/workflows/deploy.yml` from the commit before this migration. Set the custom domain explicitly in Pages settings for either deployment method.
