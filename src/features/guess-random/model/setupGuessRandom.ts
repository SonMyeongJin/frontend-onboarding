import { getPokemon, type Pokemon } from '../../../entities/pokemon/api';

function showGuessRandomMessage(message: string) {
  const messageElement = document.getElementById('guess-random-message');
  if (messageElement) {
    messageElement.textContent = message;
  } else {
    console.info(message);
  }
}

// DomLoaderによって呼ばれるとき（一回だけ）呼ばれる。
async function setupGuessRandom() {
  // id="~"を持っている要素を持ってくる。形はHTMLFormElement！
  const form = document.getElementById('guess-form');
  const input = document.getElementById('guess-input');
  const guessPokemonElement = document.getElementById('guess-pokemon-body');

  // as Element 使わなくで安定を検査する。
  if (!(form instanceof HTMLFormElement)) {
    console.error('Form element not found or not a form');
    return;
  }
  if (!(input instanceof HTMLInputElement)) {
    console.error('Input element not found or not an input');
    return;
  }
  if (!(guessPokemonElement instanceof HTMLElement)) {
    console.error(
      'Guess Pokemon table body element not found or not an HTMLElement',
    );
    return;
  }

  // RandomにPokemonIDを受けるために
  const maxPokemonNumber = 898;
  const correctPokemonNumber = Math.floor(Math.random() * maxPokemonNumber) + 1;
  // 作ったGet Pockemon APIを読んでPokemon.idでPokemon情報とる。
  const correctPokemonObj = await getPokemon(correctPokemonNumber);
  const correctPokemonName = String(correctPokemonObj.name);

  if (guessPokemonElement) {
    //　使用者に見せてあげるために　Pokemonの情報を表に追加する。（一回だけ）
    addGuessRandomTableRow(correctPokemonObj, guessPokemonElement);
  }

  // buttonを押したイベントが起きたら、onGuessRandomSubmitHandlerを実行する。＋ inputには使用者の入力したものが入る。
  form.addEventListener('submit', (e) =>
    onGuessRandomSubmitHandler(e, input, correctPokemonName),
  );

  console.log('Correct Pokemon: ', correctPokemonName);
}

// 答えを入力してsubmitしたときの処理。答えが正しいかどうかを判断する。
function onGuessRandomSubmitHandler(
  e: SubmitEvent,
  input: HTMLInputElement,
  correctPokemonName: string,
) {
  // submitイベントのデフォルトの動きを止める。例えば、ページのリロードとか。
  e.preventDefault();
  console.log('user input: ', input.value);

  // 使用者が入力した値を変数に持って入れる。
  // input.valueの形がStringじゃないからString()でStringに変換する。
  const userAnswer = String(input.value);
  // それでStringたちを比べて、正しいかどうかを判断する。
  if (userAnswer === correctPokemonName) {
    showGuessRandomMessage(`Correct! The pokemon is ${userAnswer}!`);
  } else {
    showGuessRandomMessage('Wrong! Try again!');
  }
}

// setupGuessRandom関数がDomLoaderによって呼ばれるとき（一回だけ）、ポケモン当たる問題をSetupする。
function addGuessRandomTableRow(pokemon: Pokemon, body: HTMLElement) {
  // <tr>
  //   <td>type</td>
  //   <td>tall</td>
  //   <td>weight</td>
  //   <td>location</td>
  //   <td>ability</td>
  // </tr>

  // row:HTMLTableRowElement, type:HTMLTableDataCellElement, tall:HTMLTableDataCellElement, weight:HTMLTableDataCellElement, location:HTMLTableDataCellElement, ability:HTMLTableDataCellElement
  // 一旦TableElementを変数化する。
  const row = document.createElement('tr');
  const type = document.createElement('td');
  const tall = document.createElement('td');
  const weight = document.createElement('td');
  const locationData = document.createElement('td');
  const abilityData = document.createElement('td');

  // がく要素の内容をPokemonの情報を入れる。
  type.textContent = String(pokemon.types.map((t) => t.type.name).join(', '));
  tall.textContent = String(pokemon.height);
  weight.textContent = String(pokemon.weight);
  locationData.textContent = String(pokemon.location_area_encounters);
  abilityData.textContent = String(
    pokemon.abilities.map((a) => a.ability.name).join(', '),
  );

  // rowが一番親の要素で、type, tall, weight, locationData, abilityDataはrowの子要素。最後にrowをbodyの子要素にする。
  row.appendChild(type);
  row.appendChild(tall);
  row.appendChild(weight);
  row.appendChild(locationData);
  row.appendChild(abilityData);
  body?.appendChild(row);
}

export { setupGuessRandom };

// Todo
// 使用者が入力するとき英語だけ入力できるようにしたい
