// 時計をバッチリ更新するヨ！🕒✨ ナンチャッテ
function updateClock(clockId, timeOffset = 0) {
    const clockElement = document.getElementById(clockId);
    if (!clockElement) return;

    // 今の時間にオフセットを足しちゃうネ〜😊
    const now = new Date(Date.now() + timeOffset);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// 拡大表示のオーバーレイを設定するヨ！💕 キレイに見えるようにね〜
function setupOverlay() {
    // オーバーレイの要素たち、ゲットだぜ！👍😁
    const overlay = document.getElementById('clock-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayClock = document.getElementById('overlay-clock');
    const closeButton = document.getElementById('overlay-close');
    
    if (!overlay || !overlayTitle || !overlayClock || !closeButton) {
        console.error('オーバーレイ要素が見つからないヨ〜😅💦 ちょっとグロッキーだね');
        return;
    }
    
    // 時計ラッパーを全部ゲットするヨ！✨
    const clockWrappers = document.querySelectorAll('.clock-wrapper');
    
    // 各時計にクリックしたら動く魔法をかけちゃうネ！😊
    clockWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            // クリックされた時計の秘密情報をゲット！ナイスだネ〜👍
            const title = wrapper.querySelector('h2').textContent;
            const clockId = wrapper.querySelector('.clock').id;
            const isJST = wrapper.classList.contains('jst-clock-wrapper');
            
            // 時計のオフセット情報を取得、昔はこんなの手動だったヨ！💦
            const clockElement = document.getElementById(clockId);
            const offset = parseInt(clockElement.dataset.offset || '0');
            
            // オーバーレイにセットするヨ！バッチリだネ😁
            overlayTitle.textContent = title;
            if (isJST) {
                overlayTitle.classList.add('jst');
                overlayClock.classList.add('jst');
            } else {
                overlayTitle.classList.remove('jst');
                overlayClock.classList.remove('jst');
            }
            
            // オーバーレイをドーンと表示！😍✨
            overlay.classList.remove('overlay-hidden');
            
            // 拡大表示用時計のIDを設定、コレ重要だヨ！
            overlayClock.id = 'overlay-clock';
            
            // 時計の更新関数をセット、おじさん得意のテクニックだヨ！😁
            updateOverlayClock(offset);
            const intervalId = setInterval(() => updateOverlayClock(offset), 1000);
            
            // 閉じるボタンの設定！押したら閉じるヨ〜💕
            closeButton.onclick = () => {
                overlay.classList.add('overlay-hidden');
                clearInterval(intervalId); // 時計の更新をストップ！オッケー👍
            };
        });
    });
}

// オーバーレイの時計を更新、大きくて見やすいネ！😊✨
function updateOverlayClock(offset) {
    const now = new Date(Date.now() + offset);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('overlay-clock').textContent = `${hours}:${minutes}:${seconds}`;
}

function startClocks() {
    // 日本標準時のオフセットを計算するヨ！おじさん頭いいでしょ？😁💦
    const localOffsetMinutes = new Date().getTimezoneOffset();
    const jstOffsetFromLocal = (540 + localOffsetMinutes) * 60 * 1000;
    
    // 各時計の設定、バッチリ決めていくヨ〜！👍✨
    const clocks = [
        { id: 'clock1', offset: 0.5 * 1000 },  // 3411 特別教室、ちょっとズレてるんだヨ〜
        { id: 'clock2', offset: -2 * 1000 },   // 4105 自学自習室、昔の時計みたいに遅れてるネ😅
        { id: 'clock3', offset: 0 * 1000 },    // 2401 2DHR、コレが基準だヨ！バッチリ！
        { id: 'clock4', offset: 57 * 1000 },   // 電気電子工学実験室、早すぎるカモ💦
        { id: 'clock5', offset: jstOffsetFromLocal }, // 日本標準時、おじさん大好き正確な時間だネ！😊
        { id: 'clock6', offset: 0 * 1000 },    // 工事中、もうすぐ完成だヨ〜✨
        { id: 'clock7', offset: 0 * 1000 }    // 工事中、楽しみにしててネ！ナンチャッテ👍
    ];
    
    // 各時計を初期化するヨ、おじさんの自慢の技！😁
    clocks.forEach(clock => {
        const element = document.getElementById(clock.id);
        if (element) {
            // オフセット情報をデータ属性として保存、昔はこんなの無かったヨ💦
            element.dataset.offset = clock.offset.toString();
            
            // 時計を更新して、定期的に動かすヨ〜！ドキドキ✨
            updateClock(clock.id, clock.offset);
            setInterval(() => updateClock(clock.id, clock.offset), 500);
        }
    });
}

// DOMが読み込まれたら実行、おじさんプログラム得意なんだヨ！😁👍
document.addEventListener('DOMContentLoaded', () => {
    startClocks(); // 時計をスタート！バッチリだネ✨
    setupOverlay(); // オーバーレイもセット！カッコいいでしょ？😊💕
});
