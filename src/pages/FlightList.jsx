import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavbarL from '../components/NavbarL';
import Footer from '../components/Footer';

const FlightList = ({user, setUser}) => {
  const location = useLocation();
  const data = location.state || {};
  const [flights, setFlights] = useState([]);
  
  useEffect(() => {
    const fetchFlights = async () => {
        const response = await fetch('http://localhost:3000/api/flights');
        if (!response.ok) {
          throw new Error('Failed to fetch flights');
        }
        const flightsData = await response.json();
        const filteredFlights = flightsData.filter(flight =>
          flight.originAirport === data.originAirport &&
          flight.destinationAirport === data.destinationAirport
        );
        
        const flightsWithDetails = [];
        for (const flight_ of filteredFlights) {
          const detailsResponse = await fetch('http://localhost:3000/api/flightinfo');
          if (detailsResponse.ok) {
            const detailsData = await detailsResponse.json();
            const flightDetails = detailsData.filter(flight =>
              flight.flightNumber === flight_.flightNumber &&
              flight.departureDate === data.selectedDate.toString()
              );
            if(flightDetails.length > 0)
            {
              flightsWithDetails.push({
                ...flight_,
                prices: flightDetails[0].prices,
                seatsAvailable: flightDetails[0].seatsAvailable,
                selectedDate: flightDetails[0].departureDate
              });
            }
          }
        }
        console.log(flightsWithDetails);
        setFlights(flightsWithDetails);
        // console.log(data.selectedDate.toString());
        // setFlights(filteredFlights);
    };

    fetchFlights();
  }, [data.originAirport, data.destinationAirport, data.flightNumber, data.selectedDate ]);

  return (
    <>
    <NavbarL user={user} setUser={setUser}/>
    <div className="flight-listing-container max-w-5xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Flights from {data.originAirport} to {data.destinationAirport} on {data.selectedDate}
      </h2>
      {flights.length === 0 ? (
        <div className="text-center text-gray-600">No flights available</div>
      ) : (
      flights.map((flight, index) => (
        <div key={index} className="flight-card p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex flex-col mb-4">
            <h1 className="text-xl font-bold">
              {flight.flightName}
            </h1>
            <h1 className="text-lg text-gray-600 font-bold">
              {flight.flightNumber}
            </h1>
            <div className="flex justify-between items-center mt-6">
              {/* <div className="flex-1 text-center">
                <p className="text-gray-600">{flight.duration}</p>
              </div> */}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-lg">{flight.originAirport}</p>
                <p className="text-gray-600">{flight.departureTime}</p>
              </div>
              <div className="relative flex items-center flex-1 mx-4">
                <div className="flex-1 border-t border-gray-300 relative" style={{ top: '-0.5rem', marginLeft: '0.5rem', marginRight: '0.5rem' }}></div>
                <p className="mx-4 text-center relative" style={{ top: '-0.75rem' }}>{flight.duration}</p>
                <div className="flex-1 border-t border-gray-300 relative" style={{ top: '-0.5rem', marginLeft: '0.5rem', marginRight: '0.5rem' }}></div>
              </div>
              <div className="text-center">
                <p className="text-lg">{flight.destinationAirport}</p>
                <p className="text-gray-600">{flight.arrivalTime}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="class-card p-4 bg-white rounded-lg shadow-md">
              <h4 className="font-bold">Economy</h4>
              <p>Price: {flight.prices.economy}</p>
              <p>Seats Available: {flight.seatsAvailable.economy}</p>
              {user ? (
                  <Link to='/passform' state={{originAirport: data.originAirport, destinationAirport: data.destinationAirport, selectedDate: data.selectedDate, passengers: data.passengers, price: flight.prices.economy, flightNumber: flight.flightNumber, flightName: flight.flightName, duration: flight.duration, departureTime: flight.departureTime, arrivalTime: flight.arrivalTime, seat: "Economy" }}>
                  <button className="select-button w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Select
                  </button></Link>
              ):(
                <button disabled className="select-button disabled:opacity-50 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Select
                </button>
              )}
              
            </div>
            <div className="class-card p-4 bg-white rounded-lg shadow-md">
              <h4 className="font-bold">Business</h4>
              <p>Price: {flight.prices.business}</p>
              <p>Seats Available: {flight.seatsAvailable.business}</p>
              {user ? (
                <Link to='/passform' state={{originAirport: data.originAirport, destinationAirport: data.destinationAirport, selectedDate: data.selectedDate, passengers: data.passengers, price: flight.prices.business, flightNumber: flight.flightNumber, flightName: flight.flightName, duration: flight.duration, departureTime: flight.departureTime, arrivalTime: flight.arrivalTime, seat: "Business" }}>
                <button className="select-button w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
                  Select
                </button></Link>
              ):(
                <button disabled className="select-button w-full disabled:opacity-50 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
                  Select
                </button>
              )}
            </div>
            <div className="class-card p-4 bg-white rounded-lg shadow-md">
              <h4 className="font-bold">First Class</h4>
              <p>Price: {flight.prices.first}</p>
              <p>Seats Available: {flight.seatsAvailable.first}</p>
              {user ? (
                <Link to='/passform' state={{originAirport: data.originAirport, destinationAirport: data.destinationAirport, selectedDate: data.selectedDate, passengers: data.passengers, price: flight.prices.first, flightNumber: flight.flightNumber, flightName: flight.flightName, duration: flight.duration, departureTime: flight.departureTime, arrivalTime: flight.arrivalTime, seat: "First" }}>
                <button className="select-button w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
                  Select
                </button></Link>
              ):(
                <button disabled className="select-button w-full disabled:opacity-50 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
                  Select
                </button>
              )}
              
            </div>
          </div>
        </div>
      )))}
    </div>
    <Footer/>
    </>
  );
}

export default FlightList;
