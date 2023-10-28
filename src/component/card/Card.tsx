import {
    Avatar,
    Card,
    CardContent,
    CardHeader, Typography,
} from "@mui/material";
import React from "react";

interface Props {
    avatar: string;
    name: string;
    phoneNumber: string;
    email: string;
    age?: number;
    nat?: string;
}

const CardLayout: React.FC<Props> = ({avatar,name,phoneNumber,email,age,nat}) => {

    return (
        <>
            <Card variant="outlined">
                <CardHeader
                    avatar={
                        <Avatar>
                            <img src={avatar} alt="avatar"/>
                        </Avatar>
                    }

                />
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Name: {name}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Phone Number: {phoneNumber}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Email: {email}
                    </Typography>
                    {age ? (
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Age: {age}
                        </Typography>
                    ) : null}
                    {nat ? (
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Nationality: {nat}
                        </Typography>
                    ) : null}
                </CardContent>
            </Card>
        </>
    )
}

export default CardLayout