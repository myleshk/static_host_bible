/**
 * Created by myles on 23/9/15.
 */

////////
// PUBLIC FUNCTIONS
////////

// overlib(arg0,...,argN)
// Loads parameters into global runtime variables.
function overlib(content,caption) {
    var light = $('#light');
    light.hide();
    var t1 = $('#capt');
    t1.html(caption);
    var t2 = $('#cont');
    t2.html(content);
    $('#c1').html(caption);
    $('#c2').html(content);
    var left = $(event.target).position().left - 2;
    var bodyWidth = parseInt($('body').css('width'));
    if(bodyWidth-left < 150) left = bodyWidth - 150;
    light.animate({ 
        top: $(event.target).position().top+2,
        left: left,
     }, 100 );
    light.fadeIn(100);
}

function hidethis(){
    $('#light').hide();
}

function gototop(){
    $('html,body').animate({ scrollTop: 0 }, 'slow');
}

function gotobot(){
    hidethis();
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
}
$(document).click(function (e)
{
    var container = $("a");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        hidethis();
    }
});
