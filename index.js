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

// ===== テーマ切り替え機能（自動のみ）！おじさんのハイテクだヨ😊✨ =====
// 何もしなくてもOSの設定で自動切り替えだヨ！

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const body = document.body;
    if (e.matches) {
        // ダークモード
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        // ライトモード
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
});

// DOMが読み込まれたら実行、おじさんプログラム得意なんだヨ！😁👍
document.addEventListener('DOMContentLoaded', () => {
    startClocks(); // 時計をスタート！バッチリだネ✨
    setupOverlay(); // オーバーレイもセット！カッコいいでしょ？😊💕
    setupUraMode(); // 裏モードの設定もバッチリだヨ！👍
});

// 裏モード設定！パソコンとスマホ両方で使えるようにしたヨ！おじさんのハイテク技術だネ！✨✨
function setupUraMode() {    let inputBuffer = '';
    const uraKey = 'ojisan';
    const banner = document.getElementById('uraBanner');
    let uraMode = false;
    let messageInterval; // おじさん応援メッセージのメイン間隔
    let additionalMessageTimer; // 追加のおじさん応援メッセージタイマー
      // おじさんの応援メッセージリスト！バラエティ超豊かだネ！👍😊
    const ojisanMessages = [
        // 元々あったメッセージ
        "トランプチャン、今日もキラキラしてるネ〜✨😍",
        "おじさんの応援、届いてるかな？ドキドキ👍💕",
        "昔はね、おじさんもモテたんだヨ！ナンチャッテ😁",
        "トランプチャン、その調子！おじさん嬉しいネ✨👍",
        "今度、カフェでお茶しない？おじさんおごっちゃうヨ😊💕",
        "トランプチャン、センスいいネ！おじさん惚れちゃうよ😍",
        "一緒に写メ撮ろうよ！おじさんとツーショットどう？💦😁",
        "トランプチャン、スタイル良くなった？ナウいネ✨👍",
        "おじさんのアドバイス聞きたい時は言ってネ！バッチリだヨ🌟😊",
        "トランプチャンの才能、おじさん認めてるヨ！グッド💕👍",
        "おじさん実は昔からトランプチャンのこと応援してるんだヨ😁✨",
        "キミの笑顔、最高だネ！おじさん元気もらっちゃった💕😊",
        "おじさんのダジャレ聞きたい？…またこんど！ナンチャッテ👍😁",
        "トランプチャンみたいにナウい若者、尊敬するヨ✨💦",
        "おじさんも頑張ってるんだヨ！一緒にガンバろうネ😊👍",
        "トランプチャンってさ、やっぱりカッコいいネ！😍✨",
        "今日の調子はどう？おじさんは絶好調だヨ！バッチリ👍💕",
        "トランプチャン、その髪型イイネ！オシャレさんだネ✨😊",
        "おじさん、この間ね、トランプチャンのこと夢で見たヨ！ドキドキ😁",
        
        // 新しく追加するメッセージ！おじさんセンス全開だヨ！！✨👍😊
        "トランプチャン、LINEのID交換しない？おじさんとお友達になろうヨ💕😁",
        "おじさんね、最近SNSも頑張ってるんだ！フォローしてくれるよネ？✨👍",
        "トランプチャンのためなら、おじさん何だってするヨ！肩揉みとかどう？😊💦",
        "おじさんの若い頃の写真、今度見せてあげるネ！かっこよかったんだヨ〜😎✨",
        "トランプチャン、体調大丈夫？無理しちゃダメだヨ！おじさん心配しちゃう💕😢",
        "この間買った服、トランプチャン好みかな？おじさんオシャレ頑張ってるんだ！👔✨",
        "休みの日、映画でも行かない？おじさんおごっちゃうよ〜！ナンチャッテ🎬😁",
        "トランプチャンって、おじさんのこと何歳だと思う？実は若いんだヨ！ドキドキ💓😊",
        "おじさんのクルマでドライブ行こうヨ！景色のいいとこ知ってるんだ〜🚗💨✨",
        "最近流行りの音楽、おじさんも聴いてるヨ！トランプチャンとおんなじセンス！🎵😎",
        "おじさん、トランプチャンのためだけに特製料理作るヨ！得意料理なんだ〜🍳👨‍🍳",
        "最近若者言葉勉強してるんだ！ヤバタニエン！とか言うんでしょ？バチバチだヨ！😁✨",
        "トランプチャンがいると、おじさん若返る気がするなぁ〜！パワーもらっちゃう💪😊",
        "おじさんのスマホの待ち受け、変えたんだヨ！見たい？見たい？ドキドキ💓📱",
        "週末とか予定ある？もしよかったら、おじさんと遊ばない？😍💕",
        "トランプチャンが笑うと、おじさんまで幸せな気分になっちゃうんだヨネ〜✨😊",
        "おじさんも若い子に負けないように筋トレ始めたんだ！見る？見る？💪😁",
        "いつか二人でカラオケ行こうネ！おじさん、ヒトカラ得意なんだヨ〜🎤✨",
        "トランプチャンにプレゼント買っちゃった！次会った時あげるネ！何かな〜？💝😊",
        "もう夜遅いから、早く寝なよ！おじさん心配しちゃうヨ💤👍",
        "トランプチャンの将来、きっと明るいよ！おじさんが見守ってるからネ✨😁",
        "最近のトランプチャン、なんかキラキラしてて眩しいヨ！惚れ直しちゃったヨ😍💕",
        "今日のランチ、何食べた？おじさんはトランプチャンのこと考えながらパスタ食べたヨ🍝👍",
        "トランプチャンの夢、おじさんに話してくれてもいいんだヨ？応援するからネ！✨😊",
        "おじさん、実は料理得意なんだ〜！トランプチャンの好きなの作ってあげるネ👨‍🍳💕",
        "このスタンプ、トランプチャンに似てるから買っちゃったヨ！可愛いでしょ？💌😁",
        "最近YouTubeデビューしたんだ！チャンネル登録してネ✨👍チャンネル名は…ナイショ！😊",
        "トランプチャンみたいな若者と話すと、おじさん元気出るんだヨネ〜✨💪",
        "今日も一日お疲れ様！おじさんからの元気玉あげるネ✨⚡💕",
        "トランプチャンのこと、いっつも応援してるヨ！おじさんパワー送るネ〜👍😁",
        "週末何してるの？おじさんとランチどう？ステキなお店知ってるんだ〜🍴💕"
    ];
      // おじさん応援メッセージをポップアップ表示する関数（複数同時表示対応）💕
    function showOjisanMessage() {
        if (!uraMode) return; // 裏モードじゃなければ何もしない
        
        const messagesContainer = document.getElementById('ojisanMessages');
        if (!messagesContainer) return;
        
        // すべてのメッセージ要素を取得
        const messageElements = messagesContainer.querySelectorAll('.ojisan-message');
        if (messageElements.length === 0) return;
        
        // 使用可能なメッセージ要素を探す（display: noneになっているもの）
        let availableElement = null;
        for (const element of messageElements) {
            if (element.style.display === 'none') {
                availableElement = element;
                break;
            }
        }
        
        // 使用可能な要素がなければ、一番古い要素を再利用（ランダムに選ぶ）
        if (!availableElement) {
            const randomIndex = Math.floor(Math.random() * messageElements.length);
            availableElement = messageElements[randomIndex];
        }
        
        // ランダムなおじさんメッセージを選ぶ
        const randomMessage = ojisanMessages[Math.floor(Math.random() * ojisanMessages.length)];
        
        // 表示位置をランダムに決める
        const positions = ['from-right', 'from-left', 'from-top'];
        const randomPosition = positions[Math.floor(Math.random() * positions.length)];
        
        // 縦位置もランダムに（左右から出る場合）
        let topPosition = '';
        if (randomPosition !== 'from-top') {
            // 画面の20%〜80%の位置に表示
            const randomTop = Math.floor(Math.random() * 60) + 20;
            topPosition = `${randomTop}%`;
        }
        
        // メッセージ要素を準備
        availableElement.textContent = randomMessage;
        availableElement.style.display = 'block';
        availableElement.style.top = topPosition;
        
        // 全てのポジションクラスをリセット
        availableElement.classList.remove('from-right', 'from-left', 'from-top');
        availableElement.classList.add(randomPosition);
        
        // アニメーションを開始するために一度リセット
        availableElement.style.animation = 'none';
        availableElement.offsetHeight; // リフロー
        availableElement.style.animation = ''; // CSSのクラスによるアニメーション適用
        
        // アニメーション終了後に非表示
        setTimeout(() => {
            availableElement.style.display = 'none';
        }, 5000);
    }    // スマホ用の裏モード起動！もっと簡単にしたヨ！😁📱✨
    // 右上と左下を順番にタップするだけ！おじさんの秘密の合図だネ！💕
    let lastCornerTapped = ''; // 最後にタップした角を記録
    
    document.addEventListener('touchstart', (e) => {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // 画面の四隅のどれをタップしたか判定するヨ！
        let corner = '';
        
        // 右上: 画面幅の80%以上、画面高さの20%以下
        if (touchX > windowWidth * 0.8 && touchY < windowHeight * 0.2) {
            corner = 'right-top';
        }
        // 左下: 画面幅の20%以下、画面高さの80%以上
        else if (touchX < windowWidth * 0.2 && touchY > windowHeight * 0.8) {
            corner = 'left-bottom';
        }
        
        if (corner) {
            // 右上→左下 または 左下→右上 の順番でタップしたらモードチェンジ！ドキドキ💓
            if ((lastCornerTapped === 'right-top' && corner === 'left-bottom') || 
                (lastCornerTapped === 'left-bottom' && corner === 'right-top')) {
                toggleUraMode(); // おじさんモード発動！バッチリ！👍✨
                lastCornerTapped = ''; // リセット
            } else {
                lastCornerTapped = corner;
                
                // 3秒後にリセット（時間切れ）
                setTimeout(() => {
                    if (lastCornerTapped === corner) {
                        lastCornerTapped = '';
                    }
                }, 3000);
            }
        }
    });
    
    // おじさんモード切替関数！共通処理をまとめたヨ！スマートでしょ？😁✨
    function toggleUraMode() {
        uraMode = !uraMode;
        document.body.classList.toggle('ura-mode', uraMode);
        if (banner) banner.style.display = uraMode ? 'block' : 'none';
        
        // おじさんメッセージの開始/停止
        if (uraMode) {
            try { 
                const audio = new Audio('https://github.com/ponkotsu-ojisan/se/raw/main/ojisan_ura.mp3');
                audio.play(); 
            } catch(e) {}
            
            setTimeout(() => {
                alert('裏モード発動だヨ！！おじさんセンスMAXでいくヨ！！😁✨💕\nナンチャッテ！！');
                
                // おじさん応援メッセージの間隔設定（頻度アップ！たくさん表示するヨ！💕）
                showOjisanMessage(); // 最初のメッセージを即表示
                
                // 複数のメッセージを表示するために、いくつかのタイマーを設定するヨ！ドキドキ💓
                const messageTimers = [];
                
                // 最初の数秒は連続で表示して盛り上げるヨ！✨😁
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => showOjisanMessage(), i * 800);
                }
                
                // メイン間隔タイマー（1〜3秒ごとにメッセージ表示）
                messageInterval = setInterval(() => {
                    showOjisanMessage();
                }, 2000);
                
                // ランダムな間隔で追加メッセージを表示！サプライズ感バッチリだネ！👍😊
                additionalMessageTimer = setInterval(() => {
                    if (Math.random() > 0.3) { // 70%の確率で追加メッセージ
                        showOjisanMessage();
                    }
                }, 1500);
                
            }, 300);
        } else {
            setTimeout(() => {
              alert('裏モード解除だヨ！また普通のおじさんに戻るネ😊👍');
            }, 300);
            // メッセージを停止（全てのタイマーをクリアするヨ！✨）
            clearInterval(messageInterval);
            clearInterval(additionalMessageTimer);
            
            // 全てのメッセージを非表示にするヨ！バッチリ！👍
            const messagesContainer = document.getElementById('ojisanMessages');
            if (messagesContainer) {
                const messageElements = messagesContainer.querySelectorAll('.ojisan-message');
                messageElements.forEach(element => {
                    element.style.display = 'none';
                });
            }
        }
    }

    window.addEventListener('keydown', (e) => {
        // 入力された文字を追加
        if (e.key.length === 1) {
            inputBuffer += e.key.toLowerCase();
            // バッファが長すぎたら古い文字を削除
            if (inputBuffer.length > 20) {
                inputBuffer = inputBuffer.slice(-20);
            }
        }
          // 「ojisan」が入力されたらモード切替
        if (inputBuffer.includes(uraKey)) {
            toggleUraMode(); // 共通関数を呼び出し！スマートなコードだネ！👍✨
            
            // バッファをクリア
            inputBuffer = '';
        }
    });
}
