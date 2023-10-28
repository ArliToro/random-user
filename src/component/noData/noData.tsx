import React from "react";
import GridOffSharpIcon from '@mui/icons-material/GridOffSharp';
import './noData.css';


const NoData: React.FC = () => {

    return (
        <div className='no-data'>
            <div>
                <GridOffSharpIcon sx={{ fontSize: 60 }}/>
            </div>
            <div>
                <h1>No Data to be shown</h1>
            </div>
        </div>
    )
}

export default NoData