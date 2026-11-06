# AISIN ASK Homepage Preview 1

Working responsive redesign for AISIN ASK Aftermarket India, based on the approved homepage sequence and proposed IA/user flows.

## Open the preview

Open `index.html` directly, or serve this folder locally:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173/`.

## Files

- `index.html` — homepage structure and approved-content presentation
- `styles.css` — responsive AISIN visual system
- `script.js` — mobile navigation, audience preview and non-transmitting form validation
- `assets/` — optimized imagery derived from the supplied client files
- `assets/downloads/` — client-supplied PDFs linked from the resource section
- `SOURCE_AUDIT.md` — source findings, design rationale and approval gaps
- `.taste-skill/inspection/` — desktop, tablet and mobile visual-QA captures
- `.taste-skill/redesign-inspection/` — responsive visual-QA captures for the redesigned homepage
- `design-plans/redesign-audit.md` — evidence-backed critique of the original Preview 1 composition

## Preview behaviour

This is a static front-end preview. The enquiry form intentionally does not transmit data. The product index supports pointer and keyboard preview changes. Product-page links that need final CMS routes lead to the enquiry area, while supplied document links open the matching local PDFs.

