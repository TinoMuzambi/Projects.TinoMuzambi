# Project archive design plan

## Purpose

This site is an engineering archive, not a second personal landing page. It should let a recruiter scan the strongest work in under a minute, then let an engineer open the evidence and implementation notes without changing contexts.

## Color tokens

- Paper `#ffffff` for the default reading surface
- Ink `#000000` for copy, rules and high-contrast controls
- Plum `#6437b6` for selection, focus and identity
- Aqua `#58cdb7` for active evidence and current work
- Lilac `#dcd6f7` for inspected project drawers
- Interface gray `#e8ebee` for archived work and secondary surfaces

Colors come directly from the sibling portfolio. The archive uses them in smaller, data-bearing regions rather than repeating the portfolio's full-page color sections. There are no gradients, shadows or low-contrast tinted text.

## Typography

- Noto Sans Variable for body copy, controls, metadata and the condensed archive masthead
- Bricolage Grotesque Variable for project names and section headings
- Tabular Noto Sans numerals for dates and counts
- Sentence case throughout, with no tracked uppercase labels
- Narrative line length capped near 65 characters and technical prose capped near 75 characters

## Layout and alignment

The layout is a wide, left-aligned ledger. Major regions use 2px black rules and the project registry uses 1px rules. The header is compact and sticky. Featured projects appear as editorial rows rather than cards. The complete catalogue becomes a two-part inspection desk on wide screens and a single-column drawer list on small screens.

```text
┌ Tino Muzambi / Engineering archive       Main portfolio ┐
├──────────────────────────────────────────────────────────┤
│ Work is clearer with the working notes attached.         │
│ Short archive description                 scope + count  │
├ Selected work ────────────────────────────────────────────┤
│ Project          Why it matters       State       Period │
│ Project          Why it matters       State       Period │
├ Complete project index ───────────────────────────────────┤
│ Search and filter controls                               │
│                                                          │
│ Project registry       │ Inspected project drawer        │
│ Project registry       │ Problem                         │
│ Project registry       │ Contribution                    │
│ Project registry       │ Decisions, limits and evidence  │
├──────────────────────────────────────────────────────────┤
│ llms.txt · projects.json · sitemap · identity links      │
└──────────────────────────────────────────────────────────┘

Mobile

┌ Tino / Archive                         Portfolio ┐
├─────────────────────────────────────────────────┤
│ Compact introduction                            │
├ Selected project rows                           │
├ Search                                           │
│ Filters wrap within the viewport                 │
│ Project row                                      │
│ └ Open drawer content                            │
│ Project row                                      │
├ Machine resources and contact                    │
└─────────────────────────────────────────────────┘
```

## Information hierarchy

1. A compact statement that identifies Tino Muzambi's engineering archive
2. Four evidence-rich selected projects
3. Search, category and status filters
4. The complete project registry
5. Project detail routes with problem, contribution, decisions, outcome and limits
6. Machine-readable resources and links back to the main portfolio

Older work remains readable and searchable. Its status and interface-gray treatment communicate age without hiding it or lowering text contrast.

## Motion principles

There is one memorable interaction. A project row behaves like a document drawer. Activating it reveals the project's problem, contribution, decisions, limitations and evidence in place. The response uses a 180ms color and reveal transition without bounce, parallax or ambient motion. Keyboard operation, `aria-expanded` and a reduced-motion fallback are required.

## Review against generic design patterns

The first work-in-progress direction used a cream background, acid accent, radial glow, italic headline highlight, numbered cards, marquee, round arrow control, pill filters, offset shadows and motion across many elements. Those choices have been removed.

Hard rules and dense rows can also become a generic editorial treatment. Here they are justified by the sibling identity and made project-specific through the inspection-desk behavior, explicit evidence fields, stable identifiers and honest archive states. The archive does not reuse the sibling portfolio's fixed side rails, portrait composition, question-and-answer sequence or full-height opening.
