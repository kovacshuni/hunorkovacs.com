
function setBackStretch() {
    if (window.matchMedia('(max-width: 992px)').matches) {
        $.backstretch("image/forest-992x744.jpg", {alignY: "bottom"});
    } else if (window.matchMedia('(max-width: 1200px)').matches) {
        $.backstretch("image/forest-1347x1010.jpg", {alignY: "bottom"});
    } else {
        $.backstretch("image/forest-bw.jpg", {alignY: "bottom"});
    }
}

setBackStretch();

var showingName = true;

function toggleEmail() {
    if (showingName) {
        document.getElementById("fullname").innerHTML = "kovacshuni<wbr />@yahoo.com";
        showingName = false;
    } else {
        document.getElementById("fullname").innerHTML = "Hunor Kovács";
        showingName = true;
    }
}
