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
        { id: nanoid(), name: 'Person', lable: "ppl", price: 1 },
        { id: nanoid(), name: 'Sum', lable: "KGS", price: 10 },
        { id: nanoid(), name: 'Tips', lable: "%", price: 10 },
        { id: nanoid(), name: 'Delivery', lable: "KGS", price: 10 },
    ]);

    const [value, setValue] = useState('all');
    const [totalPrice, setTotalPrice] = useState(0);

    const [showResults, setShowResults] = useState(false);
    const onClick = () => setShowResults(true)

    const [people, setPeople] = useState([]);

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
    };

    const totalSum = () => {
        return item.reduce((acc, item) => {
            return acc + item.price;
        }, 0)
    };

    const showSum = () => {
        return true;
    };

    const addPerson = () => {
        setPeople(people => [...people, { name: '', price: '', id: nanoid() }])
    };

    const ChangePerson = (id, name, value, price) => {
        setPeople(people => {
            return people.map(person => {
                if (person.id === id) {
                    return { ...person, [name]: value, [price]: value }
                }
                return person;
            })
        })
    };

    const removePerson = (id, i) => {
        const index = people.findIndex(i => i.id === id);
        const copyPeople = [...people];
        copyPeople.splice(index, 1);
        setPeople(copyPeople);
    };

    return (
        <>
            <Container maxWidth='md'>
                <CssBaseline />
                <FormControl component="fieldset">
                    <FormLabel component="legend" mt={2}>Choice option</FormLabel>
                    <RadioGroup aria-label="Choice" name="choice1" value={value} onChange={handleChange}>
                        <FormControlLabel value="all" control={<Radio />} label="Right between all" checked={value === 'all'} onChange={handleChange} />
                        <FormControlLabel value="individual" control={<Radio />} label="Individually" checked={value === 'individual'} onChange={handleChange} />
                    </RadioGroup>
                </FormControl>
                {value === 'all' ? (
                    <>
                        <form onSubmit={counter}>
                            {item.map(item => (
                                <Grid item key={item.id} container justifyContent="center" alignItems="center" component={Box} m={1}>
                                    <p>{item.name}:</p><TextField id="outlined-basic" label={item.lable} variant="outlined" component={Box} m={1} />
                                </Grid>
                            ))}
                        </form>
                        <Grid item>
                            <Button variant="contained" onClick={onClick} type='button'>Сalculate</Button>
                        </Grid>
                        {showResults === true ? (
                            <>
                                <Grid item component={Box} m={3}>
                                    <p>Total sum: {totalSum()}</p>
                                    <p>Number of person : {totalSum()}</p>
                                    <p>The amount of each : {totalSum()}</p>
                                </Grid>
                            </>
                        ) : null}
                    </>
                ) : (
                    <>
                        <Grid container justifyContent="center" alignItems="center" direction="column" component={Box}>
                            <form>
                                {people.map(person => (
                                    <div key={person.id}>
                                        <input type='text' placeholder='Name' value={person.name} onChange={e => ChangePerson(person.id, 'name', e.target.value)} />
                                        <input type='number' placeholder='Sum' value={person.price} onChange={e => ChangePerson(person.id, 'price', e.target.value)} />
                                        <button type='button' onClick={removePerson}>Remove</button>
                                    </div>
                                ))}
                            </form>
                            <Button variant="contained" onClick={addPerson} type='button'>Add person</Button>
                            <input type='text' placeholder='Name' />
                            <input type='number' placeholder='Sum' />
                            <Button variant="contained" type='button' onClick={onClick}>Сalculate</Button>
                            {showResults === true ? (
                                <>
                                    <Grid item component={Box} m={3}>
                                        <p>Total sum: </p>
                                        <p>{people.name}</p>
                                    </Grid>
                                </>
                            ) : null}
                        </Grid>
                    </>
                )}
            </Container>
        </>
    )
};

export default Bill;
