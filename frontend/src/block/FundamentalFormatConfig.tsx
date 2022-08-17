import React from "react";
import { Badge, FormControl, FormLabel, Input } from "@chakra-ui/react";
import produce from "immer";
import ConfigNumberInput from "../components/ConfigNumberInput";
import { AnyGameStateProps } from "../libs/state";

type FundamentalFormatConfigProps = {
  gameState: AnyGameStateProps;
  // anyがAnyGameStatePropsだと動かない！！なんとかしたい
  setGameState: React.Dispatch<React.SetStateAction<any>>;
}

const FundamentalFormatConfig: React.FC<FundamentalFormatConfigProps> = ({ gameState, setGameState }) => {
  return (
    <>
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
    </>
  )
}

export default FundamentalFormatConfig;