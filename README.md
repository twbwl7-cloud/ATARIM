# Halora

One-screen landing hero for the Halora wellness smart ring — calm sage editorial, frosted metric cards, and a soft looping product film.

Plain HTML, CSS, and vanilla JS. No framework, no build step.

## Run locally

```bash
python3 -m http.server 43127
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

## What’s on the page

- Artboard scale: every stage size is a 2048×1152 reference pixel × `--s`
- Product still + muted looping video of the same shot (crossfade loop, fade-in when ready)
- Header with Halora mark, nav, Cart, and Shop the Ring
- Left copy + CTA; right glass metric cards (Sleep / Calories / HRV)
- Entrance via the Web Animations API (cancelled after finish so authored styles remain)
- Responsive landscape grid, portrait stack, and burger menu under 820px
- `prefers-reduced-motion`: no entrance, no transitions, no video

## Files

- `index.html` — page, styles, and behaviour
- `halora-hero.png` — first frame of the product film (sage wall, hand, rose-gold ring)
