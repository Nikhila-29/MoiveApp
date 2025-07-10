
import { useContext, useEffect, useState } from "react";
import localContext from "./locationcontext";
const MyEvent=()=>{
    const[location,updatelocation]=useContext(localContext)
    const [eventTypes,setEventTypes]=useState("Sports,music,conference");
    const [eventType,setEventType]=useState("Sports");
    const [eventName,setEventName]=useState("Cricket")
    const [eventDesc,setEventDesc]=useState("Test Match,Ipl")
    const handleEventType=()=>{
        setEventType('conference');
    }
    useEffect(()=>{
        console.log('triggered.useEffect')
    },[]);//componentDidMount

     return (
     <div className="container">
        <h1>My Events</h1>
        <hr/>
        <p>Location:{location}</p>
        <div className="row">
        <p>List of Events will be displayed here</p>
        {/* <h3>{eventType}</h3>
        <h3>{eventName}</h3>
        <h3>{eventDesc}</h3> */}
        </div>
        <form>
            <div className="form-group">
                <label>Event Type</label>
                <select className="form-control" value={eventType} onChange={(e)=>setEventType(e.target.value)}>
                    <option value="sports">Sports</option>
                    <option value="conference">conference</option>
                    <option value="music">Music</option>
                </select>

            <div className="form-group">
                <label>Event Name</label>
                <select className="form-control" value={eventName} onChange={(e)=>setEventName(e.target.value)}></select>
</div>
            </div>
        </form>
        <button onClick={handleEventType}>change Type</button>

     </div>
     )

}
export default MyEvent;
