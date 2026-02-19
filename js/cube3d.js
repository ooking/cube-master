// ============================================
// 3D 魔方 (Three.js) - 支持 1~12 阶
// ============================================

let cube3dScene, cube3dCamera, cube3dRenderer, cube3dControls;
let cubeGroup;
let cubeOrder = 3;
let cubePieces = [];
let isAnimating = false;
let cube3dInited = false;

const FACE_COLORS = {
    U: 0xffd32a, // 黄
    D: 0xffffff, // 白
    F: 0xe74c3c, // 红
    B: 0xe67e22, // 橙
    L: 0x00b16a, // 绿
    R: 0x2d7dd2  // 蓝
};

function initCube3D() {
    if (cube3dInited) {
        resizeCube3D();
        return;
    }
    cube3dInited = true;

    const canvas = document.getElementById('cube3d-canvas');
    const page = document.getElementById('page-cube3d');
    const w = page.clientWidth;
    const h = page.clientHeight;

    cube3dScene = new THREE.Scene();
    cube3dScene.background = new THREE.Color(0x0a0e1a);

    cube3dCamera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    setCameraDistance();

    cube3dRenderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    cube3dRenderer.setSize(w, h);
    cube3dRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 光照
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    cube3dScene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 8, 5);
    cube3dScene.add(dirLight);

    buildCube(cubeOrder);
    setupOrbitControls(canvas);

    // 按钮
    document.getElementById('cube-order').addEventListener('change', (e) => {
        cubeOrder = parseInt(e.target.value);
        buildCube(cubeOrder);
        setCameraDistance();
    });
    document.getElementById('cube3d-scramble').addEventListener('click', scrambleCube3D);
    document.getElementById('cube3d-reset').addEventListener('click', () => buildCube(cubeOrder));

    animate3D();
    window.addEventListener('resize', resizeCube3D);
}

function setCameraDistance() {
    const dist = cubeOrder * 1.8 + 3;
    cube3dCamera.position.set(dist * 0.7, dist * 0.6, dist * 0.9);
    cube3dCamera.lookAt(0, 0, 0);
}

function resizeCube3D() {
    const page = document.getElementById('page-cube3d');
    if (!page || !cube3dRenderer) return;
    const w = page.clientWidth;
    const h = page.clientHeight;
    cube3dCamera.aspect = w / h;
    cube3dCamera.updateProjectionMatrix();
    cube3dRenderer.setSize(w, h);
}

function buildCube(order) {
    if (cubeGroup) cube3dScene.remove(cubeGroup);
    cubeGroup = new THREE.Group();
    cubePieces = [];

    const gap = 0.06;
    const size = 1;
    const half = (order - 1) / 2;

    for (let x = 0; x < order; x++) {
        for (let y = 0; y < order; y++) {
            for (let z = 0; z < order; z++) {
                // 只渲染外层块
                if (x > 0 && x < order - 1 && y > 0 && y < order - 1 && z > 0 && z < order - 1) continue;

                const materials = [];
                for (let face = 0; face < 6; face++) {
                    let color = 0x1a1a2e; // 内部色
                    // Three.js Box faces: +X, -X, +Y, -Y, +Z, -Z
                    if (face === 0 && x === order - 1) color = FACE_COLORS.R;
                    if (face === 1 && x === 0) color = FACE_COLORS.L;
                    if (face === 2 && y === order - 1) color = FACE_COLORS.U;
                    if (face === 3 && y === 0) color = FACE_COLORS.D;
                    if (face === 4 && z === order - 1) color = FACE_COLORS.F;
                    if (face === 5 && z === 0) color = FACE_COLORS.B;
                    materials.push(new THREE.MeshPhongMaterial({
                        color, flatShading: false,
                        shininess: 30
                    }));
                }

                const geom = new THREE.BoxGeometry(size - gap, size - gap, size - gap);
                // 边框效果
                const roundGeom = new THREE.BoxGeometry(size - gap * 0.5, size - gap * 0.5, size - gap * 0.5);
                const edgeMat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });
                const edges = new THREE.LineSegments(new THREE.EdgesGeometry(roundGeom), edgeMat);

                const piece = new THREE.Mesh(geom, materials);
                piece.position.set(
                    (x - half) * (size + gap * 0.5),
                    (y - half) * (size + gap * 0.5),
                    (z - half) * (size + gap * 0.5)
                );
                piece.add(edges);
                edges.position.set(0, 0, 0);

                piece.userData = { gx: x, gy: y, gz: z };
                cubeGroup.add(piece);
                cubePieces.push(piece);
            }
        }
    }

    cube3dScene.add(cubeGroup);
}

// Orbit controls (简易手动实现)
let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let rotX = 0.5, rotY = 0.5;

function setupOrbitControls(canvas) {
    canvas.addEventListener('pointerdown', (e) => {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
    });
    canvas.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        rotY += dx * 0.008;
        rotX += dy * 0.008;
        rotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotX));
        if (cubeGroup) {
            cubeGroup.rotation.y = rotY;
            cubeGroup.rotation.x = rotX;
        }
        prevMouse = { x: e.clientX, y: e.clientY };
    });
    canvas.addEventListener('pointerup', () => { isDragging = false; });
    canvas.addEventListener('pointerleave', () => { isDragging = false; });
}

// 打乱动画
async function scrambleCube3D() {
    if (isAnimating) return;
    isAnimating = true;
    const axes = ['x', 'y', 'z'];
    const moves = cubeOrder * 6;

    for (let m = 0; m < moves; m++) {
        const axis = axes[Math.floor(Math.random() * 3)];
        const layerIdx = Math.floor(Math.random() * cubeOrder);
        const dir = Math.random() > 0.5 ? 1 : -1;
        await animateLayerRotation(axis, layerIdx, dir * Math.PI / 2, 80);
    }
    isAnimating = false;
}

function animateLayerRotation(axis, layerIdx, angle, duration) {
    return new Promise(resolve => {
        const half = (cubeOrder - 1) / 2;
        const gap = 0.06;
        const size = 1;
        const layerPos = (layerIdx - half) * (size + gap * 0.5);
        const threshold = 0.3;

        // 找出属于该层的块
        const layerPieces = cubePieces.filter(p => {
            const pos = new THREE.Vector3();
            p.getWorldPosition(pos);
            cubeGroup.worldToLocal(pos);
            if (axis === 'x') return Math.abs(pos.x - layerPos) < threshold;
            if (axis === 'y') return Math.abs(pos.y - layerPos) < threshold;
            return Math.abs(pos.z - layerPos) < threshold;
        });

        // 创建临时旋转组
        const tempGroup = new THREE.Group();
        cubeGroup.add(tempGroup);
        layerPieces.forEach(p => {
            cubeGroup.remove(p);
            tempGroup.add(p);
        });

        const start = performance.now();
        function step(now) {
            const t = Math.min((now - start) / duration, 1);
            const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            tempGroup.rotation[axis] = angle * ease;
            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                // 完成：把块从临时组移回
                tempGroup.rotation[axis] = angle;
                tempGroup.updateMatrixWorld();
                layerPieces.forEach(p => {
                    p.applyMatrix4(tempGroup.matrixWorld);
                    const invParent = new THREE.Matrix4();
                    invParent.copy(cubeGroup.matrixWorld).invert();
                    p.applyMatrix4(invParent);
                    tempGroup.remove(p);
                    cubeGroup.add(p);
                });
                cubeGroup.remove(tempGroup);
                resolve();
            }
        }
        requestAnimationFrame(step);
    });
}

function animate3D() {
    requestAnimationFrame(animate3D);
    if (cube3dRenderer && cube3dScene && cube3dCamera) {
        cube3dRenderer.render(cube3dScene, cube3dCamera);
    }
}
