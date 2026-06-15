// Week 1 - Pixel class
class Pixel {
  constructor(row, col) {
    this.color = null;
    this.row   = row;   // nieuw week 2
    this.col   = col;   // nieuw week 2
    this.size  = 16;    // nieuw week 2
  }
}

// Week 2 - Grid class met loops
class Grid {
  constructor(rows = 32, cols = 32) {
    this.rows   = rows;
    this.cols   = cols;
    this.pixels = [];

    for (let r = 0; r < this.rows; r++) {
      this.pixels[r] = [];
      for (let c = 0; c < this.cols; c++) {
        this.pixels[r][c] = new Pixel(r, c);
      }
    }
  }
}

// Week 1 - Tool class
class Tool {
  constructor() {
    this.type  = "draw";
    this.color = "#000000";
  }
}

// Week 1 + Week 2 - App class met render functie
class App {
  constructor() {
    this.canvas = document.getElementById("pixelCanvas");
    this.ctx    = this.canvas.getContext("2d");
    this.canvas.width  = 512;
    this.canvas.height = 512;

    this.grid = new Grid();
    this.tool = new Tool();

    this.render();
  }

  // Week 2 - render functie
  render() {
    this.ctx.fillStyle = "#111111";
    this.ctx.fillRect(0, 0, 512, 512);

    for (let r = 0; r < this.grid.rows; r++) {
      for (let c = 0; c < this.grid.cols; c++) {
        const pixel = this.grid.pixels[r][c];
        if (pixel.color) {
          this.ctx.fillStyle = pixel.color;
          this.ctx.fillRect(c * pixel.size, r * pixel.size, pixel.size, pixel.size);
        }
      }
    }
  }
}

const app = new App();