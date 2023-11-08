import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";


export default function AddCar(props) {

    const [car, setCar] = useState({brand: '', model: ''})
    const [open, setOpen] = useState(false) // check if the dialog is open

    // functions

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick')
            setOpen(false)
    } 

    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value})
    }

    const handleSave = (event) => {
        props.addCar(car)
        setOpen(false)
    }

    
    
    return (
        <>
            <Button
                onClick={() => setOpen(true)}>New Car</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New car</DialogTitle>
                <DialogContent>
                    <TextField
                        label='Brand'
                        name='brand'
                        value={car.brand}
                        onChange={handleInputChange} />
                    <TextField
                        label='Model'
                        name='model'
                        value={car.model}
                        onChange={handleInputChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save new car</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}