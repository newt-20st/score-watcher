import React from "react";
import { Link } from "react-router-dom";
import { Box, BoxProps, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";

const Card: React.FC<BoxProps> = (props) => (
  <Box
    sx={{
      p: 2,
      height: "100%",
      color: "green.500",
      borderColor: "green.500",
      borderRadius: 5,
      borderWidth: 2,
      transition: "all ease-in 0.3s",
    }}
    _hover={{
      color: "white",
      backgroundColor: "green.500",
    }}
    {...props} />
)
const Home: React.FC = () => {
  return (
    <Flex direction="column">
      <Box>
        <Link to="/">
          <Image src="/src/assets/images/logo.png" sx={{ maxHeight: "10vh", margin: "auto" }} />
        </Link>
      </Box>
      <Box p={5}>
        <Text>Ver.2.0-dev</Text>
        <Text>
          最新のバージョンは<a
            href="https://github.com/newt-20st/score-watcher/releases"
            target="_blank"
          >こちらのリポジトリ</a
          >から確認してください。
        </Text>
      </Box>
      <Box p={5}>
        <Heading fontSize="2xl">形式を選択</Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={5} py={5}>
          <Link to="/json">
            <Card>
              <Heading fontSize="xl">設定ファイルから読み込む</Heading>
              <Box>
                過去に設定した際に出力したファイルから形式データを読み込みます。
              </Box>
            </Card>
          </Link>
          <Link to="/config/count">
            <Card>
              <Heading fontSize="xl">スコア計算</Heading>
              <Box>単純なスコアを計算します。</Box>
            </Card>
          </Link>
          <Link to="/config/nomx">
            <Card>
              <Heading fontSize="xl">N o M x</Heading>
              <Box>N回正解で勝ち抜け、M回誤答で失格の形式です。</Box>
            </Card>
          </Link>
          <Link to="/config/nbyn">
            <Card>
              <Heading fontSize="xl">N by N</Heading>
              <Box>
                正答数と誤答数2つの変数を持ち、それぞれの初期値は0とNです。2つの変数の積がN
                ** 2に達したら勝ち抜けの形式です。
              </Box>
            </Card>
          </Link>
          <Link to="/config/nupdown">
            <Card>
              <Heading fontSize="xl">N updown</Heading>
              <Box>
                N回正解で勝ち抜けですが、途中で一度でも誤答すると0に戻る形式です。
              </Box>
            </Card>
          </Link>
          <Link to="/config/swedishx">
            <Card>
              <Heading fontSize="xl">Swedish X</Heading>
              <Box>
                1回の正答で+1,n回目の誤答で-nでXを目指す形式です。
              </Box>
            </Card>
          </Link>
          <Link to="/config/attacksurvival">
            <Card>
              <Heading fontSize="xl">Attack Survival</Heading>
              <Box></Box>
            </Card>
          </Link>
          <Link to="/config/Squarex">
            <Card>
              <Heading fontSize="xl">Square X</Heading>
              <Box>
                奇数問目と偶数問目の正解数をかけた数がX以上になれば勝ち抜けの形式です。
              </Box>
            </Card>
          </Link>
        </Grid>
      </Box>
      <Box p={5}>
        <Heading fontSize="2xl">大会モード</Heading>
        <Text>
          複数の形式が連結した、複数組や複数ステージに対応したモードです。v1.0のリリースで実装予定です。
        </Text>
      </Box>
    </Flex>
  );
};

export default Home;
