import React from "react";
import { Link } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";

function Schedule() {
  return (
    <div className="grid grid-cols-12 min-h-screen min-w-screen">
      <div className="min-h-screen col-span-3 flex flex-col items-center">
        <AdminMenu />
      </div>
      <div className=" min-h-screen col-span-9">
        <AdminNav />
        <div className="w-3/4 h-[58rem] bg-white relative rounded-xl shadow-lg p-6 pt-8 mb-2 mt-8">
          <div className="text-3xl font-semibold text-slate-600">
            SCHEDULE A FLIGHT
          </div>
          <div className="mt-3">
            (If flight is already added and you want to update click on{" "}
            <Link to="http:localhost:5173/admin/updateflt" className="font-semibold text-[#383eff]">
              update flight
            </Link>
            )
          </div>
          <form
            action="admin/fltmanagement"
            method="post"
            className="mt-12 relative"
          >
            <div className="bg-slate-100 p-4 flex items-center">
              <label for="airlines" className="text-xl font-medium">
                Select Airline
              </label>
              <select
                name="airlines"
                id="airlines"
                required
                className="absolute left-1/2 border border-slate-500 h-10"
              >
                <option value="Emirates">Emirates</option>
                <option value="Indigo">Indigo</option>
                <option value="AirIndia">AirIndia</option>
                <option value="AirAsia">AirAsia</option>
                <option value="Vistara">Vistara</option>
              </select>
            </div>
            <div className="p-3 flex items-center">
              <label for="flightNo" className="text-xl font-medium">
                Enter Flight Number
              </label>
              <select
                name="flightNo"
                required
                id="flightNo"
                className="border border-slate-500 absolute left-1/2 h-10"
              >
                <option value="101">101</option>
                <option value="102">102</option>
                <option value="103">103</option>
                <option value="104">104</option>
                <option value="105">105</option>
              </select>
            </div>
            <div className="bg-slate-100 p-3 flex">
              <label for="flightNo" className="text-xl font-medium">
                Flight Has
              </label>
              <div className="flex gap-5 absolute left-1/2">
                <label for="economy" className='flex items-center'>
                  <input className='mr-1' type="checkbox" name="economy" id="economy" />
                  Economy Class
                </label>
                <label for="business" className='flex items-center'>
                  <input className='mr-1' type="checkbox" name="business" id="business" />
                  Business Class
                </label>
                <label for="first" className='flex items-center'>
                  <input className='mr-1' type="checkbox" name="first" id="first" />
                  First Class
                </label>
              </div>
            </div>
            <div className="p-3">
              <label for="economyNo" className="text-xl font-medium">
                Enter Number Of Economy Class Seats
              </label>
              <input
                type="number"
                name="economyNo"
                id="economyNo"
                min="1"
                step="1"
                required
                className="border border-slate-500 absolute left-1/2 h-8"
              ></input>
            </div>
            <div className="p-3 bg-slate-100">
              <label for="businessNo" className="text-xl font-medium">
                Enter Number Of Business Class Seats
              </label>
              <input
                type="number"
                name="businessNo"
                id="businessNo"
                min="1"
                step="1"
                required
                className="border border-slate-500 absolute left-1/2 h-8"
              ></input>
            </div>
            <div className="p-3">
              <label for="firstNo" className="text-xl font-medium">
                Enter Number Of First Class Seats
              </label>
              <input
                type="number"
                name="firstNo"
                id="firstNo"
                min="1"
                step="1"
                required
                className="border border-slate-500 absolute left-1/2 h-8"
              ></input>
            </div>
            <div className="bg-slate-100 p-3 flex items-center">
              <label for="source" className="text-xl font-medium">
                Select Source
              </label>
              <select
                name="airlines"
                id="source"
                required
                className="absolute left-1/2 border border-slate-500 h-10"
              >
                <option value="BOM">Mumbai (BOM)</option>
                <option value="NSK">Nashik (NSK)</option>
                <option value="DEL">Delhi (DEL)</option>
                <option value="HYD">Hyderabad (HYD)</option>
                <option value="MAA">Chennai (MAA)</option>
              </select>
            </div>
            <div className="p-3 bg-white flex items-center">
              <label for="destination" className="text-xl font-medium">
                Select Destination
              </label>
              <select
                name="destination"
                id="destination"
                required
                className="absolute left-1/2 border border-slate-500 h-10"
              >
                <option value="BOM">Mumbai (BOM)</option>
                <option value="NSK">Nashik (NSK)</option>
                <option value="DEL">Delhi (DEL)</option>
                <option value="HYD">Hyderabad (HYD)</option>
                <option value="MAA">Chennai (MAA)</option>
              </select>
            </div>
            <div className="bg-slate-100 p-3">
              <label for="departure-time" className="text-xl font-medium">
                Select The Departure Date And Time Of Flight
              </label>
              <input
                type="datetime-local"
                id="departure-time"
                name="departure-time"
                min="2023-06-01T00:00"
                max="2023-12-31T23:59"
                step="1800"
                required
                className="absolute left-1/2 px-4 py-2 border border-slate-500 h-8 rounded-md shadow-sm focus:outline-none ml-12"
              ></input>
            </div>
            <div className="p-3">
              <label for="arrival-time" className="text-xl font-medium">
                Select The Arrival Date And Time Of Flight
              </label>
              <input
                type="datetime-local"
                id="arrival-time"
                name="arrival-time"
                min="2023-06-01T00:00"
                max="2023-12-31T23:59"
                step="1800"
                required
                className="absolute left-1/2 px-4 py-2 border border-slate-500 h-8 rounded-md shadow-sm focus:outline-none ml-12"
              ></input>
            </div>
            <div className="bg-slate-100 p-3">
              <label for="economycost" className="text-xl font-medium">
                Enter Seat Cost For Economy Class
              </label>
              <input
                type="number"
                name="economycost"
                id="economycost"
                min="1"
                step="1"
                required
                className="border border-slate-500 absolute left-1/2 h-8"
              ></input>
            </div>
            <div className="p-3">
              <label for="businesscost" className="text-xl font-medium">
                Enter Seat Cost For Business Class
              </label>
              <input
                type="number"
                name="businesscost"
                id="businesscost"
                min="1"
                step="1"
                required
                className="border border-slate-500 absolute left-1/2 h-8"
              ></input>
            </div>
            <div className="bg-slate-100 p-3">
              <label for="firstcost" className="text-xl font-medium">
                Enter Seat Cost For First Class
              </label>
              <input
                type="number"
                name="firstcosst"
                id="firstcost"
                min="1"
                step="1"
                required
                className="border border-slate-500 absolute left-1/2 h-8"
              ></input>
            </div>
            <div className="flex gap-20 justify-center mt-10">
              <button
                type="submit"
                className="bg-[#585eff] w-20 h-10 rounded-md text-white font-semibold"
              >
                Submit
              </button>
              <button
                type="reset"
                className="bg-[#ee3333] w-20 h-10 rounded-md text-white font-semibold"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
