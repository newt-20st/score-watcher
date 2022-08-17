import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { initialQuizData, QuizDataProps } from "../libs/state";

const LoadQuiz: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizDataProps[]>(initialQuizData);
  const [rawQuizText, setRawQuizText] = useState(
    initialQuizData.map((quiz) => `${quiz.q} ${quiz.a}\n`).join("")
  );
  const [separateType, setSparateType] = useState("tab");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("quizData", JSON.stringify(quizData));
  }, [quizData]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length !== 0) {
      const quizRaw = e.target.value.split("\n");
      let dataArray: QuizDataProps[] = [];
      if (separateType === "comma") {
        for (let i = 0; i < quizRaw.length; i++) {
          dataArray.push({
            q: quizRaw[i].split(",")[0],
            a: quizRaw[i].split(",")[1],
          });
        }
      } else {
        for (let i = 0; i < quizRaw.length; i++) {
          dataArray.push({
            q: quizRaw[i].split("\t")[0],
            a: quizRaw[i].split("\t")[1],
          });
        }
      }
      setRawQuizText(e.target.value);
      setQuizData(dataArray);
    }
  };

  return (
    <Box>
      <Flex py={3} gap={3} alignItems="center">
        <Button
          size="sm"
          colorScheme="green"
          disabled={quizData.length === 0}
          onClick={() => setDrawerOpen(true)}
        >
          プレビュー
        </Button>
        <Button
          size="sm"
          colorScheme="red"
          disabled={quizData.length === 0}
          onClick={() => {
            setQuizData([]);
            setRawQuizText("");
          }}
        >
          リセット
        </Button>
        <RadioGroup onChange={(e) => setSparateType(e)} value={separateType}>
          <Stack direction="row">
            <Radio value="comma">カンマ区切り</Radio>
            <Radio value="tab">タブ区切り</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <Textarea
        placeholder="1列目を問題文、2列目を答えにしてCSV形式で貼り付けてください"
        value={rawQuizText}
        onChange={handleChange}
        size="sm"
        minH={500}
        resize="vertical"
        mb={100}
      />
      <Drawer
        isOpen={drawerOpen}
        placement="right"
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>問題プレビュー</DrawerHeader>
          <DrawerBody>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>n</Th>
                    <Th>問題文</Th>
                    <Th>答え</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {quizData.map((quiz, i) => (
                    <Tr key={i}>
                      <Td>{i + 1}</Td>
                      <Td>{quiz.q}</Td>
                      <Td>{quiz.a}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default LoadQuiz;
