import { TextField, MenuItem } from '@mui/material';

function Status() {
    return (
        <TextField
            select
            label="Status"
            variant="outlined"
            fullWidth
            defaultValue="Pending"
        >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
    );
}

export default Status;