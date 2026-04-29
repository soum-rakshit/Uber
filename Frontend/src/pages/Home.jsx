import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";
import LookingForDriver from "../components/LookingForDriver";

const Home = () => {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null); // 'pickup' | 'destination'
    const [fare, setFare] = useState({});
    const [panelOpen, setPanelOpen] = useState(false);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingPanel, setWaitingPanel] = useState(false)
    const [vehicleType, setVehicleType] = useState(null)
    

    const panelRef = useRef(null);
    const vehiclePanelOpenRef = useRef(null);
    const panelCloseRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null)
    const waitingPanelRef = useRef(null)
    const debounceTimer = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();
    };

    const fetchSuggestions = useCallback(async (input) => {
        if (!input || input.trim().length < 3) {
            setSuggestions([]);
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/map/get-suggestions`,
                {
                    params: { input },
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setSuggestions(response.data);
        } catch (err) {
            console.error('Failed to fetch suggestions:', err);
            setSuggestions([]);
        }
    }, []);

    const handlePickupChange = (e) => {
        setPickup(e.target.value);
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => fetchSuggestions(e.target.value), 400);
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => fetchSuggestions(e.target.value), 400);
    };

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion);
        } else if (activeField === 'destination') {
            setDestination(suggestion);
            setPanelOpen(false);
            setVehiclePanelOpen(true);
        }
        setSuggestions([]);
        
        
    };

    async function findTrip(){
        setVehiclePanelOpen(true)
        setPanelOpen(false)

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
                params: {
                    pickup,
                    destination,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            console.log(response.data)
            setFare(response.data)
        } catch (error) {
            console.error('Failed to fetch prices:', error);
        }
        
    }

    async function createRide(vehicleType) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`, {
                pickup,
                destination,
                vehicleType,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Failed to create ride:', error);
        }
    }


    useGSAP(
        function () {
            if (panelOpen) {
                gsap.to(panelRef.current, {
                    height: "70%",
                    opacity:1,
                    padding:20
                });
                gsap.to(panelCloseRef.current, {
                    opacity:1
                });
              } else {
                gsap.to(panelRef.current, {
                  height: "0%",
                  padding:0
                });
                gsap.to(panelCloseRef.current, {
                    opacity:0
                });
            }
        },
        [panelOpen],
    );
    
    useGSAP(
        function () {
            if (confirmRidePanel) {
                gsap.to(confirmRidePanelRef.current, {
                    transform:'translateY(0)'
                });
              } else {
                gsap.to(confirmRidePanelRef.current, {
                  transform:'translateY(100%)'
                });
                
            }
        },
        [confirmRidePanel],
    );

    useGSAP(
        function () {
            if (vehiclePanelOpen) {
                gsap.to(vehiclePanelOpenRef.current, {
                    transform:'translateY(0)'
                });
              } else {
                gsap.to(vehiclePanelOpenRef.current, {
                  transform:'translateY(100%)'
                });
                
            }
        },
        [vehiclePanelOpen],
    );

    useGSAP(
        function () {
            if (vehicleFound) {
                gsap.to(vehicleFoundRef.current, {
                    transform:'translateY(0)'
                });
              } else {
                gsap.to(vehicleFoundRef.current, {
                  transform:'translateY(100%)'
                });
                
            }
        },
        [vehicleFound],
    );

    useGSAP(
        function () {
            if (waitingPanel) {
                gsap.to(waitingPanelRef.current, {
                    transform:'translateY(0)'
                });
              } else {
                gsap.to(waitingPanelRef.current, {
                  transform:'translateY(100%)'
                });
                
            }
        },
        [waitingPanel],
    );

    return (
        <div className="h-screen relative overflow-hidden">
            <img
                className="w-16 absolute left-5 top-5"
                src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                alt=""
            />

            <div onClick={() => {
              setVehiclePanelOpen(false)
            }} className="h-screen w-screen">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                />
            </div>

            <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
                <div className="h-[30%] bg-white p-5 relative">
                    <h5 
                    ref={panelCloseRef}
                    onClick={() => {
                        setPanelOpen(false)
                    }}
                    className="absolute opacity-0 right-6 top-6 text-2xl">
                        <i className="ri-arrow-down-wide-fill"></i>
                    </h5>
                    <h4 className="text-3xl font-semibold">Find a trip</h4>
                    <form
                        onSubmit={(e) => {
                            submitHandler(e);
                        }}
                    >
                        <div className="line absolute h-16 w-1 top-[48%] left-10 bg-gray-700 rounded-full"></div>
                        <input
                            onFocus={() => {
                                setPanelOpen(true);
                                setActiveField('pickup');
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className="bg-[#eee] px-15 py-2 text-lg w-full rounded-lg mt-5"
                            type="text"
                            placeholder="Add a pickup location"
                        />
                        <input
                            onFocus={() => {
                                setPanelOpen(true);
                                setActiveField('destination');
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className="bg-[#eee] px-15 py-2 w-full text-lg rounded-lg mt-3"
                            type="text"
                            placeholder="Enter your destination"
                        />
                    </form>
                    <button onClick={findTrip} className="bg-[#000000] w-full text-white font-medium rounded-lg mt-7 mb-5 px-2 py-2 text-lg">Find a trip</button>
                </div>
                <div ref={panelRef} className=" bg-white ">
                  <LocationSearchPanel
                    suggestions={suggestions}
                    onSuggestionClick={handleSuggestionClick}
                    panelOpen={panelOpen}
                    setPanelOpen={setPanelOpen}
                    vehiclePanelOpen={vehiclePanelOpen}
                    setVehiclePanelOpen={setVehiclePanelOpen}
                  />
                  
                </div>
            </div>
            <div ref={vehiclePanelOpenRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 bg-white">
              <VehiclePanel
              selectVehicle = {setVehicleType}
              fare={fare} setFare={setFare} setConfirmRidePanel={setConfirmRidePanel} vehiclePanelOpen={vehiclePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
            </div>
            <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 bg-white">
              <ConfirmRide 
              createRide={createRide}
              pickup={pickup}
              destination={destination}
              vehicleType={vehicleType}
              fare={fare}
              setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>
            <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 bg-white">
              <LookingForDriver 
              createRide={createRide}
              pickup={pickup}
              destination={destination}
              vehicleType={vehicleType}
              fare={fare}
              setVehicleFound={setVehicleFound} setConfirmRidePanel={setConfirmRidePanel} setWaitingPanel={setWaitingPanel} />

            </div>
            <div ref={waitingPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 bg-white">
              <WaitingForDriver setVehicleFound={setVehicleFound} setWaitingPanel={setWaitingPanel} />
            </div>
        </div>
    );
};

export default Home;
