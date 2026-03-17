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

//querySelectorAll( CSS selctor ) : 해당하는 모든 요소를 NodeList 형태로 반환
// 즉 id=zenigame 안에 있는 skill 클래스 안에 있는 button 요소들을 모두 가져와서 리스트로 blueBattleButtons에 저장
const blueBattleButtons = document.querySelectorAll('#zenigame .skill button');
const redBattleButtons = document.querySelectorAll('#hitokage .skill button');

const redHpElement = document.getElementById('redHP'); // <span id="redHP">100</span>
const hpListElement = redHpElement?.parentElement; // <li data-hp="100"><span id="redHP">100</span></li>

const zenigameSection = document.getElementById('zenigame');
const hitokageSection = document.getElementById('hitokage');

// id="blueHP" 인 요소를 가져와서
const blueHpElement = document.getElementById('blueHP');
// 그 요소의 부모를 찾아와서
const blueHpListElement = blueHpElement?.parentElement;

function setupBattle() {
  // [<button>たきのぼり</button>, <button>みずでっぽう</button>, <button>あわ</button>, <button>ハイドロポンプ</button>]
  // forEach : 각 배열의 요소
  blueBattleButtons.forEach((button, index) => {
    button?.addEventListener('click', () => {
      if (blueTurn) {
        redHP -= HpCalculator(blueAttack, redDefense, skillPower[index]);
        if (redHP < 0) {
          redHP = 0;
        } // HPがマイナスになるのを防ぐため

        if (redHpElement?.innerText) {
          // HTMLにHPを表示するために
          redHpElement.innerText = redHP.toFixed(0).toString(); // toString() 無くでもいい。でもTextにNumberを入ればErrorになる。

          // cssのために
          if (hpListElement) {
            //.dataset.hpは自動にdata-hp属性をつくてくれる。つまり、hpListElement 要素にdata-hp属性ができて、そこにredHPの値を入れる。
            hpListElement.dataset.hp = redHP.toFixed(0).toString(); // tofixd => 小数点のために
          }
        }
        battleEndCheck();
        turnChange();
      }
    });
  });

  redBattleButtons.forEach((button, index) => {
    button?.addEventListener('click', () => {
      if (!blueTurn) {
        blueHP -= HpCalculator(redAttack, blueDefense, skillPower[index]);
        if (blueHP < 0) {
          blueHP = 0;
        } // HPがマイナスになるのを防ぐため

        if (blueHpElement?.innerText) {
          // HTMLにHPを表示するために
          // <span id="blueHP"> ここが innerText </span>
          blueHpElement.innerText = blueHP.toFixed(0).toString();

          // cssのために
          if (blueHpListElement) {
            // dataset를 이용해 data-hp 속성에 접근해서 HP값을 넣고
            // <li data-hp="100"><span id="blueHP">100</span></li>
            blueHpListElement.dataset.hp = blueHP.toFixed(0).toString();
          }
        }
        battleEndCheck();
        turnChange();
      }
    });
  });
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
  }
  if (redHP <= 0) {
    alert('Blue wins! The pokemon is ゼニガメ !');
  }
}

function turnChange() {
  if (blueTurn) {
    blueTurn = false;
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
