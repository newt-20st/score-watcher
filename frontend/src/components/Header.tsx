import React from "react"
import { Link } from "react-router-dom"
import { Box, Image } from "@chakra-ui/react"

import Logo from "../assets/images/logo.png"

const Header: React.FC = () => {
  return (
    <Box>
      <Link to="/">
        <Image
          src={Logo}
          sx={{ maxHeight: "10vh", margin: "auto" }}
        />
      </Link>
    </Box>
  )
}

export default Header;