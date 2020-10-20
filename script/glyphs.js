let cnv;
let theParent;
let hovered = false;
let lastHovered;
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
let globalSpeed;
let opac = 255;
let conOpac;

let globalXmag = 0;
let globalYmag = 0;
let globalXmag_prev;
let globalYmag_prev;

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
let lineCountChars = [0];


let alignmentButton;
let alignmentValues = [];
let alignment;
let paragraphAlignmentOffset;
let paragraphAlignment;


let fillStrokeButton;
let fillStrokeValues = [];
let fillStroke;

let textColorButton;
let textColorValues;
let textColor;

let bgColorButton;
let bgColorValues;
let bgColor;
let bgColor2;

let sizeButton;
let sizeValues;
let size;

let vMarginSlider;
let vMargins;

let hMarginSlider;
let hMargins;

let controlModal;
let controlling = false;

let playPauseButton;
let playPauseValues;
let playPause;

let opacityValue;
let speedValue;

let sizeChange = false;

let saveButton;
let clearButton;

function setup() {
    theParent = document.getElementById('cnv-holder');
    
    theWidth = theParent.clientWidth;
    theHeight = theParent.clientHeight;
    
    cnv = createCanvas(theWidth, theHeight);
    cnv.parent('cnv-holder');
        
    lastHovered = createVector(0, 0);
    
    strokeWeight(1);
    stroke(255, 0, 0);
    noFill();
    
    background(255);
    
    cellXslider = document.getElementById('cell-x-size');

    cellYslider = document.getElementById('cell-y-size');

    unitSlider = document.getElementById('unit-size');

    cornerSlider = document.getElementById('corner-size');

    globalMagSlider = document.getElementById('spin-size');

    leanXslider = document.getElementById('lean-x');

    leanYslider = document.getElementById('lean-y');
    
    letterSpacingSlider = document.getElementById('letter-spacing');
    
    lineSpacingSlider = document.getElementById('line-spacing');
    
    vMarginSlider = document.getElementById('vertical-margin');
    hMarginSlider = document.getElementById('horizontal-margin');
    
//    alignmentButton = document.getElementById('')
    
    fillStrokeButton = document.getElementById('fill-stroke');
    fillStrokeValues = document.getElementsByName('fill-stroke');
    for(i = 0; i < fillStrokeValues.length; i++) { 
        if(fillStrokeValues[i].checked) 
        fillStroke = fillStrokeValues[i].value;
    } 
    
    alignmentButton = document.getElementById('alignment');
    alignmentValues = document.getElementsByName('alignment');
    for(i = 0; i < alignmentValues.length; i++) { 
        if(alignmentValues[i].checked) 
        paragraphAlignment = alignmentValues[i].value;
    }
    
    opacityValue = document.getElementById('opacity-value');
    speedValue = document.getElementById('speed-value');
    
    playPauseButton = document.getElementById('play-pause');
    playPauseValues = document.getElementsByName('play-pause');
    for(i = 0; i < playPauseValues.length; i++) { 
        if(playPauseValues[i].checked) 
        playPause = playPauseValues[i].value;
    }
    
    textColorButton = document.getElementById('text-color');
    textColorValues = document.getElementsByName('text-color');
    for(i = 0; i < textColorValues.length; i++) { 
        if(textColorValues[i].checked) 
        textColor = textColorValues[i].value;
    }
    
    bgColorButton = document.getElementById('background-color');
    bgColorValues = document.getElementsByName('background-color');
    for(i = 0; i < bgColorValues.length; i++) { 
        if(bgColorValues[i].checked) 
        bgColor = bgColorValues[i].value;
    }
    
    sizeButton = document.getElementById('size');
    sizeValues = document.getElementsByName('size');
    for(i = 0; i < sizeValues.length; i++) { 
        if(sizeValues[i].checked) 
        size = sizeValues[i].value;
    }
    
    clearButton = document.getElementById('clear-button');
    saveButton = document.getElementById('export');
    controlModal = document.getElementById('control-modal');

    lineCount = 0;
    
    resizeIt();
    
    noLoop();
}

function draw() {
    theParent = document.getElementById('cnv-holder');
    
    document.getElementById('text-color-p').style.color = textColor;
    document.getElementById('background-color-p').style.color = textColor;
    bgColorButton.style.backgroundColor = bgColor;
    textColorButton.style.backgroundColor = bgColor;
    
    conOpac = constrain(opac, 0, 255);
    
    if (keyIsDown(UP_ARROW)) {
        anglePlus += 1;
        anglePlus = floor(anglePlus);
        
    } else if (keyIsDown(DOWN_ARROW)) {
        anglePlus -= 1;
        anglePlus = floor(anglePlus);
    } else if (keyIsDown(LEFT_ARROW)) {
        opac --;
    } else if (keyIsDown(RIGHT_ARROW)) {
        opac ++;
    }
    
    bgColor2 = color(bgColor);
    bgColor2.setAlpha(conOpac);
    background(bgColor2);
    
    if (fillStroke == 'solid') {
        fill(textColor);    
        noStroke();
    } else if (fillStroke == 'outline') {
        noFill();
        strokeWeight(1);
        stroke(textColor);
    } else {
        fill(textColor);    
        noStroke();
    }
    
    globalSpeed = anglePlus/100;
    
    document.getElementById('speed-value').innerHTML = globalSpeed;
    document.getElementById('opacity-value').innerHTML = conOpac;
    
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
    vMargins = vMarginSlider.value / 1;
    hMargins = hMarginSlider.value / 1;
    
    if (playPause == 'pause') {
        globalSpeed = 0;
        globalXmag = map(lastHovered.x, 0, width, 0, globalMag);
        globalYmag = map(lastHovered.y, 0, height, 0, globalMag);  
    } else if (playPause == 'play') {
        globalSpeed = anglePlus/100;
        if (hovered == true) {
            globalXmag = map(mouseX, 0, width, 0, globalMag);
            globalYmag = map(mouseY, 0, height, 0, globalMag);   
        } else if (hovered == false) {
            globalXmag = map(lastHovered.x, 0, width, 0, globalMag);
            globalYmag = map(lastHovered.y, 0, height, 0, globalMag);  
        }
    }

    letterWidth = (5*unit) + (4*(cellX - unit));
    
    letterHeight = 7*cellY;
        
    for (let i = 0; i < letters.length; i ++) {
        
        letters[i].xoff = letters[i].localLetterLineCount * letterWidth;
        
        if (paragraphAlignment == 'left') {
            paragraphAlignmentOffset = 0;
        } else if (paragraphAlignment == 'center') {
            paragraphAlignmentOffset = lineCountChars[letters[i].localLineCount] - .5;
            paragraphAlignmentOffset = (width - (paragraphAlignmentOffset * (letterWidth + letterSpacing)) - (letterWidth / 2) - (globalMag / 2) - hMargins) / 2;
        } else if (paragraphAlignment == 'right') {
            paragraphAlignmentOffset = lineCountChars[letters[i].localLineCount];
            paragraphAlignmentOffset = width - (paragraphAlignmentOffset * (letterWidth + letterSpacing)) - hMargins * 2;
        }
        
        push();
            translate(hMargins + paragraphAlignmentOffset, vMargins);
            letters[i].display(globalXmag, globalYmag, globalSpeed);
        pop();
    }

//    text("opacity:", 30, height - 60);
//    text(conOpac, 75, height - 60);
//    text("speed:", 30, height - 45);
//    text(anglePlus, 70, height - 45);
//    text("spin magnitude:", 30, height - 30);
//    text(globalMag, 119, height - 30);
    
//    text("lean x:", width - 240, height - 60);
//    text(leanX / 10, width - 240 + 40, height - 60);
//    text("lean y:", width - 240, height - 45);
//    text(leanY / 10, width - 240 + 40, height - 45);
}

function mousePressed() {    
    if (controlling) {
//        globalXmag = map(lastHovered.x, 0, width, 0, globalMag);
//        globalYmag = map(lastHovered.y, 0, height, 0, globalMag);  
        loop();
    }
}

function mouseReleased() {
    if (playPause == 'pause') {
        noLoop();
    }
}

function windowResized() {
    resizeIt();
    
//    resizeCanvas(theWidth, theHeight);
}

function resizeIt() {
    if (size == 'Default') {
        pixelDensity(2);
        theHeight = theParent.clientHeight;
        theWidth = theParent.clientWidth;
    } else if (size == 'Letter') {
        pixelDensity(3);
        theHeight = theParent.clientHeight;
        theWidth = theHeight / 11 * 8.5;       
   }  else if (size == 'Tabloid') {
        pixelDensity(3);
        theHeight = theParent.clientHeight;
        theWidth = theHeight / 17 * 11;
    } else if (size == 'Poster') {
        pixelDensity(3);
        theHeight = theParent.clientHeight;
        theWidth = theHeight / 4 * 3;
    } else if (size == 'Square') {
        pixelDensity(4);
        if (theParent.clientWidth < theParent.clientHeight) {
            theHeight = theParent.clientWidth;
            theWidth = theParent.clientWidth;
        } else if (theParent.clientWidth > theParent.clientHeight) {
            theHeight = theParent.clientHeight;
            theWidth = theParent.clientHeight;            
        }

    } else if (size == 'Portrait') {
        pixelDensity(2);
        theHeight = theParent.clientHeight;
        theWidth = theHeight * .8;
    } else if (size == 'Landscape') {
        pixelDensity(2);
        if (theParent.clientHeight < theParent.clientWidth * .559) {           
            theHeight = theParent.clientHeight;
            theWidth = theHeight * 1.789;
        } else {
            theWidth = theParent.clientWidth;
            theHeight = theWidth * .559;
        }
    }
    
    theWidth = floor(theWidth);
    theHeight = floor(theHeight);
    
    sizeChange = false;
    
    background(255);
    background(bgColor);
    resizeCanvas(theWidth, theHeight);
}

window.onload = init;

function init() {
    controlSwitch();
    canvasSwitch();
    clearIt();
    saveIt();
    fillStrokeEvent();
    playPauseEvent();
    alignmentEvent();
    textColorEvent();
    bgColorEvent();
    sizeEvent();
}

function controlSwitch() {
    controlModal.mouseIsOver = false;
    controlModal.mouseIsOver = false;
    controlModal.onmouseover = function()   {
//        this.mouseIsOver = true;
        controlling = true;
        hovered = false;
    };
   controlModal.onmouseout = function()   {
//        this.mouseIsOver = false;
        controlling = false;
   }
}

function canvasSwitch() {
    theParent.mouseIsOver = false;
    theParent.mouseIsOver = false;
    theParent.onmouseover = function()   {
//        this.mouseIsOver = true;
        if (controlling == false) {
            hovered = true;
        }
    };
   theParent.onmouseout = function()   {
//        this.mouseIsOver = false;
        hovered = false;
        lastHovered.x = mouseX;
        lastHovered.y = mouseY;
   }
}

function clearIt()   {
    clearButton.mouseIsOver = false;
    clearButton.onmouseover = function()   {
        this.mouseIsOver = true;
    };
    clearButton.onmouseout = function()   {
        this.mouseIsOver = false;
    }
    clearButton.onclick = function()   {
        if (this.mouseIsOver)   {
            clear();
            background(bgColor);
            redraw();
        }
    }
}

function saveIt()   {
   saveButton.mouseIsOver = false;
   saveButton.onmouseover = function()   {
        this.mouseIsOver = true;
   };
   saveButton.onmouseout = function()   {
      this.mouseIsOver = false;
   }
   saveButton.onclick = function()   {
      if (this.mouseIsOver)   {
        save("your beautiful picture");
      }
   }
}

function fillStrokeEvent() {
    fillStrokeButton.mouseIsOver = false;
    fillStrokeButton.onmouseover = function()   {
        this.mouseIsOver = true;
    };
    fillStrokeButton.onmouseout = function()   {
        this.mouseIsOver = false;
    }
    fillStrokeButton.onclick = function()   {
        if (this.mouseIsOver)   {            
            for(i = 0; i < fillStrokeValues.length; i++) { 
                if(fillStrokeValues[i].checked) 
                fillStroke = fillStrokeValues[i].value;
            } 
        }
    }
}

function playPauseEvent() {
    playPauseButton.mouseIsOver = false;
    playPauseButton.onmouseover = function()   {
        this.mouseIsOver = true;
    };
    playPauseButton.onmouseout = function()   {
        this.mouseIsOver = false;
    }
    playPauseButton.onclick = function()   {
        if (this.mouseIsOver)   {            
            for(i = 0; i < playPauseValues.length; i++) { 
                if(playPauseValues[i].checked) 
                playPause = playPauseValues[i].value;
            }
        if (playPause == 'pause') {
            noLoop();
        } else if (playPause == 'play') {
            if (anglePlus == 0) {
                anglePlus = 15;
            }
            loop();
        } else {noLoop}
            }
        }
}

function alignmentEvent() {
    alignmentButton.mouseIsOver = false;
    alignmentButton.onmouseover = function()   {
        this.mouseIsOver = true;
    };
    alignmentButton.onmouseout = function()   {
        this.mouseIsOver = false;
    }
    alignmentButton.onclick = function()   {
        if (this.mouseIsOver)   {            
            for(i = 0; i < alignmentValues.length; i++) { 
                if(alignmentValues[i].checked) 
                paragraphAlignment = alignmentValues[i].value;
            }
        if (playPause == 'pause') {
            noLoop();
        } else if (playPause == 'play') {
            loop();
        } else {noLoop}
            }
    }
}

function textColorEvent() {
    textColorButton.mouseIsOver = false;
    textColorButton.onmouseover = function()   {
        this.mouseIsOver = true;
    };
    textColorButton.onmouseout = function()   {
        this.mouseIsOver = false;
    }
    textColorButton.onclick = function()   {
        if (this.mouseIsOver)   {            
            for(i = 0; i < textColorValues.length; i++) { 
                if(textColorValues[i].checked) 
                textColor = textColorValues[i].value;
            }
            document.getElementById('text-color-p').style.color = textColor;
            document.getElementById('background-color-p').style.color = textColor;
            if (playPause == 'pause') {
                noLoop();
            } else if (playPause == 'play') {
                loop();
            } else {noLoop}
        }
    }
}

function bgColorEvent() {
    bgColorButton.mouseIsOver = false;
    bgColorButton.onmouseover = function()   {
        this.mouseIsOver = true;
    };
    bgColorButton.onmouseout = function()   {
        this.mouseIsOver = false;
    }
    bgColorButton.onclick = function()   {
        if (this.mouseIsOver)   {            
            for(i = 0; i < bgColorValues.length; i++) { 
                if(bgColorValues[i].checked) 
                bgColor = bgColorValues[i].value;
            }
        this.style.backgroundColor = bgColor;
        textColorButton.style.backgroundColor = bgColor;
        if (playPause == 'pause') {
            noLoop();
        } else if (playPause == 'play') {
            loop();
        } else {noLoop}
            }
    }
}

function sizeEvent()   {
    sizeButton.mouseIsOver = false;
    sizeButton.onmouseover = function()   {
        this.mouseIsOver = true;
//        console.log("size mouseover");
    };
    sizeButton.onmouseout = function()   {
        this.mouseIsOver = false;
    }
    sizeButton.onclick = function()   {
        if (this.mouseIsOver)   {            
            for(i = 0; i < sizeValues.length; i++) { 
                if(sizeValues[i].checked) 
                size = sizeValues[i].value;
            }
            resizeIt();
            if (playPause == 'pause') {
                noLoop();
            } else if (playPause == 'play') {
                loop();
            } else {noLoop}
        }
    }
}

function keyPressed() {

    
    if (keyCode === 65) {
        letterCount ++;        lineCountChars[lineCount] ++;
        
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterA());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 66) {
        letterCount ++;        lineCountChars[lineCount] ++;
        
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterB());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 67) {
        letterCount ++;        lineCountChars[lineCount] ++;
        
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterC());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 68) {
        letterCount ++;        lineCountChars[lineCount] ++;
        
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterD());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 69) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterE());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 70) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterF());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 71) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterG());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 72) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterH());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 73) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterI());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 74) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterJ());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 75) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterK());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 76) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterL());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 77) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterM());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 78) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterN());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 79) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterO());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 80) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterP());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 81) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterQ());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 82) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterR());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 83) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterS());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 84) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterT());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 85) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterU());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 86) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterV());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 87) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterW());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 88) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterX());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 89) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterY());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 90) {
        letterCount ++;        lineCountChars[lineCount] ++;
        
        lineCountChars[lineCount] ++;
        
        letterXpos = letterLineCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterZ());
        letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, 0);
        
        letterLineCount ++;
        
    } else if (keyCode === 32) {
        letterCount ++;        lineCountChars[lineCount] ++;
        letterLineCount ++;
        letterXpos = letterCount * letterWidth;
        letterYpos = lineCount * letterHeight;
        
        letters.push(new LetterSpace());
        letters[letterCount - letterElement].construct(letterXpos, 0, 0);
        
    } else if (keyCode === ENTER || keyCode === RETURN) {
        if (lineCount => lineCountChars.length) {
            lineCountChars.push('0');
        }
        lineCount ++;
        
        letterLineCount = 0;
        letterYpos = lineCount * letterHeight;
        
    } else if (keyCode === 8) {
        if (letterCount != 0) {
            letters.splice(-1, 1);
            letterCount --;
            lineCountChars[lineCount] --;
            
            if (letterLineCount == 0) {
                lineCountChars[lineCount] = 0;
                lineCount--;
                letterLineCount = letters[letters.length - 1].localLetterLineCount + 1;
                lineCountChars[lineCount] --;
            } else {
                letterLineCount --;
            }
        }
    }
    
    loop();
    
    if (playPause == 'pause') {
        noLoop();
    }    
    
    console.log(letters);
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