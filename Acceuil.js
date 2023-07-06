var container = document.getElementsByClassName("container");
var opacity = 0;

function fadeIn() {
  if (opacity < 1) {
    opacity += 0.01;
    container.style.opacity = opacity;
    requestAnimationFrame(fadeIn);
  }

}
fadeIn();
