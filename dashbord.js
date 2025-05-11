import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { user, logout } = useAuth();
    const [parkingAreas, setParkingAreas] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        const fetchParking = async () => {
            try{
                const res =await fetch("http://localhost:500/api/parking-areas");
                const data = await res.json();
                setParkingAreas(data);
            }
            catch (err) {
                console.error("failed to fetch parking areas");
            }
        };
        fetchParking();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };


    return(
        <div className="min-h-screan bg-gray-100 p-4">
            <div className="flex justfy-between items-center mb-6">
                <h1 className="text-2*1 font-bold">Welcome, {user?.name || "user"}</h1>
                <button
                onClick={handleLogout}
                className="big-red-600 text white px-4 py-2 rounded"
                >
                    logout
                </button>
            </div>
            <h2 className="text x1 font-semibold mb-4">Available parking areas</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {parkingAreas.map((area) => (
                    <div key={area._id} className="big-white p-4 shadow roud">
                        <h3 className="text-lg font-bold">{area.name}</h3>
                        <p className="text-sm">Location: {area.location}</p>
                        <p className="text-sm">Slots Available: {area.slotsAvailable}</p>
                        </div>
                ))}
                {parkingAreas.length === 0 && (
                    <p className="text-gray-600">No parking area found</p>
                )}
            </div>
        </div>
    )
}
export default Dashboard;