// 時計の更新関数
function updateClock(clockId, timeOffset = 0) {
    const clockElement = document.getElementById(clockId);
    if (!clockElement) return;

    // 現在時刻にオフセットを加算
    const now = new Date(Date.now() + timeOffset);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// 拡大表示用オーバーレイの設定
function setupOverlay() {
    // オーバーレイ関連の要素
    const overlay = document.getElementById('clock-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayClock = document.getElementById('overlay-clock');
    const closeButton = document.getElementById('overlay-close');
    
    if (!overlay || !overlayTitle || !overlayClock || !closeButton) {
        console.error('オーバーレイ要素が見つかりません');
        return;
    }
    
    // 全ての時計ラッパー要素を取得
    const clockWrappers = document.querySelectorAll('.clock-wrapper');
    
    // 各時計にクリックイベントを設定
    clockWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            // クリックされた時計の情報を取得
            const title = wrapper.querySelector('h2').textContent;
            const clockId = wrapper.querySelector('.clock').id;
            const isJST = wrapper.classList.contains('jst-clock-wrapper');
            
            // 時計のオフセットを取得（データ属性から）
            const clockElement = document.getElementById(clockId);
            const offset = parseInt(clockElement.dataset.offset || '0');
            
            // オーバーレイに情報をセット
            overlayTitle.textContent = title;
            if (isJST) {
                overlayTitle.classList.add('jst');
                overlayClock.classList.add('jst');
            } else {
                overlayTitle.classList.remove('jst');
                overlayClock.classList.remove('jst');
            }
            
            // オーバーレイを表示
            overlay.classList.remove('overlay-hidden');
            
            // 拡大表示用時計のID
            overlayClock.id = 'overlay-clock';
            
            // 時計の更新関数を設定（元の時計と同じオフセット）
            updateOverlayClock(offset);
            const intervalId = setInterval(() => updateOverlayClock(offset), 1000);
            
            // 閉じるボタンにイベントリスナーを設定 - closeButtonのみを扱う
            closeButton.onclick = () => {
                overlay.classList.add('overlay-hidden');
                clearInterval(intervalId); // 時計の更新を停止
            };
        });
    });
}

// オーバーレイ内の時計を更新する関数
function updateOverlayClock(offset) {
    const now = new Date(Date.now() + offset);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('overlay-clock').textContent = `${hours}:${minutes}:${seconds}`;
}

function startClocks() {
    // 日本標準時 (JST) のオフセットを計算
    const localOffsetMinutes = new Date().getTimezoneOffset();
    const jstOffsetFromLocal = (540 + localOffsetMinutes) * 60 * 1000;
    
    // 各時計の設定
    const clocks = [
        { id: 'clock1', offset: 0 },
        { id: 'clock2', offset: 0 }, // 元の57秒進みから変更
        { id: 'clock3', offset: 0 },
        { id: 'clock4', offset: 57 * 1000 }, // 電気電子工学実験室を57秒進める
        { id: 'clock5', offset: jstOffsetFromLocal }
    ];
    
    // 各時計を初期化
    clocks.forEach(clock => {
        const element = document.getElementById(clock.id);
        if (element) {
            // オフセット情報をデータ属性として保存（拡大表示時に使用）
            element.dataset.offset = clock.offset.toString();
            
            // 時計を更新
            updateClock(clock.id, clock.offset);
            setInterval(() => updateClock(clock.id, clock.offset), 1000);
        }
    });
}

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
    startClocks(); // 時計の初期化
    setupOverlay(); // オーバーレイの設定
});
