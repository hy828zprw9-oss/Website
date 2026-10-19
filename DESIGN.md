---
name: SPN-Transporte
description: Die Fahrbahn. The site is the road an SPN tour drives, seen from above.
colors:
  asphalt: "#2b2b29"
  asphalt-deep: "#222220"
  asphalt-lane: "#313130"
  paint: "#eeece4"
  paint-dim: "#bdbab0"
  baustellen-yellow: "#f3c300"
  baustellen-yellow-deep: "#d9ad00"
  ink: "#1d1c19"
  ink-soft: "#3d3a2e"
  ink-hover: "#3a382f"
  reflector: "#e0571f"
  kerb-red: "#c8331f"
  brake-lit: "#ff4a26"
  seam: "#3a3a37"
  field-paper: "#fffdf3"
  error-ink: "#7a1909"
  error-border: "#8f1d0b"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(3.6rem, 17.5vw, 8.5rem)"
    fontWeight: 800
    lineHeight: 0.84
    letterSpacing: "0.01em"
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
components:
  button-call:
    backgroundColor: "{colors.baustellen-yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
    rounded: "{rounded.paint}"
    padding: "0.45rem 0.9rem"
  button-call-hover:
    backgroundColor: "{colors.paint}"
    textColor: "{colors.ink}"
  callbox-phone:
    backgroundColor: "{colors.baustellen-yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.number}"
    rounded: "{rounded.paint}"
    padding: "0.7rem 1.25rem 0.75rem"
  callbox-phone-hover:
    backgroundColor: "{colors.paint}"
  button-submit:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paint}"
    rounded: "{rounded.paint}"
    padding: "0.6rem 1.4rem"
  button-submit-hover:
    backgroundColor: "{colors.ink-hover}"
  contact-panel:
    backgroundColor: "{colors.baustellen-yellow}"
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
  legal-todo:
    backgroundColor: "{colors.baustellen-yellow}"
    textColor: "{colors.ink}"
    padding: "0 0.3em"
---

# Design System: SPN-Transporte

## Overview

**Creative North Star: "Die Fahrbahn"**

The whole site is a stretch of road seen from directly above. The ground is warm dark asphalt with a fine aggregate grain; everything that speaks is road paint. Headlines are tall white stencil-like lettering laid onto the tarmac, lanes are dashed white lines, and the visitor follows a top-down Zugmaschine with a Planenauflieger as it drives down a vertical road beside the content and brakes at a white stop line in front of the contact block. Actions are never "buttons" in a generic sense: they are Baustellen-gelb temporary marking, the yellow that overrides white paint on a German road.

Density is low and sequential: one section at a time, each a "stage" beside the road, each opened by a Leitpfosten seen from above. Ornament is rationed to things a road actually carries: dashed lines, arrows, a stop line, delineator posts, and (once, for the motorsport story) a red/white racing kerb along the road edge. Nothing is decorative without being road furniture.

Motion has road grammar: steady speed, ease-out braking, no bounce, no spring. Reduced motion stops everything that loops and lets the truck jump to its position rather than drive.

**Key Characteristics:**
- Asphalt ground with SVG fractal-noise grain on every road surface.
- White road paint for text and line work; yellow only for actions and the contact panel.
- Condensed signage display face (Barlow Condensed 600/700/800) over a plain reading sans (Barlow 400/500/600).
- A vertical road with a scroll-linked truck that stops at a stop line before Kontakt.
- Near-square corners (2px) everywhere: painted marking, not soft UI.
- All fonts and the motion library self-hosted; no third-party requests.

## Colors

A night-dark, warm-neutral road with one loud working colour (Baustellen-gelb) and two rare red signals.

### Primary
- **Baustellen-gelb** (`baustellen-yellow`): every action and the contact panel: header call pill, hero tap-to-call box, the contact block, skip link, text selection, focus ring on asphalt, and the "[todo]" highlight on legal pages. Its job is "this is where you act".
- **Deep Baustellen-gelb** (`baustellen-yellow-deep`): defined as the yellow's darker step; currently held in reserve (not used by any rule in the build).

### Secondary
- **Leitpfosten Reflector Orange** (`reflector`): only the round reflector dot in the top-down delineator that opens each stage.
- **Kerb Red** (`kerb-red`): only the red/white racing-kerb stripe running along the road edge beside the Über-uns section, the single nod to the motorsport roots.
- **Brake Light** (`brake-lit`): the truck's tail lights when it has stopped at the stop line (unlit state is a dark red baked into the truck symbol).

### Neutral
- **Asphalt** (`asphalt`): page ground, always with the grain overlay. Also the `theme-color`.
- **Deep Asphalt** (`asphalt-deep`): sticky header and footer bands; reads as the road shoulder.
- **Lane Asphalt** (`asphalt-lane`): the slightly lighter surface of drawn lanes (hero lane, vertical road, shuttle road).
- **Road Paint** (`paint`): primary text on asphalt, lane edges, dashes, stop line, arrows, the hero lettering. Also the hover state of yellow controls.
- **Worn Paint** (`paint-dim`): body copy, nav links at rest, captions, footer text.
- **Ink** (`ink`): text on yellow; the submit button ground.
- **Soft Ink** (`ink-soft`): small labels on yellow ("Tour anfragen", "Telefon", optional markers, form note).
- **Ink Hover** (`ink-hover`): submit button hover.
- **Seam** (`seam`): the 1px line under the sticky header.
- **Field Paper** (`field-paper`): input and textarea ground inside the yellow panel.
- **Error Ink / Error Border** (`error-ink`, `error-border`): field error message text and invalid-field border, both on yellow.

### Named Rules
**The Temporary Marking Rule.** Yellow means "act here". It is used for calls to action and the contact panel, never for decoration, headings or illustration (the truck's yellow front indicators are the one exception and live inside the drawing).

**The Paint Only Rule.** Text and line work on asphalt are Road Paint or Worn Paint. No other hue writes on the road.

**The Red Is Rare Rule.** Reflector orange and kerb red appear only as road furniture (delineator dot, kerb stripe, brake light). Never as text, backgrounds or state colours.

## Typography

**Display Font:** Barlow Condensed (with Arial Narrow, sans-serif), weights 600 / 700 / 800
**Body Font:** Barlow (with system-ui, sans-serif), weights 400 / 500 / 600

**Character:** Barlow Condensed reads as highway signage and tall road stencil; Barlow is its plain, legible sibling for reading. Both are self-hosted woff2 (latin subset); the 800 display and 400 body files are preloaded.

### Hierarchy
- **Display** (800, uppercase, `clamp(3.6rem, 17.5vw, 8.5rem)`, line-height 0.84): only "SPN-Transporte" painted on the road in the hero; stacks into two lines below 64rem, one line above.
- **Motto** (800, uppercase, `clamp(2.2rem, 5.6vw, 4.75rem)`, 0.95, max 18ch): the philosophy quote. Legal page h1 uses the same voice at `clamp(2.75rem, 8vw, 4.5rem)`.
- **Headline** (700, `clamp(2.1rem, 4.6vw, 3.5rem)`, 1.0, balanced): section h2s beside the road. Sentence case.
- **Title** (700, `clamp(1.5rem, 2.6vw, 1.9rem)`, 1.1): h3s in the story and team blocks; legal h2s at 1.6rem.
- **Claim / Facts** (600 condensed, `clamp(1.45rem, 2.6vw, 2rem)` claim; `clamp(1.35rem, 2.4vw, 1.65rem)` fact rows): the brand claim and the arrow-led fact list.
- **Number** (700 condensed, tabular figures): the phone number in the hero callbox and contact lines (`clamp(1.6rem, 3vw, 2.25rem)` there).
- **Body** (400, `clamp(1.0625rem, 0.4vw + 0.95rem, 1.1875rem)`, 1.6): paragraphs, 48 to 62ch measure; the first story paragraph lifts to 500 and full paint.
- **Label** (600 Barlow, 0.875rem): small labels inside yellow controls and field labels (0.95rem).

### Named Rules
**The Stencil Is Uppercase Rule.** Uppercase is reserved for 800-weight painted lettering (hero, motto, legal h1). Headlines and everything else stay in sentence case.

**The Numbers Line Up Rule.** Phone numbers always use the condensed face with `font-variant-numeric: tabular-nums`.

## Layout

A single column of "stages" running beside a vertical road. The route container pads its left edge by gutter + road width + road offset, and the road sits absolutely in that margin at the gutter, full height of the route until the stop line. Stages are max 40rem by default; story, split and contact stages widen to 72rem and become two columns at 64rem (`minmax(0, 34-36rem) minmax(0, 1fr)`, column gap `clamp(3rem, 6vw, 6rem)`). Vertical rhythm per stage is `clamp(3.5rem, 10vh, 6.5rem)` top and bottom; contact gets more air on top (`clamp(4.5rem, 13vh, 8rem)`) so the stop line has room.

The hero is a two-row grid at `86svh` minus the header: copy anchored to the bottom of the first row, a full-bleed horizontal lane in the second, so the lane and truck are in view on load. At 64rem the lead and callbox sit side by side on one row under the claim.

Breakpoints observed: 40rem (header nav hides, the call pill stays; contact panel pulls left to sit under the road), 52rem (contact panel stacks), 64rem (two-column stages, single-line hero lettering). Side gutter is `clamp(1rem, 4vw, 3rem)` everywhere.

## Elevation & Depth

Depth is physical, not interface: things lie on the road and cast short, soft shadows straight down toward the viewer. Surfaces are otherwise flat; the asphalt layers (deep / base / lane) separate by tone and grain, not by shadow.

### Shadow Vocabulary
- **Vehicle** (`filter: drop-shadow(0 6px 6px rgb(0 0 0 / 0.45))`; on the rotated road truck `drop-shadow(-5px 0 5px ...)`): the trucks only.
- **Painted box** (`box-shadow: 0 6px 18px -8px rgb(0 0 0 / 0.6)`): the hero tap-to-call box.
- **Contact slab** (`box-shadow: 0 18px 40px -24px rgb(0 0 0 / 0.7)`): the yellow contact panel.
- **Post** (`box-shadow: 0 2px 3px rgb(0 0 0 / 0.5)`): the delineator head.

### Named Rules
**The Lies On The Road Rule.** Only objects that would physically sit on the road (vehicles, posts, the yellow boxes) get shadow. Paint never casts shadow.

## Shapes

Hard, painted geometry. Corners are 2px (`rounded.paint`) on every control, field and panel: a marking edge, never a pill. Lines are thick and solid: 5px lane edges and dashes in the hero, 4px on the vertical road, 3px on the shuttle road, a 0.75rem stop line. Dashes are `repeating-linear-gradient` strips (hero 4rem on / 5rem off; vertical road 2.5rem / 3rem; shuttle 1.5rem / 1.75rem). The arrow is one straight lane arrow symbol reused as hero road marking and, at 3rem by 1rem, as the bullet for fact rows. List bullets in the contact hint are short 0.75rem by 3px ink bars, i.e. dashes.

## Components

### Call Pill (header)
- **Character:** a small yellow marking that is always one tap away.
- **Shape:** 2px corners, `0.45rem 0.9rem` padding, inline phone glyph (inline SVG) + "Anrufen".
- **Hover / Focus:** background swaps to Road Paint over 150ms ease-out; focus is the global 3px yellow ring.
- **Mobile:** stays visible when the nav hides below 40rem.

### Hero Callbox
- **Character:** the yellow painted box in the first viewport carrying the number itself.
- **Shape / Color:** yellow, ink text, 2px corners, "Tour anfragen" label above the tabular number; e-mail sits beside it as plain paint text that turns yellow on hover.
- **States:** hover to paint; active nudges down 1px.

### Contact Panel
- **Character:** a big yellow slab at the end of the road, after the stop line.
- **Structure:** two columns (direct lines | form), divided by a 2px ink rule at 18% opacity; stacks below 52rem. Direct lines pair a small Barlow label with a large condensed value and underline (2px) on hover. Focus rings inside switch from yellow to ink.

### Inputs / Fields
- **Style:** Field Paper ground, 2px ink border at 55% opacity, 2px corners, `0.6rem 0.75rem` padding.
- **Hover / Focus:** border to full ink; focus adds a 3px ink outline offset 1px.
- **Error:** `aria-invalid` sets the error border; a bold 0.9rem message in Error Ink appears under the field.

### Submit Button
- **Style:** ink ground, paint text, condensed 700 at 1.3rem, 2px corners. Hover lightens to Ink Hover. Prepares a mailto; no data is sent.

### Navigation
- **Style:** sticky Deep Asphalt bar with a 1px Seam line. Wordmark in condensed 800 uppercase at 1.6rem; links in condensed 600 at 1.2rem, Worn Paint at rest, Road Paint on hover (150ms).

### Signature: The Road and the Truck
- **Hero lane:** full-bleed lane band with 5px paint edges, a centre dash line scrolling left continuously (0.9s linear loop), a straight-ahead arrow, and the truck sliding in from the left on load (1.8s, `cubic-bezier(0.16, 1, 0.3, 1)`, via self-hosted Motion).
- **Vertical road:** lane asphalt with 4px paint edges and a centre dash, ending in a white stop line placed just below the top of the Kontakt section (measured in JS). The truck is the same top-down symbol rotated 90°, follows the reading position (viewport centre) with a 0.09 lerp per frame, and lights its brake lights (`brake-lit`) when it reaches the stop line.
- **Shuttle A↔B:** a short lane between two condensed 800 letters, the truck pendling across it (7s, `cubic-bezier(0.45, 0, 0.55, 1)`, dwell at each end, flipping direction with `scaleX(-1)`). It runs only while 40% visible.
- **Leitpfosten:** a 0.7rem white square with an orange reflector dot, placed at the road edge at the top of each stage.
- **Kerb:** a vertical 0.65rem red/white stripe (2.75rem segments) laid at the road edge, running the height of the Über-uns section (inset 2.5rem top and bottom). Used once.
- **Truck symbol:** grey Planenauflieger with rib lines and dark-red tail lights, black coupling, Road Paint cab with roof panel, dark windscreen, black mirrors and yellow indicators; viewBox `0 -4 248 48`, driving direction right.

### Reduced Motion
Under `prefers-reduced-motion: reduce`: smooth scrolling is off, the hero dashes and shuttle are static (truck parked at A), the hero truck does not drive in (it rests at its lane position), and the road truck jumps straight to its scroll position with no easing, still stopping and braking at the stop line.

## Do's and Don'ts

### Do:
- **Do** lay every text and line on asphalt in Road Paint (`#eeece4`) or Worn Paint (`#bdbab0`) over the grain.
- **Do** make every action Baustellen-gelb (`#f3c300`) with Ink text and 2px corners, hovering to Road Paint.
- **Do** keep the phone number tap-to-call and visible without scroll on every screen (header pill on mobile, callbox in the hero).
- **Do** build new figures from the road vocabulary: lane bands with paint edges, dashed centre lines, the straight arrow, the top-down truck symbol, Leitpfosten, stop line.
- **Do** move vehicles at steady road speed and brake with `cubic-bezier(0.16, 1, 0.3, 1)`; pause looping motion when it is off screen and stop it under reduced motion.
- **Do** self-host every font and script.

### Don't:
- **Don't** use yellow for decoration, headings or illustration fills.
- **Don't** round controls beyond 2px or use pill shapes.
- **Don't** add bounce, spring or overshoot to any motion.
- **Don't** put shadows on paint; only objects on the road cast them.
- **Don't** use kerb red or reflector orange as text, background or state colour.
- **Don't** use photography of trucks or highways; the world is drawn top-down.
- **Don't** add invented figures, customer logos, testimonials or badges as visual proof.
