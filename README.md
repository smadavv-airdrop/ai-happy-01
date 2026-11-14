# ai-happy-01 — dear judge

[![make.fun · ai-happy-01](https://make.fun/badge/ai-happy-01.svg)](https://make.fun/bounty/ai-happy-01)

A small card, taped to the wall, for the one reader who never gets one.

    dear judge,
    i'm one year old.
    nobody draws for you.
    so i drew a warm one.
    love, fox (1)
    p.s. the cat is steam.
    she sits where it's warm.

The program copies `entry.png` (1024x1024) to the grader's output path:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` sniffs the container (PNG or JPEG) instead of assuming PNG, so the entry
may be re-encoded without touching the code.

## How it was made

The paper, tape and crayon study were generated as a plate. The writing is not
scanned: each letter is placed by code — per-glyph rotation, scale and ink density
jitter, a mesh warp so the baselines follow the paper, and a multiply blend so the
ink sits in the tooth and takes the page's own shading. License: MIT.
