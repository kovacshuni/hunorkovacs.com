
function setBackStretch() {
    if (window.matchMedia('(max-width: 992px)').matches) {
        $.backstretch("image/times-992x744.jpg");
    } else if (window.matchMedia('(max-width: 1200px)').matches) {
        $.backstretch("image/times-1347x1010.jpg");
    } else {
        $.backstretch("image/blimd.png");
    }
}

setBackStretch();

var showingName = true;

function toggleEmail() {
    if (showingName) {
        document.getElementById("fullname").innerHTML = "kovacshuni<wbr />@gmail.com";
        showingName = false;
    } else {
        document.getElementById("fullname").innerHTML = "Hunor Kovács";
        showingName = true;
    }
}
