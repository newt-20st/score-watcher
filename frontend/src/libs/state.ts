export type CountGameStateProps = {
  type: "count";
  config: {
    name: string;
    count: number;
  };
  players: { name: string; score: number; group: string }[];
  logs: {
    type: "count";
    variant: "correct";
    player: number;
  }[];
}
export const countInitialGameState: CountGameStateProps = {
  type: "count",
  config: { name: "", count: 3 },
  players: [
    { name: "Player 1", score: 0, group: "" },
    { name: "Player 2", score: 0, group: "" },
    { name: "Player 3", score: 0, group: "" },
  ],
  logs: [],
};
export const getCountGameState = () => {
  const localGameState = localStorage.getItem("gameState");
  if (localGameState) {
    const parsedLocalGameState: CountGameStateProps = JSON.parse(localGameState);
    if (parsedLocalGameState.type === "count") {
      return parsedLocalGameState;
    }
  }
  return countInitialGameState;
}
export type CountPlayerProps = {
  name: string;
  correct: number;
  incorrect: number;
  group: string;
}

export type NomxGameStateProps = {
  type: "nomx";
  config: {
    name: string;
    count: number;
    win: number;
    lose: number;
  };
  players: {
    name: string;
    correct: number;
    incorrect: number;
    group: string;
  }[];
  logs: {
    type: string;
    variant: "correct" | "incorrect";
    player: number;
  }[];
}
export const NomxInitialGameState: NomxGameStateProps = {
  type: "nomx",
  config: { name: "", count: 3, win: 7, lose: 3 },
  players: [
    { name: "Player 1", correct: 0, incorrect: 0, group: "" },
    { name: "Player 2", correct: 0, incorrect: 0, group: "" },
    { name: "Player 3", correct: 0, incorrect: 0, group: "" },
  ],
  logs: [],
};
export const getNomxGameState = () => {
  const localGameState = localStorage.getItem("gameState");
  if (localGameState) {
    const parsedLocalGameConfig: NomxGameStateProps = JSON.parse(localGameState);
    if (parsedLocalGameConfig.type === "nomx") {
      return parsedLocalGameConfig;
    }
  }
  return NomxInitialGameState;
}


export type NbynGameStateProps = {
  type: "nbyn";
  config: {
    name: string;
    count: number;
    n: number;
    end: number | null;
  };
  players: {
    name: string;
    correct: number;
    incorrect: number;
    group: string;
  }[];
  logs: {
    type: string;
    variant: "correct" | "incorrect";
    player: number;
  }[];
}
export const NbynInitialGameState: NbynGameStateProps = {
  type: "nbyn",
  config: { name: "", count: 3, n: 7, end: 10 },
  players: [
    { name: "Player 1", correct: 0, incorrect: 0, group: "" },
    { name: "Player 2", correct: 0, incorrect: 0, group: "" },
    { name: "Player 3", correct: 0, incorrect: 0, group: "" },
  ],
  logs: [],
};
export const getNbynGameState = () => {
  const localGameState = localStorage.getItem("gameState");
  if (localGameState) {
    const parsedLocalGameConfig: NbynGameStateProps = JSON.parse(localGameState);
    if (parsedLocalGameConfig.type === "nbyn") {
      return parsedLocalGameConfig;
    }
  }
  return NbynInitialGameState;
}

export type NupdownGameStateProps = {
  type: "nupdown";
  config: {
    name: string;
    count: number;
    n: number;
    end: number | null;
  };
  players: {
    name: string;
    correct: number;
    incorrect: number;
    lastIncorrect?: number;
    group: string;
  }[];
  logs: {
    type: string;
    variant: "correct" | "incorrect";
    player: number;
  }[];
}
export const NupdownInitialGameState: NupdownGameStateProps = {
  type: "nupdown",
  config: { name: "", count: 3, n: 7, end: 10 },
  players: [
    { name: "Player 1", correct: 0, incorrect: 0, group: "" },
    { name: "Player 2", correct: 0, incorrect: 0, group: "" },
    { name: "Player 3", correct: 0, incorrect: 0, group: "" },
  ],
  logs: [],
};
export const getNupdownGameState = () => {
  const localGameState = localStorage.getItem("gameState");
  if (localGameState) {
    const parsedLocalGameConfig: NupdownGameStateProps = JSON.parse(localGameState);
    if (parsedLocalGameConfig.type === "nupdown") {
      return parsedLocalGameConfig;
    }
  }
  return NupdownInitialGameState;
}

export type SwedishxGameStateProps = {
  type: "swedishx";
  config: {
    name: string;
    count: number;
    x: number;
    end?: number;
  };
  players: {
    name: string;
    correct: number;
    incorrect: number;
    group: string;
  }[];
  logs: {
    type: "swedishx";
    variant: "correct" | "incorrect";
    player: number;
  }[];
}
export const SwedishxInitialGameState: SwedishxGameStateProps = {
  type: "swedishx",
  config: { name: "", count: 3, x: 10, end: 10 },
  players: [
    { name: "Player 1", correct: 0, incorrect: 0, group: "" },
    { name: "Player 2", correct: 0, incorrect: 0, group: "" },
    { name: "Player 3", correct: 0, incorrect: 0, group: "" },
  ],
  logs: [],
};
export const getSwedishxGameState = () => {
  const localGameState = localStorage.getItem("gameState");
  if (localGameState) {
    const parsedLocalGameConfig: SwedishxGameStateProps = JSON.parse(localGameState);
    if (parsedLocalGameConfig.type === "swedishx") {
      return parsedLocalGameConfig;
    }
  }
  return SwedishxInitialGameState;
}


const localQuizData = localStorage.getItem("quizData");

export type QuizDataProps = {
  q: string;
  a: string;
};
export const initialQuizData: QuizDataProps[] = localQuizData ? JSON.parse(localQuizData) : [];