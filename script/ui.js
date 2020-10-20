var modalSwitch = false;
var txtCharSwitch = true;
var colOpen = false;
var sizeOpen = false;
let startType;
let newLetters;

$(document).ready(function() {
//    if ($(document).width() < 768) {
//        console.log("mobile");
//        $('#defaultCanvas0').click(function() {
//            console.log("canvas clicked");
//            startType = prompt('Enter text');
//            console.log(startType);
//            newLetters = startType.split("");
//            letters.splice(0, letters.length, newLetters);
//            console.log(letters);
////            redraw();
//        })
//    }
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
        if (modalSwitch === false) {
            $('#control-modal').show();
            $(this).text("Close");
        } else {
            $('#control-modal').hide();
            $(this).text("Customize"); 
            
        }
        modalSwitch = !modalSwitch;
    })
    $('#small-modal-x').click(function() {
        if (modalSwitch === true) {
            $('#control-modal').hide();
            $('#settings').text("Customize"); 
            
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
    });
})