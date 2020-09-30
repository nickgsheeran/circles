let a;

let cellX;
let cellY;
let unit;
let corners;
let letterWidth;
let letterHeight;

let cellXslider;
let cellXsliderLabel;

let cellYslider;
let cellYsliderLabel;

let unitSlider;
let unitSliderLabel;

let cornerSlider;
let cornerSliderLabel;

let globalMagSlider;
let globalMagSliderLabel;
let globalMag;

let leanXslider;
let leanXsliderLabel;
let leanX;
let leanXunits = [-3, -2, -1, 0, 1, 2, 3];

let leanYslider;
let leanYsliderLabel;
let leanY;
let leanYunits = [-2, -1, 0, 1, 2];

let angle = 0;
let anglePlus = 0;
let opac = 255;
let conOpac;

let global_xMag = 0;
let global_yMag = 0;

let saveButton;

//will want leading and tracking sliders eventually
//will want to return the values of sliders eventually

function setup() {
    createCanvas(windowWidth/2, windowHeight);
    
    strokeWeight(1); // do 0.1 for laser
    stroke(255, 0, 0); // red is good for laser
    noFill(); // better not to have a fill for laser
    
    background(230);
    
    cellXsliderLabel = createP('Cell X size:');
    cellXsliderLabel.position(width + 60, 0);
    cellXslider = createSlider(0, width/5, 50);
    cellXslider.position(width + 58, 35);
    cellXslider.style('width', 'calc(50% - 120px)');
    
    cellYsliderLabel = createP('Cell Y size:');
    cellYsliderLabel.position(width + 60, 80);
    cellYslider = createSlider(0, width/5, 50);
    cellYslider.position(width + 58, 35 + 80);
    cellYslider.style('width', 'calc(50% - 120px)');
    
    unitSliderLabel = createP('Unit size:');
    unitSliderLabel.position(width + 60, 80*2);
    unitSlider = createSlider(0, width/5, 50);
    unitSlider.position(width + 58, 35 + 80*2);
    unitSlider.style('width', 'calc(50% - 120px)');
    
    cornerSliderLabel = createP('Corner size:');
    cornerSliderLabel.position(width + 60, 80*3);
    cornerSlider = createSlider(0, width/10, 0);
    cornerSlider.position(width + 58, 35 + 80*3);
    cornerSlider.style('width', 'calc(50% - 120px)');
    
    globalMagSliderLabel = createP('Spin magnitude:');
    globalMagSliderLabel.position(width + 60, 80*4);
    globalMagSlider = createSlider(0, width/5, 50);
    globalMagSlider.position(width + 58, 35 + 80*4);
    globalMagSlider.style('width', 'calc(50% - 120px)');
    
    leanXsliderLabel = createP('Lean X:');
    leanXsliderLabel.position(width + 60, 80*5);
    leanXslider = createSlider(-100, 100, 0);
    leanXslider.position(width + 58, 35 + 80*5);
    leanXslider.style('width', 'calc(50% - 120px)');
    
    leanYsliderLabel = createP('Lean Y:');
    leanYsliderLabel.position(width + 60, 80*6);
    leanYslider = createSlider(-100, 100, 0);
    leanYslider.position(width + 58, 35 + 80*6);
    leanYslider.style('width', 'calc(50% - 120px)');
    
    let ins = createP('Press left/right and up/down to play with speed and opacity');
    ins.position(width + 60,  35 + 80*7);
    
    
//    saveButton = createButton('Save');
//    saveButton.position = (0, 0);
//    saveButton.mousePressed(saveCanvas);
        
    a = new LetterA();
    a.construct(100, 100, 0);
}

function draw() {
    conOpac = constrain(opac, 0, 255);
    
    if (keyIsDown(UP_ARROW)) {
        anglePlus += .01;
    } else if (keyIsDown(DOWN_ARROW)) {
        anglePlus -= .01;
    } else if (keyIsDown(LEFT_ARROW)) {
        opac --;
    } else if (keyIsDown(RIGHT_ARROW)) {
        opac ++;
    }
    
    globalMag = globalMagSlider.value();
    cellX = cellXslider.value();
    cellY = cellYslider.value();
    unit = unitSlider.value();
    corners = cornerSlider.value();
    leanX = leanXslider.value() / 100 * cellX;
    leanY = leanYslider.value() / 100 * cellY;    
    
    global_xMag = map(mouseX, 0, width, 0, globalMag);
    global_yMag = map(mouseY, 0, height, 0, globalMag);
    
    letterWidth = 5*cellX;
    letterHeight = 7*cellY;

    background(0, conOpac);
    fill(255);    
    noStroke();
    
    text("speed:", width/20, height/20);
    text(anglePlus, width/20 + 40, height/20);
    text("opacity:", width/20, height/15);
    text(conOpac, width/20 + 45, height/15);
    
    text("global mag:", width/20, height/10);
    text(globalMag, width/10 + 45, height/10);
    
    a.display(global_xMag, global_yMag, anglePlus);
    
//    noLoop();
}

//function saveCanvas() {
//    save("letter-A");
//}

class LetterA {
    construct(xoff, yoff, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.angle = angle;
    }
    
    display(xMag, yMag, speed) {
        this.xMag = xMag;
        this.yMag = yMag;
        this.speed = speed;
        
        this.angle += this.speed;
        this.x1 = this.xMag * cos(this.angle);
        this.y1 = this.yMag * sin(this.angle);
        
        push();
        translate(this.xoff + this.x1, this.yoff + this.y1);
            rect(0*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
        
            rect(1*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[3] * leanY, unit, unit, corners);
        
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(1*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[3] * leanY, unit, unit, corners);
        pop();
    }
}