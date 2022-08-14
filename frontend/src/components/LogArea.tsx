import React from "react";
import { Flex, UnorderedList, ListItem } from "@chakra-ui/react";

type LogAreaProps = {
  logs: string[];
}

const LogArea: React.FC<LogAreaProps> = ({ logs }) => {
  return (
    <>
      {
        logs.length !== 0 && (
          <Flex
            direction="column"
            sx={{
              mx: 5,
              my: 20,
              p: 3,
              borderColor: "green.500",
              borderRadius: 5,
              borderWidth: 2,
            }}
          >
            <UnorderedList>
              {logs.map((log, i) => (
                <ListItem key={i}>
                  {log}
                </ListItem>
              ))}
            </UnorderedList>
          </Flex>
        )
      }
    </>
  )
}

export default LogArea;