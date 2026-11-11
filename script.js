const playground = document.querySelector("#playground");
const cat = document.querySelector("#cat");
const pupils = document.querySelectorAll(".pupil");
const eyes = document.querySelectorAll(".eye");
const whiskers = document.querySelectorAll(".whisker");
const target = { x: 0, y: 0 };
const motion = { x: 0, y: 0 };
const gaze = { x: 0, y: 0 };

playground.addEventListener("pointermove", (event) => {
  const box = playground.getBoundingClientRect();
  target.x = ((event.clientX - box.left) / box.width - 0.5) * 2;
  target.y = ((event.clientY - box.top) / box.height - 0.5) * 2;
});
playground.addEventListener("pointerleave", () => { target.x = 0; target.y = 0; });

function animate() {
  motion.x += (target.x - motion.x) * 0.055;
  motion.y += (target.y - motion.y) * 0.055;
  gaze.x += (target.x - gaze.x) * 0.13;
  gaze.y += (target.y - gaze.y) * 0.13;
  cat.style.transform = `translate3d(${motion.x * 17}px, ${motion.y * 11}px, 0) rotate(${motion.x * 1.2}deg)`;
  pupils.forEach((pupil) => { pupil.style.transform = `translate(calc(-50% + ${gaze.x * 6}px), calc(-50% + ${gaze.y * 5}px))`; });
  eyes.forEach((eye, index) => { eye.style.transform = `translate(${gaze.x * 1.5}px, ${gaze.y * 1.2}px) rotate(${index ? gaze.x * -2 : 0}deg)`; });
  whiskers.forEach((whisker, index) => { whisker.style.transform = `rotate(${(index < 2 ? -1 : 1) * gaze.y * 3}deg)`; });
  requestAnimationFrame(animate);
}
animate();
