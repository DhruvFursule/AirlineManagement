import React from 'react'
import { Link } from 'react-router-dom'

const NavbarM = ({user}) => {

    const handleUserCheck = (e) => {
        if (!user) {
            e.preventDefault();
            alert('You must be logged in to access this page.');
        }
    };

  return (
    <nav className={"flex justify-around items-center bg-black text-white h-16 gap-11 sticky top-0 z-10"}>
    <div className='flex justify-center items-center gap-4'>
        <img src="/plane.png" alt="" />
        <div className="logo font-bold text-xl">
        Flyhigh
        </div>
    </div>
    <div className="">
        <ul className="flex font-bold gap-20">
            <li><Link to="/" >HOME</Link></li>
            <li>{user ? (<Link to="/myflts" state={{email: user.email}} onClick={handleUserCheck}>MY FLIGHTS</Link>) : (<Link to="/" onClick={handleUserCheck}>MY FLIGHTS</Link>)}</li>
            <li><Link to="/about">ABOUT</Link></li>
            <li>{user ? (<Link to="/feedback" onClick={handleUserCheck}>FEEDBACK</Link>) : (<Link to="/" onClick={handleUserCheck}>FEEDBACK</Link>)}</li>
        </ul>
    </div>
    <div id="google_translate"></div>
    {user ? (<Link to='/user' state={{userData: user}}><div className='flex justify-center items-center gap-2'>
        <img src="/avatar.png" alt="" className='h-5 w-5'/>
        <div className='font-bold'>{user.title} {user.firstName} {user.lastName}</div>
        </div></Link>):(<div></div>)}
    {/* {!user ? (
        <Link to="/login">
        <div className="btn flex justify-center items-center border-2 p-2 px-4 rounded-full bg-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-500 transition duration-300 hover:border-blue-950 hover:text-blue-950">
            <button className='font-bold text-xl'>Login</button>
            <img src="/login.svg" className="h-8 invert hover:filter-none" alt="login" />
        </div>
        </Link>
    ) : (
        <>
        <div className='flex justify-center items-center gap-2'>
        <img src="/avatar.png" alt="" className='h-5 w-5'/>
        <div className='font-bold'>{user.title} {user.firstName} {user.lastName}</div>
        </div>
        <Link to="/">
        <div onClick={handleLogout} className="btn flex justify-center items-center border-2 p-2 px-4 rounded-full bg-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-500 transition duration-300 hover:border-blue-950 hover:text-blue-950">
            <button className='font-bold text-xl'>Logout</button>
            <img src="/logout.svg" className="h-8 invert hover:filter-none" alt="login" />
        </div>
        </Link>
        </>
    )} */}
    </nav>
  )
}

export default NavbarM
