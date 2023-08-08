import { Snackbar } from "@mui/material";
import { useState } from "react";

const Snacks = () => {
    const [open, setOpen] = useState(false);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} message="Test" />
        </div>
    )
}

export default Snacks;