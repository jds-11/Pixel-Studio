// Week 1 - Pixel class
class Pixel {
  constructor(row, col) {
    this.color = null;
    this.row   = row;
    this.col   = col;
    this.size  = 16;
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

// Week 1 - Tool basisclass
// Week 3 - uitgebreid met use() methode
class Tool {
  constructor(type) {
    this.type  = type;
    this.color = "#000000";
  }

  use(grid, row, col) {
    // wordt overschreven door subclasses
  }
}

// Week 3 - PenTool subclass
class PenTool extends Tool {
  constructor() {
    super("draw");
  }

  use(grid, row, col) {
    grid.pixels[row][col].color = this.color;
  }
}

// Week 1 + 2 + 3 - App class
class App {
  constructor() {
    this.canvas = document.getElementById("pixelCanvas");
    this.ctx    = this.canvas.getContext("2d");
    this.canvas.width  = 512;
    this.canvas.height = 512;

    this.grid = new Grid();
    this.tool = new PenTool(); // week 3

    // Week 3 - canvas events
    this.canvas.addEventListener("mousedown", (e) => { this.teken(e); });
    this.canvas.addEventListener("mousemove", (e) => {
      if (e.buttons === 1) this.teken(e);
    });

    this.render();
  }

  // Week 3 - berekent welke pixel is aangeklikt
  teken(e) {
    const rect = this.canvas.getBoundingClientRect();
    const row  = Math.floor((e.clientY - rect.top)  / 16);
    const col  = Math.floor((e.clientX - rect.left) / 16);

    if (row < 0 || row >= this.grid.rows) return;
    if (col < 0 || col >= this.grid.cols) return;

    this.tool.use(this.grid, row, col);
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