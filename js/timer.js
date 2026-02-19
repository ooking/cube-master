// ============================================
// 魔方计时器
// ============================================

let timerRunning = false;
let timerStartTime = 0;
let timerElapsed = 0;
let timerRAF = null;
let timerReady = false;
let timerHistory = [];

const MOVES_CN = ['右顺', '右逆', '右双', '左顺', '左逆', '左双', '上顺', '上逆', '上双', '下顺', '下逆', '下双', '前顺', '前逆', '前双', '后顺', '后逆', '后双'];
const MOVES_EN = ["R", "R'", "R2", "L", "L'", "L2", "U", "U'", "U2", "D", "D'", "D2", "F", "F'", "F2", "B", "B'", "B2"];

function generateScramble(len = 20) {
    const moves = [];
    let lastFace = -1;
    for (let i = 0; i < len; i++) {
        let face;
        do { face = Math.floor(Math.random() * 6); } while (face === lastFace);
        lastFace = face;
        const dir = Math.floor(Math.random() * 3);
        moves.push(MOVES_CN[face * 3 + dir]);
    }
    return moves.join(' ');
}

function displayScramble() {
    const el = document.getElementById('scramble-display');
    if (el) el.textContent = generateScramble();
}

function startTimer() {
    timerRunning = true;
    timerStartTime = performance.now() - timerElapsed;
    const display = document.getElementById('timer-display');
    display.classList.remove('ready');
    display.classList.add('running');
    document.getElementById('timer-hint').textContent = '计时中...再次点击停止';
    function tick() {
        timerElapsed = performance.now() - timerStartTime;
        display.textContent = formatTime(timerElapsed);
        timerRAF = requestAnimationFrame(tick);
    }
    tick();
}

function stopTimer() {
    timerRunning = false;
    cancelAnimationFrame(timerRAF);
    const display = document.getElementById('timer-display');
    display.classList.remove('running');
    document.getElementById('timer-hint').textContent = '点击屏幕或按空格开始新计时';
    // 记录成绩
    timerHistory.unshift({ time: timerElapsed, date: new Date() });
    timerElapsed = 0;
    renderTimerStats();
    renderTimerHistory();
    displayScramble();
}

function formatTime(ms) {
    const s = ms / 1000;
    return s.toFixed(3);
}

function renderTimerStats() {
    const el = document.getElementById('timer-stats');
    if (!el || timerHistory.length === 0) {
        if (el) el.innerHTML = '';
        return;
    }
    const times = timerHistory.map(h => h.time);
    const best = Math.min(...times);
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const ao5 = times.length >= 5 ? calcAo(times.slice(0, 5)) : null;
    const ao12 = times.length >= 12 ? calcAo(times.slice(0, 12)) : null;

    el.innerHTML = `
    <div class="stat-card"><div class="stat-label">最佳</div><div class="stat-value">${formatTime(best)}</div></div>
    <div class="stat-card"><div class="stat-label">平均</div><div class="stat-value">${formatTime(avg)}</div></div>
    <div class="stat-card"><div class="stat-label">Ao5</div><div class="stat-value">${ao5 !== null ? formatTime(ao5) : '-'}</div></div>
    <div class="stat-card"><div class="stat-label">Ao12</div><div class="stat-value">${ao12 !== null ? formatTime(ao12) : '-'}</div></div>
  `;
}

function calcAo(times) {
    if (times.length < 3) return times.reduce((a, b) => a + b, 0) / times.length;
    const sorted = [...times].sort((a, b) => a - b);
    // 去掉最好和最差
    const trimmed = sorted.slice(1, -1);
    return trimmed.reduce((a, b) => a + b, 0) / trimmed.length;
}

function renderTimerHistory() {
    const el = document.getElementById('timer-history');
    if (!el) return;
    el.innerHTML = timerHistory.map((h, i) => `
    <div class="history-item">
      <span class="history-num">#${timerHistory.length - i}</span>
      <span class="history-time">${formatTime(h.time)}</span>
      <button class="history-del" onclick="deleteHistory(${i})">×</button>
    </div>
  `).join('');
}

function deleteHistory(i) {
    timerHistory.splice(i, 1);
    renderTimerStats();
    renderTimerHistory();
}

function initTimer() {
    displayScramble();
    renderTimerStats();
    renderTimerHistory();

    // 点击/空格控制
    const timerPage = document.getElementById('page-timer');
    if (!timerPage) return;

    timerPage.addEventListener('click', (e) => {
        if (e.target.closest('.btn') || e.target.closest('.history-del') || e.target.closest('.scramble-display')) return;
        toggleTimer();
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && document.getElementById('page-timer').classList.contains('active')) {
            e.preventDefault();
            if (!timerRunning && !timerReady) {
                timerReady = true;
                document.getElementById('timer-display').classList.add('ready');
                document.getElementById('timer-display').textContent = '0.000';
            }
        }
    });
    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space' && document.getElementById('page-timer').classList.contains('active')) {
            e.preventDefault();
            if (timerReady && !timerRunning) {
                timerReady = false;
                startTimer();
            } else if (timerRunning) {
                stopTimer();
            }
        }
    });

    const newScrambleBtn = document.getElementById('new-scramble');
    if (newScrambleBtn) newScrambleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        displayScramble();
    });
}

function toggleTimer() {
    if (timerRunning) {
        stopTimer();
    } else {
        timerElapsed = 0;
        document.getElementById('timer-display').textContent = '0.000';
        startTimer();
    }
}
