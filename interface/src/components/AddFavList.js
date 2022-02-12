import { useEffect, useState} from 'react'


import { Table, Button, Form } from 'react-bootstrap';

import Axios from 'axios';

import Navbar from './Navbar';

import { useNavigate } from 'react-router-dom';

const AddFavList = () => {
	

	// const [favListIds, setFavListIds] = useState([]);

    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    // useEffect(()=>{
    //     Axios.get("http://localhost:6060/api/getAllFavouriteLists").then(response=>{
    //         setFavListIds(response.data);
    //     })
    // })

    // const seeIds = () => {
    //     return favListIds.map((favList)=>{
    //         return(
    //             <option value={favList.id}>{favList.id}</option>
    //         )
    //     })
    // }

    const onChangeDesc = (event) => {
        console.log(event);
        setDesc(event);
    }

    const onChangeDate = (event) => {
        console.log(event);
        setDate(event);
    }


    const addFavList = (event) => {
        event.preventDefault();

        const newFavouriteList = {
            description: desc,
            date: date,
        }

        console.log(newFavouriteList);

        Axios.post('http://localhost:6060/api/postFavouriteList', newFavouriteList).then(()=>{
            navigate('/');
        })
    }

	return(
        <>
            <div className='container'>
                <Navbar />

                <br/><br/>
                <h1>Add favourite list</h1>
                <br/><br/>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description" onChange={(event) => onChangeDesc(event.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" placeholder="Enter date" onChange={(event) => onChangeDate(event.target.value)}/>
                    </Form.Group>

                    <br/>
                    <Button variant="primary" type="submit" onClick={addFavList}>
                        Submit
                    </Button>
                </Form>

                <br/><br/>
                <p>{desc}</p>
                <p>{date}</p>
            </div>
        </>  
	)
}
export default AddFavList;