//----------------------- Pokemon Battle -------------------------------->
// blue = ゼニガメ / squirtle / 꼬부기
// red = ヒトカゲ / charmander / 파이리

let blueHP = 100;
const blueAttack = 10;
const blueDefense = 60;
// const _blueSpeed = 15;

let redHP = 100;
const redAttack = 20;
const redDefense = 30;
// const _redSpeed = 30;

const skillPower: number[] = [1, 2, 3, 4, 1, 2, 3, 4];

let blueTurn: boolean = true; // true: blue's turn, false: red's turn

// querySelectorAll( CSS selctor ) : 該当するすべての要素をNodeList形式で返す
// つまり id=zenigame 内のスキルクラスにある button 要素をすべて取得し、リストとして blueBattleButtons に保存する
const blueBattleButtons = document.querySelectorAll('#zenigame .skill button');
const redBattleButtons = document.querySelectorAll('#hitokage .skill button');

const redHpElement = document.getElementById('redHP'); // <span id="redHP">100</span>
const hpListElement = redHpElement?.parentElement; // <li data-hp="100"><span id="redHP">100</span></li>

// 一般化する必要がある。
const zenigameSection = document.getElementById('zenigame');
const hitokageSection = document.getElementById('hitokage');

const blueHpElement = document.getElementById('blueHP'); // id="blueHP" の要素を取得して
const blueHpListElement = blueHpElement?.parentElement; // その要素の親を取得して

function setupBattle() {
  // [<button>たきのぼり</button>, <button>みずでっぽう</button>, <button>あわ</button>, <button>ハイドロポンプ</button>]
  // forEach : 各配列の要素
  blueBattleButtons.forEach((button, index) => {
    button?.addEventListener('click', () => onSkillClickHandler(index));
  });
  redBattleButtons.forEach((button, index) => {
    button?.addEventListener('click', () => onSkillClickHandler(index));
  });
}

function onSkillClickHandler(index: number) {
  // レッドターンならここに引っかかり
  if (!blueTurn) {
    // 該当スキルボタンのダメージを数値化してblueHPを削減する。
    blueHP -= HpCalculator(redAttack, blueDefense, skillPower[index]);
    // HPがマイナスになるのを防ぐため
    if (blueHP < 0) {
      blueHP = 0;
    }

    // HPをHTMLに表示するために
    if (blueHpElement?.innerText) {
      // HTMLにHPを表示するために
      // <span id="blueHP"> ここが innerText </span>
      blueHpElement.innerText = blueHP.toFixed(0).toString();

      // cssのために
      if (blueHpListElement) {
        // datasetを利用してdata-hp属性にアクセスし、HP値を設定する
        // <li data-hp="100"><span id="blueHP">100</span></li>
        blueHpListElement.dataset.hp = blueHP.toFixed(0).toString();
      }
    }
  }

  // ブルートンならここに引っかかり
  if (blueTurn) {
    // 該当スキルボタンのダメージを数値化してredHPを削減する。
    redHP -= HpCalculator(blueAttack, redDefense, skillPower[index]);
    // HPがマイナスになるのを防ぐため
    if (redHP < 0) {
      redHP = 0;
    }

    // HPをHTMLに表示するために
    if (redHpElement?.innerText) {
      redHpElement.innerText = redHP.toFixed(0).toString(); // toString() 無くでもいい。でもTextにNumberを入ればErrorになる。

      // cssのために
      if (hpListElement) {
        //.dataset.hpは自動にdata-hp属性をつくてくれる。つまり、hpListElement 要素にdata-hp属性ができて、そこにredHPの値を入れる。
        hpListElement.dataset.hp = redHP.toFixed(0).toString(); // tofixd => 小数点のために
      }
    }
  }

  // 攻撃パートが終わったらバトル終了をチェックし、終わっていなければターンを渡す。
  if (!battleEndCheck()) {
    turnChange();
  }
}

function HpCalculator(
  attackerAttack: number,
  defenderDefense: number,
  skillPower: number,
) {
  const damage = (skillPower * attackerAttack) / defenderDefense;
  return damage * 10; // ダメージを10倍してHPから引く
}

function battleEndCheck() {
  if (blueHP <= 0) {
    alert('Red wins! The pokemon is ヒトカゲ !');
    return true;
  }
  if (redHP <= 0) {
    alert('Blue wins! The pokemon is ゼニガメ !');
    return true;
  }
  return false;
}

function turnChange() {
  if (blueTurn) {
    blueTurn = false;
    // ターンが変わるときに、攻撃できる方のセクションを有効にして、攻撃できない方のセクションを無効にする。
    zenigameSection?.classList.toggle('disabled');
    hitokageSection?.classList.toggle('disabled');
  } else {
    blueTurn = true;
    hitokageSection?.classList.toggle('disabled');
    zenigameSection?.classList.toggle('disabled');
  }

  console.log(`Blue HP: ${blueHP}, Red HP: ${redHP}`);
  console.log("who's turn?  blueTurn:", blueTurn);
}

export { setupBattle };
