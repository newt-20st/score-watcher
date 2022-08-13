import React, { useEffect, useState } from "react";
import produce from "immer";
import { Link } from "react-router-dom";
import { Badge, Box, Flex, FormControl, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Button } from "@chakra-ui/react";


type GameConfigProps = {
  name: string;
  count: number;
}
type PlayerProps = {
  name: string;
  initial: {
    score: number;
  }
  group: string;
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
        newPlayers.push({ name: `Player ${players.length + i}`, initial: { score: 0 }, group: "" })
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
                    value={player.initial.score} onChange={e => setPlayers(produce(players, draft => { draft[i].initial.score = e as any }))} >
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