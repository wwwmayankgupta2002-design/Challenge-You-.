const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 120;

let score = 0;
let miss = 0;
let gameRunning = true;

let target = {
  x: 150,
  y: 200,
  r: 35
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // target
  ctx.beginPath();
  ctx.arc(target.x, target.y, target.r, 0, Math.PI * 2);
  ctx.fillStyle = "#00eaff";
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.font = "16px Arial";
  ctx.fillText("Miss: " + miss + "/3", 10, canvas.height - 20);
}

function moveTarget() {
  target.x = Math.random() * (canvas.width - 80) + 40;
  target.y = Math.random() * (canvas.height - 160) + 40;
}

function isHit(x, y) {
  const dx = x - target.x;
  const dy = y - target.y;
  return Math.sqrt(dx * dx + dy * dy) <= target.r;
}

// CLICK
canvas.addEventListener("click", e => {
  handleTouch(e.clientX, e.clientY);
});

// TOUCH (mobile)
canvas.addEventListener("touchstart", e => {
  const t = e.touches[0];
  handleTouch(t.clientX, t.clientY);
});

function handleTouch(x, y) {
  if (!gameRunning) return;

  if (isHit(x, y)) {
    // ✅ HIT → SCORE
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    moveTarget();
  } else {
    // ❌ MISS
    miss++;
    if (miss >= 3) {
      gameOver();
      return;
    }
  }
  draw();
}

function gameOver() {
  gameRunning = false;
  document.getElementById("gameOver").style.display = "flex";
}

function restartGame() {
  score = 0;
  miss = 0;
  gameRunning = true;
  document.getElementById("score").innerText = "Score: 0";
  document.getElementById("gameOver").style.display = "none";
  moveTarget();
  draw();
}

moveTarget();
draw();
