import { getPokemon, type Pokemon } from '../../../entities/pokemon/api';

// 変わらない変数だと思って外に出す。
const correctPokemon = 387; // 387: turtwig / ナエトル / 모부기
const hint: string[] = [
  'This pokemon is a grass type.',
  'This pokemon is the first stage of its evolution line.',
  "This pokemon's name starts with 'T'.",
  'This pokemon is 4th gen pokemon.',
  'This pokemon is starting pokemon of its generation.',
  'なんとなく387回挑戦すれば正解に近づくかもしれない? ^_^',
];

// DomLoaderによって呼ばれるとき（一回だけ）呼ばれる。
function setupGuessFavorite() {
  // id="~"を持っている要素を持ってくる。形はHTMLFormElement！
  const form = document.getElementById('pokemon-form');
  // as Element 使わなくで安定を検査する。
  if (!(form instanceof HTMLFormElement)) {
    return;
  }
  // formにsubmitイベントが起きたら、非同期関数を実行する。
  form.addEventListener('submit', onGuessSubmitHandler);
}

// 答えを入力してsubmitしたときの処理。答えが正しいかどうかを判断する。
async function onGuessSubmitHandler(e: SubmitEvent) {
  // submitイベントのデフォルトの動きを止める。例えば、ページのリロードとか。
  e.preventDefault();

  // 使用者が入力するinput要素を変数に持って入れる。
  const input = document.getElementById('pokemon-input');
  // 使用者が入力したPokemonの情報を見せてあげるElement
  const inputPokemonInfoLocation = document.getElementById('pokemon-body');
  if (!(input instanceof HTMLInputElement)) {
    return;
  }
  if (!(inputPokemonInfoLocation instanceof HTMLElement)) {
    return;
  }
  // 使用者が入力した値のPokemon Objectを持ってくる
  const pokemon = await getPokemon(input.value);
  console.log(input.value);
  console.log(pokemon.name);

  // あっても、あわなくても、一旦Pokemonの情報を表に追加する。
  // pokemon : どんなポケモンを
  // inputPokemonInfoLocation : どこに表を追加するか
  addGuessTableRow(pokemon, inputPokemonInfoLocation);

  // Pokemonのidを見て、正しいかどうかを判断してAlertだけする。
  if (pokemon.id === correctPokemon) {
    alert(`Correct! The pokemon is ${pokemon.name}!`);
  } else {
    // add hint
    // hintは答えが間違ったとき、５回ヒントをする。
    // 何番目の答えなのかは、inputPokemonInfoLocationの子要素の数で判断する。hint[上に追加されたrow数]
    const hintIndex = inputPokemonInfoLocation.children.length
      ? Math.min(inputPokemonInfoLocation.children.length - 1, hint.length - 1)
      : 0;
    alert(`Wrong! Here's a hint: ${hint[hintIndex]}`);
  }
}

function addGuessTableRow(
  pokemon: Pokemon,
  inputPokemonInfoLocation: HTMLElement,
) {
  // <tr>
  //  <td>number</td>
  //   <td>name</td>
  //   <td>type</td>
  // </tr>
  const row = document.createElement('tr');
  const numberData = document.createElement('td');
  const nameData = document.createElement('td');
  const typeData = document.createElement('td');

  // number = pokemon.id
  // name = pokemon.name
  // type = pokemon.abilities
  numberData.textContent = String(pokemon.id);
  nameData.textContent = String(pokemon.name);
  typeData.textContent = String(
    pokemon.abilities.map((a) => a.ability.name).join(', '),
  );

  // appendChild : rowの子要素としてnumberData, nameData, typeDataを追加する。
  // <tr>
  //   <td> String(pokemon.id) </td>
  //   <td> String(pokemon.name) </td>
  //   <td> String(pokemon.abilities) </td>
  // </tr>
  row.appendChild(numberData);
  row.appendChild(nameData);
  row.appendChild(typeData);
  // inputPokemonInfoLocationがあれば（null/undefinedじゃなければ）rowをinputPokemonInfoLocationの子要素として追加する。
  inputPokemonInfoLocation.appendChild(row);
}

export { setupGuessFavorite };

// Todo
// 使用者が入力するときnumberだけ入力できるようにしたい
