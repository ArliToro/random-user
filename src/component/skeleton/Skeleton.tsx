import React from 'react';
import {Skeleton} from "@mui/material";
import './Skeleton.css'

interface Props {
    repetition: number
}

const darkSkeletonStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: '10px'
};

const SkeletonAnim: React.FC<Props> = ({repetition}) => {
    const skeletonArray = Array.from({length: repetition}, (_, index) => (
        <div key={index}>
            <Skeleton variant="text" width={210} height={20} sx={darkSkeletonStyles}/>
            <Skeleton variant="circular" width={40} height={40} sx={darkSkeletonStyles}/>
            <Skeleton variant="rounded" width={210} height={60} sx={darkSkeletonStyles}/>
            <Skeleton variant="rounded" width={210} height={60} sx={darkSkeletonStyles}/>
        </div>
    ));

    return (
        <div className='skeleton-container'>
            {skeletonArray}
        </div>
    );
};

export default SkeletonAnim;