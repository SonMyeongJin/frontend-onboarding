import { getPokemon, type Pokemon } from '../../../entities/pokemon/api';

const correctPokemon = 387; // 387: turtwig / ナエトル / 모부기

const hint: string[] = [
  'This pokemon is a grass type.',
  'This pokemon is the first stage of its evolution line.',
  "This pokemon's name starts with 'T'.",
  'This pokemon is 4th gen pokemon.',
  'This pokemon is starting pokemon of its generation.',
  'なんとなく387回挑戦すれば正解に近づくかもしれない? ^_^',
];

const form = document.getElementById('pokemon-form');

const input = document.getElementById('pokemon-input'); // as HTMLInputElement;
const doko = document.getElementById('pokemon-body');

function setupGuessFavorite() {
  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  form.addEventListener('submit', onGuessSubmitHandler);
}

async function onGuessSubmitHandler(e: SubmitEvent) {
  e.preventDefault();

  if (!(input instanceof HTMLInputElement)) {
    return;
  }
  if (!(doko instanceof HTMLElement)) {
    return;
  }

  console.log(input.value);
  const pokemon = await getPokemon(input.value);
  console.log(pokemon.name);

  // 下の数呼ぶ。dokoに！マークは ”dokoがnullわけない”ということをCompilerに教えてあげる。
  //（Compile段階ではErrorがないけどRuntimeでErrorになる可能性）→ あんまりよくないかも
  addGuessTableRow(pokemon, doko);
  // check if correct
  if (pokemon.id === correctPokemon) {
    alert(`Correct! The pokemon is ${pokemon.name}!`);
  } else {
    // add hint
    // hint[上に追加されたrow数]
    const hintIndex = doko.children.length
      ? Math.min(doko.children.length - 1, hint.length - 1)
      : 0;
    alert(`Wrong! Here's a hint: ${hint[hintIndex]}`);
  }
}

function addGuessTableRow(pokemon: Pokemon, doko: HTMLElement) {
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
  // dokoがあれば（null/undefinedじゃなければ）rowをdokoの子要素として追加する。
  doko.appendChild(row);
}

export { setupGuessFavorite };
