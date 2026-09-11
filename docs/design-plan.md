# Project archive design plan

## Purpose

This site is a recruiter-friendly engineering field guide. The first screen should answer what Tino builds and make the full archive searchable. Selected records then show role, state, evidence and links without requiring a long case study read.

## Color tokens

Pine is the default palette and matches the approved main portfolio:

- Paper `#F8FBF7`
- Ink `#142018`
- Rule `#9BAAA0`
- Primary green `#236B4A`
- Secondary ochre `#C77D13`
- Surface `#E5EEE7`

The production palette studio also exposes the approved Original, Cobalt, Burgundy and Night presets. All six semantic roles remain adjustable and persist in local storage. The interface uses the semantic roles rather than fixed decorative colors so every preset remains coherent.

## Typography

- Instrument Sans Variable for headings, project names and large interface copy
- Noto Sans Variable for body copy, controls and metadata
- Tabular Noto Sans numerals for dates and counts
- Left alignment throughout
- Narrative line lengths stay below 70 characters
- Links use text-width animated underlines rather than full container rules

## Layout and alignment

The archive combines a field guide with an inspection desk. A quiet header leads directly into one strong heading and a large search control. Selected work uses one lead case study and three compact records. A single organic live portal is the visual signature. The complete archive remains a structured ledger.

```text
Desktop

┌ Projects        Portfolio  GitHub  CV  Colours ┐
├─────────────────────────────────────────────────┤
│ Things I have built, tested and learned from.   │
│ [ Search all 34 projects                    ]   │
│ 34 projects                                    │
├ Selected work ──────────────────────────────────┤
│ Lead case study            │ Supporting record │
│ summary, role, state       ├───────────────────│
│ stack and explicit links   │ Supporting record │
│                            ├───────────────────│
│                            │ Supporting record │
├ Live portal ────────────────────────────────────┤
│ Context and fallback       │ generous organic  │
│ links                      │ live iframe        │
├ Complete project index ─────────────────────────┤
│ Search  Area filters  Availability  More        │
│ Year  Project  Summary  Area  State  Stack  Links│
│ Ledger rows                │ inspection drawer │
└─────────────────────────────────────────────────┘

Mobile

┌ Projects                         Colours  Menu ┐
├────────────────────────────────────────────────┤
│ One strong heading                             │
│ [ Search the archive                        ]  │
│ Project count                                  │
├ Lead selected project                          │
├ Three compact selected records                 │
├ Live portal with safe, generous crop           │
├ Search and focused filters                     │
│ Compact record                                 │
│ Open details and explicit links                │
└────────────────────────────────────────────────┘
```

## Information hierarchy

1. One plainspoken heading, project count and prominent search
2. Four selected projects led by Music Recommendation Evaluation
3. One verified live project portal
4. Search and focused area or availability filters
5. Secondary technology filters behind More filters
6. Complete project ledger and concise case-study routes
7. Quiet identity and machine-readable links in the footer

## Motion principles

- Core content is visible in the first render
- Link underlines animate only across the text width
- The portal contours move slowly as the one ambient gesture
- Project drawers and the palette studio respond in 180ms
- Reduced motion removes all animation and smooth scrolling

## Review against generic design patterns

The previous implementation was a strong evidence archive but leaned too far into a monochrome editorial ledger, used six equal selected rows and ended with a visible machine-reader promotion. Those choices were technically clear but missed the approved portfolio character and the revised brief.

The revised direction keeps the evidence-bearing ledger because the content genuinely behaves like records. It avoids a generic card grid by giving selected work an asymmetric editorial hierarchy. It avoids turning the sibling relationship into a clone by reserving the organic portal for one live project and keeping the archive header and navigation conventional rather than adopting the portfolio rails and full-screen biography sequence. The paper grain is visible but restrained, and decorative contours appear only around the live portal.
