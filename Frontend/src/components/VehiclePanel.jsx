import React from "react";

const VehiclePanel = (props) => {
    // console.log(`${props.fare}`)
    return (
        <div>
            <h5
                className="p-3 flex justify-center text=center absolute top-0 w-[90%] "
                onClick={() => {
                    props.setVehiclePanelOpen(false);
                    // props.setPanelOpen(false)
                }}
            >
                <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Choose a ride</h3>
            <div
                onClick={() => {
                    props.selectVehicle('car')
                    props.setConfirmRidePanel(true);
                }}
                className=" car flex active:border-3
                 mb-2 items-center justify-between  p-1 rounded-xl w-full"
            >
                <img
                    className="h-20 mx-[-5px]"
                    src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8zMDUxZTYwMi0xMGJiLTRlNjUtYjEyMi1lMzk0ZDgwYTljNDcucG5n"
                />
                <div className=" w-2/2.5">
                    <h4 className="font-medium text-sm">
                        UberGo{" "}
                        <span>
                            <i className="ri-user-fill font-medium text-sm"></i>
                            4
                        </span>
                    </h4>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">
                        Affordable, compact rides
                    </p>
                </div>
                <h2 className="px-2 text-xl font-semibold"> ₹{props.fare.car} </h2>
            </div>
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle('moto')
                }}
                className=" bike flex  active:border-3 mb-2 items-center justify-between  p-3 rounded-xl w-full"
            >
                <img
                    className="w-13 mx-3"
                    src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
                />
                <div className=" w-2/2.5">
                    <h4 className="font-medium text-sm">
                        UberMoto{" "}
                        <span>
                            <i className="ri-user-fill font-medium text-sm"></i>
                            1
                        </span>
                    </h4>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">
                        Affordable, motorcycle rides
                    </p>
                </div>
                <h2 className="px-2 text-xl font-semibold"> ₹{props.fare.moto}</h2>
            </div>
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle('auto')
                }}
                className=" auto flex  active:border-3 mb-2 items-center justify-between  p-3 rounded-xl w-full"
            >
                <img
                    className="w-20  "
                    src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
                />
                <div className=" p-2 ">
                    <h4 className="font-medium text-sm">
                        UberAuto{" "}
                        <span>
                            <i className="ri-user-fill font-medium text-sm"></i>
                            3
                        </span>
                    </h4>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">
                        Affordable, auto rides
                    </p>
                </div>
                <h2 className="px-2 text-xl font-semibold"> ₹{props.fare.auto} </h2>
            </div>
        </div>
    );
};

export default VehiclePanel;
