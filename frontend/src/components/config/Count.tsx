import React, { useEffect, useState } from "react";
import produce from "immer";
import { Link } from "react-router-dom";
import { Badge, Box, Flex, FormControl, FormLabel, Heading, Text, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Button, UnorderedList, ListItem } from "@chakra-ui/react";


type GameConfigProps = {
  name: string;
  count: number;
}
type PlayerProps = {
  name: string;
  score: number;
  group: string;
}
type LogPropps = {
  type: "correct";
  player: number;
}

export const CountConfig: React.FC = () => {
  const localGameConfig = localStorage.getItem("gameConfig");
  const [gameConfig, setGameConfig] = useState<GameConfigProps>(localGameConfig ? JSON.parse(localGameConfig) : { name: "", count: 5 });
  const localPlayers = localStorage.getItem("players");
  const [players, setPlayers] = useState<PlayerProps[]>(localPlayers ? JSON.parse(localPlayers) : []);

  useEffect(() => {
    localStorage.setItem("gameConfig", JSON.stringify(gameConfig));
    localStorage.setItem("players", JSON.stringify(players));
  }, [gameConfig, players]);

  useEffect(() => {
    if (players.length < gameConfig.count) {
      let newPlayers: PlayerProps[] = [];
      for (let i = 0; i < gameConfig.count - players.length; i++) {
        newPlayers.push({ name: `Player ${players.length + i}`, score: 0, group: "" })
      }
      setPlayers([...players, ...newPlayers]);
    } else {
      setPlayers(players.slice(0, gameConfig.count));
    }
  }, [gameConfig.count]);

  return (
    <Box p={5}>
      <Heading fontSize="3xl" >スコア計算</Heading>
      <Flex pt={5} gap={5}>
        <Heading fontSize="2xl" width={200}>形式設定</Heading>
        <Flex flexGrow={1} flexDirection="column" gap={5}>
          <FormControl>
            <FormLabel>大会名</FormLabel>
            <Input type='text' value={gameConfig.name} onChange={e => setGameConfig(produce(gameConfig, draft => { draft.name = e.target.value }))} />
          </FormControl>
          <FormControl>
            <FormLabel>プレイヤーの人数<Badge colorScheme="red" mx={2}>必須</Badge></FormLabel>
            <NumberInput min={1} max={15}
              value={gameConfig.count} onChange={e => setGameConfig(produce(gameConfig, draft => { draft.count = e as any }))} >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Flex>
      </Flex>
      <Flex pt={5} gap={5}>
        <Heading fontSize="2xl" width={200}>参加者設定</Heading>
        <Flex flexGrow={1} flexDirection="column" gap={5}>
          {players.map((player, i) => (
            <Box key={i}>
              <Heading fontSize="2xl" width={200}>プレイヤー {i + 1}</Heading>
              <Flex gap={5}>
                <FormControl>
                  <FormLabel>名前<Badge colorScheme="red" mx={2}>必須</Badge></FormLabel>
                  <Input type='text' value={player.name} onChange={e => setPlayers(produce(players, draft => { draft[i].name = e.target.value }))} />
                </FormControl>
                <FormControl>
                  <FormLabel>初期値<Badge colorScheme="red" mx={2}>必須</Badge></FormLabel>
                  <NumberInput min={1} max={15}
                    value={player.score} onChange={e => setPlayers(produce(players, draft => { draft[i].score = e as any }))} >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>所属<Badge colorScheme="red" mx={2}>必須</Badge></FormLabel>
                  <Input type='text' value={player.group} onChange={e => setPlayers(produce(players, draft => { draft[i].group = e.target.value }))} />
                </FormControl>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Flex>
      <Box height={20}></Box>
      <Box sx={{ position: "fixed", bottom: 0, left: 0, width: "100%", textAlign: "right", bgColor: "white", p: 5 }}>
        <Link to="/board/count">
          <Button colorScheme="green">ボードを表示</Button>
        </Link>
      </Box>
    </Box >
  );
};

export const CountBoard: React.FC = () => {
  const localGameConfig = localStorage.getItem("gameConfig");
  const [gameConfig, setGameConfig] = useState<GameConfigProps>(localGameConfig ? JSON.parse(localGameConfig) : { name: "", count: 5 });
  const localPlayers = localStorage.getItem("players");
  const [players, setPlayers] = useState<PlayerProps[]>(localPlayers ? JSON.parse(localPlayers) : []);
  const localLog = localStorage.getItem("log");
  const [log, setLog] = useState<LogPropps[]>(localLog ? JSON.parse(localLog) : []);

  useEffect(() => {
    localStorage.setItem("gameConfig", JSON.stringify(gameConfig));
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("log", JSON.stringify(log));
  }, [gameConfig, players]);

  const correct = (playerIndex: number) => {
    setPlayers(produce(players, draft => { draft[playerIndex].score++ }));
    setLog(produce(log, draft => { draft.unshift({ type: "correct", player: playerIndex }) }));
  }

  return (
    <Box>
      <Flex sx={{
        borderColor: "green.500",
        borderBottomWidth: 2,
      }}>
        <Box sx={{ width: 200, p: 2, bgColor: "green.500", borderRightRadius: 50 }}>
          <Heading fontSize="3xl" color="white">{gameConfig.name}</Heading>
          <Text color="white">スコア計算</Text>
        </Box>
        <Flex sx={{ flexGrow: 1, alignItems: "center" }}>
          <Box p={2}>Q1</Box>
          <Box p={2}>quiz</Box>
        </Flex>
      </Flex>
      <Flex p={3} justifyContent="flex-end">
        <Link to="/config/count">
          <Button colorScheme="teal" size="xs">設定に戻る</Button>
        </Link>
      </Flex>
      <Flex sx={{ width: "100%", justifyContent: "space-evenly", mt: 5 }}>
        {players.map((player, i) => (
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
      {log.length !== 0 && (
        <Flex direction="column" sx={{
          m: 5,
          p: 3,
          borderColor: "green.500",
          borderRadius: 5,
          borderWidth: 2,
        }}>
          <UnorderedList>
            {log.map((activity, i) => <ListItem key={i}>{players[activity.player].name} が {activity.type === "correct" ? "正答" : "誤答"}しました。</ListItem>)}
          </UnorderedList>
        </Flex>
      )}
    </Box>
  )
}