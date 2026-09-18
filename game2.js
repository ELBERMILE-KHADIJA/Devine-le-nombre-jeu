const viewLevel = document.getElementById('view-level');
const viewGame = document.getElementById('view-game');
const viewWin = document.getElementById('view-win');

const rangeBadge = document.getElementById('range-badge');
const guessInput = document.getElementById('guess-input');
const feedback = document.getElementById('feedback');
const attemptsEl = document.getElementById('attempts');
const submitBtn = document.getElementById('submit-btn');

const winNumber = document.getElementById('win-number');
const winAttempts = document.getElementById('win-attempts');
const replayBtn = document.getElementById('replay-btn');
const quitBtn = document.getElementById('quit-btn');

const dots = [document.getElementById('dot1'), document.getElementById('dot2'), document.getElementById('dot3')];

let secret = null;
let maxRange = 30;
let currentLevel = 1;
let attempts = 1;

function showView(view) {
  [viewLevel, viewGame, viewWin].forEach(v => v.classList.remove('active'));
  view.classList.add('active');
}

function setDots(level) {
  dots.forEach((d, i) => d.classList.toggle('on', i < level));
}

function startGame(level, max) {
  currentLevel = level;
  maxRange = max;
  secret = Math.floor(Math.random() * max) + 1;
  attempts = 1;
  rangeBadge.textContent = `1 à ${max}`;
  guessInput.value = '';
  feedback.textContent = 'Entrez votre premier nombre';
  feedback.className = 'feedback neutral';
  attemptsEl.textContent = 'Tentative n° 1';
  setDots(level);
  showView(viewGame);
  setTimeout(() => guessInput.focus(), 50);
}

document.querySelectorAll('.level-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const level = parseInt(btn.dataset.level, 10);
    const max = parseInt(btn.dataset.max, 10);
    startGame(level, max);
  });
});

function handleGuess() {
  const raw = guessInput.value.trim();
  if (raw === '') {
    feedback.textContent = 'Entrez un nombre valide';
    feedback.className = 'feedback down';
    return;
  }
  const x = parseInt(raw, 10);
  if (isNaN(x) || x < 1 || x > maxRange) {
    feedback.textContent = `Un nombre entre 1 et ${maxRange}, s'il vous plaît`;
    feedback.className = 'feedback down';
    return;
  }

  if (x === secret) {
    winNumber.textContent = secret;
    winAttempts.textContent = attempts;
    showView(viewWin);
    return;
  }

  if (x < secret) {
    feedback.textContent = '⬆ Trop petit, essayez plus grand';
    feedback.className = 'feedback up';
  } else {
    feedback.textContent = '⬇ Trop grand, essayez plus petit';
    feedback.className = 'feedback down';
  }
  attempts += 1;
  attemptsEl.textContent = `Tentative n° ${attempts}`;
  guessInput.value = '';
  guessInput.focus();
}

submitBtn.addEventListener('click', handleGuess);
guessInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleGuess();
});

replayBtn.addEventListener('click', () => {
  const max = maxRange;
  startGame(currentLevel, max);
});

quitBtn.addEventListener('click', () => {
  setDots(0);
  showView(viewLevel);
});