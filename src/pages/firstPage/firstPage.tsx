import React, {useEffect, useRef, useState} from "react";
import Card from '../../component/card/Card.tsx'
import {Box, Grid} from "@mui/material";
import SkeletonAnim from "../../component/skeleton/Skeleton.tsx";

interface User {
    picture: {
        thumbnail: string
    };
    name: {
        title: string;
        first: string;
        last: string
    };
    phone: string;
    email: string;
    dob?: {
        age: number;
    }
    nat?: string;
}

const FirstPage: React.FC = () => {
    const [data, setData] = useState<User[]>([]);
    const userCount = useRef<number>(0);
    const usersData = useRef<User[]>([]);

    useEffect(() => {
        const apiUrl = 'https://randomuser.me/api/';

        const intervalForUsers = setInterval(() => {
            if (userCount.current > 10) {
                clearInterval(intervalForUsers);
            } else if (userCount.current === 10) {
                setData(usersData.current);
            } else {
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(result => {
                        userCount.current++;
                        usersData.current.push(result.results[0]);
                    })
                    .catch(error => {
                        console.error('API error:', error);
                    });
            }
        }, 1000);

        return () => {
            clearInterval(intervalForUsers);
        };

    }, []);

    return (
        <>
            <Box sx={{width: '100%',marginTop:"15px"}}>
                <Grid container spacing={{xs: 2}} direction="row" justifyContent="center" wrap="wrap">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <Grid item xs={3} key={index} justifyContent="center">
                                <Card
                                    avatar={item.picture.thumbnail}
                                    name={item.name.title + ' ' + item.name.first + ' ' + item.name.last}
                                    phoneNumber={item.phone}
                                    email={item.email}
                                />
                            </Grid>
                        ))
                    ) : (
                            <SkeletonAnim repetition={4}/>
                    )}
                </Grid>
            </Box>
        </>
    )
}

export default FirstPage;
