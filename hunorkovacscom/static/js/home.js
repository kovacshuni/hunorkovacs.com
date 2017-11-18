
function setBackStretch() {
    if (window.matchMedia('(max-width: 992px)').matches) {
        $.backstretch("image/times-992x744.jpg");
    } else if (window.matchMedia('(max-width: 1200px)').matches) {
        $.backstretch("image/times-1347x1010.jpg");
    } else {
        $.backstretch("image/blid-02.jpg");
    }
}

setBackStretch();

var showingName = true;

function toggleEmail() {
    if (showingName) {
        document.getElementById("theemail").style.visibility = "visible";
        showingName = false;
    } else {
        document.getElementById("theemail").style.visibility = "hidden";
        showingName = true;
    }
}

function hoverMainImage(element) {
    element.setAttribute('src', 'image/header-04.jpg');
}
function unhoverMainImage(element) {
    element.setAttribute('src', 'image/header-03.jpg');
}
