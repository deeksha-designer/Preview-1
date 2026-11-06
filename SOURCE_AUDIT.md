# AISIN ASK Source Audit and Design Rationale

## Sources reviewed

The build was based on all material supplied in `website Data` plus the attached homepage layout brief:

- AISIN corporate identity manual, 43 pages
- AISIN Group aftermarket package design manual, 73 pages
- AISIN vision artwork
- Four-page AISIN ASK master logo PDF
- Website development requirements document
- Ten-slide designer kickoff presentation
- Approved About Us document
- Belt, brake and clutch fluid, clutch, coolant, filter and suspension price/application lists
- Brake and clutch fluid and coolant product leaflets
- Supplied AISIN air-filter photograph

Text extraction and page renders used for the audit are retained in `source-audit` and `source-renders`.

## Verified brand rules used

- Primary AISIN corporate colour: Pantone 2747C / RGB 0 26 114 / `#001A72`
- Dark-grey support colour: Cool Gray 11C / RGB 51 51 51 / `#333333`
- English designated type family: Frutiger; the implementation uses Frutiger when installed and a system sans-serif fallback otherwise
- Official AISIN ASK lockup reproduced from the supplied master artwork without redrawing the trademarks
- AISIN Blue, AISIN Gold and AISIN Black are used in the product/packaging imagery as defined by the aftermarket manual
- The supplied combined brand lockup is shown in the About section; its tagline is not rewritten or independently typeset

## Information architecture

The implemented homepage follows the client brief's hierarchy:

1. Corporate navigation and enquiry actions
2. Focused single-message hero
3. Product categories
4. New launches and coming soon
5. Why AISIN ASK
6. About AISIN ASK
7. Downloads and technical information
8. Audience pathways
9. News and events
10. Gallery preview
11. Distributor and bulk enquiry
12. Contact
13. Footer

## Creative direction

The current redesign uses a full-width five-banner product carousel and an image-led editorial system. Supplied products are used as the visual anchor throughout product discovery, trust, company information, resources, audience support, updates and business enquiries. The selected product preview changes through pointer or keyboard activation.

The supplied references were translated into principles rather than copied: Q Refinish informed the product-first opening and direct resource routes; SBD Automotive informed the disciplined corporate editorial rhythm and clear expertise pathways. AISIN ASK's approved IA, palette, identity and content remain the source of truth.

The latest interaction pass uses the user-supplied screenshots and live references as composition evidence: DENSO informed the full-bleed banner and single full-screen hamburger; 3M informed the vertical product-category controller; GKN Automotive informed the two-by-two animated stat field and asymmetric news hierarchy. AISIN content, colour and Frutiger remain unchanged.

The four animated figures in the About section describe only the visible homepage structure (6 product categories, 5 technical resources, 3 customer pathways and 4 enquiry routes). They are not represented as corporate operating statistics.

The redesign was informed by the attached proposed IA and user flows. Its internal-page suggestions are treated as proposals rather than approved scope; the homepage preserves the brief's primary navigation labels and 13-section sequence.

No stock automotive photography, invented facilities, invented testimonials, unsupported statistics or fabricated event content were added.

## Content requiring client approval or supply

- Approved AISIN ASK hero message and final tagline permission
- Approved AISIN and ASK joint-venture wording
- High-resolution product cut-outs for clutch, suspension, filters and belts
- Client approval of the AI-assisted studio background treatment used for the supplied air-filter hero image; replace it with an approved high-resolution cut-out or campaign visual for production if required
- Client approval of `assets/aisin-parts-family-v1.png`, an AI-assisted preview composition derived from supplied clutch, filter, coolant and fluid references. Packaging copy and product details must be checked before production use
- Confirmed Phase 1 product list, including Engine Oil and Imported Clutch status
- Official public office address, phone, email, WhatsApp number, business hours and Google Maps link
- Enquiry-recipient addresses, CRM/storage requirements and final form fields
- Approved news, launches, conference dates, mechanics-meet details and event photography
- Social-media profile links
- Privacy Policy, Terms and Conditions and cookie-policy text
- Approval to publish price lists publicly; this preview labels them as application lists, but the source PDFs still contain prices
- Final legal company name for the copyright line

## QA completed for the current iteration

- JavaScript syntax check completed successfully
- Static asset and link scan: 72 links, 18 images, no missing local assets and no duplicate IDs
- Semantic source check: one H1, native carousel/menu controls, labels and meaningful image alternatives
- Reduced-motion handling included
- Preview metadata set to `noindex, nofollow`
- Browser-rendered inspection for this iteration remains pending because the connected Chrome and in-app browser cannot reach the workspace-local preview server
- Connected Chrome was successfully used to inspect the live DENSO, 3M and GKN Automotive references; Chrome policy blocked observation of the local `file://` AISIN preview

