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
  Image
} from "@chakra-ui/react";
import { CountGameStateProps, countInitialGameState, getCountGameState } from "../libs/state";

type QuizDataProps = {
  q: string;
  a: string;
};
const initialQuizData: QuizDataProps[] = [];

export const CountConfig: React.FC = () => {
  const [gameState, setGameState] = useState<CountGameStateProps>(getCountGameState());
  const localQuizData = localStorage.getItem("quizData");
  const [quizData, setQuizData] = useState<QuizDataProps[]>(localQuizData ? JSON.parse(localQuizData) : initialQuizData);

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    if (gameState.players.length < gameState.config.count) {
      let newPlayers: { name: string; score: number; group: string }[] = [];
      for (let i = 1; i <= gameState.config.count - gameState.players.length; i++) {
        newPlayers.push({ name: `Player ${gameState.players.length + i}`, score: 0, group: "" })
      }
      setGameState(produce(gameState, draft => { draft.players = [...gameState.players, ...newPlayers] }));
    } else {
      setGameState(produce(gameState, draft => { draft.players = gameState.players.slice(0, gameState.config.count) }));
    }
  }, [gameState.config.count]);

  const reset = () => {
    setGameState(countInitialGameState);
  }

  return (<Box>
    <Box>
      <Link to="/">
        <Image src="../src/assets/images/logo.png" sx={{ maxHeight: "10vh", margin: "auto" }} />
      </Link>
    </Box>
    <Box p={5}>
      <Heading fontSize="3xl" >スコア計算</Heading>
      <Flex pt={5}>
        <Heading fontSize="2xl" width={200}>形式設定</Heading>
        <Flex flexGrow={1} gap={5}>
          <FormControl>
            <FormLabel>大会名<Badge colorScheme="red" mx={2}>必須</Badge></FormLabel>
            <Input type='text' value={gameState.config.name} onChange={e => setGameState(produce(gameState, draft => { draft.config.name = e.target.value }))} />
          </FormControl>
          <FormControl>
            <FormLabel>プレイヤーの人数<Badge colorScheme="red" mx={2}>必須</Badge></FormLabel>
            <NumberInput min={1} max={15}
              value={gameState.config.count} onChange={e => setGameState(produce(gameState, draft => { draft.config.count = e as any }))} >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Flex>
      </Flex>
      <Flex pt={5}>
        <Heading fontSize="2xl" width={200}>参加者設定</Heading>
        <Flex flexGrow={1} flexDirection="column" gap={5}>
          {gameState.players.map((player, i) => (
            <Box key={i}>
              <Heading fontSize="xl" width={200}>プレイヤー {i + 1}</Heading>
              <Flex gap={5}>
                <FormControl>
                  <FormLabel>名前<Badge colorScheme="red" mx={2}>必須</Badge></FormLabel>
                  <Input type='text' value={player.name} onChange={e => setGameState(produce(gameState, draft => { draft.players[i].name = e.target.value }))} />
                </FormControl>
                <FormControl>
                  <FormLabel>初期値</FormLabel>
                  <NumberInput min={1} max={15}
                    value={player.score} onChange={e => setGameState(produce(gameState, draft => { draft.players[i].score = e as any }))} >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>所属</FormLabel>
                  <Input type='text' value={player.group} onChange={e => setGameState(produce(gameState, draft => { draft.players[i].group = e.target.value }))} />
                </FormControl>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Flex>
      <Flex pt={5}>
        <Heading fontSize="2xl" width={200}>クイズ</Heading>
        <Box flexGrow={1}>
          <Heading fontSize="xl" width={200}>問題をインポート</Heading>
          <Text>準備中</Text>
        </Box>
      </Flex>
      <Box height={20}></Box>
      <Flex sx={{
        position: "fixed", bottom: 0, left: 0, width: "100%", justifyContent: "end", bgColor: "white", p: 3, gap: 3,
        borderColor: "green.500",
        borderTopWidth: 2,
      }}>
        <Button colorScheme="red" onClick={reset}>設定をリセット</Button>
        <Link to="/board/count">
          <Button colorScheme="green">ボードを表示</Button>
        </Link>
      </Flex>
    </Box>
  </Box>
  );
};

export const CountBoard: React.FC = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<CountGameStateProps>(getCountGameState());

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  const correct = (playerIndex: number) => {
    setGameState(produce(gameState, draft => {
      draft.players[playerIndex].score++;
      draft.logs.unshift({ type: "count", variant: "correct", player: playerIndex });
    }));
  }

  const undo = () => {
    setGameState(produce(gameState, draft => {
      draft.players[draft.logs[draft.logs.length - 1].player].score--;
      draft.logs.pop();
    }))
  }

  return (
    <Box>
      <Flex sx={{
        borderColor: "green.500",
        borderBottomWidth: 2,
      }}>
        <Box sx={{ width: 200, p: 2, bgColor: "green.500", borderRightRadius: 50 }}>
          <Heading fontSize="3xl" color="white">{gameState.config.name}</Heading>
          <Text color="white">スコア計算</Text>
        </Box>
        <Flex sx={{ flexGrow: 1, alignItems: "center" }}>
          <Box p={2}>Q1</Box>
          <Box p={2}>quiz</Box>
        </Flex>
      </Flex>
      <Flex p={3} gap={2} justifyContent="flex-end">
        <Button onClick={undo} disabled={gameState.logs.length === 0} colorScheme="blue" size="xs">元に戻す</Button>
        <Button onClick={() => navigate("/config/squarex")} colorScheme="teal" size="xs">設定に戻る</Button>
      </Flex>
      <Flex sx={{ width: "100%", justifyContent: "space-evenly", mt: 5 }}>
        {gameState.players.map((player, i) => (
          <Flex key={i} direction="column" sx={{ textAlign: "center", gap: 5 }}>
            <Flex direction="column">
              <Box>{player.group}</Box>
              <Box>{i + 1}</Box>
            </Flex>
            <Box sx={{ writingMode: "vertical-rl", fontSize: "clamp(8vh, 2rem, 8vw)", height: "40vh" }}>
              {player.name}
            </Box>
            <Button colorScheme="red" variant="ghost" size="lg" fontSize="4xl" onClick={() => correct(i)}>{player.score}</Button>
          </Flex>
        ))}
      </Flex>
      {gameState.logs.length !== 0 && (
        <Flex direction="column" sx={{
          m: 5,
          p: 3,
          borderColor: "green.500",
          borderRadius: 5,
          borderWidth: 2,
        }}>
          <UnorderedList>
            {gameState.logs.map((activity, i) => <ListItem key={i}>{gameState.players[activity.player].name} が {activity.variant === "correct" ? "正答" : "誤答"}しました。</ListItem>)}
          </UnorderedList>
        </Flex>
      )}
    </Box>
  )
}