import React from "react";
import { Badge, FormControl, FormLabel, Input } from "@chakra-ui/react";
import produce from "immer";
import ConfigNumberInput from "../components/ConfigNumberInput";
import { AnyGameStateProps } from "../libs/state";

type FundamentalFormatConfigProps = {
  gameState: AnyGameStateProps;
  // anyがAnyGameStatePropsだと動かない！！なんとかしたい
  setGameState: React.Dispatch<React.SetStateAction<any>>;
  i: number;
}

const FundamentalPlayerConfig: React.FC<FundamentalFormatConfigProps> = ({ gameState, setGameState, i }) => {
  return (
    <>
      <FormControl>
        <FormLabel>
          名前
          <Badge colorScheme="red" mx={2}>
            必須
          </Badge>
        </FormLabel>
        <Input
          type="text"
          value={gameState.players[i].name}
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
        <FormLabel>所属</FormLabel>
        <Input
          type="text"
          value={gameState.players[i].group}
          onChange={(e) =>
            setGameState(
              produce(gameState, (draft) => {
                draft.players[i].group = e.target.value;
              })
            )
          }
        />
      </FormControl>
    </>
  )
}

export default FundamentalPlayerConfig;