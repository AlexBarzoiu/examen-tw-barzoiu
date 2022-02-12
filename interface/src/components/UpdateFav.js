import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';


import { Table, Button, Form } from 'react-bootstrap';

import Axios from 'axios';

import Navbar from './Navbar';

import { useNavigate } from 'react-router-dom';

const UpdateFav = () => {
	

	// const [favListIds, setFavListIds] = useState([]);

    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');

    const [localDate, setLocalDate] = useState();
    const [changed, setChanged] = useState(false);

    const [localDesc, setLocalDesc] = useState();
    const [changedDesc, setChangedDesc] = useState(false);

    const [favList, setFavList] = useState({});

    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(()=>{
        Axios.get(`http://localhost:6060/api/getFavListById/${id}`).then(response=>{
            setFavList(response.data);
            // setDate(response.data.date.substring(0, 10));
            setLocalDate(response.data.date.substring(0, 10))
            setLocalDesc(response.data.description);
            // setDesc(response.data.description);
            // console.log(response.data);
        })
    })

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
        setChangedDesc(true);
    }

    const onChangeDate = (event) => {
        setChanged(true);
        console.log(event);
        setDate(event);
    }


    const updateFavList = (event) => {
        event.preventDefault();

        const newFavouriteList = {
            description: changedDesc ? desc : localDesc,
            date: changed ? date : localDate,
        }

        console.log(newFavouriteList);

        // http://localhost:6060/api/putFavouriteList/1

        Axios.put(`http://localhost:6060/api/putFavouriteList/${id}`, newFavouriteList).then(()=>{
            navigate('/');
        })
    }

	return(
        <>
            <div className='container'>
                <Navbar />

                <br/><br/>
                <h1>Edit favourite list</h1>
                <br/><br/>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description" onChange={(event) => onChangeDesc(event.target.value)} defaultValue={localDesc} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" placeholder="Enter date" onChange={(event) => onChangeDate(event.target.value)} defaultValue={localDate} />
                    </Form.Group>

                    <br/>
                    <Button variant="primary" type="submit" onClick={updateFavList}>
                        Update
                    </Button>
                </Form>

                <br/><br/>
                <p>{desc}</p>
                <p>{date}</p>
                {/* <p>{favList.date.substring(0, 10)}</p> */}
            </div>
        </>  
	)
}
export default UpdateFav;