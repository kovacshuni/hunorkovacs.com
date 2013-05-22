var fade = function () {
    return {
        delayed: function (id, delay) {
            setTimeout(function() { fade.init(id) }, delay * 1000);
        },
        init: function (id) {
            fadeIt(id);
        }
    }
}();

function fadeIt(id) {
    var element = document.getElementById(id)
    if (element.className.search("hovered") < 0) {
        element.className = element.className + "-hovered";
    }
}
