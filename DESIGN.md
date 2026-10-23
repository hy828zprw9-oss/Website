---
name: SPN-Transporte
description: A product-launch page where the product is the fleet. Black and mist stages, wide Archivo headlines, pills and 28px cards, real SPN photography, and a procedural 3D Actros that drives along one road through the page.
colors:
  black: "#000000"
  graphite: "#1d1d1f"
  graphite-raised: "#2c2c2e"
  mist: "#f5f5f7"
  white: "#ffffff"
  muted-on-mist: "#6e6e73"
  muted-on-black: "#a1a1a6"
  word-unlit: "#424245"
  line-on-mist: "#d2d2d7"
  line-on-black: "#3a3a3c"
  signal-red: "#d0111f"
  signal-red-hover: "#e5212f"
  wordmark-outline: "#050505"
  focus-blue: "#4c9bff"
  error-border: "#ff6961"
  error-text: "#ff8a80"
typography:
  wordmark:
    fontFamily: "Saira, Archivo, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: "0"
    fontVariation: "'wdth' 125"
  display:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.05rem, 4.4vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 118"
  claim:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.7rem, 3.9vw, 3.3rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 118"
  statement:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.6rem, 3.3vw, 3rem)"
    fontWeight: 560
    lineHeight: 1.15
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 108"
  numeral:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.4rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 118"
  menu:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 9vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.6rem, 2.4vw, 2.05rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 108"
  panel-title:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 600
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 108"
  lead:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.35rem, 2.1vw, 1.7rem)"
    fontWeight: 560
    lineHeight: 1.25
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 108"
  body:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.0625rem, 0.3vw + 1rem, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.004em"
  button:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    letterSpacing: "-0.01em"
  label:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  line: "2px"
  field: "0.875rem"
  card: "1.75rem"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  wrap: "72rem"
  section: "clamp(5rem, 14vh, 9rem)"
  section-head: "clamp(2.5rem, 6vh, 4rem)"
  card-gap: "1.25rem"
  card-pad: "clamp(1.75rem, 4vw, 2.75rem)"
  nav-height: "3.25rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.4rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.signal-red-hover}"
  button-ghost:
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.4rem"
    height: "2.75rem"
  button-small:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.95rem"
    height: "2rem"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  card-photo:
    backgroundColor: "{colors.black}"
    textColor: "{colors.mist}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  form-panel:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.mist}"
    rounded: "{rounded.card}"
    padding: "clamp(1.5rem, 3.5vw, 2.5rem)"
  input:
    backgroundColor: "{colors.graphite-raised}"
    textColor: "{colors.mist}"
    rounded: "{rounded.field}"
    padding: "0.8rem 1rem"
  nav:
    backgroundColor: "rgb(0 0 0 / 0.86)"
    textColor: "{colors.mist}"
    typography: "{typography.label}"
    height: "{spacing.nav-height}"
---

# Design System: SPN-Transporte

## Overview

**Creative North Star: "The Fleet Launch"**

The site is staged like a product launch, and the product is SPN's own fleet of silver Mercedes-Benz Actros. Every section is a full-width stage, either pure black or a cool mist grey, and the two alternate down the page so each new topic arrives as a change of light. Headlines are large, wide Archivo set in two lines: a statement in full ink and a quieter second line in muted grey. Real daylight photographs of SPN's trucks carry the proof (the owner chose daylight only). Nothing is illustrated and nothing is stock.

The page is sparse and confident: one idea per stage, generous section padding, few elements, big type. Colour is almost absent. Brand red (#d0111f) is the single signal and only marks things the visitor can do or things SPN promises (the check marks). The company's own wordmark, red wide italic Saira with a black outline as it is lettered on the trailers, is the only logo.

Motion is one idea told four times: a road runs through the page and SPN's Actros drives it (owner brief 2026-10-23: trucks that come toward you, drive away, and pass from left and right). The truck is a procedural Three.js reconstruction of SPN's own Actros L (DT E 1005), built with img2threejs from the owner's photo. On the mist opening stage it comes out of the distance toward you, the camera walks round it, and it pulls away to the right; in the Pendelverkehr card it runs A to B, turns and comes back; in the Fuhrpark section trucks pass both ways at night; at the end of the page it drives off into the dark, tail lights last. Around the road, motion stays quiet and has one vocabulary: type rises out of a slight blur (the hero copy on load, section titles once on scroll), and each photo gets the camera move its subject suggests (a dolly along the yard row, a widescreen frame that opens, two portraits tipping into the plane). Cards lean up to 3° toward the pointer, the primary arrow steps forward on hover. With reduced motion every road stage is a still frame; without WebGL the page falls back to the photo scene.

**Key Characteristics:**
- Full-bleed black and mist stages alternating: scene, statement (black), Leistungen (mist), Fuhrpark (black), Über uns (mist), Kontakt (black), footer (mist).
- Two-line wide headlines (Archivo, width 118%, weight 600, tracking -0.035em): ink first line, muted second line.
- 28px rounded cards and fully rounded pills; no square buttons, no hairline-boxed cards.
- Red is a verb: actions, the shuttle dot, check marks, list markers. Never decoration.
- Only real SPN photographs, each with a provenance sidecar, driver name tags blurred.
- One road, four stages (approach, shuttle, traffic, drive-away); each WebGL stage renders only while on screen.

## Colors

A near-monochrome Apple-style neutral system (true black, graphite, mist, white) with one saturated brand red used sparingly.

### Primary
- **Signal Red** (signal-red): primary action fill (Tour anfragen, Anrufen, E-Mail vorbereiten), the shuttle dot, check-mark discs, list markers, text selection, and the wordmark fill. Taken from SPN's trailer lettering.
- **Signal Red Bright** (signal-red-hover): hover state of red pills, hover of the large phone number, and the form caret. Lighter, not darker, because most red sits on black.

### Neutral
- **True Black** (black): the dark stage (scene, statement, Fuhrpark, Kontakt), photo cards, and the page/theme colour. Pure #000.
- **Graphite** (graphite): ink on mist and white surfaces, and the contact form panel on black.
- **Raised Graphite** (graphite-raised): input wells inside the graphite form panel.
- **Mist** (mist): the light stage (Leistungen, Über uns, footer, legal pages) and the ink on black.
- **White** (white): cards sitting on mist; text on red pills.
- **Muted on Mist** (muted-on-mist): second headline lines, card and story body copy, footer text on light stages.
- **Muted on Black** (muted-on-black): second headline lines, scene meta line, captions, mail link and notes on dark stages.
- **Unlit Word** (word-unlit): the resting colour of statement words before they are read (motion only).
- **Line on Mist / Line on Black** (line-on-mist, line-on-black): the shuttle track on light cards; input borders and the divider above the contact hint on dark grounds.
- **Wordmark Outline** (wordmark-outline): the black text-stroke of the Saira wordmark on light grounds.

### Utility
- **Focus Blue** (focus-blue): the only focus colour, 2px outline with 3px offset, and the input focus ring (3px at 35%).
- **Error Border / Error Text** (error-border, error-text): invalid field border and message, on the dark form only.

### Named Rules
**The Red Is a Verb Rule.** Signal red marks only what the visitor can do (pills, the phone hover) or what SPN promises (check marks, the shuttle dot, list markers), plus the wordmark. It never fills a section, a headline, a card or a decorative shape.

**The Two Stages Rule.** Every section takes the full width on either True Black or Mist, and neighbours alternate. No third ground colour, no gradients between stages; white and graphite exist only as cards and panels sitting on a stage.

**The Muted Second Line Rule.** Muted greys are always the partner of an ink colour on the same ground: muted-on-mist with graphite, muted-on-black with mist. They are never swapped across grounds.

## Typography

**Display / Body Font:** Archivo (Omnibus-Type, OFL, one self-hosted variable file with weight and width axes; system-ui, -apple-system, Segoe UI fallback). Replaced Geist on 2026-10-23: Geist had become the default face of generated sites, and the brief asked for a premium automotive feel.
**Wordmark Font:** Saira Italic (variable width, self-hosted), used only for the SPN-Transporte wordmark

**Character:** One grotesk in two widths. Display type runs wide (118%) at weight 600 with tight tracking, which reads like the lettering on a vehicle and carries the motorsport story; titles, the statement and leads sit at 108%; reading text is normal width at 400 with 1.55 leading. Saira, wide and slanted, is reserved for the company's own name.

### Hierarchy
- **Display** (600, wdth 118, clamp(2.05rem, 4.4vw, 4rem), 1.04): the scene headline only, centred, balanced, max 24em so each sentence holds one line on desktop; second line muted.
- **Headline** (600, wdth 118, clamp(2rem, 4.6vw, 4rem), 1.05): section titles, left aligned, max 24ch, second line muted and set as a block.
- **Claim** (600, wdth 118, clamp(1.7rem, 3.9vw, 3.3rem), 1.08): the sentence that appears when the truck pulls away.
- **Statement** (560, wdth 108, clamp(1.6rem, 3.3vw, 3rem), 1.15): the single word-reveal paragraph, max 60rem wide.
- **Numeral** (600, wdth 118, clamp(2rem, 4vw, 3.4rem), 1, tabular figures): the contact phone number, never wrapped (non-breaking space). Shuttle letters use the same voice.
- **Menu** (600, wdth 118, clamp(2rem, 9vw, 2.75rem), 1.15): the links of the phone menu.
- **Title** (600, wdth 108, clamp(1.6rem, 2.4vw, 2.05rem), 1.1): card headings. Panel headings (values, legal h2) 1.3rem.
- **Lead** (560, wdth 108, clamp(1.35rem, 2.1vw, 1.7rem), 1.25): the opening sentence of a story block, in ink.
- **Body** (400, wdth 100, clamp(1.0625rem, 0.3vw + 1rem, 1.1875rem), 1.55, -0.004em): running copy, muted, capped at 38ch in cards and 60ch in stories.
- **Button** (500, 1.0625rem, -0.01em): pill labels; 0.8125rem in the small nav pill.
- **Label** (500, 0.875rem): nav links, form labels (0.9rem), shuttle point captions, footer (0.85rem).
- **Wordmark** (Saira italic 850, width 125%, uppercase): nav at 1.05rem, footer at 0.95rem.

### Named Rules
**The Two-Line Headline Rule.** Section and scene headlines are a full-stop statement followed by a muted second line in the same size and weight. The hierarchy comes from colour, not from a second size.

**The Wordmark Only Rule.** Saira appears only as the SPN-Transporte wordmark: red fill, black outline via text-stroke (0.06em, painted under the fill). On black grounds the outline is dropped because it would vanish anyway. Saira is never used for headings or labels.

## Layout

Single column of full-bleed stages. Content sits in a centred wrap of 72rem with a fluid gutter (clamp(1rem, 4vw, 2.5rem)); the legal pages narrow to 44rem, the statement to 60rem. The large fleet photo breaks out of the wrap to 90rem.

Every stage uses the same vertical padding (clamp(5rem, 14vh, 9rem)), and content after a section title starts clamp(2.5rem, 6vh, 4rem) below it. Grids collapse to one column on phones: service cards go two-up from 64rem, fleet portraits two-up from 48rem, Über uns and Kontakt split asymmetrically (1.35fr/1fr and 1fr/1.1fr) from 64rem. Grid gaps are 1.25rem between cards and 2.5rem to 4rem between text columns.

The nav is fixed, 3.25rem tall, and its links hide below 48rem leaving only the wordmark and the red Anrufen pill, so the phone is one tap away on every screen. Anchors scroll with 3.5rem padding for the bar.

## Elevation & Depth

The system is flat. Depth comes from the stage contrast (black against mist), from cards that are lighter than their stage (white on mist, graphite on black), and from photography itself. There are no drop shadows on cards or buttons.

### Shadow Vocabulary
- **Glass bar** (`background: rgb(0 0 0 / 0.86); backdrop-filter: saturate(180%) blur(20px)`): the fixed nav, with a 1px white hairline at 8%.
- **Ghost ring** (`box-shadow: inset 0 0 0 1.5px rgb(255 255 255 / 0.55)`): the outline of the ghost pill, an inset ring rather than a border.
- **Signal halo** (`box-shadow: 0 0 0 6px rgb(208 17 31 / 0.18)`): the shuttle dot only.
- **Ground shadow** (radial gradient, black 85% to transparent): under the cut-out truck in the photo fallback scene, and as a soft elliptical blob under every 3D truck.

### Named Rules
**The Flat Cards Rule.** Cards and panels never cast shadows; they separate from the stage by tone alone.

## Shapes

Three radii carry the whole system: fully round pills (999px) for every button, 28px (1.75rem) for every card, panel and framed photograph, and 14px (0.875rem) for form fields. Photos inside the page are clipped to the card radius; the scene photo is the only image that runs edge to edge. Round red discs (check marks, the shuttle dot) are the only circular marks. Borders are used only on inputs and one divider; cards have none.

## Components

### Buttons
Pills, quiet and decisive.
- **Shape:** fully round (999px), min height 2.75rem.
- **Primary:** Signal Red fill, white label, 0.7rem 1.4rem padding. Used for the main action of a view: Tour anfragen, Anrufen, E-Mail vorbereiten.
- **Ghost:** transparent with a 1.5px inset white ring at 55%, white label, tabular figures; pairs with a red pill on black (the phone number in the scene).
- **Small:** 2rem tall, 0.35rem 0.95rem padding, 0.8125rem label; the nav's Anrufen.
- **Hover / Focus / Active:** red brightens to signal-red-hover, ghost gains a 12% white wash, 200ms on the shared ease; press scales to 0.98; focus is the global 2px focus-blue outline.
- **Go pill:** primary actions that lead somewhere (Tour anfragen, E-Mail vorbereiten) carry a 1rem stroked SVG arrow; on hover or keyboard focus it steps 3px forward (320ms).

### Cards / Containers
- **Corner Style:** 28px (1.75rem).
- **Background:** white on mist (service card, values panel); black on mist for the photo card; graphite on black for the contact form.
- **Shadow Strategy:** none (Flat Cards Rule).
- **Tilt:** with a fine pointer and motion allowed, the service cards lean toward the pointer, at most 3° on each axis (perspective 1400px), and settle back over 700ms on leave.
- **Border:** none.
- **Internal Padding:** clamp(1.75rem, 4vw, 2.75rem).
- **Photo card:** black card, text at the top, photo filling the lower 72% with a top mask fading from transparent to solid over 30%, so the image rises out of the black.
- **Service cards** are tall (clamp(30rem, 70vh, 40rem)) so each reads as its own small stage.

### Check List
Each item is preceded by a 1.25rem Signal Red disc with a white tick drawn inline. Used for SPN's promises (values list). Plain bullet lists on dark grounds use red markers instead.

### Inputs / Fields
- **Style:** raised graphite well, 1px line-on-black border, 14px radius, 0.8rem 1rem padding, 1rem text, red caret. Labels sit above in 0.9rem 500; optional marks in muted 400.
- **Focus:** border turns focus-blue with a 3px ring at 35%; hover lifts the border to #5a5a5e.
- **Error:** error-border on the field, error-text message below at 0.875rem; validation only after submit, cleared live on input.

### Navigation
Fixed glass bar on black at 86%: wordmark left (red, no outline), links right at 0.875rem in mist at 80% opacity brightening to white with a 1px underline growing from the left, small red Anrufen pill at the end. Below 48rem the links move into a menu: a two-line toggle (turns into a cross) opens a full-height black sheet under the bar with the four sections in the menu voice, staggered in by 45ms, and the phone number and mail at the foot. Escape or a link closes it; while open the rest of the page is inert and does not scroll; focus moves to the first link and back to the toggle. Without JavaScript the phone pill remains.

### The Road (signature, 3D)
Four WebGL stages share one procedural SPN Actros (assets/js/truck3d.js, built from 3d/; three.js and the model are self-hosted, no texture downloads). Each stage is a `[data-stage]` host whose canvas fades in on its first frame and renders only while on screen; lamps are glow sprites (small lit points by day, additive blooms at night) and every truck sits on a blurred blob shadow. Wheels roll with distance travelled.
- **Approach (scene, mist, sticky 300vh):** a two-lane road in mist-grey and white fades into the mist through fog. On first frame the Actros drives out of the distance toward the camera (4.2 s, quartic ease-out), stopping under the headline and pills in a front three-quarter view with a slow camera sway. Scroll then walks the camera round to the side (4-50%), the copy fades by 20%, and from 50% the truck pulls away to the right; the claim appears at 56-70%.
- **Shuttle (white Pendelverkehr card):** a pale loop ribbon with graphite stop discs; the truck holds at A (Laden), drives to B (Entladen), holds, turns round the far side and comes back, 11 s per cycle. A/B captions are DOM text pinned under the projected stops.
- **Traffic (Fuhrpark, black band under the headline):** a dark road seen from the side; trucks pass right in the near lane and left in the far lane, white headlight blooms and red tail lights. Scroll pans the camera slightly. Phones frame one truck at a time.
- **Drive-away (end of Kontakt, black):** seen from behind, the Actros drives toward the horizon as the page scrolls to its end and dissolves into black fog; the red tail lights stay last.
- **Reduced motion:** each stage draws one still frame (parked approach pose, truck at A, one truck per lane, truck mid-distance).
- **No WebGL:** the photo scene takes over: the daylight fleet photo with the cut-out Actros that emerges from the row on scroll, the shuttle dot runs A↔B, the other road hosts are hidden.

### Rise
Section titles (each muted second line 120ms later), the Über-uns lead, the six values (70ms apart, as a list), and the contact phone and mail rise once from 0.55em below with a 6px blur over 0.9-1.1s, triggered when their top passes 92% of the viewport (checked per scroll frame, so a fling or anchor jump still shows them). Only with motion allowed; otherwise everything is plain and visible.

### Word Reveal
One statement paragraph whose words are split into spans and lit from word-unlit to mist as the paragraph scrolls from 80% to 45% of the viewport. Without motion, all words render lit as plain text.

### Shuttle Diagram (fallback)
Without WebGL, inside the white shuttle card: large letters A (Laden) and B (Entladen) on either side of a 6px line-on-mist track; a red dot with halo travels A to B and back in 5.5s with a pause at each end (in-out cubic). It runs only while 40% visible and does not run at all under reduced motion. With WebGL the 3D shuttle stage replaces it.

### Fleet Frame
A 16:9 photograph, 28px radius, up to 90rem wide, that opens from a widescreen crop (inset 7% 10%) to its full frame while the image settles from 1.22 to 1, as it scrolls from entering to centre; below it two 4:5 portrait photos with short muted captions naming the model, which tip out of a 14° perspective into the plane (the second one a beat later). The Nahverkehr card photo drifts sideways as the card passes (scale 1.16 to 1.04, translateX 3% to -3%), a dolly along the yard row. Photos are never enlarged past 1.22 because the sources are 1440px wide.

## Do's and Don'ts

### Do:
- **Do** alternate full-bleed True Black and Mist stages, each with the same section padding (clamp(5rem, 14vh, 9rem)).
- **Do** write headlines as a statement plus a muted second line at the same size, Archivo at width 118%, weight 600, -0.035em tracking.
- **Do** keep every button a pill (999px) and every card or framed photo at 28px (1.75rem).
- **Do** use only real SPN photographs. Ship each raster with a provenance sidecar (`<file>.webp.json`) stating origin and edits, and blur any driver name tags before publishing.
- **Do** keep the 3D Actros the only non-photographic image: a procedural reconstruction of SPN's own truck, documented in 3d/actros/README.md, with no lettering, logos or plate characters.
- **Do** self-host every font, script and image; the page makes no third-party requests.
- **Do** gate every motion behind the `has-motion` class, set only when prefers-reduced-motion is not reduce and the Motion library loaded, and make the static state complete on its own.
- **Do** pause looping motion when it leaves the viewport.
- **Do** keep the phone number reachable in one tap: the red Anrufen pill in the nav on every page and viewport.

### Don't:
- **Don't** use Signal Red for surfaces, headlines, decorative shapes or large areas; it marks actions and promises only.
- **Don't** add drop shadows to cards or buttons, or border cards with hairlines.
- **Don't** use stock, illustrated or AI-generated imagery, invented fleet figures, customer logos or reviews.
- **Don't** set headings, labels or body text in Saira; it is the wordmark only.
- **Don't** introduce a third stage colour or gradients between stages.
- **Don't** add motion that is not the road: the four truck stages are the signature, text and photos stay quiet.
- **Don't** let a 3D stage run off screen or under reduced motion; never ship the 3D without its photo fallback.
