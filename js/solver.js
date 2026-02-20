// ============================================
// 填色还原魔方 - 3D 交互版
// ============================================

const FACE_NAMES = ['上(黄)', '前(红)', '右(蓝)', '后(橙)', '左(绿)', '下(白)'];
const FACE_KEYS = ['U', 'F', 'R', 'B', 'L', 'D'];
const COLOR_MAP = {
  W: { name: '白', hex: '#ffffff', hexNum: 0xffffff },
  Y: { name: '黄', hex: '#ffd32a', hexNum: 0xffd32a },
  R: { name: '红', hex: '#e74c3c', hexNum: 0xe74c3c },
  O: { name: '橙', hex: '#e67e22', hexNum: 0xe67e22 },
  B: { name: '蓝', hex: '#2d7dd2', hexNum: 0x2d7dd2 },
  G: { name: '绿', hex: '#00b16a', hexNum: 0x00b16a }
};
const COLOR_KEYS = Object.keys(COLOR_MAP);

let solverState = {};
let selectedColor = 'R';

// 3D 相关变量
let solverScene, solverCamera, solverRenderer;
let solverGroup;
let solverPieces = [];
let solverFacelets = []; // 需要射线的面
let solverRaycaster, solverMouse;
let solverInited = false;
let autoRotateTimeout = null;

// Three.js 面索引到 UFRBLD 键及格子的映射 (与原2D一致)
const FACELET_MAPPINGS = {
  // face 0: +X (Right, B)
  0: { key: 'R', getIndex: (x, y, z) => (2 - y) * 3 + (2 - z) },
  // face 1: -X (Left, G)
  1: { key: 'L', getIndex: (x, y, z) => (2 - y) * 3 + z },
  // face 2: +Y (Up, Y)
  2: { key: 'U', getIndex: (x, y, z) => z * 3 + x },
  // face 3: -Y (Down, W)
  3: { key: 'D', getIndex: (x, y, z) => (2 - z) * 3 + x },
  // face 4: +Z (Front, R)
  4: { key: 'F', getIndex: (x, y, z) => (2 - y) * 3 + x },
  // face 5: -Z (Back, O)
  5: { key: 'B', getIndex: (x, y, z) => (2 - y) * 3 + (2 - x) }
};

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

  // 初始化3D画布
  if (!solverInited) {
    initSolver3D();
    solverInited = true;
  } else {
    updateSolver3DColors();
  }
}

function initSolver3D() {
  const container = document.getElementById('cube-net');
  if (!container) return;

  // 创建画布容器
  container.innerHTML = `
        <div class="solver-3d-hint">滑动旋转视角，点击色块填色</div>
        <canvas id="solver-3d-canvas"></canvas>
    `;
  const canvas = document.getElementById('solver-3d-canvas');
  const w = container.clientWidth || window.innerWidth - 32;
  const h = 300;

  solverScene = new THREE.Scene();
  solverCamera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
  solverCamera.position.set(4, 3, 5);
  solverCamera.lookAt(0, 0, 0);

  solverRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  solverRenderer.setSize(w, h);
  solverRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  solverScene.add(ambient);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(5, 8, 5);
  solverScene.add(dirLight);

  solverRaycaster = new THREE.Raycaster();
  solverMouse = new THREE.Vector2();

  buildSolverCube();
  setupSolverControls(canvas);

  animateSolver3D();
}

function buildSolverCube() {
  if (solverGroup) solverScene.remove(solverGroup);
  solverGroup = new THREE.Group();
  solverPieces = [];
  solverFacelets = [];

  const order = 3;
  const gap = 0.05;
  const size = 1;
  const half = 1;

  for (let x = 0; x < order; x++) {
    for (let y = 0; y < order; y++) {
      for (let z = 0; z < order; z++) {
        if (x === 1 && y === 1 && z === 1) continue;

        const materials = [];
        for (let face = 0; face < 6; face++) {
          let colorCode = 0x3a3f55; // 默认空色
          let isOuter = false;

          if (face === 0 && x === 2) isOuter = true;
          if (face === 1 && x === 0) isOuter = true;
          if (face === 2 && y === 2) isOuter = true;
          if (face === 3 && y === 0) isOuter = true;
          if (face === 4 && z === 2) isOuter = true;
          if (face === 5 && z === 0) isOuter = true;

          if (!isOuter) colorCode = 0x1a1a2e; // 内色

          materials.push(new THREE.MeshPhongMaterial({
            color: colorCode, shininess: 40
          }));
        }

        const geom = new THREE.BoxGeometry(size - gap, size - gap, size - gap);

        // 边框
        const edgeGeom = new THREE.BoxGeometry(size - gap + 0.01, size - gap + 0.01, size - gap + 0.01);
        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(edgeGeom),
          new THREE.LineBasicMaterial({ color: 0x000000 })
        );

        const piece = new THREE.Mesh(geom, materials);
        piece.position.set(
          (x - half) * size,
          (y - half) * size,
          (z - half) * size
        );
        piece.add(edges);
        piece.userData = { cx: x, cy: y, cz: z };

        solverGroup.add(piece);
        solverPieces.push(piece);
      }
    }
  }

  // 初始颜色同步
  updateSolver3DColors();

  // 默认展示一个好看的角度
  solverGroup.rotation.set(0.3, -0.5, 0);
  solverScene.add(solverGroup);
}

function updateSolver3DColors() {
  if (!solverPieces.length) return;

  solverPieces.forEach(piece => {
    const { cx, cy, cz } = piece.userData;
    for (let face = 0; face < 6; face++) {
      let isOuter = false;

      if (face === 0 && cx === 2) isOuter = true;
      if (face === 1 && cx === 0) isOuter = true;
      if (face === 2 && cy === 2) isOuter = true;
      if (face === 3 && cy === 0) isOuter = true;
      if (face === 4 && cz === 2) isOuter = true;
      if (face === 5 && cz === 0) isOuter = true;

      if (isOuter) {
        const mapInfo = FACELET_MAPPINGS[face];
        const key = mapInfo.key;
        const idx = mapInfo.getIndex(cx, cy, cz);
        const c = solverState[key][idx];

        piece.material[face].color.setHex(c ? COLOR_MAP[c].hexNum : 0x3a3f55);

        // 给可点击面添加标记
        piece.userData[`face_${face}`] = { key, idx };
      }
    }
  });
}

let solverDragging = false;
let sPrevMouse = { x: 0, y: 0 };
let solverRotX = 0, solverRotY = 0;
let clickMoved = false;

function setupSolverControls(canvas) {
  canvas.addEventListener('pointerdown', (e) => {
    solverDragging = true;
    clickMoved = false;
    sPrevMouse = { x: e.clientX, y: e.clientY };
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!solverDragging) return;
    const dx = e.clientX - sPrevMouse.x;
    const dy = e.clientY - sPrevMouse.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) clickMoved = true;

    solverRotY += dx * 0.01;
    solverRotX += dy * 0.01;

    solverGroup.rotation.y = solverRotY;
    solverGroup.rotation.x = solverRotX;

    sPrevMouse = { x: e.clientX, y: e.clientY };
  });

  canvas.addEventListener('pointerup', (e) => {
    solverDragging = false;
    if (!clickMoved) handleSolverClick(e, canvas);
  });

  canvas.addEventListener('pointerleave', () => {
    solverDragging = false;
  });
}

function handleSolverClick(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  solverMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  solverMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  solverRaycaster.setFromCamera(solverMouse, solverCamera);

  // 拾取 mesh
  const intersects = solverRaycaster.intersectObjects(solverPieces);
  if (intersects.length > 0) {
    const hit = intersects[0];
    const faceIndex = Math.floor(hit.faceIndex / 2); // Three.js BoxGeometry 每个面有2个三角形
    const piece = hit.object;
    const faceData = piece.userData[`face_${faceIndex}`];

    if (faceData) {
      const { key, idx } = faceData;
      // 中心块不变
      if (idx !== 4) {
        solverState[key][idx] = selectedColor;
        updateSolver3DColors();

        // 点击后微小反馈动画
        piece.scale.set(0.9, 0.9, 0.9);
        setTimeout(() => piece.scale.set(1, 1, 1), 100);
      }
    }
  }
}

function animateSolver3D() {
  requestAnimationFrame(animateSolver3D);
  if (solverRenderer && solverScene && solverCamera) {
    solverRenderer.render(solverScene, solverCamera);
  }
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
