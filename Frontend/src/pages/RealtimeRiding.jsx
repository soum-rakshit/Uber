import React from "react";
import { Link } from "react-router-dom";

const RealtimeRiding = () => {
    return (
        <div className="h-screen">
            <Link to='/home' className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
                <i className="ri-home-fill"></i>
            </Link>
            <div className="h-1/2 ">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                />
                <div className="h-1/2 p-4">
                    <div className="flex items-center justify-between">
                        <img
                            className="h-14"
                            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8zMDUxZTYwMi0xMGJiLTRlNjUtYjEyMi1lMzk0ZDgwYTljNDcucG5n"
                        />
                        <div className="text-right">
                            <h2 className="text-lg font-medium">Soumyadeep</h2>
                            <h4 className="text-xl font-semibold -mt-1 -mb-1">
                                TR01 AB 1234
                            </h4>
                            <p className="text-sm text-gray-600">
                                Maruti Fuzuki Alto
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2 justify-between flex=col items-center"></div>

                    <div className="w-full ">
                        <div className="flex items-center gap-3 p-3 border-b-1">
                            <i className="text-lg ri-map-pin-fill"></i>
                            <div>
                                <h3 className="text-lg font-medium">
                                    Times Square
                                </h3>
                                <p className="text-sm text-gray-600">
                                    42nd Street, New York, NY 10036
                                </p>
                            </div>
                        </div>
                        

                        <div className="flex items-center gap-3 p-3">
                            <i className="text-lg ri-wallet-fill"></i>
                            <h3 className="text-lg font-medium">₹193.20</h3>
                            <p className="text-sm mt-1 text-gray-600">
                                Cash Cash
                            </p>
                        </div>
                    </div>
                    <button className="w-full bg-green-600 text-white font-semibold py-2 p-2 rounded-xl">Make a Payment</button>
                </div>
            </div>
        </div>
    );
};

export default RealtimeRiding;
