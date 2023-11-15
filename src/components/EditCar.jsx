import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";


export default function EditCar(props) {

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
        console.log(props.params.data._links.car.href, car)
        props.updateCar(props.params.data._links.car.href,car)
        setOpen(false)
    }

    const handleClickOpen = () => {
        setOpen(true)
        setCar({
            brand: props.params.data.brand,
            model: props.params.data.model,
            color: props.params.data.color,
            fuel: props.params.data.fuel,
            year: props.params.data.year,
            price: props.params.data.price,
        })
    }

    
    
    return (
        <>
            <Button size="small" onClick={handleClickOpen}>
                Edit car
            </Button>
           
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
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
                    <TextField
                        label='Color'
                        name='color'
                        value={car.color}
                        onChange={handleInputChange} />
                    <TextField
                        label='Fuel'
                        name='fuel'
                        value={car.fuel}
                        onChange={handleInputChange} />
                    <TextField
                        label='Year'
                        name='year'
                        value={car.year}
                        onChange={handleInputChange} />
                    <TextField
                        label='Price'
                        name='price'
                        value={car.price}
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