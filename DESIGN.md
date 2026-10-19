---
name: SPN-Transporte
description: Die Fahrbahn. The site is the road an SPN tour drives, seen from above, carrying SPN's red lettering and its real silver fleet.
colors:
  asphalt: "#2b2b29"
  asphalt-deep: "#222220"
  asphalt-lane: "#313130"
  paint: "#eeece4"
  paint-dim: "#bdbab0"
  red: "#d0111f"
  red-deep: "#a50c17"
  on-red: "#ffffff"
  wordmark-outline: "#050505"
  silver: "#c9ccce"
  silver-light: "#e3e5e6"
  ink: "#16181a"
  ink-soft: "#3b3f43"
  reflector: "#e0571f"
  brake-lit: "#ff4a26"
  seam: "#3a3a37"
  photo-night: "#07080c"
  field-paper: "#fffdf3"
  error-ink: "#7a1909"
  error-border: "#8f1d0b"
typography:
  wordmark:
    fontFamily: "Saira, Barlow Condensed, sans-serif"
    fontSize: "clamp(2.6rem, 11.5vw, 6.75rem)"
    fontWeight: 850
    lineHeight: 0.95
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 125"
  wordmark-small:
    fontFamily: "Saira, Barlow Condensed, sans-serif"
    fontSize: "clamp(1.15rem, 2.4vw, 1.5rem)"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 125"
  motto:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.2rem, 5.6vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 0.95
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.1rem, 4.6vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.005em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 1.9rem)"
    fontWeight: 700
    lineHeight: 1.1
  claim:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.45rem, 2.6vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.15
  number:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.9rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    fontFeature: "tnum"
  nav:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 600
    letterSpacing: "0.02em"
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.4vw + 0.95rem, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
rounded:
  paint: "2px"
  cab: "5px"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  road-width: "clamp(4rem, 9vw, 7.5rem)"
  road-offset: "clamp(1.25rem, 4vw, 4rem)"
  stage-block: "clamp(3.5rem, 10vh, 6.5rem)"
  panel-pad: "clamp(1.5rem, 3.5vw, 2.5rem)"
  column-gap: "clamp(3rem, 6vw, 6rem)"
  photo-gap: "0.75rem"
components:
  wordmark:
    textColor: "{colors.red}"
    typography: "{typography.wordmark}"
  wordmark-header:
    textColor: "{colors.red}"
    typography: "{typography.wordmark-small}"
  button-call:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
    typography: "{typography.nav}"
    rounded: "{rounded.paint}"
    padding: "0.45rem 0.9rem"
  button-call-hover:
    backgroundColor: "{colors.red-deep}"
    textColor: "{colors.on-red}"
  callbox-phone:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
    typography: "{typography.number}"
    rounded: "{rounded.paint}"
    padding: "0.7rem 1.25rem 0.75rem"
  callbox-phone-hover:
    backgroundColor: "{colors.red-deep}"
  button-submit:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
    rounded: "{rounded.paint}"
    padding: "0.6rem 1.4rem"
  button-submit-hover:
    backgroundColor: "{colors.red-deep}"
  contact-panel:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paint}"
    padding: "{spacing.panel-pad}"
  input-field:
    backgroundColor: "{colors.field-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paint}"
    padding: "0.6rem 0.75rem"
  nav-top:
    backgroundColor: "{colors.asphalt-deep}"
    textColor: "{colors.paint-dim}"
    typography: "{typography.nav}"
    padding: "0.75rem {spacing.gutter}"
  road-vertical:
    backgroundColor: "{colors.asphalt-lane}"
    width: "{spacing.road-width}"
  hero-photo:
    backgroundColor: "{colors.photo-night}"
    height: "clamp(11rem, 32vh, 22rem)"
  fleet-photo:
    backgroundColor: "{colors.asphalt-deep}"
    rounded: "{rounded.paint}"
  legal-todo:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
    padding: "0 0.3em"
---

# Design System: SPN-Transporte

## Overview

**Creative North Star: "Die Fahrbahn"**

The whole site is a stretch of road seen from directly above. The ground is warm dark asphalt with a fine aggregate grain; line work and reading text are road paint. Section headings are tall condensed signage lettering, lanes are dashed white lines, and the visitor follows a top-down Zugmaschine with a Planenauflieger as it drives down a vertical road beside the content and brakes at a white stop line in front of the contact block. The road belongs to SPN: its name is written in the company's own lettering (red, wide, heavy italic, black outline, as on trailer and cab), and every action carries that same brand red.

The drawn road is the world; the real fleet is the proof. A night photograph of the silver Mercedes-Benz Actros fleet runs as a full-bleed strip between the hero copy and the lane, and a short "Unser Fuhrpark" gallery shows the trucks on the yard. The drawn truck's cab is silver to match them, and the contact block is a silver slab like cab sheet metal. Density is low and sequential: one stage at a time beside the road, each opened by a Leitpfosten seen from above. Ornament is rationed to road furniture: dashed lines, arrows, a stop line, delineator posts and, once, a red/white racing kerb for the motorsport roots.

Motion has road grammar: steady speed, ease-out braking, no bounce, no spring. Reduced motion stops everything that loops and lets the truck jump to its position rather than drive.

**Key Characteristics:**
- Asphalt ground with SVG fractal-noise grain on every road surface.
- White road paint for line work and reading text; SPN red for the wordmark and every action.
- The SPN-TRANSPORTE wordmark in Saira italic 850, 125% width, uppercase, red with a black outline, for the header mark and the hero h1.
- Condensed signage face (Barlow Condensed 600/700/800) for headings, plain Barlow (400/500/600) for reading.
- Real fleet photographs (silver Actros) as proof, each shipping raster with a provenance file.
- A vertical road with a scroll-linked truck that stops at a stop line before the silver contact slab.
- Near-square corners (2px) everywhere: painted marking and pressed metal, never a pill.
- All fonts, images and the motion library self-hosted; no third-party requests.

## Colors

A night-dark, warm-neutral road, one brand red that both signs the name and marks every action, and cool fleet silver for the contact slab.

### Primary
- **SPN Red** (`red`): the company's lettering colour, taken from its trucks. It fills the wordmark (header mark, hero h1) and every action: header call pill, hero tap-to-call box, submit button, skip link, text selection, and the "[todo]" highlight on legal pages. It also paints the red half of the racing kerb.
- **Deep SPN Red** (`red-deep`): hover and pressed state of every red control.
- **On Red** (`on-red`): text and icons on red. The callbox label sits on red at 86% white.
- **Wordmark Outline** (`wordmark-outline`): the black `-webkit-text-stroke` (0.06em, painted under the fill) around the wordmark letters. Used nowhere else.

### Secondary
- **Fleet Silver** (`silver`) and **Light Silver** (`silver-light`): the contact slab (a vertical gradient from Light Silver to Silver at 55%), the drawn truck's cab, and the hover colour of the hero e-mail link.
- **Leitpfosten Reflector Orange** (`reflector`): only the round reflector dot in the top-down delineator.
- **Brake Light** (`brake-lit`): the truck's tail lights once it has stopped at the stop line (unlit state is a dark red baked into the truck symbol).

### Neutral
- **Asphalt** (`asphalt`): page ground, always with the grain overlay. Also the `theme-color`.
- **Deep Asphalt** (`asphalt-deep`): sticky header and footer bands (the road shoulder); fleet photo placeholder ground.
- **Lane Asphalt** (`asphalt-lane`): the slightly lighter surface of drawn lanes (hero lane, vertical road, shuttle road).
- **Road Paint** (`paint`): primary text on asphalt, lane edges, dashes, stop line, arrows; the global focus ring.
- **Worn Paint** (`paint-dim`): body copy, nav links at rest, captions, footer text.
- **Ink** (`ink`): text on silver; contact-panel focus rings, field borders and the dash bullets in the contact hint.
- **Soft Ink** (`ink-soft`): small labels on silver ("Telefon", "E-Mail", optional markers, form note).
- **Seam** (`seam`): the 1px line under the sticky header.
- **Night** (`photo-night`): letterbox ground behind the hero photo strip while it loads.
- **Field Paper** (`field-paper`): input and textarea ground inside the silver panel.
- **Error Ink / Error Border** (`error-ink`, `error-border`): field error text and invalid-field border, on silver.

### Named Rules
**The Brand Red Rule.** Red is SPN's own colour: it signs the name and marks where to act. It is never used for headings other than the wordmark, body text, illustration fills (beyond the kerb's red stripes) or decoration.

**The Paint Writes On The Road Rule.** Reading text and line work on asphalt are Road Paint or Worn Paint. The only other colour that writes on asphalt is the red wordmark.

**The Silver Is Metal Rule.** Silver belongs to the fleet: the contact slab, the drawn cab, and hover on the e-mail link. It does not become a general surface colour.

## Typography

**Wordmark Font:** Saira variable italic (with Barlow Condensed, sans-serif), self-hosted, width axis 50–125%, weight 100–900
**Display Font:** Barlow Condensed (with Arial Narrow, sans-serif), weights 600 / 700 / 800
**Body Font:** Barlow (with system-ui, sans-serif), weights 400 / 500 / 600

**Character:** Saira at full width, heavy and italic reproduces the lettering painted on SPN's trailers; Barlow Condensed reads as highway signage; Barlow is the plain sibling for reading. All are self-hosted woff2 (latin subset); Saira, Barlow Condensed 700 and Barlow 400 are preloaded.

### Hierarchy
- **Wordmark** (Saira italic 850, 125% width, uppercase, red, 0.06em black outline painted under the fill, letter-spacing -0.005em): the hero h1 at `clamp(2.6rem, 11.5vw, 6.75rem)` / 0.95, stacked "SPN-" / "Transporte" below 64rem and on one line above; the header mark at `clamp(1.15rem, 2.4vw, 1.5rem)` / 1 on every page.
- **Motto** (Barlow Condensed 800, uppercase, `clamp(2.2rem, 5.6vw, 4.75rem)`, 0.95, max 18ch): the philosophy quote. Legal page h1 uses the same voice at `clamp(2.75rem, 8vw, 4.5rem)`.
- **Headline** (700, `clamp(2.1rem, 4.6vw, 3.5rem)`, 1.0, balanced): section h2s beside the road. Sentence case.
- **Title** (700, `clamp(1.5rem, 2.6vw, 1.9rem)`, 1.1): h3s in the story and team blocks; legal h2s at 1.6rem.
- **Claim / Facts** (600 condensed, `clamp(1.45rem, 2.6vw, 2rem)` claim; `clamp(1.35rem, 2.4vw, 1.65rem)` fact rows): the claim under the wordmark and the arrow-led fact list.
- **Number** (700 condensed, tabular figures): the phone number in the hero callbox; contact lines at `clamp(1.6rem, 3vw, 2.25rem)`.
- **Nav** (600 condensed, 1.2rem, 0.02em): header links; the call pill uses 700 at the same size.
- **Body** (400, `clamp(1.0625rem, 0.4vw + 0.95rem, 1.1875rem)`, 1.6): paragraphs, 48 to 62ch measure; the first story paragraph lifts to 500 and full paint.
- **Label** (600 Barlow, 0.875rem): labels inside red controls and on silver; field labels at 0.95rem; photo captions and fleet note at 0.9–0.95rem in Worn Paint.

### Named Rules
**The One Name Rule.** The Saira wordmark style is for the company name only (header mark, hero h1). It is never applied to section headings, slogans or other words.

**The Uppercase Is Earned Rule.** Uppercase is reserved for the wordmark and 800-weight painted lettering (motto, legal h1). Headlines and everything else stay in sentence case.

**The Numbers Line Up Rule.** Phone numbers always use the condensed face with `font-variant-numeric: tabular-nums`.

## Layout

A single column of "stages" running beside a vertical road. The route container pads its left edge by gutter + road width + road offset, and the road sits absolutely in that margin at the gutter, full height of the route until the stop line. Stages are max 40rem by default; fleet, story, split and contact stages widen to 72rem, and split/story/close blocks become two columns at 64rem (`minmax(0, 34–36rem) minmax(0, 1fr)`, column gap `clamp(3rem, 6vw, 6rem)`). Vertical rhythm per stage is `clamp(3.5rem, 10vh, 6.5rem)` top and bottom; contact gets more air on top (`clamp(4.5rem, 13vh, 8rem)`) so the stop line has room.

The hero is a grid at `86svh` minus the header: wordmark, claim and the lead + callbox row anchored to the bottom of the copy area, then the full-bleed fleet photo strip (`clamp(11rem, 32vh, 22rem)`, capped at 56vw, cropped at 50% 60%), then the full-bleed lane with the truck. Below 40rem the strip becomes a 16:9 frame with the photo scaled 1.55× toward the trucks. At 64rem the lead and callbox sit side by side.

The fleet gallery is a grid with a 0.75rem gap: one wide yard photo (16:9) over two 3:4 portrait photos on narrow screens; at 64rem it becomes one row of `2.2fr 1fr 1fr`, the wide photo stretching to the portraits' height.

Breakpoints observed: 40rem (header nav hides, the call pill stays; contact slab pulls left to sit under the road; hero photo goes 16:9), 52rem (contact slab stacks), 64rem (two-column stages, one-line wordmark, single-row fleet). Side gutter is `clamp(1rem, 4vw, 3rem)` everywhere.

## Elevation & Depth

Depth is physical, not interface: things that lie on the road cast short, soft shadows straight down toward the viewer. Surfaces are otherwise flat; the asphalt layers (deep / base / lane) separate by tone and grain, and photographs sit flush with no shadow or frame.

### Shadow Vocabulary
- **Vehicle** (`filter: drop-shadow(0 6px 6px rgb(0 0 0 / 0.45))`; on the rotated road truck `drop-shadow(-5px 0 5px ...)`): the drawn trucks only.
- **Painted box** (`box-shadow: 0 6px 18px -8px rgb(0 0 0 / 0.6)`): the red hero tap-to-call box.
- **Contact slab** (`box-shadow: 0 18px 40px -24px rgb(0 0 0 / 0.7)`): the silver contact panel.
- **Post** (`box-shadow: 0 2px 3px rgb(0 0 0 / 0.5)`): the delineator head.

### Named Rules
**The Lies On The Road Rule.** Only objects that would physically sit on the road (vehicles, posts, the callbox, the contact slab) get shadow. Paint, lettering and photographs never cast shadow.

## Shapes

Hard, painted geometry. Corners are 2px (`rounded.paint`) on every control, field, panel and gallery photo: a marking edge, never a pill. The drawn cab uses 5px. Lines are thick and solid: 5px lane edges and dashes in the hero, 4px on the vertical road, 3px on the shuttle road, a 0.75rem stop line. Dashes are `repeating-linear-gradient` strips (hero 4rem on / 5rem off; vertical road 2.5rem / 3rem; shuttle 1.5rem / 1.75rem). The arrow is one straight lane-arrow symbol reused as hero road marking and, at 3rem by 1rem, as the bullet for fact rows. List bullets in the contact hint are short 0.75rem by 3px ink bars, i.e. dashes. The hero photo strip is full-bleed and square-edged.

## Components

### Wordmark
- **Character:** SPN's own truck lettering, the one place the brand speaks in its own type.
- **Style:** Saira italic 850, `font-stretch: 125%`, uppercase, SPN Red fill, 0.06em Wordmark Outline stroke with `paint-order: stroke fill` so the outline sits outside the letter. Header mark links to the top (or home on legal pages).

### Call Pill (header)
- **Character:** a small red marking that is always one tap away.
- **Shape:** 2px corners, `0.45rem 0.9rem` padding, inline phone glyph (inline SVG) + "Anrufen", white on red.
- **Hover / Focus:** background deepens to Deep SPN Red over 150ms ease-out; focus is the global 3px Road Paint ring.
- **Mobile:** stays visible when the nav hides below 40rem.

### Hero Callbox
- **Character:** the red box in the first viewport carrying the number itself.
- **Shape / Color:** red, white text, 2px corners, painted-box shadow, "Tour anfragen" label (86% white) above the tabular number; the e-mail sits beside it as Road Paint text that turns Silver on hover.
- **States:** hover to Deep SPN Red; active nudges down 1px.

### Contact Slab
- **Character:** a silver slab at the end of the road, after the stop line, like the side of a cab.
- **Structure:** Light Silver to Silver gradient, ink text, 2px corners, contact-slab shadow; two columns (direct lines | form) divided by a 2px ink rule at 18% opacity; stacks below 52rem. Direct lines pair a small Barlow label in Soft Ink with a large condensed value and underline (2px) on hover. Focus rings inside switch from Road Paint to Ink.

### Inputs / Fields
- **Style:** Field Paper ground, 2px ink border at 55% opacity, 2px corners, `0.6rem 0.75rem` padding.
- **Hover / Focus:** border to full ink; focus adds a 3px ink outline offset 1px.
- **Error:** `aria-invalid` sets the error border; a 600-weight 0.9rem message in Error Ink appears under the field.

### Submit Button
- **Style:** red ground, white text, condensed 700 at 1.3rem, 2px corners, `0.6rem 1.4rem`. Hover deepens to Deep SPN Red. Prepares a mailto; no data is sent.

### Navigation
- **Style:** sticky Deep Asphalt bar with a 1px Seam line. Wordmark on the left; links in condensed 600 at 1.2rem, Worn Paint at rest, Road Paint on hover (150ms); red call pill on the right.

### Fleet Photographs
- **Hero strip:** one wide night photograph of the whole fleet, full-bleed between the hero copy and the lane, on Night ground, responsive `srcset` (1000w / 2000w WebP).
- **Gallery ("Unser Fuhrpark"):** one wide yard shot and two portrait fronts, 2px corners, lazy-loaded WebP at two widths each, captions visually hidden (the alt text carries the description), a short Worn Paint note below.
- **Provenance:** every shipping raster has a `.webp.json` sidecar stating it is a real owner-supplied photo and what was edited (resize, WebP, name tags blurred, light tone lift).

### Signature: The Road and the Truck
- **Hero lane:** full-bleed lane band with 5px paint edges, a centre dash line scrolling left continuously (0.9s linear loop), a straight-ahead arrow, and the truck sliding in from the left on load (1.8s, delay 0.15s, `cubic-bezier(0.16, 1, 0.3, 1)`, via self-hosted Motion).
- **Vertical road:** lane asphalt with 4px paint edges and a centre dash, ending in a white stop line placed just below the top of the Kontakt section (measured in JS). The truck is the same top-down symbol rotated 90°, follows the reading position (viewport centre) with a 0.09 lerp per frame, and lights its brake lights (`brake-lit`) when it reaches the stop line.
- **Shuttle A↔B:** a short lane between two condensed 800 letters, the truck pendling across it (7s, `cubic-bezier(0.45, 0, 0.55, 1)`, dwell at each end, flipping direction with `scaleX(-1)`). It runs only while 40% visible.
- **Leitpfosten:** a 0.7rem white square with an orange reflector dot, at the road edge at the top of each stage.
- **Kerb:** a vertical 0.65rem SPN Red / Road Paint stripe (2.75rem segments) at the road edge, running the height of the Über-uns section (inset 2.5rem top and bottom). Used once.
- **Truck symbol:** grey Planenauflieger with rib lines and dark-red tail lights, black coupling, Fleet Silver cab with a darker silver roof panel, dark windscreen, black mirrors and warm-white headlights; viewBox `0 -4 248 48`, driving direction right.

### Reduced Motion
Under `prefers-reduced-motion: reduce`: smooth scrolling is off, the hero dashes and shuttle are static (truck parked at A), the hero truck does not drive in, and the road truck jumps straight to its scroll position with no easing, still stopping and braking at the stop line.

## Do's and Don'ts

### Do:
- **Do** lay reading text and line work on asphalt in Road Paint or Worn Paint over the grain.
- **Do** make every action SPN Red with white text and 2px corners, deepening to Deep SPN Red on hover.
- **Do** set the company name, and only the company name, in the wordmark style: Saira italic 850, 125% width, uppercase, red with a 0.06em black outline under the fill.
- **Do** keep the phone number tap-to-call and visible without scroll on every screen (header pill on mobile, callbox in the hero).
- **Do** use real SPN fleet photographs as proof, served as self-hosted responsive WebP with descriptive alt text and a provenance `.json` beside each file.
- **Do** build new figures from the road vocabulary: lane bands with paint edges, dashed centre lines, the straight arrow, the top-down truck with silver cab, Leitpfosten, stop line.
- **Do** move vehicles at steady road speed and brake with `cubic-bezier(0.16, 1, 0.3, 1)`; pause looping motion when it is off screen and stop it under reduced motion.
- **Do** self-host every font, image and script.

### Don't:
- **Don't** use red for section headings, body text, decoration or illustration fills; it is the name and the action.
- **Don't** apply the Saira wordmark style to any words other than "SPN-Transporte".
- **Don't** round controls beyond 2px or use pill shapes.
- **Don't** add bounce, spring or overshoot to any motion.
- **Don't** put shadows on paint, lettering or photographs; only objects on the road cast them.
- **Don't** use stock, AI-generated or generic highway imagery; photographs show SPN's own fleet only.
- **Don't** add invented figures, customer logos, testimonials or badges as visual proof.
