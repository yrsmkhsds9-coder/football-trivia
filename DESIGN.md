---
name: "כדורגל טריוויה"
description: "A current match-night quiz: floodlight lime on night ink, Karantina for the score."
colors:
  ink: "#101114"
  paper: "#f4f2ec"
  paper-2: "#e6e1d4"
  type: "#14171c"
  lime: "#d6f25c"
  lime-2: "#c6e24a"
  good: "#0c5a32"
  bad: "#9e1e1e"
  on-result: "#f4f2ec"
  muted: "#c5cad3"
  muted-ink: "#3c4553"
  low: "#ffc7c2"
  disabled: "#a8b0bc"
  paper-3: "#fffdf8"
  locked: "#6a6258"
  line: "rgba(244, 242, 236, 0.16)"
  line-ink: "rgba(20, 23, 28, 0.12)"
typography:
  display:
    fontFamily: "Karantina, Rubik, sans-serif"
    fontSize: "clamp(4.6rem, 22vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.82
    letterSpacing: "0"
  result:
    fontFamily: "Karantina, Rubik, sans-serif"
    fontSize: "clamp(5.4rem, 28vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.8
    fontFeature: "tabular-nums"
  score:
    fontFamily: "Karantina, Rubik, sans-serif"
    fontSize: "2.35rem"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "tabular-nums"
  title:
    fontFamily: "Rubik, Arial Hebrew, Arial, sans-serif"
    fontSize: "1.38rem"
    fontWeight: 700
    lineHeight: 1.32
  body:
    fontFamily: "Rubik, Arial Hebrew, Arial, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 500
    lineHeight: 1.45
  label:
    fontFamily: "Rubik, Arial Hebrew, Arial, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 650
    lineHeight: 1.3
rounded:
  control: "14px"
  plate: "18px"
  pill: "999px"
spacing:
  pad: "20px"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
    height: "54px"
  button-primary-active:
    backgroundColor: "{colors.lime-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
    height: "54px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
    height: "54px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
    height: "54px"
  chip-selected:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "48px"
  answer:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.type}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
    height: "54px"
  answer-correct:
    backgroundColor: "{colors.good}"
    textColor: "{colors.on-result}"
    rounded: "{rounded.control}"
    height: "54px"
  answer-wrong:
    backgroundColor: "{colors.bad}"
    textColor: "{colors.on-result}"
    rounded: "{rounded.control}"
    height: "54px"
---

# Design System: כדורגל טריוויה

## Overview

**Creative North Star: "Floodlight"**

כדורגל טריוויה is a ten-question Hebrew quiz that should feel like a match-night app opened on the couch, not a vintage broadcast graphic. Night Ink is the room. Match Paper is the sheet you read. Floodlight Lime is the one live color: the second word of the name, the selected era, the score, the clock's partner, and the button that moves the round forward.

Karantina, a condensed Hebrew display face, carries the name and every figure that should feel like a scoreboard of today. Rubik carries questions, choices, and captions, so the reading stays calm while the numbers shout. Controls are rounded the way a current phone app is rounded. The question sheet is the only surface with a shadow, and that shadow has a downward offset.

There is no emoji, no amber strap, and no television frame.

**Key Characteristics:**

- Night Ink shell, Match Paper sheet, Floodlight Lime signal
- Karantina for the name and the figures; Rubik for play
- One soft shadow, on the question sheet only
- Hebrew, RTL, one phone column at most 480px
- A resolved answer is a drawn mark and a color together

## Colors

A night screen with one acid signal and two result colors that appear only after an answer.

### Primary

- **Floodlight Lime** (`#d6f25c`): the live signal. It colors the second line of the name, the selected era, the corner score, the timer's sibling streak count, the progress fill, the points toast, the final score, שיא חדש, and the primary button. Pressed lime is `#c6e24a`. Text on lime is Night Ink.

### Secondary

- **Pitch Green** (`#0c5a32`): the correct answer and the correct feedback. Type on it is Match Paper.

### Tertiary

- **Wrong Red** (`#9e1e1e`): the wrong answer and the wrong feedback. Type on it is Match Paper. The clock under five seconds turns `#ffc7c2`.

### Neutral

- **Night Ink** (`#101114`): the shell and the browser `theme-color`.
- **Type** (`#14171c`): text on Match Paper.
- **Match Paper** (`#f4f2ec`): the question sheet, unchosen answers, and type on the dark shell.
- **Pressed Paper** (`#e6e1d4`): a held answer, and dimmed choices.
- **Standby** (`#c5cad3`): secondary text on Night Ink.
- **Caption** (`#3c4553`): secondary text on Match Paper. Hidden career rows use `#6a6258`. Hover on an unchosen answer is `#fffdf8`.
- **Disabled** (`#a8b0bc`): a mode that is not open yet.

**The Lime Signal Rule.** Lime marks what is live or what moves the round forward. It does not fill the question sheet, an unchosen answer, or a caption.

## Typography

**Display Font:** Karantina (with Rubik)
**Body Font:** Rubik (with Arial Hebrew, Arial)

**Character:** Karantina is a tall, condensed Hebrew display face, used only where a number or a name should feel like a modern scoreline. Rubik is the readable geometric Hebrew for everything a person has to parse quickly.

### Hierarchy

- **Display** (700, `clamp(4.6rem, 22vw, 6rem)`, line-height 0.82): the home name. The second line, טריוויה, is lime.
- **Result** (700, `clamp(5.4rem, 28vw, 6rem)`, line-height 0.8, tabular): the final score, in lime.
- **Score** (700, 2.35rem, line-height 1, tabular): the corner score, the clock at 2.4rem, personal bests, and end-of-round stats.
- **Title** (700, 1.38rem, line-height 1.32): the question, in Rubik, on the paper sheet. Mode titles are 1.28rem.
- **Body** (500, 1.05rem, line-height 1.45): answers, buttons, and the home tagline.
- **Label** (650, 0.8rem): league, era, and the point value beside a career question.

**The Two Faces Rule.** Karantina never sets a question or an answer. Rubik never sets the home name or the final score.

## Layout

One column, at most 480px, padded 20px, inside `100dvh`, with safe-area insets. Hebrew is RTL.

Home stacks the name, the tagline, a pill era control, then a hairline list of modes. The footer sits at the bottom of the column.

In a round, the top bar (quit, progress, score) and the status row stay fixed. The question sheet scrolls when a career is long. Answers and the next action stay below it, in the thumb zone. On a short phone the sheet shrinks and scrolls inside itself rather than pushing the header off screen.

The end screen is centered. The title, the lime score, three stats, and the two actions stack with more space above the title than between the score and its unit.

## Elevation & Depth

Flat night, one lifted sheet. The question plate carries `box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.55)`. Nothing else casts a shadow. Focus is a 2px lime outline, offset 3px, not a glow.

**The One Shadow Rule.** If a second surface wants a shadow, it does not get one. Depth is the paper sheet sitting on the night ground.

## Shapes

The question sheet is an 18px rounded rectangle. Answers, feedback, and text buttons are 14px. The era control and its selected half are pills. The progress track is a 3px pill. Seams on the home list and between career rows are 1px.

## Components

### Buttons

Rubik 700, at least 54px, padding 12px 14px, radius 14px.

- **Primary:** Floodlight Lime, Night Ink type. הבא and שחק שוב. Held state is `#c6e24a`.
- **Secondary:** transparent, Match Paper type, 1px inset seam. עוד קבוצה and הצג הכל.
- **Ghost:** the same seam, full width, for למסך הראשי.

### Chips

The era control is a two-column pill on a faint paper wash. Each half is at least 48px. The selected half is lime with Night Ink type.

### Question sheet

Match Paper, 18px radius, the one shadow. The question is Rubik, not a colored bar. Career rows are a hairline list: index, club, LTR years. A hidden row is muted type, not a stripe. The sheet settles 12px upward when it appears. Reduced motion removes that move.

### Score and clock

The corner score is Karantina in lime, with נק׳ in Rubik beside it. When points land, the numeral steps up inside a clip. The clock is Karantina in Match Paper, and turns `#ffc7c2` at five seconds. The points toast is a small lime slab in Karantina, centered under the top bar, and clears after 1.1s.

### Answers

Unchosen answers are Match Paper slabs. After the pick, correct is Pitch Green, the miss is Wrong Red, and the rest dim to Pressed Paper. Correct and wrong each draw a 16px check or cross. Feedback is a separate slab in the same color and names the result.

### Result

The final score is Karantina in lime, with no backing band. Three stats sit under it in Karantina, divided by a 1px seam. שיא חדש is the same face in lime.

## Do's and Don'ts

### Do:

- **Do** set Hebrew RTL and paint the shell Night Ink, including `theme-color`.
- **Do** self-host Karantina and variable Rubik from `app/fonts`.
- **Do** keep lime for the live signal and the forward button only.
- **Do** resolve an answer with Pitch Green or Wrong Red plus a drawn mark.
- **Do** keep targets at least 44px: quit and the score row at 44px, era chips at 48px, answers and buttons at 54px.
- **Do** honor `prefers-reduced-motion` by dropping the sheet settle, the score step, the toast travel, confetti, and the progress transition.

### Don't:

- **Don't** render emoji, or the `emoji` field in `data.js`.
- **Don't** bring back the amber lower-third, the square broadcast slabs, or a television frame.
- **Don't** put a label above the name. The second line of the name is the color, not a kicker.
- **Don't** nest a card inside the question sheet.
- **Don't** load a remote font. Arial Hebrew and Arial are fallbacks behind Rubik only.
- **Don't** state correct or wrong by color alone.
