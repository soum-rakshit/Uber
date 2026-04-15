import React from "react";

const ConfirmRide = (props) => {
    return (
        <div className="h-[70%]">
            <h5
                className="p-3 flex justify-center text=center absolute top-0 w-[90%] "
                onClick={() => {
                    // props.setVehiclePanelOpen(false);
                    props.setConfirmRidePanel(false);
                    props.setPanelOpen(false)
                }}
            >
                <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="py-2 text-2xl font-semibold mb-5">Confirm your ride</h3>

            <div className="flex gap-2 justify-between flex=col items-center">  
                <img className="h-40 mx-20" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8zMDUxZTYwMi0xMGJiLTRlNjUtYjEyMi1lMzk0ZDgwYTljNDcucG5n" />
            </div>

            <div className="w-full ">
                <div className="flex items-center gap-3 p-3 border-b-1">
                    <i className="text-lg ri-map-pin-fill"></i>
                    <div>
                        <h3 className="text-lg font-medium">Times Square</h3>
                        <p className="text-sm text-gray-600">42nd Street, New York, NY 10036</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 border-b-1">
                    <i className="text-lg ri-map-pin-fill"></i>
                    <div>
                        <h3 className="text-lg font-medium">Times Square</h3>
                        <p className="text-sm text-gray-600">42nd Street, New York, NY 10036</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 p-3">
                    <i className="text-lg ri-wallet-fill"></i>
                    <h3 className="text-lg font-medium">₹193.20</h3>
                    <p className="text-sm mt-1 text-gray-600">Cash Cash</p>
                </div>
            </div>

            <div className="p-2 mt-5">
                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false);
                }} className="w-full bg-green-600 text-white font-semibold py-2 p-2 rounded-xl">
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default ConfirmRide;
