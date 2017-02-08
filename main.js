function nav2today() {
    nav2Day(date2DayOfYear());
}

function nav2Day(day) {
    if (day < 1) day = 1;
    if (day > 365) day = 365;
    window.location.href = './day_' + day + '.html';
}

function date2DayOfYear(dateObj) {
    if (!dateObj) {
        dateObj = new Date();
    }
    var start = new Date(dateObj.getFullYear(), 0, 0);
    var diff = dateObj - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function dayOfYear2Date(doy) {
    var year = new Date().getFullYear();
    var result = new Date(year, 0, doy);
    return result.getDate() + " "
        + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][result.getMonth()];
}

$(document).ready(function () {

    // initiate
    $("#datepicker").datepicker({
        dateFormat: "yyyy-mm-dd",
        minDate: new Date(new Date().getFullYear(), 0, 1),
        maxDate: new Date(new Date().getFullYear() + 1, 0, 0)
    });
    $("#datepicker2").datepicker({
        dateFormat: "yyyy-mm-dd",
        minDate: new Date(new Date().getFullYear(), 0, 1),
        maxDate: new Date(new Date().getFullYear() + 1, 0, 0)
    });

    $("#toggle").click(function () {
        var $target = $('#form1'),
            $toggle = $(this);
        $target.slideToggle(500, function () {
            $toggle.text(($target.is(':visible') ? 'Hide' : 'Select Date'));
        });
    });

    $(".btn-submit").click(function () {
        console.log(this);
        var date = new Date($(this).closest("form").find("input[name=date]").val());
        nav2Day(date2DayOfYear(date));
    });

    // deal with date
    var page_day = $("#day-no").val();
    var today = date2DayOfYear();
    if (page_day == today) {
        $(".btn-today").hide();
    } else if (page_day == 1) {
        $(".btn-prev").hide();
    } else if (page_day == 365) {
        $(".btn-next").hide();
    }

    $("#current-year").text(new Date().getFullYear());

    $("#page-date").text(dayOfYear2Date(page_day));

    console.info("Today No." + today);
    console.info("Page day No." + page_day);
});

