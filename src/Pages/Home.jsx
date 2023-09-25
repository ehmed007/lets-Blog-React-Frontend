import React from 'react'
import Base from '../Components/Base'
import pic from '../Components/bg.jpg'
import { Typography } from '@mui/material'

export default function Home() {
  return (
    <Base>
      <div style={{display:"grid",alignContent:"center",textAlign:"center"}} >
        <Typography variant='h1' > <b>Let's Blog</b> </Typography>
      </div>
      <img src={pic} alt="" style={{width:"100%",height:"763px"}} />
    </Base>
  )
}
