//----------------------- Pokemon Battle -------------------------------->
// blue = ゼニガメ / squirtle / 꼬부기
// red = ヒトカゲ / charmander / 파이리

const INITIAL_HP = 100;
const DAMAGE_MULTIPLIER = 10;
const SKILL_POWER_LOW = 1;
const SKILL_POWER_MEDIUM = 2;
const SKILL_POWER_HIGH = 3;
const SKILL_POWER_MAX = 4;
const SKILL_POWER = [
  SKILL_POWER_LOW,
  SKILL_POWER_MEDIUM,
  SKILL_POWER_HIGH,
  SKILL_POWER_MAX,
  SKILL_POWER_LOW,
  SKILL_POWER_MEDIUM,
  SKILL_POWER_HIGH,
  SKILL_POWER_MAX,
] as const;

let blueHP = INITIAL_HP;
const blueAttack = 10;
const blueDefense = 60;
// const _blueSpeed = 15;

let redHP = INITIAL_HP;
const redAttack = 20;
const redDefense = 30;
// const _redSpeed = 30;

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

function clampHp(hp: number) {
  return Math.max(0, hp);
}

function renderHp(
  hpElement: HTMLElement | null,
  hpListElement: HTMLElement | null | undefined,
  hp: number,
) {
  if (!hpElement) {
    return;
  }
  const hpText = hp.toFixed(0).toString();
  hpElement.innerText = hpText;
  if (hpListElement) {
    hpListElement.dataset.hp = hpText;
  }
}

function showBattleMessage(message: string) {
  const messageElement = document.getElementById('battle-message');
  if (messageElement) {
    messageElement.textContent = message;
  } else {
    console.info(message);
  }
}

function applyDamage(
  attackerAttack: number,
  defenderDefense: number,
  skillPower: number,
  target: 'blue' | 'red',
) {
  const damage = HpCalculator(attackerAttack, defenderDefense, skillPower);
  if (target === 'blue') {
    blueHP = clampHp(blueHP - damage);
    renderHp(blueHpElement, blueHpListElement, blueHP);
    return;
  }

  redHP = clampHp(redHP - damage);
  renderHp(redHpElement, hpListElement, redHP);
}

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
  const power = SKILL_POWER[index];
  if (power === undefined) {
    return;
  }

  if (blueTurn) {
    applyDamage(blueAttack, redDefense, power, 'red');
  } else {
    applyDamage(redAttack, blueDefense, power, 'blue');
  }

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
  return damage * DAMAGE_MULTIPLIER; // ダメージを10倍してHPから引く
}

function battleEndCheck() {
  if (blueHP <= 0) {
    showBattleMessage('Red wins! The pokemon is ヒトカゲ !');
    return true;
  }
  if (redHP <= 0) {
    showBattleMessage('Blue wins! The pokemon is ゼニガメ !');
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
