"""Check the deployed artifact, including links inside prerendered content."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids = set()
        self.links = []
        self.headings = 0
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            assert attrs["id"] not in self.ids, f"Duplicate ID: {attrs['id']}"
            self.ids.add(attrs["id"])
        if tag == "h1":
            self.headings += 1
        if tag == "img":
            assert "alt" in attrs, f"Missing image description: {attrs}"
        for key in ("src", "href", "poster"):
            if key in attrs:
                self.links.append(attrs[key])


root = Path(__file__).resolve().parents[1] / "_site"
pages = {path: Page(path) for path in root.rglob("*.html")}
for path, page in pages.items():
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            continue
        target = (root / unquote(url.path).lstrip("/")) if url.path.startswith("/") else path.parent / unquote(url.path)
        if not url.path:
            target = path
        if target.is_dir():
            target /= "index.html"
        target = target.resolve()
        assert target.is_relative_to(root), f"Path escapes artifact: {path}: {link}"
        assert target.exists(), f"Broken local link: {path}: {link}"
        if url.fragment and target in pages:
            assert unquote(url.fragment) in pages[target].ids, f"Missing section: {path}: {link}"

home = root / "index.html"
html = home.read_text()
assert pages[home].headings == 1
assert "Anshul Nayak" in html and "Clemson University" in html
assert html.count('class="publication"') == 14, "All publications must be readable without JavaScript"
assert 'class="preview-bar"' not in html, "Main profile must not show design controls"
assert "Video placeholder" not in html
assert (root / "CNAME").read_text().strip() == "anshulnayak.com"
assert (root / "assets/Anshul-Nayak-CV.pdf").read_bytes().startswith(b"%PDF-")
for name in ("classic", "editorial", "studio"):
    assert 'class="preview-bar"' in (root / f"{name}.html").read_text()
print(f"Validated {len(pages)} HTML pages, assets, section links, CV, domain, and prerendered publications.")
