function fade(element, o0, o1, t) {
    // IE compatibility. Detect lack of native 'opacity' support, and ensure element
    // has layout for IE6-7.
    //
    var canopaque = 'opacity' in element.style;
    if (!canopaque && 'currentStyle' in element && element.currentStyle.hasLayout === false)
        element.style.zoom = '1';

    function setOpacity(o) {
        if (canopaque)
            element.style.opacity = '' + o;
        else
            element.style.filter = 'alpha(opacity=' + Math.round(o * 100) + ')';
    }

    var t0 = new Date().getTime();
    setOpacity(o0);
    var interval = setInterval(function () {
        var dt = (new Date().getTime() - t0) / t;
        if (dt >= 1) {
            dt = 1;
            clearInterval(interval);
        }
        setOpacity(o1 * dt + o0 * (1 - dt));
    }, 25);
}
