import { useState } from "react";
import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, useThemeProps } from '@mui/material';


export default function EditCar(props) {
    const { rowData = {}, updateCar, link } = props;
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = useState({ ...rowData });

    const handleClickOpen = ({ rowData}) => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handelInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value})
    }

    const addCar = () => {
        props.updateCar(car);
        handleClose();
    }

    const saveChanges = () => {
        updateCar(car, link);
        handleClose();
    }

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                    autoFocus
                    margin="dense"
                    name="brand"
                    value={car.brand}
                    onChange={e => handelInputChange(e)}
                    label="Brand"
                    fullWidth
                    />
                    <TextField
                    margin="dense"
                    name="model"
                    value={car.model}
                    onChange={e => handelInputChange(e)}
                    label="Model"
                    fullWidth
                    />
                    <TextField
                    margin="dense"
                    name="color"
                    value={car.color}
                    onChange={e => handelInputChange(e)}
                    label="Color"
                    fullWidth
                    />
                    <TextField
                    margin="dense"
                    name="modelYear"
                    value={car.modelYear}
                    onChange={e => handelInputChange(e)}
                    label="Year"
                    fullWidth
                    />
                    <TextField
                    margin="dense"
                    name="fuel"
                    value={car.fuel}
                    onChange={e => handelInputChange(e)}
                    label="Fuel"
                    fullWidth
                    />
                    <TextField
                    margin="dense"
                    name="price"
                    value={car.price}
                    onChange={e => handelInputChange(e)}
                    label="Price"
                    fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={saveChanges} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}