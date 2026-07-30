import { TextField } from '@mui/material';

function Assigned() {
    return (
        <TextField
            label="Assigned To"
            variant="outlined"
            fullWidth
            placeholder="Enter assignee name"
        />
    );
}

export default Assigned;