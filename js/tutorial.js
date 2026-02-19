// ============================================
// 魔方还原教程 - 可视化层先法
// ============================================

const TUTORIAL_STEPS = [
    {
        title: '第一步：底层白色十字',
        subtitle: '目标：在白色面形成十字，且棱块侧面颜色与中心一致',
        visual: 'cross',
        texts: [
            '找到白色中心面（通常放在底面），逐个将白色棱块归位。',
            '观察白色棱块在哪里，用直觉或简单公式将其移到底面形成十字。',
            '关键：十字的四个棱块侧面颜色必须和对应面的中心颜色一致。'
        ],
        cases: [
            { title: '白色棱在顶层正上方', algo: '前双 (直接翻下去)', desc: '棱在对面直接180°翻转' },
            { title: '白色棱在中层', algo: '前顺 或 前逆', desc: '转一下就到底面了' },
            { title: '白色棱在底层但方向反了', algo: '前顺 右顺 上顺 右逆 前双', desc: '先拿出来翻转再放回' }
        ],
        tip: '💡 这一步主要靠直觉，多练几次就会很快！先对好一个棱，其余棱尽量不破坏已完成的。'
    },
    {
        title: '第二步：底层四角归位',
        subtitle: '目标：完成整个白色底面，角块颜色与侧面中心匹配',
        visual: 'corners',
        texts: [
            '十字完成后，将四个白色角块放入正确位置。',
            '先在顶层找到白色角块，转动顶层让角块在目标位置正上方。'
        ],
        cases: [
            { title: '白色朝右', algo: '右顺 上顺 右逆', desc: '最常见情况' },
            { title: '白色朝前', algo: '前逆 上逆 前顺', desc: '镜像操作' },
            { title: '白色朝上', algo: '右顺 上双 右逆 上逆 右顺 上顺 右逆', desc: '需多做几步把白色翻到侧面' },
            { title: '角在底层位置错', algo: '右顺 上顺 右逆 (先取出再归位)', desc: '先把它提到顶层再处理' }
        ],
        tip: '💡 公式核心："右上提、上旋、右下压"。角块从哪一侧插入就用哪侧的公式。'
    },
    {
        title: '第三步：中层棱块归位',
        subtitle: '目标：完成前两层（底面 + 中间层，只剩顶层）',
        visual: 'middle',
        texts: [
            '找到顶层没有黄色的棱块，那就是中层的棱。',
            '转动顶层，让棱块正面颜色与中心一致，然后根据棱需要插入的方向使用公式。'
        ],
        cases: [
            { title: '棱插入右边', algo: '上顺 右顺 上逆 右逆 上逆 前逆 上顺 前顺', desc: '顶层棱需要向右插入' },
            { title: '棱插入左边', algo: '上逆 左逆 上顺 左顺 上顺 前顺 上逆 前逆', desc: '顶层棱需要向左插入（镜像）' },
            { title: '棱在中层但方向反了', algo: '用任意一个公式先把它取出到顶层，再用正确方向插入', desc: '' }
        ],
        tip: '💡 口诀："远离、回来、插入"。棱要去哪个方向，就先让它远离那个方向。'
    },
    {
        title: '第四步：顶层黄色十字',
        subtitle: '目标：顶面（黄色面）形成十字',
        visual: 'topcross',
        texts: [
            '此时顶面可能出现四种情况：已有十字（跳过）、L形、一字形、只有一个点。',
            '根据情况选择公式，都用同一个公式，只是起始状态不同。'
        ],
        cases: [
            { title: '只有中心点', algo: '前顺 右顺 上顺 右逆 上逆 前逆（做两次）', desc: '第一次变L形，转动后再做一次变十字' },
            { title: 'L形（放左后方）', algo: '前顺 右顺 上顺 右逆 上逆 前逆', desc: 'L形放在左后方做一次即可' },
            { title: '一字（横放）', algo: '前顺 右顺 上顺 右逆 上逆 前逆', desc: '一字横放做一次变十字' }
        ],
        tip: '💡 统一公式："前顺 右顺 上顺 右逆 上逆 前逆"。注意起始方向！'
    },
    {
        title: '第五步：顶面全黄',
        subtitle: '目标：顶面9个格子全部变成黄色',
        visual: 'topyellow',
        texts: [
            '十字做好后，还需要让四个角块的黄色也朝上。',
            '观察顶面黄色角块的位置，匹配以下情况之一。'
        ],
        cases: [
            { title: '小鱼1号（左前角黄朝前）', algo: '右顺 上顺 右逆 上顺 右顺 上双 右逆', desc: '保证左前角黄色朝前方' },
            { title: '小鱼2号（右前角黄朝右）', algo: '右逆 上逆 右顺 上逆 右逆 上双 右顺', desc: '保证右前角黄色朝右方' },
            { title: '其他情况', algo: '先做一次小鱼变成能识别的情况', desc: '多做几次小鱼即可' }
        ],
        tip: '💡 这步的关键是"找小鱼"。做一次公式后观察，反复操作直到顶面全黄。'
    },
    {
        title: '第六步：顶层角块归位',
        subtitle: '目标：四个角块到达正确位置（颜色可能未对齐）',
        visual: 'cornerspos',
        texts: [
            '转动顶层，看能否找到至少一组角已在正确位置（三面颜色与角相邻的中心一致）。',
            '把已归位的角放到右前方，执行公式。如果没有，随意做一次公式后再找。'
        ],
        cases: [
            { title: '有一角归位（放右前）', algo: '右顺 上顺 右逆 前逆 右顺 上逆 右逆 上顺 右顺 前顺 右双 上逆 右逆', desc: '把正确角放右前方' },
            { title: '四角全不对', algo: '做一次上述公式再检查', desc: '' }
        ],
        tip: '💡 这一步只管"位置"不管"方向"。角块在正确位置即可，颜色对不对没关系。'
    },
    {
        title: '第七步：顶层棱块归位',
        subtitle: '🎉 最后一步！让所有棱块回到正确位置',
        visual: 'done',
        texts: [
            '观察顶层四个棱块，找到已经归位的那一面（棱块颜色与中心一致）。',
            '把归位的面放到后面，根据其余三个棱需要顺时针还是逆时针交换来执行公式。'
        ],
        cases: [
            { title: '三棱顺时针换（归位面朝后）', algo: '右顺 上逆 右顺 上顺 右顺 上顺 右顺 上逆 右逆 上逆 右双', desc: '' },
            { title: '三棱逆时针换（归位面朝后）', algo: '右双 上顺 右顺 上顺 右逆 上逆 右逆 上逆 右逆 上顺 右逆', desc: '' },
            { title: '四棱全不对', algo: '做一次任意方向公式后再检查', desc: '' }
        ],
        tip: '🎉 完成！如果做对了，魔方就完全还原了。恭喜！'
    }
];

// 顶面状态SVG生成
function createTopFaceSVG(pattern, size = 120) {
    // pattern: 9个格的颜色 'Y'=黄 'G'=灰
    const s = size / 3;
    const colors = { Y: '#ffd32a', G: '#3a3f55', W: '#ffffff', R: '#e74c3c', O: '#e67e22', B: '#2d7dd2', Gr: '#00b16a' };
    let cells = '';
    for (let i = 0; i < 9; i++) {
        const r = Math.floor(i / 3), c = i % 3;
        const clr = colors[pattern[i]] || colors.G;
        cells += `<rect x="${c * s + 1}" y="${r * s + 1}" width="${s - 2}" height="${s - 2}" rx="3" fill="${clr}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`;
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${cells}</svg>`;
}

// 3D色块展示 (简单2.5D视角)
function createCubeVisualSVG(step) {
    const visuals = {
        cross: [
            'G', 'Y', 'G',
            'Y', 'Y', 'Y',
            'G', 'Y', 'G'
        ],
        corners: [
            'Y', 'Y', 'Y',
            'Y', 'Y', 'Y',
            'Y', 'Y', 'Y'
        ],
        middle: [
            'G', 'G', 'G',
            'G', 'G', 'G',
            'G', 'G', 'G'
        ],
        topcross: [
            'G', 'Y', 'G',
            'Y', 'Y', 'Y',
            'G', 'Y', 'G'
        ],
        topyellow: [
            'Y', 'Y', 'Y',
            'Y', 'Y', 'Y',
            'Y', 'Y', 'Y'
        ],
        cornerspos: [
            'Y', 'Y', 'Y',
            'Y', 'Y', 'Y',
            'Y', 'Y', 'Y'
        ],
        done: [
            'Y', 'Y', 'Y',
            'Y', 'Y', 'Y',
            'Y', 'Y', 'Y'
        ]
    };
    const pat = visuals[step] || visuals.cross;
    return createTopFaceSVG(pat, 120);
}

// 渲染教程步骤
let currentTutorialStep = 0;

function renderTutorialNav() {
    const nav = document.getElementById('tutorial-steps-nav');
    if (!nav) return;
    nav.innerHTML = TUTORIAL_STEPS.map((_, i) => `
    <button class="step-nav-btn ${i === currentTutorialStep ? 'active' : ''} ${i < currentTutorialStep ? 'done' : ''}"
            onclick="goToTutorialStep(${i})">${i + 1}</button>
  `).join('');
}

function renderTutorialContent() {
    const container = document.getElementById('tutorial-content');
    if (!container) return;
    const step = TUTORIAL_STEPS[currentTutorialStep];
    container.innerHTML = `
    <div class="tutorial-step" style="animation:fadeIn 0.3s ease">
      <div class="tutorial-step-title">${step.title}</div>
      <div class="tutorial-step-subtitle">${step.subtitle}</div>
      <div class="tutorial-visual">${createCubeVisualSVG(step.visual)}</div>
      ${step.texts.map(t => `<div class="tutorial-text">${t}</div>`).join('')}
      ${step.cases ? `
        <div class="tutorial-cases">
          ${step.cases.map(c => `
            <div class="tutorial-case">
              <div class="tutorial-case-title">${c.title}</div>
              ${c.desc ? `<div class="tutorial-text" style="font-size:12px;margin-bottom:4px">${c.desc}</div>` : ''}
              <div class="tutorial-algo-box">
                <div class="tutorial-algo-label">公式</div>
                <div class="tutorial-algo-text">${c.algo}</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
      ${step.tip ? `<div class="tutorial-tip">${step.tip}</div>` : ''}
      <div class="tutorial-nav-btns">
        <button class="btn btn-secondary" onclick="goToTutorialStep(${currentTutorialStep - 1})" ${currentTutorialStep === 0 ? 'disabled style="opacity:0.4"' : ''}>上一步</button>
        <button class="btn btn-primary" onclick="goToTutorialStep(${currentTutorialStep + 1})" ${currentTutorialStep === TUTORIAL_STEPS.length - 1 ? 'disabled style="opacity:0.4"' : ''}>${currentTutorialStep === TUTORIAL_STEPS.length - 1 ? '已完成 🎉' : '下一步'}</button>
      </div>
    </div>
  `;
}

function goToTutorialStep(i) {
    if (i < 0 || i >= TUTORIAL_STEPS.length) return;
    currentTutorialStep = i;
    renderTutorialNav();
    renderTutorialContent();
}

function initTutorial() {
    currentTutorialStep = 0;
    renderTutorialNav();
    renderTutorialContent();
}
