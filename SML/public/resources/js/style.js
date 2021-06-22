var header = document.getElementById("navbar");
var links = header.getElementsByClassName("link");

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active-link");
      current[0].className = current[0].className.replace(" active-link", "");
      this.className += " active-link";
    });
}