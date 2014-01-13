
var showingName = true;

function toggleEmail() {
    if (showingName) {
        document.getElementById("fullname").innerHTML = "kovacshuni@yahoo.com";
        showingName = false;
    } else {
        document.getElementById("fullname").innerHTML = "Hello World";
        showingName = true;
    }
}
