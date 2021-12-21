import * as React from 'react';
import Paper from '@mui/material/Paper';
import { List } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { Box } from '@mui/material';


export default function DesktopExpandable({target, children, open, key}){
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)

  const childrenArray = Array.isArray(children) ? children : [children]

  const theme = useTheme()

  if(target && children){
    const rect = target.getBoundingClientRect() 
    if(rect.x + rect.width !== left){
      setLeft(rect.x + rect.width)
    }

    const height = childrenArray.length * 23 + 2
    if(height + rect.y > window.innerHeight){
      if(window.innerHeight - height  !== top){
        setTop(window.innerHeight - height)
      }  
    }
    else{
      if(rect.y  !== top){
        setTop(rect.y)
      }  
    }
  }

  return(   
    <React.Fragment key={key}>
      {open ? 
        <Box component={Paper} elevation={0} sx={{position : 'fixed', margin : 0, padding : 0, borderRadius : 0, zIndex : 999, 
            border : '1px solid', borderColor : theme.palette.divider}} style={{top : top, left : left}}>
          <List dense style={{marginTop : 0, marginBottom : 0, paddingTop : 5, paddingBottom : 4}}>        
          {children && childrenArray ? childrenArray.map((el, index) => {
              return(React.cloneElement(el, {label : el.props.label, key : el.props.label + index.toString()}))
          }) 
          : 
          <React.Fragment/>
          }
          </List>
        </Box> 
        :
        <React.Fragment/>
      }
    </React.Fragment>
  )
}