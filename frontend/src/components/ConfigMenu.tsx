import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";

type ConfigMenuProps = {
  reset: (e: any) => void;
  to: string;
}

const ConfigMenu: React.FC<ConfigMenuProps> = ({ reset, to }) => {
  return (
    <Flex
      flexDirection="column"
      sx={{
        position: "fixed",
        bottom: "5vh",
        right: "5vw",
        width: 150,
        justifyContent: "end",
        bgColor: "white",
        p: 3,
        gap: 3,
        borderColor: "green.500",
        borderWidth: 2,
        borderRadius: 10,
      }}
    >
      <Button colorScheme="red" onClick={reset} >
        設定をリセット
      </Button>
      <Link to={to} >
        <Button colorScheme="green" w="100%">ボードを表示</Button>
      </Link>
    </Flex>
  )
}

export default ConfigMenu;