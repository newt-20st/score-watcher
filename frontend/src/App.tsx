import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { CountBoard, CountConfig } from "./components/config/Count";

import Home from "./pages/Home";
import { NomxBoard, NomxConfig } from "./components/config/Nomx";
import { NbynBoard, NbynConfig } from "./components/config/Nbyn";
import { NupdownBoard, NupdownConfig } from "./components/config/Nupdown";

const App: React.FC = () => {
  return (
    <Box bgColor={"gray.50"} minHeight="100vh">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="config">
              <Route path="count" element={<CountConfig />} />
              <Route path="nomx" element={<NomxConfig />} />
              <Route path="nbyn" element={<NbynConfig />} />
              <Route path="nupdown" element={<NupdownConfig />} />
            </Route>
            <Route path="board">
              <Route path="count" element={<CountBoard />} />
              <Route path="nomx" element={<NomxBoard />} />
              <Route path="nbyn" element={<NbynBoard />} />
              <Route path="nupdown" element={<NupdownBoard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter >
    </Box >
  );
};

export default App;
