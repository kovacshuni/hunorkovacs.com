function fadeIt(id) {
    var element = document.getElementById(id)
    if (element.className.search("hovered") < 0) {
        element.className = "hovered";
    }
}
