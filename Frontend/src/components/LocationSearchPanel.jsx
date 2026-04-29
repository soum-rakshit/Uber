import React from "react";
import "remixicon/fonts/remixicon.css";

const LocationSearchPanel = ({ suggestions = [], onSuggestionClick, setPanelOpen, setVehiclePanelOpen }) => {
    return (
        <div className=" mt-10 "> 
            {suggestions.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4 mt-10">
                    Start typing to see suggestions…
                </p>
            ) : (
                suggestions.map((suggestion, idx) => (
                    <div
                        key={idx}
                        onClick={() => onSuggestionClick(suggestion)}
                        className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full flex-shrink-0">
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <p className="font-medium text-sm">{suggestion}</p>
                    </div>
                    
                ))
            )}
        </div>
    );
};

export default LocationSearchPanel;

