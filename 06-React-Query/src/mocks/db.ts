// Un pequeño "base de datos" para nuestros tests
export const mockDatabase = {
  Rick: [{ id: 1, name: "Rick Sanchez", status: "Alive", species: "Human" }],
  Summer: [{ id: 2, name: "Summer Smith", status: "Alive", species: "Human" }],
  Morty: [{ id: 3, name: "Morty Smith", status: "Alive", species: "Human" }],
};

export type MockQuery = keyof typeof mockDatabase;
