import React from 'react';
import { useTheme } from '@emotion/react';
import { useState, useRef } from "react"
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ChevronRight from '@mui/icons-material/ChevronRight';

export default function DesktopMenuItem ({children, label, onClick, checkValue, id, key}) {
  const childrenArray = Array.isArray(children) ? children : [children]
  const [openExpandable, setOpenExpandable] = useState(false)  
  const refs = useRef([])


  return(
    <React.Fragment key={key}> 
      <ListItem sx={{margin : 0, padding : 0, height : 23}}>     
        <ListItemButton style={{padding : 0, margin : 0, height : 23}} 
          onClick={(e) => onClick ? onClick(e, id) : null} ref={(ref) => refs.current.includes(ref) ? () => {} : refs.current.push(ref)}
          onMouseEnter={(e) => setOpenExpandable(true)}
          onMouseLeave={(e) => setOpenExpandable(false)}
        >
        <CheckIcon style={{width  : 15, padding : 0, margin : 0, paddingLeft : 5, pointerEvents: 'none', visibility : (checkValue ? 'visible' : 'hidden')}}/>
        <ListItemText primaryTypographyProps={{noWrap : true}} style={{paddingLeft : 3, paddingRight : children ? 5 : 20, pointerEvents: 'none'}} primary={label}/>
        {children && childrenArray ? childrenArray.map((el, index) => {
          return(React.cloneElement(el, {label : el.props.label, target : refs.current[index], open : openExpandable, key : el.props.label + index.toString()}))
        }) 
        : 
        <React.Fragment/>
        }
        {children ? <ChevronRight stlye={{pointerEvents: 'none'}}/> : <React.Fragment/>}          
        </ListItemButton>                
      </ListItem>
    </React.Fragment>
  )
}
