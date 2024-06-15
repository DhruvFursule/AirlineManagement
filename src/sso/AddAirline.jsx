import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";


function AddAirline() {

  const [departure,setDeparture]=useState('');
  const [flightName, setFlightName] = useState('');
  const [flightNo, setFlightNo] = useState('');
  const [arrival,setArrival]=useState();
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [airports, setAirports] = useState([]);
  const [arrivalDisable,setarrivalDisable]=useState(true);
  const [duration,setDuration]=useState("");
  const [originAirport, setOriginAirport] = useState('NULL');
  const [destinationAirport, setDestinationAirport] = useState('NULL');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/airports')
      .then(response => response.json())
      .then(data => {
        const Filter = data.filter(airport => airport.code !== destinationAirport);
        setAirports(Filter);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [destinationAirport]);
  
  useEffect(() => {
    fetch('http://localhost:3000/api/airports')
      .then(response => response.json())
      .then(data => {
        const filtered = data.filter(airport => airport.code !== originAirport);
        setFilteredAirports(filtered);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [originAirport]);
  

  useEffect(()=>{
   console.log("setting departure")
  },[departure,arrival])

  const takeDiff=(time1,time2)=>{

    if(time1!=="" && time1!==null && time1!==undefined && time2!=="" && time2!==null && time2!==undefined)
      {
          const [hours1, minutes1] = time1.split(':').map(Number);
          const [hours2, minutes2] = time2.split(':').map(Number);

          // Convert both times to minutes
          const totalMinutes1 = hours1 * 60 + minutes1;
          const totalMinutes2 = hours2 * 60 + minutes2;

          // Calculate the difference in minutes
          let diffMinutes = Math.abs(totalMinutes2 - totalMinutes1);

          // Convert the difference back to hours and minutes
          const diffHours = Math.floor(diffMinutes / 60);
          diffMinutes = diffMinutes % 60;

          // Format the result
          setDuration(`${diffHours}h ${diffMinutes}m`);
          
      }

  }

  const handleTime=(e)=>{
       let time=(e.target.value);
       
       
       if(time!=="" && time!==null && time!==undefined)
        {
          
          let [hours, minutes] = time.split(':').map(Number);
            
          // Add one minute
          minutes += 1;

          // Handle overflow from minutes to hours
          if (minutes >= 60) {
              minutes = 0;
              hours += 1;
          }

          // Format the new min time
          hours = String(hours).padStart(2, '0');
          minutes = String(minutes).padStart(2, '0');
          const newTime = `${hours}:${minutes}`;

          // Set the new min time
          setDeparture(newTime);
          console.log("New min time:", departure);
          takeDiff(newTime,arrival);
          setarrivalDisable(false)
        }
        else {setarrivalDisable(true)}

  }
  const handleTime2=(e)=>{
      let time=e.target.value;
      
      if(time!=="" && time!==null && time!==undefined)
        {
            setArrival(time);
            takeDiff(departure,time);
        }

  }

  const handleChange = event => {
    setOriginAirport(event.target.value);
  };
  
  const handleChangeName = event => {
    setFlightName(event.target.value);
  };
  
  const handleChangeNo = event => {
    setFlightNo(event.target.value);
  };

  const handleChange_ = event => {
    setDestinationAirport(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!flightName || !flightNo || !departure || !arrival || originAirport === 'NULL' || destinationAirport === 'NULL') {
      alert("Please fill in all fields.");
      return;
    }
    
    // if (originAirport === destinationAirport) {
    //   alert("Origin and destination airports cannot be the same.");
    //   return;
    // }
    
    const [departureHours, departureMinutes] = departure.split(':').map(Number);
    const [arrivalHours, arrivalMinutes] = arrival.split(':').map(Number);
    
    // if ((arrivalHours < departureHours) || (arrivalHours === departureHours && arrivalMinutes <= departureMinutes)) {
    //   alert("Departure time should be earlier than arrival time.");
    //   return;
    // }
    
    const flightData = {
      flightName,
      flightNumber: flightNo,
      departureTime: departure,
      arrivalTime: arrival,
      originAirport,
      destinationAirport,
      duration,
    };

    try {
      const response = await fetch("http://localhost:3000/api/flights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flightData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Flight added successfully!");
      navigate("/admin/airlinemanagement");
    } catch (error) {
      console.error("There was an error adding the flight!", error);
    }
    console.log(flightData);
  };

  return (
    <div className="grid grid-cols-12 min-h-screen min-w-screen">
      <div className="min-h-screen col-span-3 flex flex-col items-center">
        <AdminMenu />
      </div>
      <div className=" min-h-screen col-span-9">
        <AdminNav />
        <div className="w-[70vw] min-h-[220px] p-4 mt-20 rounded-lg shadow-lg">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl text-gray-500 font-semibold">
              Add New Airline
            </h1>
            <Link to="/admin/airlinemanagement">
            <button
              type="button"
              class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >
              <i className="fa-solid fa-plane pr-2 rotate-[-45deg] mb-1"></i>
              VIEW AIRLINE(s)
            </button></Link>
          </div>
          <form
            action="/admin/flightsManagement"
            method="post"
            className="mt-12 relative"
          >
            <div className="p-4 divide-y">
              <div className="p-4 flex items-center">
                <label for="flightNo" className="text-xl font-medium">
                  Enter Airline Name
                </label>
                {/* <div className="ml-[235px] text-xl">:</div> */}
                <input
                  type="text"
                  name="flightNo"
                  required
                  id="flightNo"
                  value={flightName}
                  onChange={handleChangeName}
                  className="border border-slate-500 w-96 absolute left-1/2 h-8"
                ></input>
              </div>
              <div className="p-4 flex items-center">
                <label for="flightNo" className="text-xl font-medium">
                  Enter Flight Number
                </label>
                <input
                  type="text"
                  name="flightNo"
                  required
                  id="flightNo"
                  value={flightNo}
                  onChange={handleChangeNo}
                  className="border border-slate-500 w-96 absolute left-1/2 h-8"
                ></input>
              </div>
              <div className="p-4 flex items-center">
                <label for="flightNo" className="text-xl font-medium">
                  Departure Time
                </label>
                
                <input type="time" id="appt" name="appt" value={departure} onChange={(e)=>handleTime(e)} required className="border border-slate-500 w-96 absolute left-1/2 h-8"/>
              </div>
              <div className="p-4 flex items-center">
                <label for="flightNo" className="text-xl font-medium">
                  Arrival Time
                </label>
                
                <input type="time" id="appt" name="appt" disabled={arrivalDisable} defaultValue={departure} onChange={(e)=>handleTime2(e)} className="border border-slate-500 w-96 absolute left-1/2 h-8"/>
              </div>
              <div className="p-4 flex items-center">
                <label for="flightNo" className="text-xl font-medium">
                  Duration
                </label>
                
                <input
                  type="text"
                  name="flightNo"
                  value={duration}
                  disabled
                  id="flightNo"
                  className="border border-slate-500 w-96 absolute left-1/2 h-8"
                ></input>
              </div>

              <div className="p-4 flex items-center">
              <label for="airlines" className="text-xl font-medium">
                Select Origin Airport
              </label>
              <select
                type="dropdown"
                name="airlines"
                id="airlines"
                required
                value={originAirport}
                onChange={handleChange}
                className="absolute left-1/2 border border-slate-500 h-10"
              >
                <option value="NULL" key="NULL">Select Origin</option>
                {airports.map(airport => (
                  <option key={airport.code} value={airport.code}>
                    {airport.name} - {airport.country}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 flex items-center">
              <label for="airlines" className="text-xl font-medium">
                Select Destination Airport
              </label>
              <select
                name="airlines"
                id="airlines"
                required
                value={destinationAirport} 
                onChange={handleChange_}
                className="absolute left-1/2 border border-slate-500 h-10"
              >
                <option value="NULL" key="NULL">Select Destination</option>
                {filteredAirports.map(airport => (
                  <option key={airport.code} value={airport.code}>
                    {airport.name} - {airport.country}
                  </option>
                ))}
              </select>
            </div>

              <div className="flex gap-20 justify-center mt-10 pt-10">
                <button onClick={handleSubmit} type="submit" className="bg-[#585eff] w-20 h-10 rounded-md text-white font-semibold"
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="bg-[#ee3333] w-20 h-10 rounded-md text-white font-semibold"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAirline;
