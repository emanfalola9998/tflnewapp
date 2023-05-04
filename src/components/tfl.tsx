import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { types } from "util";
import { linesInterface } from "../utils/types";

export function Main(): JSX.Element{
    const [line, setSpecificLine] = useState<linesInterface>({
            $type: "",
            id: "",
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
    
    useEffect(() => {
        async function getAllLines(){
            try{
                const response = await axios.get("https://api.tfl.gov.uk/Line/64/Arrivals?app_id=289effd732914b13af2cee66a3876905&app_key=587856dbb7ae4388b5bde2edb573fedd")
                setAllLines(response.data)
            }
            catch (error){
                console.error(error)
            }
        }
        getAllLines()
    },[refreshTimes,searchTerm])
    // !== 0 &&

    
    


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
    a.stationName.toLowerCase() > b.stationName.toLowerCase() ? 1 : -1
    );
    // const sortedRouteLines = filteredRouteLines.sort((a, b) =>
    // a.last_name.toLowerCase() > b.last_name.toLowerCase() ? 1 : -1
    // );




    return(
        <>
            <h1>Bus Lines</h1>
            {allLines.map((line) => (
                <button
                type="button"
                className="btn btn-primary"
                onClick={() => setSpecificLine(line)}
                key={line.id}
            >
                {line.stationName}
                </button>
            ))}
            {allLines.map((line) => (
                <div key={line.id}>
                {line.stationName}
                {line.destinationName}
                {line.timeToStation}
                </div>))}
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
                Displaying {filteredRouteLines.length} out of {allLines.length}
            </div>
            {sortedRouteLines.map((line) => (
                <button
                type="button"
                className="btn btn-primary"
                onClick={() => setSpecificLine(line)}
                key={line.id}
            >
                {line.stationName}
                {line.lineName}
                {line.destinationName}
                {line.timeToStation}
                </button>
            ))}
        </>

    )
}