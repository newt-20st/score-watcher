import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { CountBoard, CountConfig } from "./components/config/Count";

import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Box bgColor={"gray.50"} minHeight="100vh">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="config">
              <Route path="count" element={<CountConfig />} />
            </Route>
            <Route path="board">
              <Route path="count" element={<CountBoard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter >
    </Box >
  );
};

export default App;
