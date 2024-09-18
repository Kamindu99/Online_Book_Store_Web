import { Grid } from '@mui/material'
import './list.css'

export function Loading() {
    return (
        <>
            <Grid container spacing={2} >
                <div className='loading-container' style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>

                    <img src={'https://i.gifer.com/Ybin.gif'} alt="Loading..." className="zoom-logo" />

                </div>
            </Grid>
        </>
    )
}