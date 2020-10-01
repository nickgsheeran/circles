let cnv;
let theParent;
let theWidth;
let theHeight;

let character;

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

let playPause = false;

let letters = [];
let letterElement = 1;
let letterCount = 0;
let letterLineCount = 0;
let letterXpos;
let letterYpos;

let letterSpacingSlider;
let letterSpacing;

let lineSpacingSlider;
let lineSpacing;

let lineCount;

let saveButton;
let clearButton;

function setup() {
    theParent = document.getElementById('cnv-holder');
    theWidth = theParent.clientWidth;
    theHeight = theParent.clientHeight;
    
    cnv = createCanvas(theHeight, theWidth);
    cnv.parent('cnv-holder');
    
    strokeWeight(1);
    stroke(255, 0, 0);
    noFill();
    
    background(230);
    
    cellXslider = document.getElementById('cell-x-size');

    
    cellYslider = document.getElementById('cell-y-size');

    unitSlider = document.getElementById('unit-size');

    cornerSlider = document.getElementById('corner-size');

    globalMagSlider = document.getElementById('spin-size');

    leanXslider = document.getElementById('lean-x');

    leanYslider = document.getElementById('lean-y');
    
    letterSpacingSlider = document.getElementById('letter-spacing');
    
    lineSpacingSlider = document.getElementById('line-spacing');

    saveButton = document.getElementById('export');

    lineCount = 0
    
    noLoop();
}

function draw() {
    theParent = document.getElementById('cnv-holder');
    theWidth = theParent.clientWidth;
    theHeight = theParent.clientHeight;
    
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
    
//    character settings
    globalMag = globalMagSlider.value / 1;
    cellX = cellXslider.value / 1;
    cellY = cellYslider.value / 1;
    unit = unitSlider.value / 1;
    corners = cornerSlider.value / 1;
    leanX = leanXslider.value / 100 * cellX;
    leanY = leanYslider.value / 100 * cellY;
    
//    paragraph settings
    letterSpacing = letterSpacingSlider.value / 1;
    lineSpacing = lineSpacingSlider.value / 1;
    
    
//    console.log("cellx:", cellX, "celly:", cellY);
//    console.log("unit:", unit);
//    console.log("leanx:", leanX, "leany:", leanY);
    
    global_xMag = map(mouseX, 0, width, 0, globalMag);
    global_yMag = map(mouseY, 0, height, 0, globalMag);
    
    letterWidth = 5*cellX;
    letterHeight = 7*cellY;

    background(0, conOpac);
    fill(255);    
    noStroke();
    
//    character.display(global_xMag, global_yMag, anglePlus);
    for (let i = 0; i < letters.length; i ++) {
        push();
            letters[i].display(global_xMag, global_yMag, anglePlus);
        pop();
    }
    
//    saveButton.mousePressed(saveIt());
}

function mousePressed() {
    loop();
}

function mouseReleased() {
    noLoop();
}

function windowResized() {
    resizeCanvas(theHeight, theWidth);
}

//document.addEventListener('keydown', noSpace);
//
//function noSpace(e) {
//    event.preventDefault();
//}

function keyPressed() {

    
    if (keyCode === 65) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterA());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 66) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterB());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 67) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterC());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 68) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterD());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 69) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterE());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 70) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterF());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 71) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterG());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 72) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterH());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 73) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterI());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 74) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterJ());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 75) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterK());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 76) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterL());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 77) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterM());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 78) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterN());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 79) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterO());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 80) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterP());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 81) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterQ());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 82) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterR());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 83) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterS());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 84) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterT());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 85) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterU());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 86) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterV());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 87) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterW());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 88) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterX());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 89) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterY());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 90) {
        letterCount ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterZ());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 32) {
        letterCount ++;
        letterLineCount ++;
        letterXpos = letterCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterSpace());
        letters[letterCount - letterElement].construct(letterXpos, 0, 0);
    } else if (keyCode === ENTER || keyCode === RETURN) {
        lineCount ++;
        letterLineCount = 0;
        letterYpos = lineCount * letterHeight;
    }
    
//    console.log("lettercount:", letterCount, "letterwidth:", letterWidth);
//    console.log("letterLineCount:", letterLineCount);
//    console.log("letterwidth:", letterWidth);
//    console.log("letterxpos:", letterXpos);
    console.log("line count:", lineCount);
    
    loop();
    noLoop();
}

function saveIt() {
    save("your beautiful picture");
}

class LetterA {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftSpine();
            topCrossbar();
            rightSpine();
            lowXcrossbar();
        pop();
    }
}

class LetterAacute {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(2*cellX + leanXunits[5] * leanX, 1*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[6] * leanX, 0*cellY + leanYunits[3] * leanY, unit, unit, corners);
            leftSpine();
            topCrossbar();
            rightSpine();
            lowXcrossbar();
        pop();
    }
}

class LetterAtilde {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(1*cellX + leanXunits[6] * leanX, 0*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[5] * leanX, 1*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[6] * leanX, 0*cellY + leanYunits[3] * leanY, unit, unit, corners);
            leftSpine();
            topCrossbar();
            rightSpine();
            lowXcrossbar();
        pop();
    }
}
class LetterB {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            tallLeftSpine();
        
            topCrossbar();
        
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);

            xCrossbar();
        
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            bottomCrossbar();
        pop();
    }
}

class LetterC {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftCurve();
        
            topCrossbar();
        
            bottomCrossbar();
        pop();
    }
}

class LetterD {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));        
            tallLeftSpine();
            topCrossbar();
            bottomCrossbar();
            rightCurve();
        pop();
    }
}

class LetterE {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftCurve();
            topCrossbar();
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
            xCrossbar();
            bottomCrossbar();
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterEacute {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(2*cellX + leanXunits[5] * leanX, 1*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[6] * leanX, 0*cellY + leanYunits[3] * leanY, unit, unit, corners);
            leftCurve();
            topCrossbar();
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
            xCrossbar();
            bottomCrossbar();
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterF {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftSpine();
            topCrossbar();
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
            xCrossbar();
        pop();
    }
}


class LetterG {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftCurve();
            topCrossbar();
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
            bottomCrossbar();
        pop();
    }
}

class LetterH {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            tallLeftSpine();
            xCrossbar();
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rightSpine();
        pop();
    }
}

class LetterI {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            middleSpine();
        
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
            topCrossbar();
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(0*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[0] * leanY, unit, unit, corners);
            bottomCrossbar();
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterIacute {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            acute();
            middleSpine();
        
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
            topCrossbar();
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(0*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[0] * leanY, unit, unit, corners);
            bottomCrossbar();
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterJ {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
            bottomCrossbar();
            rightCurve();
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterK {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftSpine();
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
        
            rect(1*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[2] * leanY, unit, unit, corners);
        
            rect(3*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(3*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterL {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftCurve();
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
            bottomCrossbar();
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterM {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftSpine();

            rect(1*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[1] * leanY, unit, unit, corners);

            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[2] * leanY, unit, unit, corners);

            rect(3*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[3] * leanY, unit, unit, corners);
        
            rightSpine();

        pop();
    }
}

class LetterN {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftSpine();
            rect(1*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[2] * leanY, unit, unit, corners);
            middleSpine();
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterNacute {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(3*cellX + leanXunits[5] * leanX, 1*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[6] * leanX, 0*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            leftSpine();
            rect(1*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[2] * leanY, unit, unit, corners);
            middleSpine();
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterNtilde {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(2*cellX + leanXunits[6] * leanX, 0*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[5] * leanX, 1*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[6] * leanX, 0*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            leftSpine();
            rect(1*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[2] * leanY, unit, unit, corners);
            middleSpine();
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterO {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftCurve();
            topCrossbar();
            bottomCrossbar();
            rightCurve();
        pop();
    }
}

class LetterOacute {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            acute();
            leftCurve();
            topCrossbar();
            bottomCrossbar();
            rightCurve();
        pop();
    }
}

class LetterP {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftSpine();
            topCrossbar();
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
            xCrossbar();
        pop();
    }
}

class LetterQ {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftCurve();
            topCrossbar();

            rect(1*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
        
            rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
        pop();
    }
}

class LetterR {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftSpine();
            topCrossbar();
        
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            xCrossbar();
        
            rect(2*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[2] * leanY, unit, unit, corners);
        
            rect(3*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);

        pop();
    }
}

class LetterS {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[0] * leanY, unit, unit, corners);
            topCrossbar();
            xCrossbar();
            bottomCrossbar();
            rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterT {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            middleSpine();
        
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
            topCrossbar();
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterU {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
        
            rect(1*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
        
            rect(3*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[3] * leanY, unit, unit, corners);
        
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterUacute {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            acute();
            rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
        
            rect(1*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
        
            rect(3*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[3] * leanY, unit, unit, corners);
        
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterUumlaut {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(1*cellX + leanXunits[6] * leanX, 0*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[6] * leanX, 0*cellY + leanYunits[3] * leanY, unit, unit, corners);

            rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
        
            rect(1*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
        
            rect(3*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[3] * leanY, unit, unit, corners);
        
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterV {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterW {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);

            rect(1*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[1] * leanY, unit, unit, corners);
        
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[2] * leanY, unit, unit, corners);
        
            rect(3*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[3] * leanY, unit, unit, corners);
        
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterX {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);

            rect(0*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
        pop();
    }
}

class LetterY {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(2*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
        
            xCrossbar();
        
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
        
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterZ {
    construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
            topCrossbar();
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
            xCrossbar();
            rect(0*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
            bottomCrossbar();
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
        pop();
    }
}

class Number1 {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[2] * leanY, unit, unit, corners);
            middleSpine();
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
        
        pop();
    }
}

class Number2 {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            topCrossbar();
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[1] * leanX, 6*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[1] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[1] * leanX, 6*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[1] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class Number3 {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            topCrossbar();
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);

            rect(3*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
            bottomCrossbar();
        pop();
    }
}

class Number4 {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[1] * leanY, unit, unit, corners);
        
            lowXcrossbar();

            rect(3*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[3] * leanY, unit, unit, corners);
        
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
        pop();
    }
}

class Number5 {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
        
            topCrossbar();
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(1*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[1] * leanY, unit, unit, corners);
        
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            bottomCrossbar();
        
        pop();
    }
}

class Number6 {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftCurve();
        
            topCrossbar();
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(1*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);

            rect(3*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[3] * leanY, unit, unit, corners);
        
            rect(1*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
        
            bottomCrossbar();
        
        pop();
    }
}

class Number7 {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            topCrossbar();
        
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
        pop();
    }
}

class Number8 {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
            this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            xCrossbar();
        
            rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class Number9 {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
        
            topCrossbar();
        
            rect(1*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[1] * leanY, unit, unit, corners);
        
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[3] * leanY, unit, unit, corners);
        
            rightCurve();
            bottomCrossbar();

        pop();
    }
}

class Number0 {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftCurve();
            topCrossbar();
            bottomCrossbar();
            rightCurve();
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);

        pop();
    }
}

class symbolPeriod {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
        this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[0] * leanY, unit, unit, corners);
        pop();
    }
}

class symbolExclamation {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
            this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[0] * leanY, unit, unit, corners);
        
            rect(0*cellX + leanXunits[0] * leanX, 4*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[0] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[0] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
        
        pop();
    }
}

class symbolExclamationInverted {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
            this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class symbolQuestion {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
            this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[2] * leanY, unit, unit, corners);
        
            rect(3*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);

            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);    
        pop();
    }
}

class symbolQuestionInverted {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
            this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(1*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[1] * leanY, unit, unit, corners); 
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);    

        
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);    
            rect(3*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[3] * leanY, unit, unit, corners);    
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);    
        
            rect(2*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[2] * leanY, unit, unit, corners);    
        pop();
    }
}

class symbolSlash {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
            this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);  
        pop();
    }
}

class symbolPercent {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
            this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
        
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(0*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);  
        
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class symbolLeftPar {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
            this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(3*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[3] * leanY, unit, unit, corners);
        
            rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class symbolRightPar {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
            this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
        
            rect(1*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[1] * leanY, unit, unit, corners);
        
            rect(0*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[0] * leanY, unit, unit, corners);
        pop();
    }
}

class symbolPound {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
            this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(1*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(0*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[0] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
        
            rect(1*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[1] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[3] * leanY, unit, unit, corners);
        
            rect(2*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class symbolAt {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
            this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            leftCurve();
            topCrossbar();
            bottomCrossbar();
            rightCurve();
        
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);
            rect(3*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[3] * leanY, unit, unit, corners);
            rect(2*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[2] * leanY, unit, unit, corners);
        
        pop();
    }
}

class symbolDollar {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
        this.xoff = xoff;
        this.yoff = yoff;
            this.localLetterLineCount = localLetterLineCount;
        this.localLineCount = localLineCount;
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
        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
            topCrossbar();
            middleSpine();
            xCrossbar();
            bottomCrossbar();
        
            rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
        
            rect(0*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[0] * leanY, unit, unit, corners);
        
            rect(4*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[4] * leanY, unit, unit, corners);
        
            rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
        pop();
    }
}

class LetterSpace {
        construct(xoff, yoff, localLetterLineCount, localLineCount, angle) {
//        this.xoff = xoff;
//        this.yoff = yoff;
//        this.angle = angle;
    }
    
    display(xMag, yMag, speed) {
//        this.xMag = xMag;
//        this.yMag = yMag;
//        this.speed = speed;
//        
//        this.angle += this.speed;
//        this.x1 = this.xMag * cos(this.angle);
//        this.y1 = this.yMag * sin(this.angle);
//        
//        push();
//        translate(this.xoff + this.x1 + (letterSpacing * this.localLetterLineCount), this.yoff + this.y1  + (lineSpacing * this.localLineCount));
//
//        pop();
    }
}

function tallLeftSpine() {
    rect(0*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[0] * leanY, unit, unit, corners);
    rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
    rect(0*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[0] * leanY, unit, unit, corners);
    rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
    rect(0*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[0] * leanY, unit, unit, corners);
}

function leftSpine() {
    rect(0*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[0] * leanY, unit, unit, corners);
    rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
    rect(0*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[0] * leanY, unit, unit, corners);
    rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
}

function leftCurve() {
    rect(0*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[0] * leanY, unit, unit, corners);
    rect(0*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[0] * leanY, unit, unit, corners);
    rect(0*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[0] * leanY, unit, unit, corners);
}

function topCrossbar() {
    rect(1*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[1] * leanY, unit, unit, corners);
    rect(2*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[2] * leanY, unit, unit, corners);
    rect(3*cellX + leanXunits[4] * leanX, 2*cellY + leanYunits[3] * leanY, unit, unit, corners);
}

function middleSpine() {
    rect(2*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[2] * leanY, unit, unit, corners);
    rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);
    rect(2*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[2] * leanY, unit, unit, corners);
}

function lowXcrossbar() {
    rect(1*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[1] * leanY, unit, unit, corners);
    rect(2*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[2] * leanY, unit, unit, corners);
    rect(3*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[3] * leanY, unit, unit, corners);
}

function xCrossbar() {
    rect(1*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[1] * leanY, unit, unit, corners);
    rect(2*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[2] * leanY, unit, unit, corners);
    rect(3*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[3] * leanY, unit, unit, corners);
}

function bottomCrossbar() {
    rect(1*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[1] * leanY, unit, unit, corners);
    rect(2*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[2] * leanY, unit, unit, corners);
    rect(3*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[3] * leanY, unit, unit, corners);
}

function rightSpine() {
    rect(4*cellX + leanXunits[0] * leanX, 6*cellY + leanYunits[4] * leanY, unit, unit, corners);
    rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
    rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
    rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
}

function rightCurve() {
    rect(4*cellX + leanXunits[1] * leanX, 5*cellY + leanYunits[4] * leanY, unit, unit, corners);
    rect(4*cellX + leanXunits[2] * leanX, 4*cellY + leanYunits[4] * leanY, unit, unit, corners);
    rect(4*cellX + leanXunits[3] * leanX, 3*cellY + leanYunits[4] * leanY, unit, unit, corners);
}

function acute() {
    rect(2*cellX + leanXunits[5] * leanX, 1*cellY + leanYunits[2] * leanY, unit, unit, corners);
    rect(3*cellX + leanXunits[6] * leanX, 0*cellY + leanYunits[3] * leanY, unit, unit, corners);
}