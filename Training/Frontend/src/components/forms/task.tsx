import { TextField } from '@mui/material';

function Task() {
    return (
        <TextField
            label="Task"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            placeholder="Enter task details"
        />
    );
}

export default Task;