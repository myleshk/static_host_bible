// google analytics
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-104319497-1', 'auto');
ga('send', 'pageview');

function getPageDay() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    return parseInt(page.match(/\d+/).pop());
}

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

function getOriginFromURL(url) {
    var parser = document.createElement('a');
    parser.href = url;
    return parser.origin;
}

$(document).ready(function () {

    // initiate
    $("#datepicker").datepicker({
        dateFormat: "yy-mm-dd",
        minDate: new Date(new Date().getFullYear(), 0, 1),
        maxDate: new Date(new Date().getFullYear() + 1, 0, 0)
    });
    $("#datepicker2").datepicker({
        dateFormat: "yy-mm-dd",
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

    // check today and redirect
    if (getPageDay() != date2DayOfYear()) {
        // check origin
        if(!(document.referrer && getOriginFromURL(document.referrer) == window.location.origin)){
            // jump to today
            nav2today();
        }
    }

    $("#current-year").text(new Date().getFullYear());

    $("#page-date").text(dayOfYear2Date(page_day));

    console.info("Today No." + today);
    console.info("Page day No." + page_day);
});

