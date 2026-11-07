# Game of Life

**[Run it in your browser](https://bradleylyon.github.io/Game-of-Life/)**

Conway's Game of Life on a clickable grid, built in 2024 with JavaScript and [p5.js](https://p5js.org/). It was the
start of a puzzle game: draw a starting pattern and try to grow life into the goal zone in the bottom-right corner.

## Controls

- The simulation starts running. Press **Enter** to pause or resume it.
- While paused, **click** a square to bring it to life or clear it. On level 1 you can only draw in the top half of the
  board.
- While paused, **Up / Down** change the level (1 to 10).

## How it works

- `final3/cell.js`: each `Cell` counts its live neighbours and applies the standard rules. A live cell with 2 or 3
  neighbours survives and a dead cell with exactly 3 comes alive. Changes are collected first and applied together, so
  every cell in a generation sees the same board.
- Only cells next to a live cell are re-checked each generation (the `schedule` array), so empty parts of the board
  cost nothing.
- `final3/sketch.js`: the p5.js setup and draw loop, input handling, levels and the goal zone.

## Run it locally

Open `final3/index.html` in a browser. p5.js loads from a CDN, so there is nothing to install.
