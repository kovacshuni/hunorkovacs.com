
function setBackStretch() {
    if (window.matchMedia('(max-width: 480px)').matches) {
      $.backstretch("static/image/DSC09388-03.jpg");
    } else if (window.matchMedia('(max-width: 992px)').matches) {
        $.backstretch("static/image/ylid-992x744-01.jpg");
    } else if (window.matchMedia('(max-width: 1200px)').matches) {
        $.backstretch("static/image/ylid-1347x1010-01.jpg");
    } else {
        $.backstretch("static/image/ylid-1920x1440-01.jpg");
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
