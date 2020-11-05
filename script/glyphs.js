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
let anglePlus;
let globalSpeed;
let opac;
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
let playOrPause;

let opacityValue;
let speedValue;
let speedText;
let opacityText;
let speedSlider;
let opacitySlider;

let sizeChange = false;

let saveButton;
let clearButton;
let resetButton;

let theTextInput;
let theText = [];

let lineLength;
let lineOverflow;

let xMax;
let yMax;

let isMobile;

let waveOffsetSlider;
let waveOffset = 1;

function setup() {
    theParent = document.getElementById('cnv-holder');
    theWidth = theParent.clientWidth;
    theHeight = theParent.clientHeight;
    cnv = createCanvas(theWidth, theHeight);
    cnv.parent('cnv-holder');
    lastHovered = createVector(100, 100);
    
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
    speedText = document.getElementById('speed-value-holder');
    opacityText = document.getElementById('opacity-value-holder');
    speedSlider = document.getElementById('speed-slider');
    opacitySlider = document.getElementById('opac-slider');
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
    resetButton = document.getElementById('reset-button');
    saveButton = document.getElementById('export');
    controlModal = document.getElementById('control-modal');   
    theTextInput = document.getElementById('the-text-input');
    waveOffsetSlider = document.getElementById('wave-offset');
    waveOffset = waveOffsetSlider.value / 100;
    
    lineCount = 0;
    
    resizeIt();
    updateSliders();
    
    if (windowWidth < 768) {
        isMobile = true;
    } else {isMobile = false}

    noLoop();    
    init();
}

function draw() {
    theParent = document.getElementById('cnv-holder');
    
    document.getElementById('text-color-p').style.color = textColor;
    document.getElementById('background-color-p').style.color = textColor;
    bgColorButton.style.backgroundColor = bgColor;
    textColorButton.style.backgroundColor = bgColor;
        
    if (isMobile === false) {
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
    } else if (isMobile === true) {
        opac = opacitySlider.value / 1;
        anglePlus = speedSlider.value / 100;
    }
    
    conOpac = constrain(opac, 0, 255);    
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
    if (globalMagSlider.value == 0) {
        globalMag = 0;
    } else {
        globalMag = globalMagSlider.value / 1;
    }
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
    waveOffset = waveOffsetSlider.value / 100;

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
        letters[i].yoff = letters[i].localLineCount * letterHeight;
        
        if (paragraphAlignment == 'left') {
            paragraphAlignmentOffset = 0;
        } else if (paragraphAlignment == 'center') {
//            for some reason the offset syncs properly when letterlinecount - .1 numbers are accounted for
            paragraphAlignmentOffset = lineCountChars[letters[i].localLineCount] - .9;
            
            paragraphAlignmentOffset = (width - 
                                        (paragraphAlignmentOffset * (letterWidth + letterSpacing)) - 
                                        (letterWidth / 2) - 
                                        (globalMag / 2) - 
                                        hMargins) 
                                        / 2;
        } else if (paragraphAlignment == 'right') {
            paragraphAlignmentOffset = lineCountChars[letters[i].localLineCount];
            paragraphAlignmentOffset = width - (paragraphAlignmentOffset * (letterWidth + letterSpacing)) - hMargins * 2;
        }
        
        push();
            translate(hMargins + paragraphAlignmentOffset, vMargins);
            letters[i].display(globalXmag, globalYmag, globalSpeed);
        pop();
    }
}

function mousePressed() {    
    if (controlling) {
//        globalXmag = map(lastHovered.x, 0, width, 0, globalMag);
//        globalYmag = map(lastHovered.y, 0, height, 0, globalMag);  
        loop();
        updateSliders();
    }
}

function mouseReleased() {
    if (playPause == 'pause') {
        noLoop();
    }
}

function windowResized() {
    if (windowWidth < 768) {
        isMobile = true;
    } else {isMobile = false}
    
    resizeIt();
    updateSliders();
}

function updateSliders() {
    xMax = theWidth / 4;
    yMax = theHeight / 6;
    $('#cell-x-size')[0].min = -xMax;
    $('#cell-y-size')[0].min = -yMax;
    $('#cell-x-size')[0].max = xMax;
    $('#cell-y-size')[0].max = yMax;
    
    if (letterWidth >= (5 * unit) ) {
    $('#letter-spacing')[0].min = -3 * Math.abs(letterWidth);
    } else {
        $('#letter-spacing')[0].min = -70;
    }
    $('#letter-spacing')[0].max = 3 * Math.abs(letterWidth);
    
    if (letterHeight >= (7 * unit) ) {
        $('#line-spacing')[0].min = -3 * Math.abs(letterHeight);
    } else {
        $('#line-spacing')[0].min = -70;
    }
    $('#line-spacing')[0].max = theHeight - Math.abs(letterHeight);
    
    $('#vertical-margin')[0].min = -letterHeight - unit;
    $('#vertical-margin')[0].max = theHeight + letterHeight + unit;
    
    $('#horizontal-margin')[0].min = -theWidth;
    $('#horizontal-margin')[0].max = theWidth + letterWidth + unit;
    
}

function resizeIt() {
    
//    if landscape orientation
    if (theParent.clientWidth > theParent.clientHeight) {
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
//    if portrait orientation
    } else if (theParent.clientWidth < theParent.clientHeight) {
        if (size == 'Default') {
            pixelDensity(2);
            theHeight = theParent.clientHeight;
            theWidth = theParent.clientWidth;
        } else if (size == 'Letter') {
            pixelDensity(3);
            theWidth = theParent.clientWidth; 
            theHeight = theWidth / 8.5 * 11;
       }  else if (size == 'Tabloid') {
            pixelDensity(3);
            if ((theWidth / 11 * 17) < theParent.clientHeight) {
                theWidth = theParent.clientWidth; 
                theHeight = theWidth / 11 * 17;
            } else {
                theHeight = theParent.clientHeight;
                theWidth = theHeight / 17 * 11;
            }

        } else if (size == 'Poster') {
            pixelDensity(3);
            theWidth = theParent.clientWidth;
            theHeight = theWidth / 3 * 4;
        } else if (size == 'Square') {
            pixelDensity(2);
            theWidth = theParent.clientWidth;
            theHeight = theWidth;
        } else if (size == 'Portrait') {
            pixelDensity(2);
            theWidth = theParent.clientWidth;
            theHeight = theWidth * 1.2;
        } else if (size == 'Landscape') {
            pixelDensity(2);
                theWidth = theParent.clientWidth;
                theHeight = theWidth / 1.789;
        }
    }
    
    theWidth = floor(theWidth);
    theHeight = floor(theHeight);
    
    sizeChange = false;
    
    background(255);
    resizeCanvas(theWidth, theHeight);
    background(bgColor);
}

//window.onload = init;

function init() {
    controlSwitch();
    canvasSwitch();
    clearIt();
    resetIt();
    saveIt();
    fillStrokeEvent();
    playPauseEvent();
    alignmentEvent();
    textColorEvent();
    bgColorEvent();
    sizeEvent();
    offsetEvent();
    opacityEvent();
    speedEvent();
    randomizeIt();
    readTheText();
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
    document.getElementById('defaultCanvas0').onmouseover = function()   {
//        this.mouseIsOver = true;
        if (controlling == false) {
            hovered = true;
        }
    };
   document.getElementById('defaultCanvas0').onmouseout = function()   {
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

function resetIt()   {
    resetButton.mouseIsOver = false;
    resetButton.onmouseover = function()   {
        this.mouseIsOver = true;
    };
    resetButton.onmouseout = function()   {
        this.mouseIsOver = false;
    }
    resetButton.onclick = function()   {
        if (this.mouseIsOver)   {
            unitSlider.value = 5;
            cellXslider.value = 5;
            cellYslider.value = 5;
            unitSlider.value = 5;
            cornerSlider.value = 0;
            leanXslider.value = 0;
            leanYslider.value = 0;
            letterSpacingSlider.value = 5;
            lineSpacingSlider.value = letterHeight * 1.2;
            globalSpeed = 0;
            waveOffsetSlider.value = 0;
            globalMagSlider.value = 0;
            hMarginSlider.value = 0;
            vMarginSlider.value = letterHeight * 1.2;
            
            clear();
            background(bgColor);
            redraw();
        }
    }
}

function randomizeIt()   {
            cellXslider.value = floor(random(5, theWidth/100));
            cellYslider.value = floor(random(5, theHeight/100));
            if (cellXslider.value < cellYslider.value) {
                unitSlider.value = floor(random(1, cellXslider.value * 1.5));
            } else {
                unitSlider.value = floor(random(1, cellYslider.value * 1.5));
            }
            cornerSlider.value = floor(random(0, unitSlider.value * .5));
            leanXslider.value = floor(random(-75, 75));
            leanYslider.value = floor(random(-75, 75));
            letterSpacingSlider.value = letterWidth * .2;
            lineSpacingSlider.value = letterHeight * 1.2;
            speedSlider.value = floor(random(-624, 624));
            anglePlus = floor(random(-61.4, 61.4));
            opacitySlider.value = floor(random(0, 255));
            opac = floor(random(0, 255));
//            no clue why the following line works
//            globalSpeed = asdf;
            waveOffsetSlider.value = floor(random(0, 100));
            waveOffset = waveOffsetSlider.value;
            hMarginSlider.value = 0;
            vMarginSlider.value = letterHeight * 1.2;
                
            clear();
            background(bgColor);
            redraw();
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
            redraw();
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
                anglePlus = 5;
            }
            if (globalMag == 0) {
                globalMag = letterHeight;
                globalMagSlider.value = letterHeight;
                
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
                redraw();
            } else if (playPause == 'play') {
                loop();
            } else {noLoop}
        }
    }
}

function offsetEvent() {
    waveOffsetSlider.mouseIsOver = false;
    waveOffsetSlider.onmouseover = function()   {
        this.mouseIsOver = true;
    };
    waveOffsetSlider.onmouseout = function()   {
        this.mouseIsOver = false;
    }
    waveOffsetSlider.onclick = function()   {
        if (this.mouseIsOver)   {            
            readTheText();
        }
    }
}

function speedEvent()   {
    if (isMobile === false) {
        speedText.mouseIsOver = false;
        speedText.onmouseover = function()   {
            this.mouseIsOver = true;
        };
        speedText.onmouseout = function()   {
            this.mouseIsOver = false;
        }
        speedText.onclick = function()   {
            if (this.mouseIsOver && playPause == 'play')   {
                if (anglePlus < floor((1 * pi) / 3 * 100)) {
                    anglePlus = (1 * pi) / 3 * 100;
                    anglePlus = floor(anglePlus);
                } else if (anglePlus < ((2 * pi) * 100)) {
                    anglePlus += (1 * pi) / 3 * 100;
                    anglePlus = floor(anglePlus);
                } else if (anglePlus > ((2 * pi) * 100)) {
                    anglePlus = 0;
                }
            
//                document.getElementById('speed-value').innerHTML = globalSpeed;
            }
        }
    } else if (isMobile === true) {
        anglePlus += speedSlider.value / 1;
    }
}

function opacityEvent()   {
    opacityText.mouseIsOver = false;
    opacityText.onmouseover = function()   {
        this.mouseIsOver = true;
    };
    opacityText.onmouseout = function()   {
        this.mouseIsOver = false;
    }
    opacityText.onclick = function()   {
        if (this.mouseIsOver && playPause == 'play')   {
            if (conOpac > (255/2)) {
                opac = 0;
            } else {
                opac = 255;
            }
//            document.getElementById('opacity-value').innerHTML = conOpac;
        }
    }
}


function readTheText() {    
    theText = theTextInput.value.split("");    
    theText = theText.map(function(x){ return x.toUpperCase(); })
    letterCount = 0;
    lineCount = 0;
    letterLineCount = 0;
    lineCountChars = [0];
    letters = [];

        for (var i = 0; i < theText.length; i++) {        
            if (theText[i] === 'A') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterA());
 
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);
                letterLineCount ++;

            } else if (theText[i] === 'B') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterB());

                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'C') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterC());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'D') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterD());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'E') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterE());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'F') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterF());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'G') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterG());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'H') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterH());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'I') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterI());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'J') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterJ());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'K') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterK());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'L') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterL());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'M') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterM());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'N') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterN());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'O') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterO());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'P') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterP());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'Q') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterQ());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'R') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterR());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'S') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterS());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'T') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterT());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'U') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterU());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'V') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterV());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'W') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterW());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'X') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterX());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'Y') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterY());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'Z') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterZ());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } 
            else if (theText[i] === 'Á') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterAacute());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === 'Ã') {
                letterCount ++;        lineCountChars[lineCount] ++;



                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterAtilde());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === 'É') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterEacute());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'Í') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterIacute());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'Ń') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterNacute());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'Ñ') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterNtilde());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'Ó') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterOacute());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } else if (theText[i] === 'Ü') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterUumlaut());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;

            } 
            else if (theText[i] === ' ') {
                letterCount ++;        lineCountChars[lineCount] ++;
                letterLineCount ++;
                letterXpos = letterCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new LetterSpace());
                letters[letterCount - letterElement].construct(letterXpos, 0, letterCount * waveOffset);

            } else if (theText[i] === '0') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new Number0());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '1') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new Number1());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '2') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new Number2());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '3') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new Number3());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '4') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new Number4());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '5') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new Number5());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '6') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new Number6());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '7') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new Number7());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '8') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new Number8());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '9') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new Number9());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '.') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new symbolPeriod());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '!') {
                letterCount ++;        lineCountChars[lineCount] ++;
                
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new symbolExclamation());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '¡') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new symbolExclamationInverted());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '?') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new symbolQuestion());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '¿') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new symbolQuestionInverted());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '/') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new symbolSlash());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '%') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new symbolPercent());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '(') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new symbolLeftPar());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === ')') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new symbolRightPar());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '#') {
                letterCount ++;        lineCountChars[lineCount] ++;
                
                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new symbolPound());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '@') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new symbolAt());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '$') {
                letterCount ++;        lineCountChars[lineCount] ++;

                letterXpos = letterLineCount * letterWidth;
                letterYpos = lineCount * letterHeight;

                letters.push(new symbolDollar());
                letters[letterCount - letterElement].construct(letterXpos, letterYpos, letterLineCount, lineCount, letterCount * waveOffset);

                letterLineCount ++;
            } else if (theText[i] === '\n') {
                if (lineCount => lineCountChars.length) {
                    lineCountChars.push('0');
                }
                lineCount ++;

                letterLineCount = 0;
                letterYpos = lineCount * letterHeight;

            }
        }
    

        loop();

        if (playPause == 'pause') {
            noLoop();
        }    
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