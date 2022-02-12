import { useEffect, useState} from 'react'
import Header from './Header';
import SearchBar from './Header';
import Navbar from './Navbar';
import UpdateFav from './UpdateFav';

import { Table, Button, Form } from 'react-bootstrap';

import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Main = () => {

    const [favouriteLists, setFavouriteLists] = useState([]);
    const [videos, setVideos] = useState([]);
    const [showVideos, setShowVideos] = useState(false);
    const [showVideosParentId, setShowVideosParentId] = useState();

    const [search, setSearch] = useState('');
    const [asc, setAsc] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        const ascendent = asc ? "ASC" : "DESC"

        Axios.get(`http://localhost:6060/api/searchFavList?searchTerm=${search}&order=${ascendent}`).then(response=>{
            setFavouriteLists(response.data);
        })
    })

    const deleteFavList = (id) => {
        console.log('stergem');

        Axios.delete("http://localhost:6060/api/deleteFavouriteList/" + id).then(response=>{
            console.log('s a sters');
            setShowVideos(false);
        })
    }

    const editFavList = (e) => {
        console.log(`editam ${e}`);
        navigate(`/updateFav/${e}`)
    }

    const deleteVideo = (id) => {
        console.log('stergem');

        Axios.delete("http://localhost:6060/api/deleteVideo/" + id).then(response=>{
            console.log('s a sters');
            setShowVideos(false);
        })
    }

    const editVideo = (e) => {
        console.log('editam');
    }

    const seeFavouriteLists = () =>{
        return favouriteLists.map((favouriteList)=>{
            return(
                <tr>
                    <td onClick={() => afiseazaCeva(favouriteList.id)}>{favouriteList.id}</td>
                    <td>{favouriteList.description}</td>
                    <td>{favouriteList.date}</td>
                    <td>
                        <span onClick={() => {deleteFavList(favouriteList.id)}} className="add-note-button"><p>delete icon</p></span>
                    </td>
                    <td>
                        <span onClick={() => {editFavList(favouriteList.id)}} className="add-note-button"><p>edit icon</p></span>
                    </td>
                </tr>
            )
        })
    }

    const seeVideos = () =>{
        return videos.map((video)=>{
            return(
                <tr>
                    <td>{video.id}</td>
                    <td>{video.description}</td>
                    <td>{video.title}</td>
                    <td>{video.url}</td>
                    <td>{video.favListId}</td>
                    <td>
                        <span onClick={() => {deleteVideo(video.id)}} className="add-note-button"><p>delete icon</p></span>
                    </td>
                    <td>
                        <span onClick={() => {editVideo()}} className="add-note-button"><p>edit icon</p></span>
                    </td>
                </tr>
            )
        })
    }

    const afiseazaCeva = (idFavList) => {
        setShowVideos(true);
        setShowVideosParentId(idFavList);
        Axios.get("http://localhost:6060/api/getVideosByParentId/" + idFavList).then(response=>{
            setVideos(response.data);
            console.log(response.data);
        })
        console.log(`idFavList ${idFavList}`);
    }
	
    const onChangeSearch = (event) => {
        console.log(event);
        setSearch(event);
    }

    const onSwitchCange = (event) => {
        console.log(event);
        setAsc(!asc);
    }

	return(
        <div className='container'>
            <Navbar />
            {/* <Header /> */}
            {/* <SearchBar /> */}

            {/* <br/><br/>
            <label for="site-search">Search the site:</label>
            <input type="search" id="site-search" name="q" aria-label="Search through site content"/>
            <button>Search</button> */}

            <br/><br/>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Search bar</Form.Label>
                    <Form.Control type="text" placeholder="Search..." onChange={(event) => onChangeSearch(event.target.value)}/>
                </Form.Group>
            </Form>

            <Form>
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    onClick={onSwitchCange}
                />
                <p>{asc ? "Ascendent dupa ID" : "Descendent dupa ID"}</p>
            </Form>

            <br/><br/>
            <h1>Favourite Lists</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {seeFavouriteLists()}
                </tbody>
            </Table>


            {/* <Button onClick={afiseazaCeva} variant="primary">Afiseaza pt 1</Button>{' '} */}

            {
                showVideos &&
                <>
                    <br/><br/>
                    <h1>Videos In Favourite List {showVideosParentId} </h1>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Description</th>
                                <th>Title</th>
                                <th>Url</th>
                                <th>Favourite List Id</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {seeVideos()}
                        </tbody>
                    </Table>
                </>
            }

        </div>  
	)
}
export default Main;