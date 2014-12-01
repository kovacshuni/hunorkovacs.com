$.backstretch("image/splash-original.jpg");

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

function largen() {
    document.getElementById("theinput").style.width = "20em";
}

function smallen() {
    document.getElementById("theinput").style.width = "9.5em";
}
