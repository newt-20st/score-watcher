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
  Text,
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
  getAttacksurvivalGameState,
  AttacksurvivalGameStateProps,
  AttacksurvivalInitialGameState,
} from "../libs/state";

import LoadQuiz from "../components/LoadQuiz";
import Header from "../components/Header";
import ConfigNumberInput from "../components/ConfigNumberInput";
import BoardHeader from "../components/BoardHeader";
import LogArea from "../components/LogArea";
import ConfigMenu from "../components/ConfigMenu";
import FundamentalFormatConfig from "../block/FundamentalFormatConfig";
import FundamentalPlayerConfig from "../block/FundamentalPlayerConfig";

export const AttacksurvivalConfig: React.FC = () => {
  const [gameState, setGameState] = useState<AttacksurvivalGameStateProps>(
    getAttacksurvivalGameState()
  );

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    if (gameState.players.length < gameState.config.count) {
      let newPlayers: {
        name: string;
        score: number;
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
          score: gameState.config.n,
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
    setGameState(AttacksurvivalInitialGameState);
  };

  return (
    <Container maxW="3xl">
      <Header />
      <Heading fontSize="3xl" my={5}>アタックサバイバル</Heading>
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
                label="初期ポイント"
                value={gameState.config.n}
                min={1}
                max={1000}
                onChange={(e) =>
                  setGameState(
                    produce(gameState, (draft) => {
                      draft.config.n = e as any;
                    })
                  )
                }
                required
              />
              <ConfigNumberInput
                label="限定問題数"
                value={gameState.config.end}
                min={1}
                max={1000}
                onChange={(e) =>
                  setGameState(
                    produce(gameState, (draft) => {
                      draft.config.end = e as any;
                    })
                  )
                } />
              <ConfigNumberInput
                label="自分が正答"
                value={gameState.config.correct.me}
                min={-15}
                max={15}
                onChange={(e) =>
                  setGameState(
                    produce(gameState, (draft) => {
                      draft.config.correct.me = e as any;
                    })
                  )
                }
                required
              />
              <ConfigNumberInput
                label="他人が正答"
                value={gameState.config.correct.other}
                min={-15}
                max={15}
                onChange={(e) =>
                  setGameState(
                    produce(gameState, (draft) => {
                      draft.config.correct.other = e as any;
                    })
                  )
                }
                required
              />
              <ConfigNumberInput
                label="自分が誤答"
                value={gameState.config.incorrect.me}
                min={-15}
                max={15}
                onChange={(e) =>
                  setGameState(
                    produce(gameState, (draft) => {
                      draft.config.incorrect.me = e as any;
                    })
                  )
                }
                required
              />
              <ConfigNumberInput
                label="他人が誤答"
                value={gameState.config.incorrect.other}
                min={-15}
                max={15}
                onChange={(e) =>
                  setGameState(
                    produce(gameState, (draft) => {
                      draft.config.incorrect.other = e as any;
                    })
                  )
                }
                required
              />
              <ConfigNumberInput
                label="スルー"
                value={gameState.config.through}
                min={-15}
                max={15}
                onChange={(e) =>
                  setGameState(
                    produce(gameState, (draft) => {
                      draft.config.through = e as any;
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
      <ConfigMenu reset={reset} to="/board/attacksurvival" />
    </Container>
  );
};

export const AttacksurvivalBoard: React.FC = () => {
  const [gameState, setGameState] = useState<AttacksurvivalGameStateProps>(
    getAttacksurvivalGameState()
  );

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  const correct = (playerIndex: number) => {
    setGameState(
      produce(gameState, (draft) => {
        const newPlayerState = draft.players.map((player, i) => {
          if (i === playerIndex) {
            return {
              ...player,
              score: player.score + draft.config.correct.me,
              correct: player.correct + 1,
            };
          } else {
            return {
              ...player,
              score: player.score + draft.config.correct.other,
            };
          }
        });
        draft.players = newPlayerState;
        draft.logs.unshift({
          type: "attacksurvival",
          variant: "correct",
          player: playerIndex,
        });
      })
    );
  };

  const incorrect = (playerIndex: number) => {
    setGameState(
      produce(gameState, (draft) => {
        const newPlayerState = draft.players.map((player, i) => {
          if (i === playerIndex) {
            return {
              ...player,
              score: player.score + draft.config.incorrect.me,
              incorrect: player.incorrect + 1,
            };
          } else {
            return {
              ...player,
              score: player.score + draft.config.incorrect.other,
            };
          }
        });
        draft.players = newPlayerState;
        draft.logs.unshift({
          type: "attacksurvival",
          variant: "incorrect",
          player: playerIndex,
        });
      })
    );
  };

  const checkState = (i: number) => {
    if (gameState.players[i].score <= 0) {
      return "LOSE";
    } else {
      return gameState.players[i].score;
    }
  };

  const undo = () => {
    setGameState(
      produce(gameState, (draft) => {
        const lastLog = draft.logs[0];
        if (lastLog.variant === "correct") {
          const newPlayerState = draft.players.map((player, i) => {
            if (i === lastLog.player) {
              return {
                ...player,
                score: player.score - draft.config.correct.me,
                correct: player.correct - 1,
              };
            } else {
              return {
                ...player,
                score: player.score - draft.config.correct.other,
              };
            }
          });
          draft.players = newPlayerState;
        } else {
          const newPlayerState = draft.players.map((player, i) => {
            if (i === lastLog.player) {
              return {
                ...player,
                score: player.score - draft.config.incorrect.me,
                correct: player.incorrect - 1,
              };
            } else {
              return {
                ...player,
                score: player.score - draft.config.incorrect.other,
              };
            }
          });
          draft.players = newPlayerState;
        }
        draft.logs.pop();
      })
    );
  };

  return (
    <Box>
      <BoardHeader name={gameState.config.name} type={gameState.type} current={gameState.logs.length} undo={undo} />
      <Flex sx={{ width: "100%", justifyContent: "space-evenly", mt: 5 }}>
        {gameState.players.map((player, i) => (
          <Flex
            key={i}
            direction="column"
            sx={{
              textAlign: "center",
              gap: 5,
              p: 3,
              borderRadius: 30,
              bgColor: checkState(i) === "LOSE" ? "blue.500" : "white",
            }}
          >
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
            >{player.name}
            </Flex>
            <Text fontSize="4xl" color="green.500">
              {checkState(i)}
            </Text>
            <Flex>
              <Button
                colorScheme="red"
                variant="ghost"
                size="lg"
                fontSize="4xl"
                onClick={() => correct(i)}
              >
                {player.correct}
              </Button>
              <Button
                colorScheme="blue"
                variant="ghost"
                size="lg"
                fontSize="4xl"
                onClick={() => incorrect(i)}
              >
                {player.incorrect}
              </Button>
            </Flex>
          </Flex>
        ))}
      </Flex>
      <LogArea logs={gameState.logs.map(log => `${gameState.players[log.player].name}が${log.variant === "correct" ? "正答" : "誤答"}しました。`)} />
    </Box>
  );
};
