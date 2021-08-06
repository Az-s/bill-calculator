import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const Individual = () => {
    const [people, setPeople] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const onClick = () => setShowResults(true);

    const addPerson = () => {
        setPeople(people => [...people, { name: '', price: '', id: nanoid() }])
    };

    const onChangePerson = (id, name, value, price) => {
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
            <Grid container justifyContent="center" alignItems="center" direction="column" component={Box}>
                <form>
                    {people.map(person => (
                        <div key={person.id}>
                            <input type='text'
                                placeholder='Name'
                                value={person.name}
                                onChange={e => onChangePerson(person.id, 'name', e.target.value)} />
                            <input type='number'
                                placeholder='Sum'
                                value={person.price}
                                onChange={e => onChangePerson(person.id, 'price', e.target.value)} />
                            <button type='button' onClick={removePerson}>Remove</button>
                        </div>
                    ))}
                </form>
                <Button variant="contained"
                    onClick={addPerson}
                    type='button'
                    component={Box} m={3}>
                    Add person
                </Button>
                <p>Tips: <input type='text' placeholder='Name' /></p>
                <p>Delivery: <input type='number' placeholder='Sum' /></p>
                <Button variant="contained"
                    type='button'
                    onClick={onClick}
                    component={Box} m={3}>
                    Сalculate
                </Button>
                {showResults === true ? (
                    <>
                        {people.map(person => (
                            <div key={person.id}>
                                <Grid item component={Box} m={3}>
                                    <p>Total sum: {people.price}</p>
                                    <p>{people.name} sum: {people.price}</p>
                                </Grid>
                            </div>
                        ))}
                    </>
                ) : null}
            </Grid>
        </>
    )
}

export default Individual;
