import {BrowserRouter as Router , Routes ,Route } from 'react-router-dom';

import Main from './components/Main';
import AddFavList from './components/AddFavList';
import AddVideo from './components/AddVideo';
import UpdateFav from './components/UpdateFav';

import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {

	return(
		<Router>
      <Routes>
        <Route path='/' element={<Main/>}></Route>         
        <Route path='/addFavList' element={<AddFavList/>}></Route>  
        <Route path='/addVideo' element={<AddVideo/>}></Route>  
        <Route path='/updateFav/:id' element={<UpdateFav/>}></Route>  
      </Routes>
    </Router>
	)
}

export default App;