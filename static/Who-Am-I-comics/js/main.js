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
