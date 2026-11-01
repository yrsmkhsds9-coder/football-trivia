---
name: "כדורגל טריוויה"
description: "A 1990s Israeli football broadcast, flattened onto a Hebrew phone quiz."
colors:
  navy: "#071428"
  cream: "#f4f0e6"
  cream-2: "#e7e0d2"
  ink: "#102033"
  amber: "#f5c518"
  good: "#0c5c34"
  bad: "#8e1e1a"
  on-good: "#f4f0e6"
  on-bad: "#f4f0e6"
  muted: "#d5dce8"
  muted-ink: "#3e4c5e"
  line: "rgba(244, 240, 230, 0.22)"
  line-ink: "rgba(16, 32, 51, 0.14)"
typography:
  display:
    fontFamily: "Secular One, Heebo, sans-serif"
    fontSize: "clamp(3.15rem, 15vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "0"
  headline:
    fontFamily: "Secular One, Heebo, sans-serif"
    fontSize: "clamp(2.5rem, 11vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0"
  result:
    fontFamily: "Secular One, Heebo, sans-serif"
    fontSize: "clamp(4.6rem, 24vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    fontFeature: "tabular-nums"
  title:
    fontFamily: "Heebo, Arial Hebrew, Arial, sans-serif"
    fontSize: "1.28rem"
    fontWeight: 800
    lineHeight: 1.35
  body:
    fontFamily: "Heebo, Arial Hebrew, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: "Heebo, Arial Hebrew, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.3
rounded:
  none: "0px"
spacing:
  pad: "18px"
components:
  button-primary:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "52px"
  button-primary-active:
    backgroundColor: "{colors.cream-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "52px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "52px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "52px"
  button-disabled:
    textColor: "#b7c2d1"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "52px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
    padding: "10px 8px"
    height: "48px"
  chip-active:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.navy}"
    rounded: "{rounded.none}"
    padding: "10px 8px"
    height: "48px"
  answer:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 14px"
    height: "52px"
  answer-active:
    backgroundColor: "{colors.cream-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 14px"
    height: "52px"
  answer-correct:
    backgroundColor: "{colors.good}"
    textColor: "{colors.on-good}"
    rounded: "{rounded.none}"
    padding: "10px 14px"
    height: "52px"
  answer-wrong:
    backgroundColor: "{colors.bad}"
    textColor: "{colors.on-bad}"
    rounded: "{rounded.none}"
    padding: "10px 14px"
    height: "52px"
  answer-dim:
    backgroundColor: "#e4dccb"
    textColor: "{colors.muted-ink}"
    rounded: "{rounded.none}"
    padding: "10px 14px"
    height: "52px"
  mode-row:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
    padding: "14px 2px"
    height: "76px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
    width: "44px"
    height: "44px"
  score-bug:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.navy}"
    rounded: "{rounded.none}"
    padding: "6px 10px"
    height: "44px"
    width: "76px"
  lower-third:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.navy}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "14px 16px 13px"
  feedback-good:
    backgroundColor: "{colors.good}"
    textColor: "{colors.on-good}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
  feedback-bad:
    backgroundColor: "{colors.bad}"
    textColor: "{colors.on-bad}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
  result-band:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.navy}"
    typography: "{typography.result}"
    rounded: "{rounded.none}"
    padding: "16px 18px 14px"
---

# Design System: כדורגל טריוויה

## Overview

**Creative North Star: "The Sunday Broadcast"**

כדורגל טריוויה is a ten-question Hebrew football quiz drawn as a 1990s Israeli sports broadcast on a single phone. Night Navy is the studio shell. Programme Cream is the card and the primary continue button. Broadcast Amber is the live signal: the selected era, the question lower-third, the corner score, the final score band, the points toast, and text selection.

The column is square, dense, and flat. Secular One carries the name and the scoreboard figures. Heebo carries every question, choice, and caption. Regions meet at a 1px seam. A resolved answer is a Pitch Green or Wrong Red slab with a drawn mark. The question plate has one job, and a long career scrolls inside it. Quit is an unmarked icon button, held apart from the amber score.

The world keeps the broadcast and drops the costume. There is no emoji, no television bezel, no sticker-album chrome, and no toto-coupon grid. Depth comes from the three stacked fields, not from shadows.

**Key Characteristics:**

- Night Navy shell, Programme Cream field, Broadcast Amber signal
- Secular One for the name and the figures; Heebo for play
- Square slabs and 1px seams, without drop shadows
- Hebrew, RTL, one phone column at most 480px
- A resolved answer is a drawn mark and a color together

## Colors

A night broadcast: one amber signal, a cream reading field, and two result colors that appear only after an answer.

### Primary

- **Broadcast Amber** (`#f5c518`): the live signal. It fills the selected era half, the question lower-third, the corner score bug, and the final score band. It colors the points toast and text selection (amber field, navy type). Confetti, on a streak of 3 or 5 and on a new record, uses this amber as one of four palette scraps, with Programme Cream, Pitch Green, and Standby Gray.

The primary continue button and the new-record line stay Programme Cream, so the end screen does not grow a second amber voice under the score band.

### Secondary

- **Pitch Green** (`#0c5c34`): the correct answer slab and the correct feedback bar. Type on it is Result Cream.

### Tertiary

- **Wrong Red** (`#8e1e1a`): the wrong answer slab and the wrong feedback bar. Type on it is Result Cream.

### Neutral

- **Night Navy** (`#071428`): the page shell, the type on every amber slab, the browser `theme-color`, and the outer ring of the focus style. `color-scheme` is dark on the shell.
- **Programme Cream** (`#f4f0e6`): the question field, the unchosen answer, body type on the shell, and the progress fill. The cream card and its scroller set `color-scheme` to light.
- **Pressed Cream** (`#e7e0d2`): the answer slab while it is held (`:active`).
- **Scoreboard Ink** (`#102033`): type on cream, and the pigment in the card seam.
- **Standby Gray** (`#d5dce8`): secondary type on the shell. The tagline, mode subtitle, footer, status row, and the caption under a figure.
- **Caption Ink** (`#3e4c5e`): secondary type on the cream field. League and era meta, career years, loan notes, and the unchosen (dimmed) answer's type.
- **Result Cream** (`#f4f0e6`): `--on-good` and `--on-bad`. Programme Cream, tokenized as the type color on Pitch Green and on Wrong Red.
- **Shell Seam** (`rgba(244, 240, 230, 0.22)`): the 1px line on navy. Era frame, mode rules, stat dividers, and the hairline on secondary and ghost buttons.
- **Card Seam** (`rgba(16, 32, 51, 0.14)`): the 1px line between career rows.

### Named Rules

**The Amber Signal Rule.** Broadcast Amber marks what is live: the selected era, the lower-third, the corner score, the final score band, the points toast, and text selection. The continue button, the new-record line, resting rows, unchosen answers, captions, and the progress fill stay cream or navy.

**The Result Pair Rule.** Pitch Green and Wrong Red appear only after an answer resolves, on that slab and on the feedback bar. They are never decoration, and they never appear on the shell.

## Typography

**Display Font:** Secular One (with Heebo, then sans-serif)

**Body Font:** Heebo (with Arial Hebrew, then Arial, then sans-serif)

Both faces are self-hosted in `app/fonts`, each split into a Hebrew file and a Latin file, with `font-display: swap`. Heebo is the variable weight axis 100–900. Secular One ships at weight 400 only, and every Secular One setting on the page stays at 400.

**Character:** Secular One is the scoreboard: wide, blunt, and used for the name and the figures. Heebo is the announcer's reading voice: a Hebrew grotesque that carries questions, choices, and captions. The pairing is a broadcast graphic over a plain quiz, not a poster face on every line.

### Hierarchy

- **Display** (400, `clamp(3.15rem, 15vw, 4.5rem)`, line-height 0.96, letter-spacing 0): the name כדורגל טריוויה on the home mast. It wraps on a deliberate line break, with `text-wrap: balance`. Nothing sits above it.
- **Headline** (400, `clamp(2.5rem, 11vw, 3.5rem)`, line-height 1.05): the end-of-round title, in Secular One, centered, balanced.
- **Result** (400, `clamp(4.6rem, 24vw, 6rem)`, line-height 0.9, tabular figures): the final score inside the amber band. The unit נקודות under it returns to Heebo at 0.95rem, weight 800.
- **Title** (800, 1.28rem, line-height 1.35): the question, in Heebo, inside the amber lower-third. Below 360px it drops to 1.15rem. A mode-row title is the same weight at 1.2rem.
- **Body** (500, 1rem, line-height 1.4): the inherited UI voice. The tagline is 1.02rem at line-height 1.45. Career rows are 1.02rem at weight 700. Subtitles are 0.92rem at weight 500.
- **Label** (700, 0.75rem, line-height 1.3): the caption under a figure (שיא, the three end-of-round labels). The caption sits under the numeral. Meta on the cream card is 0.82rem at weight 700. The footer is 0.86rem at weight 500.

Scoreboard figures in Secular One, all weight 400 and tabular: the corner bug at 1.35rem, the mode-row best at 1.45rem, the clock and the end-of-round stats at 1.7rem, the streak count at 1.2rem, the points toast at 1.25rem, and the new-record line at 1.85rem (words, so it is not tabular). Career years are Heebo, weight 600, 0.86rem, tabular, and isolated LTR (`direction: ltr; unicode-bidi: isolate`).

### Named Rules

**The Two Faces Rule.** Secular One is the broadcast face: the name, the end title, the final score, the corner bug, the clock, the streak count, personal bests, the end-of-round stats, the new-record line, and the points toast. Heebo sets every question, choice, mode row, button, caption, and feedback line.

**The Tabular Figure Rule.** Scores, the clock, the question count, career years, and personal bests use tabular figures, so a changing numeral holds its width. The corner bug also clips the numeral (`overflow: hidden`) so the step reads as a rolling digit.

## Layout

One phone column. `#app` is a flex column, at most 480px, centered, `100dvh`, with the shell overflow hidden. Horizontal inset is `--pad` (18px). The top inset is the safe area plus 16px. The bottom inset is the safe area plus 18px. Below 360px, `--pad` becomes 14px. The column is built for 390×844 and 375×667, including the safe areas. The page is `lang="he"` and `dir="rtl"`.

The home screen stacks the mast (28px above the name), the era control (32px under the tagline), the mode list (18px under the era control), and a footer pushed to the bottom with `margin-top: auto` and 28px of air above it. The tagline sits 12px under the name.

The play screen pins the top bar, the status row, the answers, and the actions. `#game` does not scroll. The question plate scrolls inside `.play-scroll` (8px under the status row). Answers stack 12px under the plate, with 8px between slabs. Actions sit 10px under the answers, with 8px between buttons. Feedback sits 10px above the actions. Career choices use two columns, trivia choices use one.

The end screen is centered. The title has 22px above it. The amber score band bleeds to the shell edges (`margin-inline: calc(var(--pad) * -1)`) with 20px above it. Three stats sit in a row 22px under the band, divided by a shell seam on the inline-start edge. The primary button is full width, 22px under the stats. The ghost button is full width, 10px under the primary.

The rhythm actually used, from tight to loose: 4px inside the era control, 8px between answers and between actions, 10px above the feedback and above the action row, 12px in the top bar and between an icon and a mode title, 14–16px inside a slab, 18px at the page edge, 22px on the end screen, 28px above the mast and the footer, 32px between the tagline and the era control.

A career longer than 7 clubs tightens each row to 5px and 0.92rem. Longer than 11, the row tightens again to 3px and 0.84rem. The plate scrolls; the answers stay put.

### Named Rules

**The Phone Column Rule.** The interface is one RTL column, at most 480px, full viewport height. On the play screen the score and the answers stay pinned, and the question plate is the only scroller.

## Elevation & Depth

Surfaces are flat. Night Navy, Programme Cream, and Broadcast Amber stack as three fields, and a 1px seam is the edge between regions. Nothing casts a drop shadow.

Secondary and ghost buttons draw their outline with `box-shadow: inset 0 0 0 1px` in the shell seam. A disabled button uses the same inset at `rgba(244, 240, 230, 0.18)`. That ring is a hairline, not lift. Focus is a 2px Programme Cream outline, offset 3px, with `box-shadow: 0 0 0 5px` Night Navy behind it, so the ring stays visible on both the shell and the cream field. The tap highlight is transparent.

The cream scroller shows an 8px thumb at `rgba(16, 32, 51, 0.35)`. Text selection, where it appears, is Broadcast Amber with Night Navy type. The body itself sets `user-select: none`.

### Named Rules

**The Flat Seam Rule.** Depth is the stack of navy, cream, and amber. A seam is a 1px line or a 1px inset ring. A drop shadow is out of the system. The focus ring is focus, not elevation.

## Shapes

Corners are square. `border-radius` is never set. Buttons, era chips, answers, the score bug, the lower-third, the feedback bar, the toast, the progress track, and the final score band are slabs. The score element's class name does not make it a pill.

Seams are 1px, solid, and full width: under each mode row (and above the first), between career clubs, and between end-of-round stats. The era control is a square frame with a 4px gap and a 4px inset, so the selected half reads as an amber slab inside a hairline box. Confetti is an 8×12 rectangle. The progress track is 4px tall with square ends.

### Named Rules

**The Square Slab Rule.** Radius stays 0. A control is a slab, a divider is a 1px seam, and a thick colored edge is not a substitute for either.

## Components

Shared focus: `:focus` clears the outline. `:focus-visible` draws a 2px Programme Cream outline, offset 3px, and a 5px Night Navy ring (`box-shadow: 0 0 0 5px`). The ring shows on controls that do not set their own shadow. Secondary, ghost, and disabled buttons use `box-shadow` for their hairline, and that declaration outranks the ring, so those keep the hairline plus the cream outline. Pressed navy surfaces wash with `rgba(244, 240, 230, 0.08)`. Hover exists only under `(hover: hover)`, and only on mode rows and unchosen answers.

### Buttons

Square slabs, at least 52px tall, Heebo 800 at 1.05rem, padding 12px 14px. They share a row with 8px between them and grow to fill it (`flex: 1`). On the end screen each button is its own full-width row.

- **Primary:** Programme Cream field, Scoreboard Ink type. The continue action after an answer, and שחק שוב on the result. Held state (`:active`) is Pressed Cream. There is no hover fill.
- **Secondary:** transparent, Programme Cream type, 1px shell-seam inset. The in-round pair, עוד קבוצה and הצג הכל. Held state is the cream wash. Disabled type is `#b7c2d1` with a fainter inset, `rgba(244, 240, 230, 0.18)`.
- **Ghost:** the same hairline as secondary. Used full width for למסך הראשי, 10px under the primary. Held state is the same cream wash.

### Chips

The era control is a two-column group inside a 1px shell seam, gap 4px, inset 4px. Each half is a square chip, at least 48px tall, padding 10px 8px, Heebo 700 at 0.98rem, Programme Cream on transparent. The selected half is Broadcast Amber with Night Navy type (`aria-pressed`). There is no hover fill.

### Cards / Containers

The question plate is one cream field (`color-scheme: light`) with one amber lower-third on top. The lower-third is padding 14px 16px 13px, Heebo 800 at 1.28rem, Night Navy type. A career plate puts the question and the point value on one baseline row, 12px apart. The point value is 0.92rem, weight 700, and its numeral is tabular.

Under the bar, meta (league, era, ישראלי or אירופה) is Caption Ink, 0.82rem, weight 700, padding 10px 16px 0, with 8px between items and 14px between wrapped rows. Career rows are a hairline list: a tabular index, the club, and an LTR year. A loan note is Caption Ink at weight 600. A hidden club is `#4a433c` for the name and the year. The last row has no rule.

Each new question's lower-third uncovers from the right edge toward the left, the reading start in RTL: from `inset(0 0 0 100%)` to `inset(0 0 0 0)`, 0.42s, `cubic-bezier(0.16, 1, 0.3, 1)`.

### Navigation

The play top bar is a row with 12px gaps. Quit is a 44×44 icon button, no fill, Programme Cream, with a 20px X at stroke 1.75 and round caps. The progress track flexes between quit and the score: 4px tall, track `rgba(244, 240, 230, 0.28)`, fill Programme Cream, width transition 0.35s on the same curve. The score bug is the amber slab at the far side, at least 44px tall and 76px wide, padding 6px 10px. Its numeral is Secular One 1.35rem, tabular; the unit נק׳ is Heebo 800 at 0.78rem. When points land, the numeral steps up from `translateY(70%)` over 0.38s, clipped by the bug.

The status row under the bar is at least 44px, Standby Gray, weight 700, tabular. It holds the question count, the streak (from 2 upward, count in Secular One at 1.2rem), and the clock in Secular One at 1.7rem. At 5 seconds and under, the clock turns `#ffd0cc`.

Home navigation is the mode list, not a bar. Each row is at least 76px, grid `28px / 1fr / auto`, gap 12px, padding 14px 2px, with a shell seam above the first and under every row. The icon is 22px, stroke 1.75, round caps and joins; the small circles on the career sparkline are filled. The title is Heebo 800 at 1.2rem. The subtitle is 0.92rem, weight 500, Standby Gray. The best is a Secular One numeral at 1.45rem over a 0.75rem caption, שיא. A held row washes at 0.08 cream; a hover, only on hover-capable pointers, washes at 0.06. A disabled mode (זהה את הסמל) is `#b7c2d1` and shows no best.

### Answers

Unchosen answers are Programme Cream slabs, Scoreboard Ink, Heebo 800 at 1.05rem, at least 52px, padding 10px 14px, type centered. Trivia stacks them in one column with 8px between. Career lays them in two columns, 0.98rem, at least 58px, padding 8px; below 360px that type is 0.9rem.

Held (`:active`) is Pressed Cream. Hover, only under `(hover: hover)`, is `#fffdf8`. After the pick, the correct slab is Pitch Green, the chosen miss is Wrong Red, and the rest dim to `#e4dccb` with Caption Ink type. Correct and wrong each mask in a 16px drawn mark, a check or a cross, in the current type color. Feedback is a separate slab, 12px 14px, Heebo 700 at 1rem: Pitch Green for נכון, Wrong Red for a miss or a timeout.

### Result, toast, confetti

The final score is the amber band at full column width, Secular One tabular at `clamp(4.6rem, 24vw, 6rem)`, with נקודות in Heebo 800 at 0.95rem under the figure. Three stats follow: Secular One tabular at 1.7rem, Programme Cream, caption under each in Standby Gray at 0.75rem, weight 700. A new record adds שיא חדש in Secular One at 1.85rem, Programme Cream, 8px under the stats.

The points toast is a fixed amber slab, Secular One at 1.25rem, Night Navy, padding 8px 12px, centered 66px below the safe area. It fades and travels 6px (opacity 0.2s linear, transform 0.28s on the broadcast curve) and clears after 1.1s.

Confetti is 22 rectangles, 8×12, in Broadcast Amber, Programme Cream, Pitch Green, and Standby Gray, falling linearly while rotating a half turn. It fires on streak 3, streak 5, and a new record.

### Named Rules

**The Mark As Well As Color Rule.** A correct answer draws a check and a wrong answer draws a cross, 16px, in the slab's own type color, beside the green or red fill. Feedback text repeats the result in a full-width slab of the same color. Color is never the only signal.

## Do's and Don'ts

### Do:

- **Do** set Hebrew RTL (`lang="he"`, `dir="rtl"`) and paint the shell Night Navy (`#071428`), including the browser `theme-color`.
- **Do** self-host Secular One and variable Heebo from `app/fonts`. Secular One is the name and the scoreboard figures. Heebo is every question, choice, row, and caption.
- **Do** keep every slab square and meet edges with a 1px seam: `rgba(244, 240, 230, 0.22)` on the shell, `rgba(16, 32, 51, 0.14)` on the cream field.
- **Do** give Broadcast Amber to the selected era, the lower-third, the score bug, the final score band, the points toast, and text selection. The continue button and שיא חדש stay Programme Cream.
- **Do** resolve an answer as Pitch Green or Wrong Red plus a drawn 16px check or cross.
- **Do** keep targets at least 44px tall: the icon button and the score bug at 44px, era chips at 48px, answers and text buttons at 52px.
- **Do** draw focus as a 2px cream outline, offset 3px, with `box-shadow: 0 0 0 5px` Night Navy.
- **Do** honor `prefers-reduced-motion: reduce` by turning off the lower-third wipe, the score step, the toast travel, confetti, and the progress width transition.

### Don't:

- **Don't** render emoji or the data `emoji` field. Draw icons as inline SVG with a 1.75 stroke and round caps.
- **Don't** add a drop shadow, a gradient, a rounded pill, or a television bezel around the column.
- **Don't** place a label above the name. The masthead is the name, and the tagline sits under it.
- **Don't** use amber on a resting mode row, an unchosen answer, a caption, or the progress fill. The progress fill is Programme Cream.
- **Don't** load Inter, a system display face, or a remote font. Arial Hebrew and Arial are fallbacks behind Heebo only.
- **Don't** state correct or wrong by color alone.
- **Don't** nest a second card inside the question plate. One amber lower-third sits on one cream field.
