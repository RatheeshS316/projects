import { TextField } from '@mui/material';

function StartDate() {
    return (<div>
        <TextField
            label="Start Date"
            type="date"
            variant="outlined"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
        /></div>
    );
}

export default StartDate;