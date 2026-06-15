class Pixel {
  constructor() {
    this.color = null;
  }
}

class Grid {
  constructor() {
    this.pixels = [];
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

    console.log("Pixel Studio gestart!");
  }
}

const app = new App();