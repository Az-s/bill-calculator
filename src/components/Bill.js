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
import Individual from './Individual';

const Bill = () => {
    const [item, setItem] = useState([
        { id: nanoid(), name: 'Person', lable: "ppl", ppl: 0 },
        { id: nanoid(), name: 'Sum', lable: "KGS", sum: 0 },
        { id: nanoid(), name: 'Tips', lable: "%", tips: 0 },
        { id: nanoid(), name: 'Delivery', lable: "KGS", delivery: 0 },
    ]);

    const [value, setValue] = useState('all');
    const [totalPrice, setTotalPrice] = useState(0);

    const [showResults, setShowResults] = useState(false);
    const onClick = () => setShowResults(true);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const addPpl = () => {
        setItem(item => [...item, { ppl: '' }])
    };

    const totalSum = () => {
        return item.reduce((acc, i) => {
            return acc + i.ppl;
        }, 0)
    };

    return (
        <>
            <Container maxWidth='md'>
                <CssBaseline />
                <FormControl component="fieldset" component={Box} m={2}>
                    <FormLabel component="legend" mt={2}>Choice option</FormLabel>
                    <RadioGroup aria-label="Choice" name="choice1" value={value} onChange={handleChange}>
                        <FormControlLabel value="all"
                            control={<Radio />}
                            label="Right between all"
                            checked={value === 'all'}
                            onChange={handleChange} />
                        <FormControlLabel value="individual"
                            control={<Radio />} label="Individually"
                            checked={value === 'individual'}
                            onChange={handleChange} />
                    </RadioGroup>
                </FormControl>
                {value === 'all' ? (
                    <>
                        <form >
                            {item.map(item => (
                                <Grid item key={item.id} container justifyContent="center" alignItems="center" component={Box} m={1}>
                                    <p>{item.name}:</p><TextField id="outlined-basic" label={item.lable} variant="outlined" component={Box} m={1} />
                                </Grid>
                            ))}
                        </form>
                        <Grid item>
                            <Button variant="contained"
                                onClick={onClick}
                                type='button'>
                                Сalculate
                            </Button>
                        </Grid>
                        {showResults === true ? (
                            <>
                                <Grid item component={Box} m={3}>
                                    <p>Total sum: {item.sum + item.tips}</p>
                                    <p>Number of person : {totalSum}</p>
                                    <p>The amount of each : {addPpl}</p>
                                </Grid>
                            </>
                        ) : null}
                    </>
                ) : (<Individual />)}
            </Container>
        </>
    )
};

export default Bill;
