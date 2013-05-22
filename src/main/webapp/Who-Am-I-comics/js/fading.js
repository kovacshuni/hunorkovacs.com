function fadeIn(id) {
    var element = document.getElementById(id)
    if (element.className.search("hovered") < 0) {
        element.className = element.className + "-hovered";
    }
}

function fadeInDelayed(id, delay) {
    setTimeout(function() { fadeIn(id) }, delay * 1000);
}
