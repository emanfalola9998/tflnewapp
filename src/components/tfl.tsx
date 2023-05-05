import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { types } from "util";
import { linesInterface } from "../utils/types";
import Disruption  from "./Disruptions";
import * as dotenv from 'dotenv'
dotenv.config();


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
    const API_KEY = process.env.API_KEY
    const APP_KEY = process.env.APP_KEY


    useEffect(() => {
        async function getAllLines(){
            try{
                const response = await axios.get(`https://api.tfl.gov.uk/Line/${routeNumber}/Arrivals?app_id=${APP_KEY}&${API_KEY}`)
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
    getRoutes: linesInterface[],
    searchTerm: string
    ) {
    const routeSearch = getRoutes.filter(
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
            <h1 className="title">Bus Lines</h1>
            <h2>Bus Times </h2>
            
            <br />
            <div>
                <input className="input-title"
                placeholder="Type in station Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                
            </div>
            <div>
            <input
                className="input-title"
                placeholder="Please enter desired route number"
                onChange={(e) => {
                    setRouteNumber(e.target.value);
                }}
                />
                <br></br>
                Displaying {filteredRouteLines.length} out of {allLines.length}
            </div>
            {sortedRouteLines.slice(0, 5).map((line) => {
            const timeText = Math.floor(line.timeToStation) <= 60 ? "is due" : `in ${Math.floor(line.timeToStation/60)} mins`;
            return (
                <button
                
                type="button"
                className="add-paste-buttons"
                onClick={() => setSpecificLine(line)}
                key={line.id}
                >
                {line.stationName} to {line.destinationName}  {timeText}
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
                    className="previous-pastes"
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
                <button className="previous-pastes" 
                onClick={() => setRefreshTimes(true)}
                >
                    Refresh
                </button>
                <Disruption />
        </>

    )
}