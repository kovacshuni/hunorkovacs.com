
function setBackStretch() {
    if (window.matchMedia('(max-width: 480px)').matches) {
      $.backstretch("image/DSC06870-04.jpg");
    } else if (window.matchMedia('(max-width: 992px)').matches) {
        $.backstretch("image/blid-992x744-01.jpg");
    } else if (window.matchMedia('(max-width: 1200px)').matches) {
        $.backstretch("image/blid-1347x1010-01.jpg");
    } else {
        $.backstretch("image/blid-1920x1440-01.jpg");
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
