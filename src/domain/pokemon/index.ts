import type { Pokemon } from './type';

async function getPokemon(name: string | number) {
  // https://pokeapi.co/api/v2/pokemon/{id or name}/
  const url = `https://pokeapi.co/api/v2/pokemon/${name.toString()}/`;
  // fetch : APIにリクエストを送るための関数 (HTTP GET)
  const response = await fetch(url);
  // このResponseをJson変数に入れる。形はPokemonで宣言
  const json = (await response.json()) as Pokemon;
  return json;
}

export { getPokemon };
export type { Pokemon } from './type';

// export { getPokemon , type Pokemon } from './type';
