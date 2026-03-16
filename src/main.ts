//----------------------- Pokemon DTO----------------------------------
type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  past_types: PokemonTypePast[];
  past_abilities: PokemonAbilityPast[];
  past_stats: PokemonStatPast[];
  sprites: PokemonSprites;
  cries: PokemonCries;
  species: NamedAPIResource;
  stats: PokemonStat[];
  types: PokemonType[];
};

type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
};

type NamedAPIResource = {
  name: string;
  url: string;
};

type VersionGameIndex = {
  game_index: number;
  version: NamedAPIResource;
};

type PokemonHeldItem = {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
};

type PokemonHeldItemVersion = {
  rarity: number;
  version: NamedAPIResource;
};

type PokemonMove = {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersionGroup[];
};

type PokemonMoveVersionGroup = {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
};

type PokemonTypePast = {
  generation: NamedAPIResource;
  types: PokemonType[];
};

type PokemonAbilityPast = {
  generation: NamedAPIResource;
  abilities: PokemonAbility[];
};

type PokemonStatPast = {
  generation: NamedAPIResource;
  stats: PokemonStat[];
};

type PokemonSprites = {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
};

type PokemonCries = {
  cry: string;
  audio: string;
};

type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
};

type PokemonType = {
  slot: number;
  type: NamedAPIResource;
};

// ----------------------- Pokemon API ----------------------------------
// https://pokeapi.co/api/v2/pokemon/{id or name}/
document.addEventListener('DOMContentLoaded', () => {
  submitClickHandler();
  guessClickHandler();
  guessRandomClickHandler();
  battleClickHandler();
});

async function getPokemon(name: string | number) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name.toString()}/`;

  const response = await fetch(url);
  const json = (await response.json()) as Pokemon;
  return json;
}

function submitClickHandler() {
  // as HTMLFormElement : 使わない方が安全　なぜなら、もしHTMLFormElementじゃなかったらエラーになるから
  const form = document.getElementById('form'); // as HTMLFormElement;
  const input = document.getElementById('inputid'); // as HTMLInputElement;
  // instead of using "as HTMLFormElemnet"
  // falsy : false ぽっい値
  if (!(form instanceof HTMLFormElement)) {
    console.error('Form element not found or not a form');
    return;
  }
  if (!(input instanceof HTMLInputElement)) {
    console.error('Input element not found or not an input');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(input.value);

    const pk = await getPokemon(input.value);
    console.log(pk.id, pk.name);
  });
}

function guessClickHandler() {
  // submitClickHandlerと同様に、HTMLFormElementとHTMLInputElementを安全に取得する方法
  const form = document.getElementById('pokemon-form'); // as HTMLFormElement;
  const input = document.getElementById('pokemon-input'); // as HTMLInputElement;
  if (!(form instanceof HTMLFormElement)) {
    console.error('Form element not found or not a form');
    return;
  }
  if (!(input instanceof HTMLInputElement)) {
    console.error('Input element not found or not an input');
    return;
  }

  const correctPokemon = 387; // 387: turtwig / ナエトル / 모부기

  const hint: string[] = [
    'This pokemon is a grass type.',
    'This pokemon is the first stage of its evolution line.',
    "This pokemon's name starts with 'T'.",
    'This pokemon is 4th gen pokemon.',
    'This pokemon is starting pokemon of its generation.',
    'なんとなく387回挑戦すれば正解に近づくかもしれない？ ^_^',
  ];

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(input.value);

    const pokemon = await getPokemon(input.value);
    console.log(pokemon.name);

    // add table row
    const doko = document.getElementById('pokemon-body');
    addTableRow(pokemon, doko!);

    // check if correct
    if (pokemon.id === correctPokemon) {
      alert(`Correct! The pokemon is ${pokemon.name}!`);
    } else {
      // add hint
      // hint[上に追加されたrow数]
      const hintIndex = doko?.children.length
        ? Math.min(doko.children.length - 1, hint.length - 1)
        : 0;
      alert(`Wrong! Here's a hint: ${hint[hintIndex]}`);
    }
  });
}
function addTableRow(pokemon: Pokemon, doko: HTMLElement) {
  const row = document.createElement('tr');
  const numberData = document.createElement('td');
  const nameData = document.createElement('td');
  const typeData = document.createElement('td');

  numberData.textContent = String(pokemon.id);
  nameData.textContent = String(pokemon.name);
  typeData.textContent = String(pokemon.abilities);

  row.appendChild(numberData);
  row.appendChild(nameData);
  row.appendChild(typeData);
  doko?.appendChild(row);
}

async function guessRandomClickHandler() {
  // submitClickHandlerと同様に、HTMLFormElementとHTMLInputElementを安全に取得する方法
  const form = document.getElementById('guess-form');
  const input = document.getElementById('guess-input');
  if (!(form instanceof HTMLFormElement)) {
    console.error('Form element not found or not a form');
    return;
  }
  if (!(input instanceof HTMLInputElement)) {
    console.error('Input element not found or not an input');
    return;
  }

  // Randomに　もらいたい
  const correctPokemonNumber = Math.floor(Math.random() * 900) + 1; // 898: as of gen 8
  const correctPokemonName = String(
    (await getPokemon(correctPokemonNumber)).name,
  );
  console.log('Correct Pokemon: ', correctPokemonName);
  const pokemon = await getPokemon(correctPokemonNumber);

  const body = document.getElementById('guess-pokemon-body');
  const row = document.createElement('tr');
  const type = document.createElement('td');
  const tall = document.createElement('td');
  const weight = document.createElement('td');
  const locationData = document.createElement('td');
  const abilityData = document.createElement('td');

  type.textContent = String(pokemon.types.map((t) => t.type.name).join(', '));
  tall.textContent = String(pokemon.height);
  weight.textContent = String(pokemon.weight);
  locationData.textContent = String(pokemon.location_area_encounters);
  abilityData.textContent = String(
    pokemon.abilities.map((a) => a.ability.name).join(', '),
  );

  row.appendChild(type);
  row.appendChild(tall);
  row.appendChild(weight);
  row.appendChild(locationData);
  row.appendChild(abilityData);
  body?.appendChild(row);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('user input: ', input.value);

    const guess = String(input.value);
    if (guess === correctPokemonName) {
      alert(`Correct! The pokemon is ${guess}!`);
    } else {
      alert('Wrong! Try again!');
    }
  });
}

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

function battleClickHandler() {
  let blueTurn: boolean = true; // true: blue's turn, false: red's turn

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
          redHpElement.innerText = redHP.toFixed(0).toString();

          // cssのために
          if (hpListElement) {
            hpListElement.dataset.hp = redHP.toFixed(0).toString();
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
          // blueHpElement 요소에 텍스트에 값을 넣고
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
    } else if (redHP <= 0) {
      alert('Blue wins! The pokemon is ゼニガメ !');
    }
  }

  function turnChange() {
    if (blueTurn) {
      blueTurn = false;
      zenigameSection?.classList.toggle('disabled');
      hitokageSection?.classList.toggle('disabled');
    }
    if (!blueTurn) {
      blueTurn = true;
      hitokageSection?.classList.toggle('disabled');
      zenigameSection?.classList.toggle('disabled');
    }

    console.log(`Blue HP: ${blueHP}, Red HP: ${redHP}`);
    console.log("who's turn?  blueTurn:", blueTurn);
  }
}
