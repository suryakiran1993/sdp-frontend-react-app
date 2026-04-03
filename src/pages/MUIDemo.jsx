import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MUIDemo() 
{
  return (
    // <Stack spacing={2} direction="row">
    //  <Button variant="text">Text</Button>
    // <Button variant="contained">Contained</Button>
    // <Button variant="outlined">Outlined</Button>
    // </Stack>

    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
      <Button variant="contained">Submit</Button>
    </Box> 
    
  );
}
