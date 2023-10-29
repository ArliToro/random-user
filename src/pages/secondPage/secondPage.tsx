import React, {useEffect, useMemo, useState} from "react";
import Card from '../../component/card/Card.tsx';
import NoData from '../../component/noData/noData.tsx';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Slider
} from "@mui/material";
import "./secondPage.css";
import {nationalities} from "../../datas/nationalitiesData.tsx";
import SkeletonAnim from "../../component/skeleton/Skeleton.tsx";

interface Form {
    age: number[];
    nat: string;
}

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
    dob: {
        age: number;
    }
    nat: string;
}

const SecondPage: React.FC = () => {
    const [form, setForm] = useState<Form[]>([]);
    const [allData, setAllData] = useState<User[]>([]);
    const [age, setAge] = React.useState<number[]>([0, 100]);
    const [nat, setNat] = React.useState<string>('');
    const [loaded, setLoaded] = React.useState<boolean>(true);


    useEffect(() => {
        const apiUrl = 'https://randomuser.me/api/?results=1000';
        fetch(apiUrl)
            .then(response => response.json())
            .then(result => {
                setAllData(result.results);
                setForm([{age, nat}]);
                setLoaded(false);
            })
            .catch(error => {
                console.error('API error:', error);
            });
    }, []);

    const filteredFc = (nationality: string, age: number[], allData: User[]) => {
        if (nationality != "") {
            const filteredArray = allData.filter((item) => item.nat === nationality && item.dob.age >= age[0] && item.dob.age <= age[1]);
            return handleSort(filteredArray)
        } else {
            const filteredAge = allData.filter((item) => item.dob.age >= age[0] && item.dob.age <= age[1]);
            return handleSort(filteredAge)
        }
    };
    const handleAgeChange = (_event: Event, newValue: number | number[]) => {
        setAge(newValue as number[]);
    };

    const handleSort = (sortArray: User[]) => {
        return sortArray?.sort((a, b) => a.dob.age - b.dob.age);
    }

    const handleNatChange = (event: SelectChangeEvent) => {
        setNat(event.target.value as string);
    };

    const filteredData: User[] = useMemo(() => {
        return filteredFc(nat, age, allData)
    }, [form, allData])

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setForm([{age, nat}]);
    };


    return (
        <div className="App">
            <Box sx={{width: '100%'}}>
                <form className="form-style" onSubmit={(e) => handleForm(e)}>
                    <div>
                        <h4>Select Nationality</h4>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={nat}
                                label="Nationality"
                                onChange={handleNatChange}
                            >
                                {nationalities.map((item) => (
                                    <MenuItem key={item.code} value={item.code}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl fullWidth>
                            <h4 className={"transform-h4"}>Select age</h4>
                            <Slider
                                getAriaLabel={() => 'Age range'}
                                value={age}
                                onChange={handleAgeChange}
                                valueLabelDisplay="on"
                            />
                        </FormControl>
                    </div>
                    <Button variant="contained" type="submit">Filter</Button>
                </form>
                {loaded ? (
                    <SkeletonAnim repetition={4}/>
                ) : (
                    <Grid container spacing={{xs: 2}} direction="row" justifyContent="center" wrap="wrap">
                        {filteredData?.length > 0 ? (
                            filteredData?.map((item, index) => (
                                <Grid item xs={3} key={index} justifyContent="center">
                                    <Card
                                        avatar={item.picture.thumbnail}
                                        name={item.name.title + ' ' + item.name.first + ' ' + item.name.last}
                                        phoneNumber={item.phone}
                                        email={item.email}
                                        age={item.dob?.age}
                                        nat={item.nat}
                                    />
                                </Grid>
                            ))
                        ) : (
                            <>
                                <NoData/>
                            </>
                        )}
                    </Grid>
                )}
            </Box>
        </div>
    )
}

export default SecondPage;
