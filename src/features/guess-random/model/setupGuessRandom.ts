import { getPokemon, type Pokemon } from '../../../entities/pokemon/api';

async function setupGuessRandom() {
  // submitClickHandlerと同様に、HTMLFormElementとHTMLInputElementを安全に取得する方法

  const form = document.getElementById('guess-form');
  const input = document.getElementById('guess-input');

  // as Element 使わなくで安定を検査する。
  if (!(form instanceof HTMLFormElement)) {
    console.error('Form element not found or not a form');
    return;
  }
  if (!(input instanceof HTMLInputElement)) {
    console.error('Input element not found or not an input');
    return;
  }

  // RandomにPokemonIDを受けるために
  const maxPokemonNumber = 898; // 898: as of gen 8
  const correctPokemonNumber = Math.floor(Math.random() * maxPokemonNumber) + 1; // 898: as of gen 8
  const correctPokemonName = String(
    (await getPokemon(correctPokemonNumber)).name,
  ); // NaN がくる場合。
  console.log('Correct Pokemon: ', correctPokemonName);
  const pokemon = await getPokemon(correctPokemonNumber);
  const guessPokemonElement = document.getElementById('guess-pokemon-body');

  if (guessPokemonElement) {
    addGuessRandomTableRow(pokemon, guessPokemonElement);
  }

  form.addEventListener('submit', (e) =>
    onGuessRandomSubmitHandler(e, input, correctPokemonName),
  );
}

function onGuessRandomSubmitHandler(
  e: SubmitEvent,
  input: HTMLInputElement,
  correctPokemonName: string,
) {
  // 上と同じ。
  e.preventDefault();
  console.log('user input: ', input.value);

  // 使用者が入力した値を持って入れる。
  const guess = String(input.value);
  if (guess === correctPokemonName) {
    alert(`Correct! The pokemon is ${guess}!`);
  } else {
    alert('Wrong! Try again!');
  }
}

function addGuessRandomTableRow(pokemon: Pokemon, body: HTMLElement) {
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
}

export { setupGuessRandom };
