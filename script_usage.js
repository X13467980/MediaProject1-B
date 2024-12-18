// ビューポート内の要素かどうかをチェックする関数
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// スクロール時のフェードイン効果を処理する関数
function handleScroll() {
    var elements = document.querySelectorAll('.fade-in');
    elements.forEach(function (element) {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// スクロールイベントリスナーを追加
window.addEventListener('scroll', handleScroll);

// ページ読み込み完了時の処理
window.addEventListener('load', function() {
    // 初期スクロール処理を実行
    handleScroll();

    // フェードイン効果のためのクラスを追加
    document.querySelectorAll('section').forEach(function(section) {
        section.classList.add('fade-in');
    });
});

// スムーズスクロール機能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});