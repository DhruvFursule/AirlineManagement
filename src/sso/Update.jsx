import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";

function Update() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/flightinfo');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const flightsData = await response.json();

        const flightsWithDetails = [];
        for (const flight_ of flightsData) {
          const detailsResponse = await fetch('http://localhost:3000/api/flights');
          if (detailsResponse.ok) {
            const detailsData = await detailsResponse.json();
            const flightDetails = detailsData.filter(flight =>
              flight.flightNumber === flight_.flightNumber
              );
            if(flightDetails.length > 0)
            {
              flightsWithDetails.push({
                ...flight_,
                flightName: flightDetails[0].flightName,
                originAirport: flightDetails[0].originAirport,
                destinationAirport: flightDetails[0].destinationAirport,
                departureTime: flightDetails[0].departureTime,
                arrivalTime: flightDetails[0].arrivalTime,
              });
            }
          }
        }
        console.log(flightsWithDetails)
        setFlights(flightsWithDetails);

      } catch (error) {
        setError(error.message);
      }
    };

    fetchFlights();
  }, []);


  return (
    <div className="grid grid-cols-12 min-h-screen min-w-screen">
      <div className="min-h-screen col-span-3 flex flex-col items-center">
        <AdminMenu />
      </div>
      <div className=" min-h-screen col-span-9">
        <AdminNav />
        <div className="w-3/4  bg-white relative rounded-xl shadow-lg p-6 pt-8 mt-4">
          <div className="flex justify-between">
            <div className="text-3xl font-semibold text-slate-600">
              SCHEDULED FLIGHTS DETAILS
            </div>
            {/* <Link to="http:localhost:5173/admin/updateflt">
              <button className="bg-[#ffc637] px-5 py-2 rounded-md font-bold flex items-center cursor-pointer">
              <i className="fa-solid fa-plane pr-2 rotate-[-45deg] mb-1"></i>
                <span className="ml-1">SCHEDULE FLIGHT</span>
              </button>
            </Link> */}
          </div>
          <div className="flex mt-12">
            <input
              type="search"
              name="query"
              autoComplete="on"
              placeholder="you can search here"
              className="border-2 w-64 p-1 rounded-md"
            ></input>
            <button
              type="submit"
              className="bg-[#383eff] px-3 rounded-md ml-4 text-white flex items-center cursor-pointer"
            >
              <span className='mr-1'>Search</span>
              <i className="fa fa-search"></i>
            </button>
            <p className="text-slate-400 mt-1 ml-2">
              (You can search using flight number)
            </p>
          </div>
          <div className="mt-8">
            <table className="border-2 border-collapse w-full table-auto text-center">
              <thead className="border-2">
                <tr>
                  <th className="border-2 px-4 py-2">#</th>
                  <th className="border-2 px-4 py-2">AIRLINE NAME</th>
                  <th className="border-2 px-4 py-2">FLIGHT NO</th>
                  <th className="border-2 px-4 py-2">SRC</th>
                  <th className="border-2 px-4 py-2">DEST</th>
                  <th className="border-2 px-4 py-2">ADT</th>
                  <th className="border-2 px-4 py-2">DDT</th>
                  {/* <th className="border-2">CEC</th>
                  <th className="border-2">CBC</th>
                  <th className="border-2">CFC</th> */}
                  <th className="border-2 px-4 py-2">MAKE CHANGES</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-2 px-4 py-2">3</td>
                  <td className="border-2 px-4 py-2">Vistara</td>
                  <td className="border-2 px-4 py-2">506</td>
                  <td className="border-2 px-4 py-2">NSK</td>
                  <td className="border-2 px-4 py-2">BOM</td>
                  <td className="border-2 px-4 py-2">2024-05-05 23:46</td>
                  <td className="border-2 px-4 py-2">2024-05-06 01:45</td>
                  {/* <td className="border-2">1000</td>
                  <td className="border-2">8000</td>
                  <td className="border-2">5000</td> */}
                  <td className="border-2 px-4 py-2">
                    <div className="flex gap-1 justify-center">
                      <button className="bg-[#bf2ad3] px-2 py-0.5 rounded-md text-white cursor-pointer">
                        Edit
                      </button>
                      <button className="bg-[#ff3838] px-2 py-0.5 rounded-md text-white cursor-pointer">
                        Remove
                      </button>
                      <button className="bg-[#65a0ff] px-2 py-0.5 rounded-md text-white cursor-pointer">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border-2 px-4 py-2">3</td>
                  <td className="border-2 px-4 py-2">Emirates</td>
                  <td className="border-2 px-4 py-2">108</td>
                  <td className="border-2 px-4 py-2">NSK</td>
                  <td className="border-2 px-4 py-2">BOM</td>
                  <td className="border-2 px-4 py-2">2024-05-04 23:50</td>
                  <td className="border-2 px-4 py-2">2024-05-05 00:50</td>
                  {/* <td className="border-2">1000</td>
                  <td className="border-2">8000</td>
                  <td className="border-2">5000</td> */}
                  <td className="border-2 px-4 py-2">
                    <div className="flex gap-1 justify-center">
                      <button className="bg-[#d3e73e] px-2 py-0.5 rounded-md text-white cursor-pointer">
                        Running
                      </button>
                      <button className="bg-[#65a0ff] px-2 py-0.5 rounded-md text-white cursor-pointer">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
                {flights.map((flights, index) => (
                  <tr key={index}>
                    <td className="border-2 px-4 py-2">{index+1}</td>
                    <td className="border-2 px-4 py-2">{flights.flightName}</td>
                    <td className="border-2 px-4 py-2">{flights.flightNumber}</td>
                    <td className="border-2 px-4 py-2">{flights.originAirport}</td>
                    <td className="border-2 px-4 py-2">{flights.destinationAirport}</td>
                    <td className="border-2 px-4 py-2">{flights.departureDate} {flights.departureTime}</td>
                    <td className="border-2 px-4 py-2">{flights.departureDate} {flights.arrivalTime}</td>
                    {/* <td className="border-2">1000</td>
                    <td className="border-2">8000</td>
                    <td className="border-2">5000</td> */}
                    <td className="border-2 px-4 py-2">
                      <div className="flex gap-1 justify-center">
                        <button className="bg-[#4cd534] px-2 py-0.5 rounded-md text-white cursor-pointer">
                          Arrived
                        </button>
                        <button className="bg-[#65a0ff] px-2 py-0.5 rounded-md text-white cursor-pointer">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
