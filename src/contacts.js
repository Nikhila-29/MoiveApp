import { useContext } from "react";
import localContext from "./locationcontext";

function MyContact(){
    const {location,updatelocation}=useContext(localContext)
     return <div>
        <h1>Contact</h1>
        <p>Contact elements will here</p>
        {location}
    </div>
}
export default MyContact;