# Product

<!-- impeccable:product-schema 1 -->

Facts below are taken from the repository and the owner's redesign brief. No live interview ran: this session has no structured question tool, and the decision page is reserved for the visual-world roll after this file exists. Each inferred item is marked.

## Platform

web

## Users

A group of Israeli friends, nostalgic for 1990s and early-2000s football: the Israeli league, the Premier League, Serie A, La Liga, and national teams. Inferred: they play on one shared iPhone, often in the same room, passing the phone or shouting answers while one person taps.

## Product Purpose

A short Hebrew trivia game about that era of football. A round is ten questions. Success is a finished round with a clear score, a personal best stored on the device, and a reason to play again immediately.

## Positioning

The questions and careers are specific to players and seasons this group actually argued about (Israeli league sides alongside European clubs of the same years). A generic world-football quiz could not swap in this set and still be the same game.

## Operating Context

Mobile web, opened in iPhone Safari or installed to the home screen. One player, one device. Two playable modes today: guess the player from a career path, and multiple-choice trivia. A third mode, identify the crest, is present and disabled ("בקרוב"). Personal bests and the era filter persist in localStorage. Inferred setting: couch or pre-match, one thumb, intermittent attention, Hebrew conversation around the phone.

## Capabilities and Constraints

- Static files in `app/`: `index.html`, `styles.css`, `app.js`, `data.js`. No framework.
- Game logic, scoring, timers, streaks, round length, era filter, and flows stay as they are.
- `data.js` content is not edited. Mode titles, subtitles, and the unused `emoji` field stay in data; the interface must not render emoji.
- Rounds: 10 questions. Career timer 30s, trivia timer 20s. Career score falls as more clubs are revealed. Streak multipliers at 3 and 5. Personal best per mode.
- Era filter: all periods, or 90s and early 2000s only.
- Hebrew, RTL, `lang="he"`.
- Viewports that must work: 390×844 and 375×667, including safe-area insets.
- No new modes, no multiplayer, no accounts, no network scoring.

## Brand Commitments

- Name: כדורגל טריוויה.
- Voice already in the UI: direct, friendly Hebrew. Do not rewrite factual copy, question text, or player data.
- Binding visual constraints from the owner: remove every emoji from the interface; use typography and simple inline SVG only where an icon is genuinely needed; a distinctive nostalgic point of view for 90s and early-2000s football (matchday programme, sticker album, and retro scoreboard were offered as examples, not as a locked single artifact); clean, modern, and highly usable; not a generic generated look (no purple gradients, not Inter everywhere, no nested cards).
- Hebrew-supporting webfont. RTL correct.

## Evidence on Hand

- Playable content in `app/data.js` (players, careers, trivia questions, league labels, modes). Careers range from a few clubs to long lists that must fit a short phone.
- App icons: `app/icon-180.png`, `app/icon-192.png`, `app/icon-512.png`.
- Crest mode has no crest assets yet and stays disabled.
- Do not invent scores, players, or questions.

## Product Principles

- The round is the product: question, answer, score, next.
- Specific memory beats generic sports decoration.
- One thumb, Hebrew, RTL, obvious correct and wrong.
- The owner's data and rules are untouched.
- Feedback is immediate: right, wrong, or time's up, then the way forward.

## Accessibility & Inclusion

iPhone Safari. Tap targets large enough for a thumb (at least 44px). Text contrast suitable for WCAG AA. Safe-area insets. Reduced-motion alternative for non-essential animation. Screen-reader names on icon-only controls. RTL throughout.
