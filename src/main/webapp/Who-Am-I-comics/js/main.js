var COPYRIGHT_COOKIE_NAME = "copyright-acknowledgement";
var COPYRIGHT_COOKIE_VALUE = "true";

function fadeIn(id) {
    var element = document.getElementById(id)
    if (element.className.search("hovered") < 0) {
        element.className = element.className + "-hovered";
    }
}

function fadeInDelayed(id, delay) {
    setTimeout(function() { fadeIn(id) }, delay * 1000);
}

function fadeOut(id) {
    var element = document.getElementById(id);
    var index = element.className.search("-hovered");
    if (index > 0) {
        element.className = element.className.substr(0, index);
    }
}

function gotoLeftRightUrl(k, urlLeft, urlRight) {
    if (urlLeft != '' && k.keyCode == 37) {
        window.location = urlLeft;
    } else if (urlRight != '' && k.keyCode == 39) {
        window.location = urlRight;
    }
}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function displayCopyrightAlertBasedOnCookie() {
//    var cookie = getCookie(COPYRIGHT_COOKIE_NAME)
//    var copyrightAlert = document.getElementById('copyright-alert')
//    var copyrightBlur = document.getElementById('copyright-blur')
//    if (cookie == null || cookie != COPYRIGHT_COOKIE_VALUE) {
//        copyrightAlert.style.visibility = "visible";
//        copyrightBlur.style.visibility = "visible";
//    } else {
//        copyrightAlert.style.visibility = "hidden";
//        copyrightBlur.style.visibility = "hidden";
//    }
}

function acknowledgeCopyright() {
    setCookie(COPYRIGHT_COOKIE_NAME, COPYRIGHT_COOKIE_VALUE, 365);
    displayCopyrightAlertBasedOnCookie();
}

function detectBrowser() {
    var browser = navigator.userAgent;
    if (browser.indexOf("Opera") == -1 &&
            browser.indexOf("Firefox") == -1 &&
            browser.indexOf("Chrome") == -1 &&
            browser.indexOf("Safari") == -1) {
        alert("This website doesn't support your browser and won't show correctly.\n\n" +
            "Please use: Google Chrome, Apple Safari, Mozilla Firefox or Opera.");
    }
}

function resized() {
//    surroundings = document.getElementById('page-surroundings');
//    if (document.body.clientWidth < surroundings.offsetWidth) {
//        if (document.body.clientWidth > 1280) {
//            surroundings.style.width = document.body.clientWidth + "px";
//        } else {
//            surroundings.style.width = "1280px";
//        }
//    } else {
//        if (document.body.clientWidth > 1280) {
//            if (document.body.clientWidth < 1500) {
//                surroundings.style.width = document.body.clientWidth + "px";
//            } else {
//                surroundings.style.width = "1500px";
//            }
//        }
//    }
}
