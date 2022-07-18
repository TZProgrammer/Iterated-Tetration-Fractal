//Trocar zoom slider pelo scroll wheel
// mostrar as coordenadas do mouse
let prevScal = 0.1;
let prevShiftsX = [];
let prevShiftsY = [];
let resolution = 50;

function drawPoints(mouse1, mouse2, centreX, centreY, prevScal, resolution) {
  let a = (prevScal * (mouse1 - width / 2)) / (width / 2) + centreX;
  let b = (-prevScal * (mouse2 - height / 2)) / (height / 2) + centreY;
  let a1 = a;
  let b1 = b;
  let a2 = a;
  let b2 = b;
  let v1 = createVector(1, 0);
  let v2 = createVector(a, b);
  let r;
  let t;
  let col;
  let p = 0;
  let currdmin = 10;
  let lim;
  let dmin;
  let radiusLog;
  for (let j = 0; j < resolution; j++) {
    if (b < 0) {
      t = -v2.angleBetween(v1);
    } else {
      t = v2.angleBetween(v1);
    }
    radiusLog = (1 / 2) * Math.log(a ** 2 + b ** 2);
    r = Math.E ** (a1 * radiusLog - b1 * t);
    a2 = r * Math.cos(a1 * t + b1 * radiusLog);
    b2 = r * Math.sin(a1 * t + b1 * radiusLog);
    a1 = a2;
    b1 = b2;
    dmin = (a1 - a) ** 2 + (b1 - b) ** 2;
    if (dmin < currdmin) {
      currdmin = dmin;
      lim = j;
    }
  }
  return lim;
}

function printScreen(xShift = 0, yShift = 0) {
  let l;
  //values: 0.1,0.15, 1, 5
  loadPixels();
  for (let i = 0; i < width * 4; i += 4) {
    for (let j = 0; j < height * 4; j += 4) {
      l = drawPoints(i / 4, j / 4, xShift, yShift, prevScal, resolution);
      l = l % 16;
      if (l == 0) {
        pixels[i + j * width] = 250;
        pixels[i + j * width + 1] = 0;
        pixels[i + j * width + 2] = 0;
        pixels[i + j * width + 3] = 255;
      } else if (l == 1) {
        pixels[i + j * width] = 0;
        pixels[i + j * width + 1] = 250;
        pixels[i + j * width + 2] = 0;
        pixels[i + j * width + 3] = 255;
      } else if (l == 2) {
        pixels[i + j * width] = 0;
        pixels[i + j * width + 1] = 0;
        pixels[i + j * width + 2] = 250;
        pixels[i + j * width + 3] = 255;
      } else if (l == 3) {
        pixels[i + j * width] = 200;
        pixels[i + j * width + 1] = 250;
        pixels[i + j * width + 2] = 0;
        pixels[i + j * width + 3] = 255;
      } else if (l == 4) {
        pixels[i + j * width] = 200;
        pixels[i + j * width + 1] = 0;
        pixels[i + j * width + 2] = 250;
        pixels[i + j * width + 3] = 255;
      } else if (l == 5) {
        pixels[i + j * width] = 0;
        pixels[i + j * width + 1] = 250;
        pixels[i + j * width + 2] = 250;
        pixels[i + j * width + 3] = 255;
      } else if (l == 6) {
        pixels[i + j * width] = 100;
        pixels[i + j * width + 1] = 200;
        pixels[i + j * width + 2] = 50;
        pixels[i + j * width + 3] = 255;
      } else if (l == 7) {
        pixels[i + j * width] = 200;
        pixels[i + j * width + 1] = 50;
        pixels[i + j * width + 2] = 100;
        pixels[i + j * width + 3] = 255;
      } else if (l == 8) {
        pixels[i + j * width] = 100;
        pixels[i + j * width + 1] = 200;
        pixels[i + j * width + 2] = 50;
        pixels[i + j * width + 3] = 255;
      } else if (l == 9) {
        pixels[i + j * width] = 50;
        pixels[i + j * width + 1] = 50;
        pixels[i + j * width + 2] = 150;
        pixels[i + j * width + 3] = 255;
      } else if (l == 10) {
        pixels[i + j * width] = 200;
        pixels[i + j * width + 1] = 20;
        pixels[i + j * width + 2] = 80;
        pixels[i + j * width + 3] = 255;
      } else if (l == 11) {
        pixels[i + j * width] = 100;
        pixels[i + j * width + 1] = 50;
        pixels[i + j * width + 2] = 150;
        pixels[i + j * width + 3] = 255;
      } else if (l == 12) {
        pixels[i + j * width] = 50;
        pixels[i + j * width + 1] = 50;
        pixels[i + j * width + 2] = 100;
        pixels[i + j * width + 3] = 255;
      } else if (l == 13) {
        pixels[i + j * width] = 200;
        pixels[i + j * width + 1] = 200;
        pixels[i + j * width + 2] = 150;
        pixels[i + j * width + 3] = 255;
      } else if (l == 14) {
        pixels[i + j * width] = 20;
        pixels[i + j * width + 1] = 180;
        pixels[i + j * width + 2] = 130;
        pixels[i + j * width + 3] = 255;
      } else if (l == 15) {
        pixels[i + j * width] = 200;
        pixels[i + j * width + 1] = 200;
        pixels[i + j * width + 2] = 200;
        pixels[i + j * width + 3] = 255;
      }
    }
  }
  updatePixels();
}

function mousePressed() {
  prevShiftsX.push(mouseX);
  prevShiftsY.push(mouseY);
  let xShift = 0;
  let yShift = 0;
  for (let i = 0; i < prevShiftsX.length; i++) {
    yShift -= (prevScal * (prevShiftsY[i] - height / 2)) / (height / 2);
    xShift += (prevScal * (prevShiftsX[i] - width / 2)) / (width / 2);
  }
  printScreen(xShift, yShift);
}

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  background(0);
  printScreen(0, 0);
  // saveCanvas('Trejgier Fractal 0.1 around origin 1920x1920 full color', 'jpg');
}

function draw() {}
