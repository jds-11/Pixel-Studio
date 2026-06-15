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
// Week 4 - clear() methode toegevoegd
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

  // Week 4 - reset alle pixels
  clear() {
    for (let r = 0; r < this.rows; r++)
      for (let c = 0; c < this.cols; c++)
        this.pixels[r][c].color = null;
  }
}

// Week 3 - Tool basisclass
class Tool {
  constructor(type) {
    this.type  = type;
    this.color = "#000000";
  }

  use(grid, row, col) {
    // wordt overschreven door subclasses
  }
}

// Week 3 - PenTool
class PenTool extends Tool {
  constructor() {
    super("draw");
  }

  use(grid, row, col) {
    grid.pixels[row][col].color = this.color;
  }
}

// Week 4 - EraserTool
class EraserTool extends Tool {
  constructor() {
    super("erase");
  }

  use(grid, row, col) {
    grid.pixels[row][col].color = null;
  }
}

// Week 4 - FillTool met flood-fill
class FillTool extends Tool {
  constructor() {
    super("fill");
  }

  use(grid, row, col) {
    const targetColor = grid.pixels[row][col].color;
    if (targetColor === this.color) return;
    this._floodFill(grid, row, col, targetColor);
  }

  _floodFill(grid, row, col, targetColor) {
    if (row < 0 || row >= grid.rows) return;
    if (col < 0 || col >= grid.cols) return;
    if (grid.pixels[row][col].color !== targetColor) return;

    grid.pixels[row][col].color = this.color;

    this._floodFill(grid, row - 1, col, targetColor);
    this._floodFill(grid, row + 1, col, targetColor);
    this._floodFill(grid, row, col - 1, targetColor);
    this._floodFill(grid, row, col + 1, targetColor);
  }
}

// Week 1 + 2 + 3 + 4 - App class
class App {
  constructor() {
    this.canvas = document.getElementById("pixelCanvas");
    this.ctx    = this.canvas.getContext("2d");
    this.canvas.width  = 512;
    this.canvas.height = 512;

    this.grid = new Grid();

    // Week 4 - alle tools in een object
    this.tools = {
      draw:  new PenTool(),
      erase: new EraserTool(),
      fill:  new FillTool(),
    };
    this.currentTool = this.tools.draw;

    this._bindEvents();
    this.render();
  }

  _bindEvents() {
    // Week 4 - ColorPicker
    document.getElementById("colorPicker").addEventListener("input", (e) => {
      this.tools.draw.color = e.target.value;
      this.tools.fill.color = e.target.value;
    });

    // Week 4 - tool switching met active class
    document.querySelectorAll(".tool-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tool-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.setTool(btn.dataset.tool);
      });
    });

    // Week 4 - clear button
    document.getElementById("clearBtn").addEventListener("click", () => {
      this.clear();
    });

    // Week 3 - canvas events
    this.canvas.addEventListener("mousedown", (e) => { this.teken(e); });
    this.canvas.addEventListener("mousemove", (e) => {
      if (e.buttons === 1) this.teken(e);
    });
  }

  // Week 4 - wissel actief gereedschap
  setTool(type) {
    this.currentTool = this.tools[type];
  }

  // Week 4 - alles resetten
  clear() {
    this.grid.clear();
    this.render();
  }

  // Week 3 - teken methode
  teken(e) {
    const rect = this.canvas.getBoundingClientRect();
    const row  = Math.floor((e.clientY - rect.top)  / 16);
    const col  = Math.floor((e.clientX - rect.left) / 16);

    if (row < 0 || row >= this.grid.rows) return;
    if (col < 0 || col >= this.grid.cols) return;

    this.currentTool.use(this.grid, row, col);
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