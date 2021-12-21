import React from "react";
import { useState, useEffect, useRef } from "react"
import { Box, Paper } from "@mui/material"
import { Button } from "@mui/material"
import { useTheme } from "@emotion/react"




function DesktopBar ({children}){  
  const refs = useRef([])
  const [openMenu, setOpenMenu] = useState(null)
  const [mouseOverComponent, setMouseOverComponent] = useState(false)

  const childrenArray = Array.isArray(children) ? children : [children]

  const theme = useTheme()

  const activeStyle = {
    borderRadius : 0, borderLeft : '1px solid', borderTop : '1px solid', borderRight : '1px solid', borderColor : theme.palette.divider, marginTop : -1
  }

  const handleClickMenuButton = (index) => {
    setOpenMenu(index)
  }

  const onLeaveComponent = () => {
    setMouseOverComponent(false)
  }

  const onEnterComponent = () => {
    setMouseOverComponent(true)
  }

  const handleMouseDown = (e) => {
    if(!mouseOverComponent){  
      setOpenMenu(null)
    }
  }

  const handleMouseOver = (e, label, index) => {
    if(openMenu !== null && openMenu !== index){
      handleClickMenuButton(index)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, )

  return(

    <React.Fragment>
      <Box sx={{ flexGrow : 1, height : 40, position : 'fixed', width : '100%'}}>
        <Paper elevation={1} sx={{ borderRadius : 0}} style={{paddingTop : 1}}>
        <div onMouseLeave={onLeaveComponent} onMouseEnter={onEnterComponent} style={{display : 'inline-flex', flexDirection : 'row', backgroundColor : 'red'}}>
             
            {childrenArray ? childrenArray.map((el, index) => {              
              return (
              <React.Fragment key={el.props.label}>  
                <Paper elevation={0} style={{borderRadius : 0 }}>           
                  <Button id={el.props.label} ref={(ref) => refs.current.includes(ref) ? () => {} : refs.current.push(ref)}
                    onClick={(e) => handleClickMenuButton(index)}
                    style={openMenu === index ? activeStyle : {}}
                    onMouseEnter={(e) => handleMouseOver(e, el.props.label, index)}>
                      {el.props.label}                      
                  </Button> 
                </Paper>    
                {React.cloneElement(el, {label : el.props.label, target : refs.current[index], open : openMenu === index})}
              </React.Fragment>)                   
            })
          :
          <React.Fragment/>
          }
          </div>
        </Paper>
      </Box>
      <Box style={{height : 40}}/>     
    </React.Fragment>
  )
}

export default DesktopBar;