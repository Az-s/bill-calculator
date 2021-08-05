import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { nanoid } from 'nanoid';
import Box from '@material-ui/core/Box';

const Bill = () => {
    const [item, setItems] = useState([
        { id: nanoid(), name: 'Person' , lable: "ppl" },
        { id: nanoid(), name: 'Sum', lable: "KGS" },
        { id: nanoid(), name: 'Tips', lable: "%" },
        { id: nanoid(), name: 'Delivery', lable: "KGS" },
    ]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [value, setValue] = useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const counter = (e) => {
        e.preventDefault();
        setItems([
            ...item,
            {
                id: nanoid(),
                // price: parseFloat(price),
            }
        ])
    }

    return (
        <>
            <Container maxWidth='md'>
                <CssBaseline />
                <FormControl component="fieldset">
                    <FormLabel component="legend" mt={2}>Choice option</FormLabel>
                    <RadioGroup aria-label="Choice" name="choice1" value={value} onChange={handleChange}>
                        <FormControlLabel value="all" control={<Radio />} label="Right between all" />
                        <FormControlLabel value="individual" control={<Radio />} label="Individually" />
                    </RadioGroup>
                </FormControl>
                <form onSubmit={counter}>
                    {item.map(item => (
                        <Grid item key={item.id}  container justifyContent="center" alignItems="center" component={Box} m={2}>
                            {item.name}: <TextField id="outlined-basic" label={item.lable} variant="outlined"/>
                        </Grid>
                    ))}
                </form>
                <Grid item>
                    <Button variant="contained">Сalculate </Button>
                </Grid>
            </Container>
        </>
    )
};

export default Bill;
