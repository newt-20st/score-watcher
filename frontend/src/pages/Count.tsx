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
import ConfigMenu from "../components/ConfigMenu";
import FundamentalFormatConfig from "../block/FundamentalFormatConfig";
import FundamentalPlayerConfig from "../block/FundamentalPlayerConfig";

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
      <Heading fontSize="3xl" my={5}>スコア計算</Heading>
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
      <ConfigMenu reset={reset} to="/board/count" />
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
