import React from 'react'
import NavbarM from '../components/NavbarM';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

const Preview = ({user}) => {
    const location = useLocation();
    const data = location.state || {};
    data.user = user;
    console.log(data);
    const totalcost = (data.data.price*data.data.passengers);

    const handleClick = async () => {
        sessionStorage.removeItem('bookingSent');
        let response = await axios.post("http://localhost:3000/api/payments", data);
        if(response && response.status === 200)
        {
            console.log(response.data);
            window.location.href = response.data.url;
        }
    }

    return (
        <>
        <NavbarM user={user}/>
        <div className='bg-[#F7F6FF]'>
            <h2 className='text-center text-4xl font-medium pt-2'>Preview</h2>
            <div className='bg-white w-3/4 h-44 m-auto rounded-3xl px-8 py-4 pl-10 mt-5 drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]'>
                <div className='flex relative bg-white justify-between'>
                    <div className='text-3xl font-medium bg-white'>{data.data.originAirport}</div>
                    <div>
                        <div className='bg-white text-xl font-medium'>{data.data.flightName}</div>
                        <div className='bg-white text-xl font-medium'>{data.data.flightNumber}</div>
                    </div>
                    <div className='text-3xl font-medium bg-white'>{data.data.destinationAirport}</div>
                </div>
                <div className='flex relative bg-white'>
                    <span>
                        <div className='font-normal bg-white'>Departure</div>
                        <div className='text-3xl font-medium bg-white'>{data.data.departureTime}</div>
                        <div className='font-normal bg-white'>Sat, {data.data.selectedDate}</div>
                    </span>
                    <span className='icon'>
                        <span className='bg-[#00c800] h-4 w-4 rounded-lg absolute top-8 left-24'></span>
                        <span className='bg-[#00c800] h-0.5 w-4/5 absolute top-10 left-24'></span>
                        <span className='absolute right-28 top-5'><img src="/airplane.png" className='bg-white h-10'></img></span>
                    </span>
                    <span className='absolute right-0'>
                        <div className='font-normal bg-white'>Arrival</div>
                        <div className='text-3xl font-medium bg-white'>{data.data.arrivalTime}</div>
                        <div className='font-normal bg-white'>Sat, 04 May</div>
                    </span>
                </div>
            </div>
            <div className='w-3/4 bg-white mx-auto mt-4 py-4 px-8 text-2xl font-medium rounded-3xl flex-col drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]'>
                <div className='bg-white w-4/5 pb-2'>Passengers List:</div>
                <div className='font-normal max-h-40 overflow-auto'>
                    {/* <ol className='list-decimal list-inside'>
                    {data.formData.map((list, index) => (
                        <li key={index} className="bg-white">{list.title}. {list.firstName} {list.lastName} | {list.gender} | {list.dob} | {list.mobile}</li>
                    ))}
                    </ol> */}
                    <table className="w-full bg-white">
                        <thead>
                            <tr>
                                <th className="border-2 border-black px-4 py-2">#</th>
                                <th className="border-2 border-black px-4 py-2">Title</th>
                                <th className="border-2 border-black px-4 py-2">Name</th>
                                <th className="border-2 border-black px-4 py-2">Gender</th>
                                <th className="border-2 border-black px-4 py-2">Date of Birth</th>
                                <th className="border-2 border-black px-4 py-2">Mobile Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.formData.map((list, index) => (
                                <tr key={index}>
                                    <td className="border-2 border-black px-4 py-2">{index+1}</td>
                                    <td className="border-2 border-black px-4 py-2">{list.title}</td>
                                    <td className="border-2 border-black px-4 py-2">{list.firstName} {list.lastName}</td>
                                    <td className="border-2 border-black px-4 py-2">{list.gender}</td>
                                    <td className="border-2 border-black px-4 py-2">{list.dob}</td>
                                    <td className="border-2 border-black px-4 py-2">{list.mobile}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='w-3/4 h-48 bg-white mx-auto mt-4 rounded-3xl flex flex-col drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]'>
                <div className='bg-white flex rounded-3xl justify-around items-center'>
                    <div className='bg-white text-2xl font-medium mt-5'>
                        Total Passenger(s): {data.data.passengers}
                    </div>
                    <div className='bg-white text-2xl font-medium mt-5'>
                        Cost per {data.data.seat} Seat: INR {data.data.price}
                    </div>
                </div>
                <div className='bg-white font-bold text-2xl mt-5 flex justify-center items-center'>
                    Total Cost: INR {totalcost}
                </div>
                <div className='w-4/5 h-px bg-[#b9b9b9] mt-2.5 mx-auto'>
                </div>
                <div className='flex justify-around item-center bg-white mt-4'>
                    <button className="bg-[#8b1c64] h-12 w-24 text-white text-xl rounded-xl font-bold">Back</button>
                    <button onClick={handleClick} className="bg-[#8b1c64] h-12 w-28 text-white text-xl rounded-xl font-bold">Proceed</button>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Preview;