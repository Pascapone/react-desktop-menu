import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { List } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useState, useRef } from 'react';
import { Box } from '@mui/material';


export default function DesktopMenu({children, target, label, open}) {
  const ref = useRef()

  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [dividerWidth, setDividerWidth] = useState(0)
  const [menuWidth, setMenuWidth] = useState(0)

  const childrenArray = Array.isArray(children) ? children : [children]


  const theme = useTheme()

  if(target){
    const rect = target.getBoundingClientRect() 
    if(rect.x !== left){
      setLeft(rect.x)
    }
    if(rect.y + rect.height - 2 !== top){
      setTop(rect.y + rect.height - 2)
    }
    if(dividerWidth !== rect.width){
      setDividerWidth(rect.width)
    }    
  }

  if(ref.current){
    const width = ref.current.getBoundingClientRect().width - dividerWidth - 1
    if(width !== menuWidth){
      setMenuWidth(width)
    }    
  }

  return (  
    <React.Fragment key={label}>  
      {open ? 
        <React.Fragment>
          <Box ref={ref} component={Paper} elevation={0} sx={{position : 'fixed', top : top, left : left, margin : 0, padding : 0, borderRadius : 0, zIndex : 999, 
              borderBottom : '1px solid', borderRight : '1px solid', borderLeft : '1px solid', borderColor : theme.palette.divider}}>
            <Divider style={{marginLeft : dividerWidth - 1, width : menuWidth, marginTop : - 1}}/>
            <List dense style={{marginTop : 0, marginBottom : 0, paddingTop : 5, paddingBottom : 4}}>  
              
              {childrenArray ? childrenArray.map((el, index) => {
                return (
                 
                  React.cloneElement(el, {label : el.props.label, key : el.props.label + index.toString()})
                  )
                }) 
                : 
                <React.Fragment/>
              }
            </List>
          </Box>
        </React.Fragment>
        :
        <React.Fragment/>
      }   
    </React.Fragment>
  );
}