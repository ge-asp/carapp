import { useState } from "react"
import { useEffect } from "react"
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { Button } from "@mui/material"
import { Snackbar } from "@mui/material"
import AddCar from "./AddCar"
import EditCarr from "./EditCar"

export default function Carlist() {

    //state variables
    const [cars, setCars] = useState([])
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)

    //columns for ag-grid
    const columns = [
        {field: 'brand'},
        {field: 'model'},
        {field: 'color'},
        {field: 'fuel'},
        {field: 'year'},
        {field: 'price'},
        {
            cellRenderer: params => 
                <Button size="small" color="error" onClick={() => deleteCar(params)}>
                    Delete
                </Button>,
            width: 120

        }/*,
        {
            cellRenderer: params => <EditCar params={params} updateCar={updateCar} />,
            width: 120
        }*/
    ]

    useEffect(()=> getCars(), [])
    const REST_URL = 'https://carrestapi.herokuapp.com/cars'
    
    
    const getCars = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setCars(responseData._embedded.cars)
            })
            .catch(error => console.error(error))
    }

    const deleteCar = (params) => {
        console.log("params: " + params.data._links.car.href)
        fetch(params.data._links.car.href, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                setMsg('Car is deleted successfully!')
                setOpen(true)
                getCars()
            } else {
                alert('Something went wrong')
            }
        })
        .catch(error => console.error(error))
    }

    const addCar = (car) => {
        fetch(REST_URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok)
                    getCars()
                else
                    alert('Something went wrong while adding new car')
            })
        .catch(err => console.error(err))

    }



    return (
        <div>
            <AddCar addCar={addCar} />
            <div className='ag-theme-material'
            style={{height: '700px', width: '95%', margin: 'auto'}}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}>
                </Snackbar>
            </div>

        </div>
    )
}