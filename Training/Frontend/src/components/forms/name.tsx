import { TextField } from '@mui/material';

function Name() {
    return (
        <TextField
            label="Name"
            variant="outlined"
            fullWidth
            placeholder="Enter project name"
        />
    );
}

export default Name;