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

export type {
  Pokemon,
  PokemonAbility,
  NamedAPIResource,
  VersionGameIndex,
  PokemonHeldItem,
  PokemonHeldItemVersion,
  PokemonMove,
  PokemonMoveVersionGroup,
  PokemonTypePast,
  PokemonAbilityPast,
  PokemonStatPast,
  PokemonSprites,
  PokemonCries,
  PokemonStat,
  PokemonType,
};
