const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 120;

let score = 0;
let gameRunning = true;

const target = {
  x: 100,
  y: 100,
  r: 30
};

function drawTarget() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(target.x, target.y, target.r, 0, Math.PI * 2);
  ctx.fillStyle = "#0ff";
  ctx.fill();
}

function moveTarget() {
  target.x = Math.random() * (canvas.width - 60) + 30;
  target.y = Math.random() * (canvas.height - 60) + 30;
}

function hit(x, y) {
  const dx = x - target.x;
  const dy = y - target.y;
  return Math.sqrt(dx * dx + dy * dy) < target.r;
}

canvas.addEventListener("click", handleClick);
canvas.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  handleClick({
    offsetX: touch.clientX,
    offsetY: touch.clientY
  });
});

function handleClick(e) {
  if (!gameRunning) return;

  if (hit(e.offsetX, e.offsetY)) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    moveTarget();
  } else {
    endGame();
  }
}

function endGame() {
  gameRunning = false;
  document.getElementById("gameOver").style.display = "flex";
}

function restartGame() {
  score = 0;
  gameRunning = true;
  document.getElementById("score").innerText = "Score: 0";
  document.getElementById("gameOver").style.display = "none";
  moveTarget();
  drawTarget();
}

moveTarget();
drawTarget();
