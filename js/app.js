// ============================================
// 全局应用逻辑 - 导航与初始化
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Tab 导航
    const tabs = document.querySelectorAll('.tab-btn');
    const pages = document.querySelectorAll('.page');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            pages.forEach(p => {
                p.classList.remove('active');
                if (p.id === 'page-' + target) p.classList.add('active');
            });
            // 初始化对应模块
            if (target === 'tutorial') initTutorial();
            if (target === 'solver') initSolver();
            if (target === 'timer') initTimer();
            if (target === 'cube3d') {
                setTimeout(() => initCube3D(), 50);
            }
        });
    });

    // 公式分类Tab
    const catBtns = document.querySelectorAll('.cat-btn');
    let currentCat = 'cross';
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentCat = btn.dataset.cat;
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderFormulas(currentCat, document.getElementById('formula-search').value);
        });
    });

    // 搜索
    const searchInput = document.getElementById('formula-search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            renderFormulas(currentCat, searchInput.value);
        });
    }

    // 初始加载公式页
    renderFormulas('cross', '');
});
