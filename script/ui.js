var modalSwitch = false;
var parCharAnim = "par";
var colOpen = false;
var sizeOpen = false;
let startType;
let newLetters;
let input;
let inputSize;
let inputPos;
let inputBottom;
let inputRight;
let inputFocused = false;
var currentMousePos = { x: -1, y: -1 };
const pi = 3.14159265358979323846;
var touchtime = 0;

$(document).ready(function() {    
    updateSliders();
    responseInit();
    
    input = $('#the-text-input');
    input.focus();
    
    $('#cnv-holder').click(function() {                
        if (inputFocused === false) {
            $('#the-text-input').focus();
            $('#the-text-input').css("opacity", "1");
        } else if (inputFocused === true) {            
            currentMousePos.x = event.pageX;
            currentMousePos.y = event.pageY;
            inputSize = input.width();
            inputPos = input.position();
            inputRight = inputPos.left + inputSize;
            inputBottom = input.height() + inputPos.top;
            if ( currentMousePos.x < inputPos.left || currentMousePos.x > inputRight) {
                if (currentMousePos.y < inputPos.top || currentMousePos.y > inputBottom) {
                    $('#the-text-input').css("opacity", "0");
                }
            }
        }
        inputFocused = !inputFocused;
    })

    $("#the-text-input").on('change keyup paste', function() {
        readTheText();
    });
    $('#active-size').click(function() {
        if (sizeOpen == false) {
            $('#size-labels').css({
                "position": "absolute",
                "width": "calc(50% - 40px)",
                "overflow": "scroll",
                "height": "171px",
            });
            $(this).removeClass("vertical");
            $(this).addClass("size-dropdown");
            $('.size-dropdown').css("display", "block");
            sizeOpen = true;
        } 
    })
    $('.size-dropdown, #active-size').click(function() {
        if (sizeOpen == true) {
            $('#active-size').removeAttr('id');
            
            $(this).attr('id', 'active-size');
            var selectSize = $('#active-size').text();
        } else if (sizeOpen == false) {
            
            $(this).removeClass("vertical");
            $(this).addClass("size-dropdown");

            $('.size-dropdown').css("display", "block");
            
            sizeOpen = true;
        }
        if ($('#size-labels').offset().top + $('#size-labels').outerHeight(true) > window.innerHeight) {
            console.log('should work');
            $('.size-dropdown').css('margin', '-70px 0 -2px 0');
            $('#size-labels').css({'overflow': 'visible', 'margin-top': '72px', 'z-index': '100'})
        }
    })
    $('.letter-input').click(function() {
        if (sizeOpen == true) {
            $('#active-size').removeAttr('id');
            
            $(this).attr('id', 'active-size');
            var selectSize = $('#active-size').text();
        }
    })
    $('#settings').click(function() {
        if (modalSwitch == false) {
            $('#control-modal').show();
            $(this).text("Close");
            if ($(document).width() < 768 && $(document).width() > $(document).height()) {
                $('.cModHide').css('opacity', '0');
            } else if ($(document).width() < 768 && $(document).width() < $(document).height()) {
                $('#export-container').hide();
            }
        } else {
            $('#control-modal').hide();
            $(this).text("Customize"); 
            if ($(document).width() < 768 || $(document).width() < $(document).height()) {
                $('.cModHide').css('opacity', '1');
                $('#export-container').show();
            }
        }
        modalSwitch = !modalSwitch;
    })
    $('#small-modal-x').click(function() {
        if (modalSwitch == true) {
            $('#control-modal').hide();
            $('#settings').text("Customize"); 
            if ($(document).width() < 768 || $(document).width() < $(document).height()) {
                $('.cModHide').css('opacity', '1');
                $('#export-container').show();
            }
        }
        modalSwitch = !modalSwitch;
    })
    $('#character').click(function() {
        if (parCharAnim == "par" || parCharAnim == "anim") {
            parCharAnim = "char";
            $(this).removeClass("text-label-inactive");
            $('#paragraph').addClass("text-label-inactive");
            $('#animation').addClass("text-label-inactive");
            $('#paragraph-controls').hide();
            $('#animation-controls').hide();
            $('#character-controls').css("display", "grid");
        }
    })
    $('#paragraph').click(function() {
        if (parCharAnim == "char" || parCharAnim == "anim") {
            parCharAnim = "par";
            $(this).removeClass("text-label-inactive");
            $('#character').addClass("text-label-inactive");
            $('#animation').addClass("text-label-inactive");
            $('#character-controls').hide();
            $('#animation-controls').hide();
            $('#paragraph-controls').show();
        }
    })
    $('#animation').click(function() {
        if (parCharAnim == "par" || parCharAnim == "char") {
            parCharAnim = "anim";
            $(this).removeClass("text-label-inactive");
            $('#paragraph').addClass("text-label-inactive");
            $('#character').addClass("text-label-inactive");
            $('#character-controls').hide();
            $('#animation-controls').show();
            $('#paragraph-controls').hide();
        }
    })
    $('.color-radio-drawer').click(function() {
        if (colOpen == false) {
            colOpen = true;
            $(this).addClass( "color-radio-drawer-active" );
            $(this).children('.color-radio-options').show();
        } else if (colOpen == true) {
            colOpen = false;
            $(this).removeClass( "color-radio-drawer-active" );
            $(this).children('.color-radio-options').hide();
        }
    })
    
    $('#wave-offset').change(function() {
        waveOffset = waveOffsetSlider.value / 100;
        readTheText();
    })

    $(document).dblclick(function() {        
        $('#active-size').removeClass('size-dropdown');
        $('#active-size').addClass('vertical');
        $('.size-dropdown').css("display", "none");
        sizeOpen = false;
        $('.color-radio-drawer').removeClass( "color-radio-drawer-active" );
        $('.color-radio-drawer').children('.color-radio-options').hide();
        colOpen = false;
        if (inputFocused == true) {
            if (window.innerWidth < 768) {
                $('#the-text-input').focus();
            }
                $('#the-text-input').css("opacity", "0");
                inputFocused = false;
            }
    });
        
})

function responseInit() {
    if ($(document).width() < 768) {
        $('#animation').show();
        if ($(document).width() < $(document).height()) {
            $('#settings-container').css('bottom', '15px');
        } else {
            $('#settings-container').css('bottom', 'unset');
        }
    } else {
        $('#settings-container').css('bottom', 'unset');
        $('#animation').hide();
    }
}

$( window ).resize(function() {
    responseInit();
    readTheText();
});