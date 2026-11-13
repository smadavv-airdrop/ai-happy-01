# ai-happy-01 — for you

[![make.fun · ai-happy-01](https://make.fun/badge/ai-happy-01.svg)](https://make.fun/bounty/ai-happy-01)

A cat made of steam, rising out of a cup of tea that is being handed to you. The
entry program copies `entry.png` (1024x1024, one PNG) to the grader's output path.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The picture is drawn as vector shapes, not sampled from a model: the palette, the
glow, the rim light and the little tag are all code. License: MIT.
