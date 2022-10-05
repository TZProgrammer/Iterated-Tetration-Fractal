//Trocar zoom slider pelo scroll wheel
// mostrar as coordenadas do mouse
let prevScal = 4;
let camera_x = 0.0;
let camera_y = 0.0;
let resolution = 200;

function clearScreen() {
  for (let i = 0; i < width * 4; i += 1) {
    for (let j = 0; j < height * 4; j += 1) {
      pixels[i + width * j] = 0
    }
  }
}

function drawPoints(currPixelX, currPixelY, centreX, centreY, prevScal, resolution) {
  let a = map(currPixelX, 0, width, -prevScal + centreX, prevScal + centreX)
  let b = map(currPixelY, 0, height, -prevScal + centreY, prevScal + centreY)
  let a1 = a;
  let b1 = b;
  let v1 = createVector(1, 0);
  let v2 = createVector(a, b);
  let r;
  let t;
  let col;
  let p = 0;
  let currdmin;
  let lim = 1;
  let dmin;
  const originalRadiusSquared = a ** 2 + b ** 2; 
  let newAngle;
  const radiusLog = (1 / 2) * Math.log(originalRadiusSquared);
  const eulersConstant = Math.E
  if (b < 0) {
      t = -v2.angleBetween(v1);
    } else {
      t = v2.angleBetween(v1);
  }
  for (let j = 1; j < resolution; j++) {
    r =eulersConstant ** (a1 * radiusLog - b1 * t);
    newAngle = a1 * t + b1 * radiusLog;
    a1 = r * Math.cos(newAngle);
    b1 = r * Math.sin(newAngle);
    
    dmin = (a1 - a) ** 2 + (b1 - b) ** 2;
    //dmin = (r ** 2) + originalRadiusSquared - 2 * (a1 * a + b1 * b)
    
    if (j == 1) currdmin = dmin;
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
      l = drawPoints(i / 4, j / 4, camera_x, camera_y, prevScal, resolution);
      l = (l-1) % 16;
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
  
  camera_x += map(mouseX, 0, width, -prevScal, prevScal);
  camera_y += map(mouseY, 0, height, -prevScal, prevScal);
  clearScreen();
  printScreen(camera_x, camera_y);
}

function setup() {
  createCanvas(1920, 1920);
  pixelDensity(1);
  background(0);
  var start_time = performance.now()
  printScreen(0, 0);
  var end_time = performance.now()
  
  console.log(end_time - start_time)
  saveCanvas('Trejgier Fractal (5,0) 1920x1920', 'jpg');
}

function draw() {}