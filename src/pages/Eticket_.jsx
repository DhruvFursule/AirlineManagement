import React, { useEffect, useRef, useState } from 'react'
import NavbarM from '../components/NavbarM'
import { useLocation } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import Footer from '../components/Footer'

const Eticket_ = ({user}) => {
  const location = useLocation();
  const data = location.state || {}
  const ticketref = useRef(); 
  console.log(data);
  const handlePrint = useReactToPrint({
    content: () => ticketref.current,
    documentTitle: "E-Tickets",
    // onAfterPrint: () => alert("Print Success"),
  })

  return (
    <>
    <NavbarM user={user}/>
      <h1 className='text-center font-bold text-4xl mt-10'>E-Tickets</h1>
      <div ref={ticketref}>
        {data.data.formData.map((list, index) => (
          <div key={index} className='flex flex-col justify-center items-center'>
            <div className='h-[65vh] w-[80vw] bg-white rounded-[20px] overflow-hidden shadow-[5px_5px_15px_rgba(0,0,0,0.6)] mx-6 my-6 flex '>
              <div className='w-[70%] h-[65vh] rounded-l-[20px] pl-12 pr-20 pb-10'>
                <div className="h-[10vh] w-[100%] px-5 flex items-center justify-evenly">
                  <img className=" mt-4 object-fill h-16" src="/eplane.png" />
                  <p className='text-[30px] text-gray-500 mt-4'>{data.data.data.seat} Class</p>
                </div>
                <div className='bg-gray-400 h-[1px] mt-3 mb-4'></div>
                <div className="flex flex-row justify-center items-center gap-40 mb-2 mt-4">
                  <div className="flex flex-col justify-center items-center">
                    <div className='font-normal text-lg text-gray-500'>AIRLINE</div>
                    <div className='font-bold text-2xl'>{data.data.data.flightName}</div>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <div className="font-normal text-lg text-gray-500">FROM</div>
                    <div className="font-bold text-2xl">{data.data.data.originAirport}</div>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <div className="font-normal text-lg text-gray-500">TO</div>
                    <div className="font-bold text-2xl">{data.data.data.destinationAirport}</div>
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
                    <div className='font-semibold text-3xl'>{data.data.data.departureTime}</div>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <div className="font-normal text-lg text-gray-500">ARRIVAL</div>
                    <div className='font-bold text-xl text-black'>04 May 24</div>
                    <div className="font-semibold text-3xl">{data.data.data.arrivalTime}</div>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <div className="font-normal text-lg text-gray-500">FLIGHT NO</div>
                    <div className="font-bold text-2xl">{data.data.data.flightNumber}</div>
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

export default Eticket_
