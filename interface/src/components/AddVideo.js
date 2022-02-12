import { useEffect, useState} from 'react'


import { Table, Button, Form } from 'react-bootstrap';

import Axios from 'axios';

import Navbar from './Navbar';

import { useNavigate } from 'react-router-dom';


const AddFavList = () => {
	
    const [favListIds, setFavListIds] = useState([]);

    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [favListId, setFavListId] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        Axios.get("http://localhost:6060/api/getAllFavouriteLists").then(response=>{
            setFavListIds(response.data);
        })
    })

    const seeIds = () => {
        return favListIds.map((favList)=>{
            return(
                <option value={favList.id}>{favList.id}</option>
            )
        })
    }

    const onChangeDesc = (event) => {
        console.log(event);
        setDesc(event);
    }

    const onChangeTitle = (event) => {
        console.log(event);
        setTitle(event);
    }

    const onChangeUrl = (event) => {
        console.log(event);
        setUrl(event);
    }
    
    const onChangeFavListId = (event) => {
        console.log(event);
        setFavListId(event);
    }

    const addVideo = (event) => {
        event.preventDefault();

        const newVideo = {
            description: desc,
            title: title,
            url: url,
            favListId: favListId,
        }

        console.log(newVideo);

        Axios.post('http://localhost:6060/api/postVideo', newVideo).then(()=>{
            navigate('/');
        })
    }

	return(
        <>
            <div className='container'>
                <Navbar />

                <br/><br/>
                <h1>Add video</h1>
                <br/><br/>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description" onChange={(event) => onChangeDesc(event.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" onChange={(event) => onChangeTitle(event.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Url</Form.Label>
                        <Form.Control type="text" placeholder="Enter url" onChange={(event) => onChangeUrl(event.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Favourite list id</Form.Label>

                        {/* <Form.Control type="text" placeholder="Enter favourite list id" /> */}
                        <Form.Select aria-label="Default select example" onChange={(event) => onChangeFavListId(event.target.value)}>
                            <option>Open this select menu</option>
                            {seeIds()}
                        </Form.Select>
                    </Form.Group>

                    <br/>
                    <Button variant="primary" type="submit" onClick={addVideo}>
                        Submit
                    </Button>
                </Form>

                <br/><br/>
                <p>{desc}</p>
                <p>{title}</p>
                <p>{url}</p>
                <p>{favListId}</p>
            </div>
        </>  
	)
}

export default AddFavList;

// "description": "modified 2",
// "title": "xxasxasxadasda",
// "url": "https://www.googles.com",
// "favListId": 1