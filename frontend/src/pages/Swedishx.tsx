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
} from "@chakra-ui/react";
import {
  getSwedishxGameState,
  SwedishxGameStateProps,
  SwedishxInitialGameState,
} from "../libs/state";
import LoadQuiz from "../components/LoadQuiz";
import Header from "../components/Header";
import BoardHeader from "../components/BoardHeader";
import ConfigNumberInput from "../components/ConfigNumberInput";
import LogArea from "../components/LogArea";

export const SwedishxConfig: React.FC = () => {
  const [gameState, setGameState] = useState<SwedishxGameStateProps>(
    getSwedishxGameState()
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
    setGameState(SwedishxInitialGameState);
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
          <Flex flexGrow={1} gap={5}>
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
            <ConfigNumberInput
              label="プレイヤーの人数"
              value={gameState.config.count}
              min={1}
              max={15}
              onChange={(e) =>
                setGameState(
                  produce(gameState, (draft) => {
                    draft.config.count = e as any;
                  })
                )
              }
              required
            />
            <ConfigNumberInput
              label="X"
              value={gameState.config.x}
              min={1}
              max={1000}
              onChange={(e) =>
                setGameState(
                  produce(gameState, (draft) => {
                    draft.config.x = e as any;
                  })
                )
              } />
            {gameState.config.end && (
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
            )}
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
          <Link to="/board/swedishx">
            <Button colorScheme="green">ボードを表示</Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export const SwedishxBoard: React.FC = () => {
  const [gameState, setGameState] = useState<SwedishxGameStateProps>(
    getSwedishxGameState()
  );

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  const undo = () => {
    setGameState(
      produce(gameState, (draft) => {
        if (draft.logs[draft.logs.length - 1].variant === "correct") {
          draft.players[draft.logs[draft.logs.length - 1].player].correct--;
        } else {
          draft.players[draft.logs[draft.logs.length - 1].player].incorrect--;
        }
        draft.logs.pop();
      })
    );
  };

  const correct = (playerIndex: number) => {
    setGameState(
      produce(gameState, (draft) => {
        draft.players[playerIndex].correct++;
        draft.logs.unshift({
          type: "swedishx",
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
          type: "swedishx",
          variant: "incorrect",
          player: playerIndex,
        });
      })
    );
  };

  const calcScore = (i: number) => {
    const incorrect = gameState.players[i].incorrect;
    return gameState.players[i].correct - ((1 + incorrect) * incorrect) / 2;
  };
  const checkState = (i: number) => {
    const score = calcScore(i);
    if (score >= gameState.config.x) {
      return "WIN!";
    } else {
      return score;
    }
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
              bgColor: checkState(i) === "WIN!" ? "red.500" : "white",
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
