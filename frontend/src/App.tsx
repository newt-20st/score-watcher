import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { CountBoard, CountConfig } from "./pages/Count";

import Home from "./pages/Home";
import { NomxBoard, NomxConfig } from "./pages/Nomx";
import { NbynBoard, NbynConfig } from "./pages/Nbyn";
import { NupdownBoard, NupdownConfig } from "./pages/Nupdown";
import { SwedishxBoard, SwedishxConfig } from "./pages/Swedishx";
import {
  AttacksurvivalBoard,
  AttacksurvivalConfig,
} from "./pages/Attacksurvival";
import { SquarexBoard, SquarexConfig } from "./pages/Squarex";

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
              <Route path="swedishx" element={<SwedishxConfig />} />
              <Route path="attacksurvival" element={<AttacksurvivalConfig />} />
              <Route path="squarex" element={<SquarexConfig />} />
            </Route>
            <Route path="board">
              <Route path="count" element={<CountBoard />} />
              <Route path="nomx" element={<NomxBoard />} />
              <Route path="nbyn" element={<NbynBoard />} />
              <Route path="nupdown" element={<NupdownBoard />} />
              <Route path="swedishx" element={<SwedishxBoard />} />
              <Route path="attacksurvival" element={<AttacksurvivalBoard />} />
              <Route path="squarex" element={<SquarexBoard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
