class Pixel {
  constructor() {
    this.color = null;
  }
}

class Grid {
  constructor() {
    this.pixels = [];
    for (let r = 0; r < 32; r++) {
      this.pixels[r] = [];
      for (let c = 0; c < 32; c++) {
        this.pixels[r][c] = new Pixel();
      }
    }
  }
}

class Tool {
  constructor() {
    this.type  = "draw";
    this.color = "#000000";
  }
}

class App {
  constructor() {
    this.canvas = document.getElementById("pixelCanvas");
    this.ctx    = this.canvas.getContext("2d");
    this.canvas.width  = 512;
    this.canvas.height = 512;

    this.grid = new Grid();
    this.tool = new Tool();

    document.getElementById("colorPicker").addEventListener("input", (e) => {
      this.tool.color = e.target.value;
    });

    this.canvas.addEventListener("mousedown", (e) => { this.teken(e); });
    this.canvas.addEventListener("mousemove", (e) => { if (e.buttons === 1) this.teken(e); });
  }

  setTool(type) { this.tool.type = type; }

  clear() {
    for (let r = 0; r < 32; r++)
      for (let c = 0; c < 32; c++)
        this.grid.pixels[r][c].color = null;
    this.render();
  }

  teken(e) {
    const rect = this.canvas.getBoundingClientRect();
    const row  = Math.floor((e.clientY - rect.top)  / 16);
    const col  = Math.floor((e.clientX - rect.left) / 16);

    this.grid.pixels[row][col].color = this.tool.type === "draw" ? this.tool.color : null;
    this.render();
  }

  render() {
    this.ctx.fillStyle = "#111";
    this.ctx.fillRect(0, 0, 512, 512);

    for (let r = 0; r < 32; r++) {
      for (let c = 0; c < 32; c++) {
        if (this.grid.pixels[r][c].color) {
          this.ctx.fillStyle = this.grid.pixels[r][c].color;
          this.ctx.fillRect(c * 16, r * 16, 16, 16);
        }
      }
    }
  }
}

const app = new App();