import { useContext } from "react";
import localContext from "./locationcontext";
const[location,updatelocation]=useContext(localContext)
function MyHome(){
    return <div>
        <h1>Home</h1>
        <p>Home elements will here</p>
        <p>Location:{location}</p>
        <button onClick={()=>updatelocation("new york") }>change location</button>
    </div>
}
export default MyHome;
 
