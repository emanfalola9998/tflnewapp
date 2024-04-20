import React from 'react'
import "./BusTimes.scss"
import { linesInterface } from "../../utils/types";


type BusTimesProps = {
    specificLine: linesInterface 
    setSpecificLine: React.Dispatch<React.SetStateAction<linesInterface>>
    setRefreshTimes: React.Dispatch<React.SetStateAction<boolean>>
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    setRouteNumber: React.Dispatch<React.SetStateAction<string>>
    searchTerm: string
    sortedRouteLines: linesInterface[]
}


const BusTimes = ({sortedRouteLines, searchTerm, specificLine, setSpecificLine, setRefreshTimes, setSearchTerm, setRouteNumber} : BusTimesProps) => {
    
    
    return (
    <div>
            <div className='bus-times'>
                <h2 className='bus-times__header '>Bus Times </h2>
                <label className='bus-times__label'>Bus Station Name</label>
                <input className="bus-times__input"
                    placeholder="Type in station Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                <label className='bus-times__label'>Bus Number</label>
                <input className="bus-times__input"
                    placeholder="Enter route number"
                    onChange={(e) => {
                        setRouteNumber(e.target.value);
                    }}
                />
                <div className='btn-toolbar' role={'toolbar'} aria-label="Toolbar with button groups">
                    <div className='btn-group mr-2 mt-4' role="group" aria-label='First group' >
                        {sortedRouteLines.slice(0, 5).map((line) => {
                            const timeText = Math.floor(line.timeToStation) <= 60 ? "is due" : `in ${Math.floor(line.timeToStation / 60)} mins`;
                            return (
                                <button
                                    type="button"
                                    className="btn btn-dark mt-4"
                                    onClick={() => setSpecificLine(line)}
                                    key={line.id}
                                >
                                    {line.stationName} to {line.destinationName}  {timeText}
                                </button>
                            );
                        })}
                    </div>
                </div>
                


            {specificLine.id !== "0" && (
                <ul className="">
                    <li className="">
                        ID: <b>{specificLine.id}</b>
                    </li>
                    <li className="">
                        StationName: <b>{specificLine.stationName}</b>
                    </li>
                    <li className="">
                        LineName: <b>{specificLine.lineName}</b>
                    </li>
                    <li className="">
                        DestinationName:<b> {specificLine.destinationName}</b>
                    </li>
                    <li className="">
                        Time to Station: <b>{specificLine.timeToStation}</b>
                    </li>
                    <li className="">

                        Expected Arrival: <b>({specificLine.expectedArrival})</b>
                    </li>
                </ul>
            )}
            <br />
            <button
                className="previous-pastes"
                onClick={() =>
                    setSpecificLine({
                        $type: "",
                        id: "0",
                        operationType: 0,
                        vehicleId: "",
                        naptanId: "",
                        stationName: "",
                        lineId: "",
                        lineName: "",
                        platformName: "",
                        direction: "",
                        bearing: "",
                        destinationNaptanId: "",
                        destinationName: "",
                        timestamp: "",
                        timeToStation: 0,
                        currentLocation: "",
                        towards: "",
                        expectedArrival: "",
                        timeToLive: "",
                        modeName: "",
                        timing: {
                            $type: "",
                            countdownServerAdjustment: "",
                            source: "",
                            insert: "",
                            read: "",
                            sent: "",
                            received: ""
                        }
                    })
                }
            >
                Reset
            </button>
            <button className="previous-pastes"
                onClick={() => setRefreshTimes(true)}
            >
                Refresh
            </button>

          
            </div>
    </div>
  )
}

export default BusTimes
