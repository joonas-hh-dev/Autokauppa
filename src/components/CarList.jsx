import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"
import { Container, AppBar, Toolbar, Typography, CssBaseline, Button } from '@mui/material';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import 'ag-grid-community/styles/agGridMaterialFont.css';
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {

    const deleteCar = (link) => {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchCars())
        .catch(err => console.error(err))
    }

    const [cars, setCars] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'brand'},
        { field: 'model'},
        { field: 'color'},
        { field: 'fuel'},
        { field: 'modelYear'},
        { field: 'price'},
        {
            field: 'button',
            suppressHeaderFilterButton: true,
            sortable: false,
            headerName: '',
            cellRenderer: EditCar,
            cellRendererParams: (params) => ({
                rowData: params.data,
                updateCar: updateCar,
                link: params.data._links.self.href
            })
        },
        {
            field: '_links.self.href',
            suppressHeaderFilterButton: true,
            sortable: false,
            headerName: '',
            cellRenderer: (params) => {
                const value = params.data._links.self.href;
                return (
                <Button
                color="error"
                onClick={() => deleteCar(value)}
                >
                Delete
            </Button>
        );
    }
        },
    ]);

    const defaultColDef = {
        sortable: true,
        filter: true,
    }

    const fetchCars = async() => {
        try {
            const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars')
            const data = await response.json();
            setCars(data._embedded.cars)
            //console.log(data)
        } catch(e) {
            console.error(e)
        }
    }

    const saveCar = (car) => {
        fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchCars())
        .catch(err => console.log(err))
    }

    const updateCar = (car, link) => {
        //console.log("Updating car at link:", link);
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchCars())
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchCars();
    }, []);
    
    return (
        <Container maxWidth="xl">
        <CssBaseline />
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Car Shop
                </Typography>
            </Toolbar>
        </AppBar>
        <AddCar saveCar={saveCar}/>
        <div className="CarList">
            <div className="ag-theme-material" style={{ width: "100%", height: 800 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={20}
                />
            </div>
        </div>
    </Container>
    )
};