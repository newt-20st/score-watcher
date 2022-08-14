import React, { useEffect, useState } from "react";
import produce from "immer";
import { Link, useNavigate } from "react-router-dom";
import {
  Badge,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Button,
  UnorderedList,
  ListItem,
  Image,
} from "@chakra-ui/react";
import {
  getAttacksurvivalGameState,
  initialQuizData,
  AttacksurvivalGameStateProps,
  AttacksurvivalInitialGameState,
  QuizDataProps,
} from "../libs/state";

import LoadQuiz from "../components/LoadQuiz";
import Header from "../components/Header";

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
    <Box>
      <Header />
      <Box p={5}>
        <Heading fontSize="3xl">SwedishX</Heading>
        <Flex pt={5} gap={5}>
          <Heading fontSize="2xl" width={200}>
            形式設定
          </Heading>
          <Flex direction="column" flexGrow={1} gap={5}>
            <Flex>
              <FormControl>
                <FormLabel>
                  大会名
                  <Badge colorScheme="red" mx={2}>
                    必須
                  </Badge>
                </FormLabel>
                <Input
                  type="text"
                  value={gameState.config.name}
                  onChange={(e) =>
                    setGameState(
                      produce(gameState, (draft) => {
                        draft.config.name = e.target.value;
                      })
                    )
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  プレイヤーの人数
                  <Badge colorScheme="red" mx={2}>
                    必須
                  </Badge>
                </FormLabel>
                <NumberInput
                  min={1}
                  max={15}
                  value={gameState.config.count}
                  onChange={(e) =>
                    setGameState(
                      produce(gameState, (draft) => {
                        draft.config.count = e as any;
                      })
                    )
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>
                  初期ポイント{" "}
                  <Badge colorScheme="red" mx={2}>
                    必須
                  </Badge>
                </FormLabel>
                <NumberInput
                  min={1}
                  max={1000}
                  value={gameState.config.n}
                  onChange={(e) =>
                    setGameState(
                      produce(gameState, (draft) => {
                        draft.config.n = e as any;
                      })
                    )
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>限定問題数 </FormLabel>
                <NumberInput
                  min={1}
                  max={1000}
                  value={gameState.config.end}
                  onChange={(e) =>
                    setGameState(
                      produce(gameState, (draft) => {
                        draft.config.end = e as any;
                      })
                    )
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>
            <Flex>
              <FormControl>
                <FormLabel>
                  自分が正答
                  <Badge colorScheme="red" mx={2}>
                    必須
                  </Badge>
                </FormLabel>
                <NumberInput
                  min={1}
                  max={15}
                  value={gameState.config.correct.me}
                  onChange={(e) =>
                    setGameState(
                      produce(gameState, (draft) => {
                        draft.config.correct.me = e as any;
                      })
                    )
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>
                  他人が正答
                  <Badge colorScheme="red" mx={2}>
                    必須
                  </Badge>
                </FormLabel>
                <NumberInput
                  min={1}
                  max={15}
                  value={gameState.config.correct.other}
                  onChange={(e) =>
                    setGameState(
                      produce(gameState, (draft) => {
                        draft.config.correct.other = e as any;
                      })
                    )
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>
                  自分が誤答
                  <Badge colorScheme="red" mx={2}>
                    必須
                  </Badge>
                </FormLabel>
                <NumberInput
                  min={1}
                  max={15}
                  value={gameState.config.incorrect.me}
                  onChange={(e) =>
                    setGameState(
                      produce(gameState, (draft) => {
                        draft.config.incorrect.me = e as any;
                      })
                    )
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>
                  他人が誤答
                  <Badge colorScheme="red" mx={2}>
                    必須
                  </Badge>
                </FormLabel>
                <NumberInput
                  min={1}
                  max={15}
                  value={gameState.config.incorrect.other}
                  onChange={(e) =>
                    setGameState(
                      produce(gameState, (draft) => {
                        draft.config.incorrect.other = e as any;
                      })
                    )
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>
                  スルー
                  <Badge colorScheme="red" mx={2}>
                    必須
                  </Badge>
                </FormLabel>
                <NumberInput
                  min={1}
                  max={15}
                  value={gameState.config.through}
                  onChange={(e) =>
                    setGameState(
                      produce(gameState, (draft) => {
                        draft.config.through = e as any;
                      })
                    )
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>
          </Flex>
        </Flex>
        <Flex pt={5} gap={5}>
          <Heading fontSize="2xl" width={200}>
            参加者設定
          </Heading>
          <Flex flexGrow={1} flexDirection="column" gap={5}>
            {gameState.players.map((player, i) => (
              <Box key={i}>
                <Heading fontSize="xl" width={200}>
                  プレイヤー {i + 1}
                </Heading>
                <Flex gap={5}>
                  <FormControl>
                    <FormLabel>
                      名前
                      <Badge colorScheme="red" mx={2}>
                        必須
                      </Badge>
                    </FormLabel>
                    <Input
                      type="text"
                      value={player.name}
                      onChange={(e) =>
                        setGameState(
                          produce(gameState, (draft) => {
                            draft.players[i].name = e.target.value;
                          })
                        )
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>初期正解数</FormLabel>
                    <NumberInput
                      min={1}
                      max={15}
                      value={player.correct}
                      onChange={(e) =>
                        setGameState(
                          produce(gameState, (draft) => {
                            draft.players[i].correct = e as any;
                          })
                        )
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormControl>
                    <FormLabel>初期誤答数</FormLabel>
                    <NumberInput
                      min={1}
                      max={15}
                      value={player.incorrect}
                      onChange={(e) =>
                        setGameState(
                          produce(gameState, (draft) => {
                            draft.players[i].incorrect = e as any;
                          })
                        )
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormControl>
                    <FormLabel>所属</FormLabel>
                    <Input
                      type="text"
                      value={player.group}
                      onChange={(e) =>
                        setGameState(
                          produce(gameState, (draft) => {
                            draft.players[i].group = e.target.value;
                          })
                        )
                      }
                    />
                  </FormControl>
                </Flex>
              </Box>
            ))}
          </Flex>
        </Flex>
        <Flex pt={5} gap={5}>
          <Heading fontSize="2xl" width={200}>
            クイズ
          </Heading>
          <Box flexGrow={1}>
            <Heading fontSize="xl" width={200}>
              問題をインポート
            </Heading>
            <LoadQuiz />
          </Box>
        </Flex>
        <Box height={20}></Box>
        <Flex
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            justifyContent: "end",
            bgColor: "white",
            p: 3,
            gap: 3,
            borderColor: "green.500",
            borderTopWidth: 2,
          }}
        >
          <Button colorScheme="red" onClick={reset}>
            設定をリセット
          </Button>
          <Link to="/board/attacksurvival">
            <Button colorScheme="green">ボードを表示</Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export const AttacksurvivalBoard: React.FC = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<AttacksurvivalGameStateProps>(
    getAttacksurvivalGameState()
  );
  const quizData: QuizDataProps[] = initialQuizData;

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
        console.log(newPlayerState);
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
      <Flex
        sx={{
          borderColor: "green.500",
          borderBottomWidth: 2,
        }}
      >
        <Box
          sx={{ width: 200, p: 2, bgColor: "green.500", borderRightRadius: 50 }}
        >
          <Heading fontSize="3xl" color="white">
            {gameState.config.name}
          </Heading>
          <Text color="white">スコア計算</Text>
        </Box>
        <Flex sx={{ flexGrow: 1, alignItems: "center" }}>
          <Box p={2} minWidth={50}>
            Q {gameState.logs.length + 1}
          </Box>
          {0 < gameState.logs.length &&
            gameState.logs.length < quizData.length && (
              <Flex
                direction="column"
                sx={{
                  px: 2,
                  borderColor: "green.500",
                  borderLeftWidth: 2,
                }}
              >
                <Box fontSize="xl">{quizData[gameState.logs.length].q}</Box>
                <Box fontWeight={800} color="red.500">
                  {quizData[gameState.logs.length].a}
                </Box>
              </Flex>
            )}
        </Flex>
      </Flex>
      <Flex p={3} justifyContent="flex-end" gap={2} alignItems="center">
        <Button onClick={undo} colorScheme="blue" size="xs">
          元に戻す
        </Button>
        <Button
          onClick={() => navigate("/config/attacksurvival")}
          colorScheme="teal"
          size="xs"
        >
          設定に戻る
        </Button>
      </Flex>
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
            <Box
              sx={{
                writingMode: "vertical-rl",
                fontSize: "clamp(8vh, 2rem, 8vw)",
                height: "40vh",
                margin: "auto",
              }}
            >
              <Text>{player.name}</Text>
            </Box>
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
      {gameState.logs.length !== 0 && (
        <Flex
          direction="column"
          sx={{
            m: 5,
            p: 3,
            borderColor: "green.500",
            borderRadius: 5,
            borderWidth: 2,
          }}
        >
          <UnorderedList>
            {gameState.logs.map((activity, i) => (
              <ListItem key={i}>
                {gameState.players[activity.player].name} が{" "}
                {activity.variant === "correct" ? "正答" : "誤答"}しました。
              </ListItem>
            ))}
          </UnorderedList>
        </Flex>
      )}
    </Box>
  );
};
