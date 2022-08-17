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
  CountGameStateProps,
  countInitialGameState,
  getCountGameState,
} from "../libs/state";

import LoadQuiz from "../components/LoadQuiz";
import Header from "../components/Header";
import BoardHeader from "../components/BoardHeader";
import ConfigNumberInput from "../components/ConfigNumberInput";
import LogArea from "../components/LogArea";

export const CountConfig: React.FC = () => {
  const [gameState, setGameState] = useState<CountGameStateProps>(
    getCountGameState()
  );

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    if (gameState.players.length < gameState.config.count) {
      let newPlayers: { name: string; score: number; group: string }[] = [];
      for (
        let i = 1;
        i <= gameState.config.count - gameState.players.length;
        i++
      ) {
        newPlayers.push({
          name: `Player ${gameState.players.length + i}`,
          score: 0,
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
    setGameState(countInitialGameState);
  };

  return (
    <Container maxW="3xl">
      <Header />
      <Box p={5}>
        <Heading fontSize="3xl" mb={5}>スコア計算</Heading>
        <Tabs variant='enclosed'>
          <TabList>
            <Tab>形式設定</Tab>
            <Tab>参加者設定</Tab>
            <Tab>クイズ設定</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex direction="column" gap={5} my={5}>
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
                        label="初期値"
                        value={player.score}
                        min={1}
                        max={15}
                        onChange={(e) =>
                          setGameState(
                            produce(gameState, (draft) => {
                              draft.players[i].score = e as any;
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
          <Link to="/board/count">
            <Button colorScheme="green">ボードを表示</Button>
          </Link>
        </Flex>
      </Box>
    </Container>
  );
};

export const CountBoard: React.FC = () => {
  const [gameState, setGameState] = useState<CountGameStateProps>(
    getCountGameState()
  );

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  const correct = (playerIndex: number) => {
    setGameState(
      produce(gameState, (draft) => {
        draft.players[playerIndex].score++;
        draft.logs.unshift({
          type: "count",
          variant: "correct",
          player: playerIndex,
        });
      })
    );
  };

  const undo = () => {
    setGameState(
      produce(gameState, (draft) => {
        draft.players[draft.logs[draft.logs.length - 1].player].score--;
        draft.logs.pop();
      })
    );
  };

  return (
    <Box>
      <BoardHeader name={gameState.config.name} type={gameState.type} current={gameState.logs.length} undo={undo} />
      <Flex sx={{ width: "100%", justifyContent: "space-evenly", mt: 5 }}>
        {gameState.players.map((player, i) => (
          <Flex key={i} direction="column" sx={{ textAlign: "center", gap: 5 }}>
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
              colorScheme="red"
              variant="ghost"
              size="lg"
              fontSize="4xl"
              onClick={() => correct(i)}
            >
              {player.score}
            </Button>
          </Flex>
        ))}
      </Flex>
      <LogArea logs={gameState.logs.map(log => `${gameState.players[log.player].name}が${log.variant === "correct" ? "正答" : "誤答"}しました。`)} />
    </Box>
  );
};
