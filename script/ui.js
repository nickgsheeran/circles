var modalSwitch = false;
var txtCharSwitch = true;
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
            console.log(inputRight);
            
            console.log('input is already open, current mouse position:', currentMousePos.x, currentMousePos.y);
            
            if ( currentMousePos.x < inputPos.left || currentMousePos.x > inputRight) {
                if (currentMousePos.y < inputPos.top || currentMousePos.y > inputBottom) {
                    if ($(document).width() > 768) {
                        $('#the-text-input').focus();
                    }
                    $('#the-text-input').css("opacity", "0");
                }
            }
        }
        inputFocused = !inputFocused;
    })
//    $('#the-text-input').change(function() {
//        var theInputText = $('#the-text-input').value.split("");
//        console.log(theInputText);
//    });
    $("#the-text-input").on('change keyup paste', function() {
        readTheText();
//        theInputText = $('#the-text-input').val().split("");
//        console.log(theInputText);
    });
    $('#active-size').click(function() {
        if (sizeOpen == false) {
//            starting point for floating size radio
//            $('#size').css({
//                "position": "absolute",
//                "width": "auto",
//                "padding": "15px",
//                "border": "2px solid black",
//                "border-radius": "5px",
//            });
            $(this).removeClass("vertical");
            $(this).addClass("size-dropdown");
            $('.size-dropdown').css("display", "block");
            sizeOpen = true;
        } 
    })
    $('.size-dropdown').click(function() {
        if (sizeOpen == true) {
            $('#active-size').removeAttr('id');
            
            $(this).attr('id', 'active-size');
            var selectSize = $('#active-size').text();
            console.log(selectSize);
        } else if (sizeOpen == false) {
            $(this).removeClass("vertical");
            $(this).addClass("size-dropdown");
            $('.size-dropdown').css("display", "block");
            sizeOpen = true;
        }        
    })
    $('.letter-input').click(function() {
        if (sizeOpen == true) {
            $('#active-size').removeAttr('id');
            
            $(this).attr('id', 'active-size');
            var selectSize = $('#active-size').text();
            console.log(selectSize);
        }
    })
    $('#settings').click(function() {
        if (modalSwitch == false) {
            $('#control-modal').show();
            $(this).text("Close");
            if ($(document).width() < 768 && $(document).width() > $(document).height()) {
                $('.cModHide').hide();
            } else if ($(document).width() < 768 && $(document).width() < $(document).height()) {
                $('#export-container').hide();
            }
        } else {
            $('#control-modal').hide();
            $(this).text("Customize"); 
            if ($(document).width() < 768 || $(document).width() < $(document).height()) {
                $('.cModHide').show();
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
                $('.cModHide').show();
                $('#export-container').show();
            }
        }
        modalSwitch = !modalSwitch;
    })
    $('#character').click(function() {
        if (txtCharSwitch === true) {
            txtCharSwitch = !txtCharSwitch;
            $(this).removeClass("text-label-inactive");
            $('#paragraph').addClass("text-label-inactive")
            $('#paragraph-controls').hide();
            $('#character-controls').css("display", "grid");
        }
    })
    $('#paragraph').click(function() {
        if (txtCharSwitch === false) {
            txtCharSwitch = !txtCharSwitch;
            $(this).removeClass("text-label-inactive");
            $('#character').addClass("text-label-inactive")
            $('#character-controls').hide();
            $('#paragraph-controls').show();
        }
    })
    $('.color-radio-drawer').click(function() {
        if (colOpen === false) {
            colOpen = true;
            $(this).addClass( "color-radio-drawer-active" );
            $(this).children('.color-radio-options').show();
        } else if (colOpen === true) {
            colOpen = false;
            $(this).removeClass( "color-radio-drawer-active" );
            $(this).children('.color-radio-options').hide();
        }
    })        
    $(document).dblclick(function() {        
        $('#active-size').removeClass('size-dropdown');
        $('#active-size').addClass('vertical');
        $('.size-dropdown').css("display", "none");
        sizeOpen = false;
        $('.color-radio-drawer').removeClass( "color-radio-drawer-active" );
        $('.color-radio-drawer').children('.color-radio-options').hide();
        colOpen = false;
        
//        $('#control-modal').hide();
//        modalSwitch = false;
//        $('#settings').text("Customize"); 
        
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
        $('#settings-container').css('bottom', '15px');
    }
}

$( window ).resize(function() {
    if ($(document).width() < 768) {
        $('#settings-container').css('bottom', '15px');
    } else if ($(document).width() > 768) {
        $('#settings-container').css('bottom', 'unset');
    }
});