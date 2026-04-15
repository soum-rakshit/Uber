import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className="h-[70%]">
            <h5
                className="p-3 flex justify-center text=center absolute top-0 w-[90%] "
                onClick={() => {
                    // props.setVehiclePanelOpen(false);
                    // props.setConfirmRidePanel(false);
                    // props.setPanelOpen(false)
                    props.setWaitingPanel(false)
                }}
            >
                <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
            </h5>

            <div className='flex items-center justify-between'>
              <img className="h-14" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8zMDUxZTYwMi0xMGJiLTRlNjUtYjEyMi1lMzk0ZDgwYTljNDcucG5n" />
              <div className='text-right'>
                <h2 className='text-lg font-medium'>Soumyadeep</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1'>TR01 AB 1234</h4>
                <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
              </div>
            </div>

            <div className="flex gap-2 justify-between flex=col items-center">  
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

            
        </div>

  )
}

export default WaitingForDriver