import { TextField } from '@mui/material';

function EndDate() {
    return (
        <TextField
            label="End Date"
            type="date"
            variant="outlined"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
        />
    );
}

export default EndDate;