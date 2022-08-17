import React, { useEffect, useState } from "react";
import produce from "immer";
import { Link } from "react-router-dom";
import {
  Badge,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  getNomxGameState,
  NomxGameStateProps,
  NomxInitialGameState,
} from "../libs/state";

import LoadQuiz from "../components/LoadQuiz";
import Header from "../components/Header";
import BoardHeader from "../components/BoardHeader";
import ConfigNumberInput from "../components/ConfigNumberInput";
import LogArea from "../components/LogArea";
import ConfigMenu from "../components/ConfigMenu";
import FundamentalFormatConfig from "../block/FundamentalFormatConfig";
import FundamentalPlayerConfig from "../block/FundamentalPlayerConfig";

export const NomxConfig: React.FC = () => {
  const [gameState, setGameState] = useState<NomxGameStateProps>(
    getNomxGameState()
  );

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    if (gameState.players.length < gameState.config.count) {
      let newPlayers: {
        name: string;
        correct: number;
        incorrect: number;
        group: string;
      }[] = [];
      for (
        let i = 1;
        i <= gameState.config.count - gameState.players.length;
        i++
      ) {
        newPlayers.push({
          name: `Player ${gameState.players.length + i}`,
          correct: 0,
          incorrect: 0,
          group: "",
        });
      }
      setGameState(
        produce(gameState, (draft) => {
          draft.players = [...gameState.players, ...newPlayers];
        })
      );
    } else {
      setGameState(
        produce(gameState, (draft) => {
          draft.players = gameState.players.slice(0, gameState.config.count);
        })
      );
    }
  }, [gameState.config.count]);

  const reset = () => {
    setGameState(NomxInitialGameState);
  };

  return (
    <Container maxW="3xl">
      <Header />
      <Heading fontSize="3xl" my={5}>NoMx</Heading>
      <Tabs variant='enclosed'>
        <TabList>
          <Tab>形式設定</Tab>
          <Tab>参加者設定</Tab>
          <Tab>クイズ設定</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex direction="column" gap={5} my={5}>
              <FundamentalFormatConfig gameState={gameState} setGameState={setGameState} />
              <ConfigNumberInput
                label="勝ち抜け正解数"
                value={gameState.config.win}
                min={1}
                max={15}
                onChange={(e) =>
                  setGameState(
                    produce(gameState, (draft) => {
                      draft.config.win = e as any;
                    })
                  )
                }
                required
              />
              <ConfigNumberInput
                label="失格誤答数"
                value={gameState.config.lose}
                min={1}
                max={15}
                onChange={(e) =>
                  setGameState(
                    produce(gameState, (draft) => {
                      draft.config.lose = e as any;
                    })
                  )
                }
                required
              />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction="column" gap={5} my={5}>
              {gameState.players.map((player, i) => (
                <Box key={i}>
                  <Heading fontSize="xl" width={200} mb={5}>
                    プレイヤー {i + 1}
                  </Heading>
                  <Flex direction="column" gap={5}>
                    <FundamentalPlayerConfig gameState={gameState} setGameState={setGameState} i={i} />
                    <ConfigNumberInput
                      label="初期正答数"
                      value={player.correct}
                      min={1}
                      max={15}
                      onChange={(e) =>
                        setGameState(
                          produce(gameState, (draft) => {
                            draft.players[i].correct = e as any;
                          })
                        )
                      }
                      required
                    />
                    <ConfigNumberInput
                      label="初期誤答数"
                      value={player.incorrect}
                      min={1}
                      max={15}
                      onChange={(e) =>
                        setGameState(
                          produce(gameState, (draft) => {
                            draft.players[i].incorrect = e as any;
                          })
                        )
                      }
                      required
                    />
                  </Flex>
                </Box>
              ))}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction="column" gap={5} my={5}>
              <Heading fontSize="xl" width={200}>
                問題をインポート
              </Heading>
              <LoadQuiz />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ConfigMenu reset={reset} to="/board/nomx" />
    </Container>
  );
};

export const NomxBoard: React.FC = () => {
  const [gameState, setGameState] = useState<NomxGameStateProps>(
    getNomxGameState()
  );

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  const correct = (playerIndex: number) => {
    setGameState(
      produce(gameState, (draft) => {
        draft.players[playerIndex].correct++;
        draft.logs.unshift({
          type: "nomx",
          variant: "correct",
          player: playerIndex,
        });
      })
    );
  };

  const incorrect = (playerIndex: number) => {
    setGameState(
      produce(gameState, (draft) => {
        draft.players[playerIndex].incorrect++;
        draft.logs.unshift({
          type: "nomx",
          variant: "incorrect",
          player: playerIndex,
        });
      })
    );
  };

  const undo = () => {
    setGameState(
      produce(gameState, (draft) => {
        if (draft.logs[draft.logs.length - 1].variant === "correct") {
          draft.players[draft.logs[0].player].correct--;
        } else {
          draft.players[draft.logs[0].player].incorrect--;
        }
        draft.logs.pop();
      })
    );
  };

  const checkState = (i: number) => {
    if (gameState.players[i].correct >= gameState.config.win) {
      return "WIN";
    } else if (gameState.players[i].incorrect >= gameState.config.lose) {
      return "LOSE";
    } else {
      return "playing"
    }
  };

  return (
    <Box>
      <BoardHeader name={gameState.config.name} type={gameState.type} current={gameState.logs.length} undo={undo} />
      <Flex sx={{ width: "100%", justifyContent: "space-evenly", mt: 5 }}>
        {gameState.players.map((player, i) => (
          <Flex key={i} direction="column" sx={{
            textAlign: "center",
            p: 3,
            gap: 5,
            borderRadius: 30,
            bgColor: checkState(i) === "WIN" ? "red.500" : checkState(i) === "LOSE" ? "blue.500" : "white",
            color: checkState(i) === "WIN" || checkState(i) === "LOSE" ? "white" : undefined,
          }}>
            <Flex direction="column">
              <Box>{player.group}</Box>
              <Box>{i + 1}</Box>
            </Flex>
            <Flex
              sx={{
                writingMode: "vertical-rl",
                fontSize: "clamp(8vh, 2rem, 8vw)",
                height: "40vh",
                margin: "auto",
              }}
            >
              {player.name}
            </Flex>
            <Button
              colorScheme={checkState(i) === "WIN" || checkState(i) === "LOSE" ? "white" : "red"}
              variant="ghost"
              size="lg"
              fontSize="4xl"
              onClick={() => correct(i)}
            >
              {player.correct >= gameState.config.win ? "WIN" : player.correct}
            </Button>
            <Button
              colorScheme={checkState(i) === "WIN" || checkState(i) === "LOSE" ? "white" : "blue"}
              variant="ghost"
              size="lg"
              fontSize="4xl"
              onClick={() => incorrect(i)}
            >
              {player.incorrect >= gameState.config.lose ? "LOSE" : player.incorrect}
            </Button>
          </Flex>
        ))}
      </Flex>
      <LogArea logs={gameState.logs.map(log => `${gameState.players[log.player].name}が${log.variant === "correct" ? "正答" : "誤答"}しました。`)} />
    </Box>
  );
};
