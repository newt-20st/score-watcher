const localGameState = localStorage.getItem("gameConfig");

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
  if (localGameState) {
    const parsedLocalGameConfig: NomxGameStateProps = JSON.parse(localGameState);
    if (parsedLocalGameConfig.type === "nomx") {
      return parsedLocalGameConfig;
    }
  }
  return NomxInitialGameState;
}


const localQuizData = localStorage.getItem("quizData");

export type QuizDataProps = {
  q: string;
  a: string;
};
export const initialQuizData: QuizDataProps[] = localQuizData ? JSON.parse(localQuizData) : [];