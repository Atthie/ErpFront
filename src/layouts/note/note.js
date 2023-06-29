import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Médiocre',
  1: 'Médiocre+',
  1.5: 'Correct',
  2: 'Correct+',
  2.5: 'Correct',
  3: 'Correct+',
  3.5: 'Bon',
  4: 'Bon+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function Notes() {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  const handleValueChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleHoverChange = (event, newHover) => {
    setHover(newHover);
  };

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={handleValueChange}
        onChangeActive={handleHoverChange}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}




