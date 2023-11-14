import React from 'react'
import Carlist from './components/Carlist'
import { AppBar, Typography } from "@mui/material"



function App() {

  return (
    <>
      <AppBar position='sticky'>
        <Typography variant="h6">
        Car shop
        </Typography>
      </AppBar>
      <Carlist />

    </>
  )
}

export default App
