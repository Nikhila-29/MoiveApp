import Menubar from "./menubar";
import Addmovie from "./addmoive";
import MyHome from './home';
import MyBooking from'./bookings';
import MyContact from './contacts';
import MyEvent from './events';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,Route,Routes} from 'react-router-dom';
import { useContext, useState } from "react";
import localContext from "./locationcontext";
//import router from "../../../server/movieserver/routes/movie.route";
function App(){
  const[location,setlocation]=useState('bangalore')
  const updatelocation=(newLocation)=>{
    setlocation(newLocation)
  }
return( <localContext.Provider value={{location,updatelocation}}>
<div>
      {/* <h1>Welcome to my show</h1>
      <Menubar mytitle='Welcome to book myshow' location='Bangalore'/>
      <Addmovie title='Tickenewsite'/> */}
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">My Show</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/movies">Movies</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/events">Events</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/bookings">Bookings</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/contact">Contact</Link>
      </li>
      
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
      </nav>
      <Routes>
            <Route path='/' element={<MyHome/>}></Route>
            <Route path='/movies' element={<Addmovie title='Tickenewsite'/>}></Route>
            <Route path='/events' element={<MyEvent/>}></Route>
            <Route path='/bookings' element={<MyBooking/>}></Route>
            <Route path='/contact' element={<MyContact/>}></Route>
      </Routes>
</div>
</localContext.Provider>
)
}

export default App;