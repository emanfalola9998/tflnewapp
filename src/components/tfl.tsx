import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { types } from "util";
import { linesInterface } from "../utils/types";

export function Main(): JSX.Element{
    const [specificLine, setSpecificLine] = useState<linesInterface>({
            $type: "",
            id: "0",
            operationType:0,
            vehicleId:"",
            naptanId: "",
            stationName: "",
            lineId:"",
            lineName:"",
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
    const [allLines, setAllLines] = useState<linesInterface[]>([])
    const [refreshTimes, setRefreshTimes] = useState(false)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [routeNumber, setRouteNumber] = useState<string>("106")
    
    useEffect(() => {
        async function getAllLines(){
            try{
                const response = await axios.get(`https://api.tfl.gov.uk/Line/${routeNumber}/Arrivals?app_id=289effd732914b13af2cee66a3876905&app_key=587856dbb7ae4388b5bde2edb573fedd`)
                setAllLines(response.data)
            }
            catch (error){
                console.error(error)
            }
        }
        getAllLines()
    },[refreshTimes,searchTerm, routeNumber])   


    const filteredRouteLines = routeLine(allLines, searchTerm);

    function routeLine(
    getPlayers: linesInterface[],
    searchTerm: string
    ) {
    const routeSearch = getPlayers.filter(
        (obj) =>
        obj["stationName"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj["destinationName"].toLowerCase().includes(searchTerm.toLowerCase())||
        obj["towards"].toLowerCase().includes(searchTerm.toLowerCase())||
        obj["lineName"].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return routeSearch;
    }

    const sortedRouteLines = filteredRouteLines.sort((a, b) =>
    a.timeToStation > b.timeToStation ? 1 : -1
    );


    return(
        <>
            <h1>Bus Lines</h1>
            <button
            onClick={() => setRefreshTimes(true)}
            >
                Refresh
            </button>
            
            <br />
            <div>
                <input
                placeholder="Type in station Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                
            </div>
            <div>
            <input
                placeholder="Please enter desired route number"
                onChange={(e) => {
                    setRouteNumber(e.target.value);
                }}
                />
                Displaying {filteredRouteLines.length} out of {allLines.length}
            </div>
            {sortedRouteLines.slice(0, 5).map((line) => {
            const timeText = Math.floor(line.timeToStation) <= 60 ? "due" : `${Math.floor(line.timeToStation/60)} mins`;
            return (
                <button
                type="button"
                className="btn btn-primary"
                onClick={() => setSpecificLine(line)}
                key={line.id}
                >
                {line.stationName} to {line.destinationName} in {timeText}
                </button>
            );
            })}



            {specificLine.id !== "0" && (
                    <ul className="list-group">
                    <li className="list-group-item">
                        ID: <b>{specificLine.id}</b>
                    </li>
                    <li className="list-group-item">
                        StationName: <b>{specificLine.stationName}</b>
                    </li>
                    <li className="list-group-item">
                        LineName: <b>{specificLine.lineName}</b>
                    </li>
                    <li className="list-group-item">
                        DestinationName:<b> {specificLine.destinationName}</b>
                    </li>
                    <li className="list-group-item">
                        Time to Station: <b>{specificLine.timeToStation}</b>
                    </li>
                    <li className="list-group-item">

                        Expected Arrival: <b>({specificLine.expectedArrival})</b>
                    </li>
                    </ul>
                )}
                <br />
                <button
                    onClick={() =>
                        setSpecificLine({
                            $type: "",
                            id: "0",
                            operationType:0,
                            vehicleId:"",
                            naptanId: "",
                            stationName: "",
                            lineId:"",
                            lineName:"",
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
        </>

    )
}