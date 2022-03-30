export type CharacterImage = {
  large: string,
  medium: string,
};

export type Character = {
  id: number,
  name: {
    userPreferred: string,
  },
  image: CharacterImage,
};

export type CharacterRole = 'MAIN' | 'SUPPORTING' | 'BACKGROUND';

export type CharacterEdge = {
  id: number,
  role: CharacterRole,
  name: {
    userPreferred: string,
  },
  voiceActors: {
    id: number,
    role: string,
    name: {
      userPreferred: string,
    },
  },
  node: Character,
};

export type CharacterConnection = {
  nodes: Character[],
  edges: CharacterEdge[],
};
