import React from "react";
import { useNavigate } from "react-router-dom";
import { Text, Box, Button, Flex, Heading } from "@chakra-ui/react";

import { QuizDataProps, initialQuizData } from "../libs/state";

type BoardHeaderProps = {
  name: string;
  type: string;
  current: number;
  undo: () => void;
}
const BoardHeader: React.FC<BoardHeaderProps> = ({ name, type, current, undo }) => {
  const navigate = useNavigate();
  const quizData: QuizDataProps[] = initialQuizData;

  return (
    <Box>
      <Flex
        sx={{
          borderColor: "green.500",
          borderBottomWidth: 2,
        }}
      >
        <Box
          sx={{ width: 200, p: 2, bgColor: "green.500", borderRightRadius: 50 }}
        >
          <Heading fontSize="3xl" color="white">
            {name}
          </Heading>
          <Text color="white">{type}</Text>
        </Box>
        <Flex sx={{ flexGrow: 1, alignItems: "center" }}>
          <Box p={2} minWidth={50}>
            Q {current + 1}
          </Box>
          {0 < current &&
            current < quizData.length && (
              <Flex
                direction="column"
                sx={{
                  px: 2,
                  borderColor: "green.500",
                  borderLeftWidth: 2,
                }}
              >
                <Box fontSize="xl">{quizData[current].q}</Box>
                <Box fontWeight={800} color="red.500">
                  {quizData[current].a}
                </Box>
              </Flex>
            )}
        </Flex>
      </Flex>
      <Flex p={3} justifyContent="flex-end" gap={2} alignItems="center">
        <Button onClick={undo} colorScheme="blue" size="xs">
          元に戻す
        </Button>
        <Button
          onClick={() => navigate(`/config/${type}`)}
          colorScheme="teal"
          size="xs"
        >
          設定に戻る
        </Button>
      </Flex>
    </Box>
  )
}

export default BoardHeader;