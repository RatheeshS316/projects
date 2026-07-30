import { Button as MuiButton } from '@mui/material';

function Button() {
    return (
        <MuiButton
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ py: 1.5, mt: 1, fontWeight: 'bold', fontSize: '1.1rem', borderRadius: 2 }}
        >
            Submit
        </MuiButton>
    );
}

export default Button;