import React from "react";
import "remixicon/fonts/remixicon.css";

const LocationSearchPanel = (props) => {
    const locations = [
        {
            id: 1,
            title: "Times Square",
            description: "42nd Street, New York, NY 10036",
        },
        {
            id: 2,
            title: "Central Park",
            description: "Central Park West, New York, NY 10024",
        },
        {
            id: 3,
            title: "Grand Central Terminal",
            description: "89 E 42nd St, New York, NY 10017",
        },
        {
            id: 4,
            title: "Empire State Building",
            description: "350 5th Ave, New York, NY 10118",
        },
        {
            id: 5,
            title: "Statue of Liberty",
            description: "Liberty Island, New York, NY 10004",
        },
    ];

    return (
        <div>
            {locations.map((item, id) => {
                return (
                    <div key={id}
                    onClick={()=>{
                        props.setVehiclePanelOpen(true)
                        props.setPanelOpen(false)
                    }}>
                        <div className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start">
                        <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="font-medium text-sm text-gray-600">
                                {item.description}
                            </p>
                        </div>
                    </div>
                    </div>
                );
            })}

            
        </div>
    );
};

export default LocationSearchPanel;
