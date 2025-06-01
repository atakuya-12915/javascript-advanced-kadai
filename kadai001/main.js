// 変数の初期化
let untyped = '';  // 未入力の文字列を入れた変数
let typed = '';  // 入力済の文字列を入れた変数
let score = 0;  // スコアの初期値

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typingCountfield = document.getElementById('typingcount');


// 複数のテキストを格納する配列
const textLists = [
  'Hello World', 'This is my App', 'How are you?',
  'Today is sunny', 'I love JavaScript!', 'Good morning',
  'I am Japanese', 'Let it be', 'Samurai',
  'Typing Game', 'Information Technology',
  'I want to be a programmer', 'What day is today?',
  'I want to build a web app', 'Nice to meet you',
  'Chrome Firefox Edge Safari', 'machine learning',
  'Brendan Eich', 'John Resig', 'React Vue Angular',
  'Netscape Communications', 'undefined null NaN',
  'Thank you very much', 'Google Apple Facebook Amazon',
  'ECMAScript', 'console.log', 'for while if switch',
  'var let const', 'Windows Mac Linux iOS Android',
  'programming'
];

// ランダムなテキストを表示
const createText = () => {

  // 正しくタイプした文字列をクリアする
  typed = ''; //変数typedの中身を空にする
  typedfield.textContent = typed;

  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);

  // 配列からランダムにテキストを取得し、初期画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};


// キー入力の判定 + 『score機能 = 正タイプの数 = key入力のeごとに実行』
const keyPress = e => {
  //e:引数（ユーザーのイベントにより生成されたオブジェクト/イベントの詳細情報）

  // 誤タイプとき(入力したキーとuntypedの1文字目が不一致の場合の処理）
  if (e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped'); //NGの装飾を実装(add) 
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  // 正タイプのとき
  score++;  // スコアのインクリメント
  // カウントした正タイプ数(=score)を表示する
  typingCountfield.textContent = score;
  typed += untyped.substring(0, 1); // 先頭1字をtypedに移動
  untyped = untyped.substring(1); //未入力の文字を全て抽出
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // 全て入力済みになったら新しいテキスト（createText）を表示
  if (untyped === '') {
    createText();
  }
};
// e.key → e:引数 / key:プロパティ（どの「キー」が入力されたか？の情報）


// タイピングスキルのランクを判定
const rankCheck = score => {

  // テキスト（評価メッセージ）を格納する変数(初期化)
  let text = '';

  // スコアに応じて異なるメッセージを変数textに格納する
  // 99以下:C \ 100以上:B \ 200以上:A \ 300以上:S
  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if (score >= 300) {
    text = `あなたのランクはSです。\nBおめでとうございます。`;
  }
  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました! \n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);

  const result = confirm(rankCheck(score));

  // OKボタンがクリックされたら(confirm: OK=trueの時)リロードする
  if (result == true) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {
  // タイマー部分のHTML要素（p要素=開始タイム）を取得
  let time = count.textContent; //初期値：60秒

  // カウントダウンタイマーの設定（id=インターバルのindex）
  const id = setInterval(() => {

    // カウントダウンしてp要素(変数time)に代入して表示
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを停止する
    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};


// ゲームスタート時の処理（スタートボタンを'クリック'）
start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();

  // ランダムなテキストを表示する
  createText();

  // 「start」ボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';