// ============================================
// 填色还原魔方
// ============================================

const FACE_NAMES = ['上(黄)', '前(红)', '右(蓝)', '后(橙)', '左(绿)', '下(白)'];
const FACE_KEYS = ['U', 'F', 'R', 'B', 'L', 'D'];
const COLOR_MAP = {
    W: { name: '白', hex: '#ffffff' },
    Y: { name: '黄', hex: '#ffd32a' },
    R: { name: '红', hex: '#e74c3c' },
    O: { name: '橙', hex: '#e67e22' },
    B: { name: '蓝', hex: '#2d7dd2' },
    G: { name: '绿', hex: '#00b16a' }
};
const COLOR_KEYS = Object.keys(COLOR_MAP);

let solverState = {};
let selectedColor = 'R';

function initSolver() {
    // 初始化状态 - 每个面9格
    FACE_KEYS.forEach(f => {
        solverState[f] = Array(9).fill('');
    });
    // 中心固定
    solverState['U'][4] = 'Y';
    solverState['D'][4] = 'W';
    solverState['F'][4] = 'R';
    solverState['B'][4] = 'O';
    solverState['L'][4] = 'G';
    solverState['R'][4] = 'B';

    renderColorPicker();
    renderCubeNet();
}

function renderColorPicker() {
    const picker = document.getElementById('color-picker');
    if (!picker) return;
    picker.innerHTML = COLOR_KEYS.map(k => `
    <div class="color-swatch ${k === selectedColor ? 'active' : ''}"
         style="background:${COLOR_MAP[k].hex}"
         onclick="selectColor('${k}')"
         title="${COLOR_MAP[k].name}"></div>
  `).join('');
}

function selectColor(c) {
    selectedColor = c;
    renderColorPicker();
}

function renderCubeNet() {
    const net = document.getElementById('cube-net');
    if (!net) return;
    // 十字形展开: 上-前右后左-下
    // Layout:     [U]
    //          [L][F][R][B]
    //             [D]
    net.innerHTML = `
    <div class="cube-net-row">
      <div style="width:98px"></div>
      ${renderFace('U', '上(黄)')}
    </div>
    <div class="cube-net-row">
      ${renderFace('L', '左(绿)')}
      ${renderFace('F', '前(红)')}
      ${renderFace('R', '右(蓝)')}
      ${renderFace('B', '后(橙)')}
    </div>
    <div class="cube-net-row">
      <div style="width:98px"></div>
      ${renderFace('D', '下(白)')}
    </div>
  `;
}

function renderFace(faceKey, label) {
    const cells = solverState[faceKey];
    return `<div>
    <div class="cube-face-label">${label}</div>
    <div class="cube-face">
      ${cells.map((c, i) => {
        const bg = c ? `background:${COLOR_MAP[c].hex}` : '';
        const isCenter = i === 4;
        return `<div class="cube-facelet" data-color="${c}" style="${bg}"
                     onclick="${isCenter ? '' : `setCellColor('${faceKey}',${i})`}"></div>`;
    }).join('')}
    </div>
  </div>`;
}

function setCellColor(face, idx) {
    solverState[face][idx] = selectedColor;
    renderCubeNet();
}

function resetSolver() {
    initSolver();
    document.getElementById('solver-result').classList.remove('show');
    document.getElementById('solver-result').innerHTML = '';
}

function solveCube() {
    const result = document.getElementById('solver-result');
    // 验证是否填完
    let empty = 0;
    FACE_KEYS.forEach(f => {
        solverState[f].forEach(c => { if (!c) empty++; });
    });
    if (empty > 0) {
        result.classList.add('show');
        result.innerHTML = `<h3>⚠️ 请先填完所有格子</h3><p style="color:var(--text-secondary);font-size:13px">还有 ${empty} 个格子未填色</p>`;
        return;
    }
    // 验证每色9个
    const counts = {};
    COLOR_KEYS.forEach(k => counts[k] = 0);
    FACE_KEYS.forEach(f => {
        solverState[f].forEach(c => { if (counts[c] !== undefined) counts[c]++; });
    });
    const invalid = COLOR_KEYS.filter(k => counts[k] !== 9);
    if (invalid.length > 0) {
        result.classList.add('show');
        result.innerHTML = `<h3>⚠️ 颜色数量不对</h3><p style="color:var(--text-secondary);font-size:13px">每种颜色应该恰好9个。${invalid.map(k => COLOR_MAP[k].name + ':' + counts[k] + '个').join('，')}</p>`;
        return;
    }

    // 生成还原步骤（基于层先法提示）
    const steps = generateSolveSteps();
    result.classList.add('show');
    result.innerHTML = `
    <h3>✅ 还原步骤（层先法）</h3>
    ${steps.map((s, i) => `
      <div class="solver-step">
        <span class="solver-step-num">${i + 1}.</span>
        ${s.text}
        ${s.algo ? `<div class="solver-step-algo">${s.algo}</div>` : ''}
      </div>
    `).join('')}
  `;
}

function generateSolveSteps() {
    // 简化的还原提示 - 按层先法7步给出指导
    return [
        { text: '第一步：做白色底层十字', algo: '找到白色棱块，将它们逐个移到底面。公式参考：前双 / 右逆 前逆 上逆 前顺 / 前顺' },
        { text: '第二步：底层角块归位', algo: '白色角块送到正确位置。公式：右顺 上顺 右逆 / 前逆 上逆 前顺' },
        { text: '第三步：中层棱块归位', algo: '向右插入：上顺 右顺 上逆 右逆 上逆 前逆 上顺 前顺\n向左插入：上逆 左逆 上顺 左顺 上顺 前顺 上逆 前逆' },
        { text: '第四步：顶层黄色十字', algo: '前顺 右顺 上顺 右逆 上逆 前逆（根据情况做1~3次）' },
        { text: '第五步：顶面全黄', algo: '小鱼1：右顺 上顺 右逆 上顺 右顺 上双 右逆\n小鱼2：右逆 上逆 右顺 上逆 右逆 上双 右顺' },
        { text: '第六步：顶层角块归位', algo: '右顺 上顺 右逆 前逆 右顺 上逆 右逆 上顺 右顺 前顺 右双 上逆 右逆' },
        { text: '第七步：顶层棱块归位 🎉', algo: '顺时针：右顺 上逆 右顺 上顺 右顺 上顺 右顺 上逆 右逆 上逆 右双\n逆时针：右双 上顺 右顺 上顺 右逆 上逆 右逆 上逆 右逆 上顺 右逆' }
    ];
}

// 绑定按钮事件
document.addEventListener('DOMContentLoaded', () => {
    const resetBtn = document.getElementById('solver-reset');
    const solveBtn = document.getElementById('solver-solve');
    if (resetBtn) resetBtn.addEventListener('click', resetSolver);
    if (solveBtn) solveBtn.addEventListener('click', solveCube);
});
