import React, { useEffect, useRef, useState } from 'react'
import NavbarM from '../components/NavbarM'
import { useLocation } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import Footer from '../components/Footer'

const Eticket = ({user}) => {
  const location = useLocation();
  const ticketref = useRef(); 
  const query = new URLSearchParams(location.search);
  const info = query.get('info');
  const data = info ? JSON.parse(decodeURIComponent(info)) : {};
  // console.log(data);
  // const [bookingFlag, setBookingFlag] = useState(false);
  const handlePrint = useReactToPrint({
    content: () => ticketref.current,
    documentTitle: "E-Tickets",
    // onAfterPrint: () => alert("Print Success"),
  })
  const Data = {
    email: data.user.email,
    data: data.data,
    formData: data.formData,
  }
  const Data_ = {
    flightNumber: data.data.flightNumber,
    departureDate: data.data.selectedDate,
    passengers: data.data.passengers,
    seat: data.data.seat.toLowerCase()
  }
  console.log(Data);
  // console.log(Data.data);
  console.log(Data_);
  useEffect(() => {
    if (!sessionStorage.getItem('bookingSent')) {
    sessionStorage.setItem('bookingSent', true);
    const Booking = async () => {
      let response = await fetch("http://localhost:3000/bookings", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
      });
      if (response.ok) 
      {
          const result = await response.json();
          console.log('Booking submitted successfully:', result);
      } 
      else
      console.error('Failed to submit booking:', response.statusText);

    }
    const Update = async () => {
      let response_ = await fetch("http://localhost:3000/api/flight", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Data_),
      });
  
      if (response_.ok) 
        {
            const result = await response_.json();
            console.log('Updated successfully:', result);
        } 
        else
        console.error('Failed to update:', response_.statusText);
    }
    Update();
    Booking();
    }
  }, []);
  
  return (
    <>
    <NavbarM user={data.user}/>
      <h1 className='text-center font-bold text-4xl mt-10'>E-Tickets</h1>
      <div ref={ticketref}>
        {data.formData.map((list, index) => (
          <div key={index} className='flex flex-col justify-center items-center'>
            <div className='h-[65vh] w-[80vw] bg-white rounded-[20px] overflow-hidden shadow-[5px_5px_15px_rgba(0,0,0,0.6)] mx-6 my-6 flex '>
              <div className='w-[70%] h-[65vh] rounded-l-[20px] pl-12 pr-20 pb-10'>
                <div className="h-[10vh] w-[100%] px-5 flex items-center justify-evenly">
                  <img className=" mt-4 object-fill h-16" src="/eplane.png" />
                  <p className='text-[30px] text-gray-500 mt-4'>{data.data.seat} Class</p>
                </div>
                <div className='bg-gray-400 h-[1px] mt-3 mb-4'></div>
                <div className="flex flex-row justify-center items-center gap-40 mb-2 mt-4">
                  <div className="flex flex-col justify-center items-center">
                    <div className='font-normal text-lg text-gray-500'>AIRLINE</div>
                    <div className='font-bold text-2xl'>{data.data.flightName}</div>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <div className="font-normal text-lg text-gray-500">FROM</div>
                    <div className="font-bold text-2xl">{data.data.originAirport}</div>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <div className="font-normal text-lg text-gray-500">TO</div>
                    <div className="font-bold text-2xl">{data.data.destinationAirport}</div>
                  </div>
                </div>
                <div className="flex justify-between mb-2 mt-6">
                  <div className="flex flex-col justify-center items-center w-72">
                    <div className='font-normal text-lg text-gray-500 text-center w-72'>PASSENGER</div>
                    <div className='font-bold text-2xl text-center w-72'>{list.title}. {list.firstName} {list.lastName}</div>
                  </div>
                  <div className='flex flex-col justify-center items-center w-32'>
                    <div className='font-normal text-lg text-gray-500 w-32 text-center'>BOARD TIME</div>
                    <div className='font-bold text-2xl w-32 text-center'>--</div>
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <div className="flex flex-col justify-center items-center">
                    <div className='font-normal text-lg text-gray-500'>DEPARTURE</div>
                    <div className='font-bold text-xl text-black'>04 May 24</div>
                    <div className='font-semibold text-3xl'>{data.data.departureTime}</div>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <div className="font-normal text-lg text-gray-500">ARRIVAL</div>
                    <div className='font-bold text-xl text-black'>04 May 24</div>
                    <div className="font-semibold text-3xl">{data.data.arrivalTime}</div>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <div className="font-normal text-lg text-gray-500">FLIGHT NO</div>
                    <div className="font-bold text-2xl">{data.data.flightNumber}</div>
                  </div>
                </div>
              </div>
              <div className='w-[30%] h-[65vh] bg-black relative overflow-hidden rounded-r-[20px]'>
                <img className="object-fill h-[65vh]" src="https://as2.ftcdn.net/v2/jpg/04/34/85/91/1000_F_434859188_XrsJIIRfMovZDOulIlfX867As5m4niLB.jpg" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center items-center'>
        <button onClick={handlePrint} className='text-white text-xl font-bold py-2 px-4 rounded-xl bg-green-500 hover:bg-green-700'>
          <div className="elements flex justify-center items-center gap-2">
            <img src="/print.png" alt="" className='h-10' />
            <div>Print</div>
          </div>
        </button>
      </div>
      <Footer/>
    </>
  )
}

export default Eticket
