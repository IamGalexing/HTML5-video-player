const video = document.querySelector(".viewer");
const player = document.querySelector(".player");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const toggle = document.querySelector("button.toggle");
const skipButtons = document.querySelectorAll("button[data-skip]");
const ranges = document.querySelectorAll(".player__slider");
const fullscreen = document.querySelector(".fullscreen");

function togglePlay() {
  video.paused ? video.play() : video.pause();
  toggleButton();
}

function toggleButton() {
  const icon = video.paused ? "▶" : "| |";
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += +this.dataset.skip;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrab(event) {
  const scrabTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrabTime;
}

function toggleScreenView() {
  document.fullscreenElement
    ? document.exitFullscreen()
    : player.requestFullscreen();
}

progressBar.style.flexBasis = "0px";

video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
progress.addEventListener("click", scrab);
fullscreen.addEventListener("click", toggleScreenView);

skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
