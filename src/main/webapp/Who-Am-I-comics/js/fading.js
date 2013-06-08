function fadeIn(id) {
    var element = document.getElementById(id)
    if (element.className.search("hovered") < 0) {
        element.className = element.className + "-hovered";
    }
}

function fadeInDelayed(id, delay) {
    setTimeout(function() { fadeIn(id) }, delay * 1000);
}

function gotoLeftRightUrl(k, urlLeft, urlRight) {
    if (k.keyCode == 37) {
        window.location = urlLeft;
    } else if (k.keyCode == 39) {
        window.location = urlRight;
    }
}
