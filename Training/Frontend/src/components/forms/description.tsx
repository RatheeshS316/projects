import { TextField } from '@mui/material';

function Description() {
    return (
        <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            placeholder="Enter project description"
        />
    );
}

export default Description;