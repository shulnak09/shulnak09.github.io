(() => {
  "use strict";
  const D = window.ACADEMIC;
  const layout = typeof document === "undefined" ? D.layout : document.body.dataset.layout || "classic";
  if (typeof document !== "undefined") D.previewMode = document.body.dataset.preview === "true";
  const labels = { classic: "01 · Academic", editorial: "02 · Editorial", studio: "03 · Research studio" };
  const external = 'target="_blank" rel="noopener noreferrer"';
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const anchor = (url, text, cls = "") => `<a class="${cls}" href="${esc(url)}" ${url.startsWith("http") ? external : ""}>${text}</a>`;
  const socials = () =>
    `<div class="socials">${anchor("mailto:" + D.email, "Email ↗")}${anchor(D.scholar, "Google Scholar ↗")}${anchor(D.github, "GitHub ↗")}${anchor(D.linkedin, "LinkedIn ↗")}${anchor("assets/Anshul-Nayak-CV.pdf", "CV ↓")}</div>`;
  const selector = () =>
    !D.previewMode
      ? ""
      : `<aside class="preview-bar" aria-label="Website version selector"><a class="preview-brand" href="designs.html">AN <span>Design preview</span></a><nav aria-label="Choose a version">${Object.entries(
          labels
        )
          .map(([k, v]) => `<a href="${k}.html" ${layout === k ? 'aria-current="page"' : ""}>${v}</a>`)
          .join("")}</nav><span class="preview-note">Three directions. One researcher.</span></aside>`;
  const nav = () =>
    `<header class="site-header"><a class="wordmark" href="#top">${layout === "studio" ? "AN / ROBOTICS" : D.name}</a><nav aria-label="Page sections"><a href="#research">Research</a><a href="#publications">Publications</a><a href="#about">About</a><a href="mailto:${D.email}">Contact ↗</a></nav></header>`;
  const portrait = () =>
    `<figure class="portrait"><img src="assets/portrait.jpg" alt="Portrait of Anshul Nayak" width="600" height="600"><figcaption>Clemson University · South Carolina</figcaption></figure>`;
  const hero = () =>
    layout === "classic"
      ? `<section class="hero"><div class="hero-copy"><p class="eyebrow">Robotics · Machine learning · Human–robot interaction</p><h1>Anshul Nayak</h1><p class="role">${D.role}<br><a href="https://www.clemson.edu/" ${external}>Clemson University</a></p><p class="lead">${D.bio}</p><p class="bio">${D.background}</p>${socials()}</div>${portrait()}</section>`
      : layout === "editorial"
        ? `<section class="hero"><div class="hero-top"><p class="eyebrow">Robotics & autonomous systems</p><p class="hero-number">RESEARCH / 2026</p></div><h1>Anshul <em>Nayak.</em></h1><div class="hero-bottom">${portrait()}<div class="hero-copy"><p class="hero-statement">Autonomous systems.<br><em>Human-aware decisions.</em></p><p class="lead">${D.bio}</p><p class="role">${D.role} · Clemson University</p>${socials()}</div></div></section>`
        : `<section class="hero"><div class="hero-copy"><p class="eyebrow"><span class="dot"></span> Clemson University / Postdoctoral Research Scholar</p><h1>Robots that<br>reason.<br><span>Teams that<br>adapt.</span></h1><p class="hero-name">Anshul Nayak</p><p class="lead">${D.bio}</p>${socials()}</div><div class="hero-visual"><div class="orbit-art" aria-hidden="true"><div class="orbit o1"></div><div class="orbit o2"></div><div class="orbit o3"></div><span class="satellite s1"></span><span class="satellite s2"></span><span class="satellite s3"></span><span class="core">A<span>+</span></span><div class="orbit-caption">PERCEPTION → REASONING → ACTION</div></div><div class="visual-caption"><span>Cooperative intelligence</span><span>01—03</span></div><div class="studio-profile"><img src="assets/portrait.jpg" alt="Portrait of Anshul Nayak" width="64" height="64"><p>Safe autonomy.<br>Shared understanding.</p></div></div></section>`;
  const headings = (id, over, title, extra = "") =>
    `<div class="section-heading"><div><p class="eyebrow">${over}</p><h2 id="${id}">${title}</h2></div>${extra}</div>`;
  const projects = () =>
    `<section class="research-section">${headings("research", "Research directions", layout === "editorial" ? "From uncertainty to action." : "Research in focus", `<span class="section-meta">ROBOTS · PEOPLE · TEAMS</span>`)}<div class="project-grid">${D.research.map((p, i) => `<article class="project" id="project-${p.id}"><div class="project-image">${p.video ? `<video src="${esc(p.video)}" poster="${p.image}" controls preload="none" aria-label="${esc(p.title)} demonstration"></video>` : `<img src="${p.image}" alt="${esc(p.alt)}" width="640" height="400" loading="lazy">`}<span class="image-caption">${p.schematic ? "Illustrative schematic" : "Research visual"}</span></div><div class="project-copy"><p class="eyebrow">${p.label}</p><h3>${p.title}</h3><p>${p.description}</p><div class="tags">${p.tags.map((x) => `<span>${x}</span>`).join("")}</div><div class="project-links">${p.paper ? anchor(p.paper, p.id === "humanmotion" ? "Patent application ↗" : "Read paper ↗") : ""}</div></div></article>`).join("")}</div></section>`;
  const pubRow = (p) =>
    `<article class="publication"><div class="pub-year">${p.year}</div><div class="pub-content"><h3>${p.url ? anchor(p.url, esc(p.title)) : esc(p.title)}</h3><p class="authors">${esc(p.authors).replace(/Anshul Nayak|A\. A\. Nayak/g, "<strong>$&</strong>")}</p><p class="venue">${esc(p.venue)}</p>${p.status ? `<span class="pub-status ${p.type === "review" || p.type === "preprint" ? "pending" : ""}">${esc(p.status)}</span>` : ""}${p.note ? `<p class="pub-note">${esc(p.note)}</p>` : ""}</div><div class="pub-links">${p.url ? anchor(p.url, "Paper ↗") : ""}${p.arxiv ? anchor(p.arxiv, "Preprint ↗") : ""}</div></article>`;
  const publications = () =>
    `<section class="publications-section">${headings("publications", "Papers & preprints", layout === "editorial" ? "Ideas, in print." : "Publications", anchor(D.scholar, "Google Scholar ↗", "section-link"))}<div class="publication-controls"><div class="filters" role="group" aria-label="Filter publications"><button data-filter="recent" aria-pressed="true">Recent</button><button data-filter="all" aria-pressed="false">All papers</button><button data-filter="journal" aria-pressed="false">Journals</button><button data-filter="conference" aria-pressed="false">Conferences</button><button data-filter="review" aria-pressed="false">Preprints & review</button></div><span id="paper-count" aria-live="polite"></span></div><div id="publication-list">${D.publications.map(pubRow).join("")}</div><div class="other-work"><h3>Patents & book chapters</h3>${D.other.map((p) => `<article><p class="eyebrow">${p.type}</p><h4>${p.url ? anchor(p.url, p.title + " ↗") : p.title}</h4><p>${p.authors}</p><p>${p.detail}</p></article>`).join("")}</div></section>`;
  const news = () =>
    `<section class="news-section">${headings("news", "Recent updates", layout === "editorial" ? "Notes from the lab." : "What’s new")}<div class="news-list">${D.news.map((n) => `<article><time>${n.date}</time><p>${n.text}</p></article>`).join("")}</div></section>`;
  const timeline = (title, items) =>
    `<div class="timeline"><h3>${title}</h3>${items.map((i) => `<article><time>${i[0]}</time><div><h4>${i[1]}</h4><p>${i[2]}</p></div></article>`).join("")}</div>`;
  const about = () =>
    `<section class="about-section">${headings("about", "Background & community", layout === "editorial" ? "A little more context." : "About & experience")}<p class="about-intro">${D.background}</p><div class="timeline-grid">${timeline("Experience", D.experience)}${timeline("Education", D.education)}</div><div class="service-grid"><article><h3>Teaching & mentoring</h3><p>At Clemson, I lead a Creative Inquiry course on multi-robot off-road terrain navigation, mentoring six students building an F1-TENTH vehicle and collecting multimodal data for vision-language models.</p><p>Previously, I taught fluid/thermal CAD and introductory physics labs at Virginia Tech.</p></article><article><h3>Service & recognition</h3><p>Session co-chair, “Cognition, Intent and Embodied AI III,” IEEE RO-MAN 2026. Reviewer for IEEE ITSC (2022, 2023) and IEEE IV (2022).</p><p>Pratt Fellowship, Virginia Tech Mechanical Engineering: 2018–2019 and Fall 2024.</p></article></div></section>`;
  const footer = () =>
    `<footer><div><p class="eyebrow">Get in touch</p><h2>Let’s talk robotics.</h2>${anchor("mailto:" + D.email, D.email + " ↗")}</div><div class="footer-bottom"><span>© 2026 Anshul Nayak</span>${D.previewMode ? `<span>${labels[layout]} · <a href="designs.html">Compare designs</a></span>` : ""}<a href="#top">Back to top ↑</a></div></footer>`;
  window.academicMarkup =
    selector() +
    `<div class="page" id="top">${nav()}<main>${hero()}${layout === "classic" ? news() + projects() : projects() + news()}${publications()}${about()}</main>${footer()}</div>`;
  if (typeof document === "undefined") return;
  document.body.classList.add("js-enabled");
  const app = document.getElementById("app");
  if (!app.hasChildNodes()) app.innerHTML = window.academicMarkup;
  function filterPublications(key) {
    const papers = D.publications.filter(
      (p) => key === "all" || (key === "recent" && p.year >= 2024) || (key === "review" && ["preprint", "review"].includes(p.type)) || p.type === key
    );
    document.getElementById("publication-list").innerHTML = papers.map(pubRow).join("");
    document.getElementById("paper-count").textContent = `${papers.length} of ${D.publications.length} papers`;
    document.querySelectorAll("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === key)));
  }
  document.querySelectorAll("[data-filter]").forEach((b) => b.addEventListener("click", () => filterPublications(b.dataset.filter)));
  filterPublications("recent");
})();
