import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function TooltipCustom({children,name}) {
  return (
    <Tooltip title={name}>
      <IconButton>
        {children}
      </IconButton>
    </Tooltip>
  );
}