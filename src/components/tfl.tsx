import './tfl.scss'
import { useState, useEffect } from "react";
import axios from "axios";
// import { types } from "util";
import { linesInterface } from "../utils/types";
import Disruption from "./Disruptions/Disruptions";
import * as dotenv from 'dotenv'
import Header from './Header/Header';
import BusTimes from './BusTimes/BusTimes';
import { disruptionInterface } from "../utils/types";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


dotenv.config();



export function Main(): JSX.Element {
    const [specificLine, setSpecificLine] = useState<linesInterface>({
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
    const [allLines, setAllLines] = useState<linesInterface[]>([])
    const [refreshTimes, setRefreshTimes] = useState(false)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [routeNumber, setRouteNumber] = useState<string>("106")
    const [disruptions, setDisruptions] = useState<disruptionInterface[]>([])
    const [mode, setMode] = useState<string>("none")
    const [refresh, setRefresh] = useState(false)
    const [specificDisruption, setSpecificDisruption] = useState<disruptionInterface>({
        $type: "",
        atcoCode: "",
        fromDate: "",
        toDate: "",
        description: "",
        commonName: "0",
        type: "",
        mode: "",
        stationAtcoCode: "",
        appearance: ""
    })
    const API_KEY = process.env.API_KEY
    const APP_KEY = process.env.APP_KEY


    useEffect(() => {
        async function getAllLines() {
            try {
                const response = await axios.get(`https://api.tfl.gov.uk/Line/${routeNumber}/Arrivals?app_id=${APP_KEY}&${API_KEY}`)
                setAllLines(response.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        getAllLines()
    }, [refreshTimes, searchTerm, routeNumber, API_KEY, APP_KEY])


    const filteredRouteLines = routeLine(allLines, searchTerm);

    function routeLine(
        getRoutes: linesInterface[],
        searchTerm: string
    ) {
        const routeSearch = getRoutes.filter(
            (obj) =>
                obj["stationName"].toLowerCase().includes(searchTerm.toLowerCase()) ||
                obj["destinationName"].toLowerCase().includes(searchTerm.toLowerCase()) ||
                obj["towards"].toLowerCase().includes(searchTerm.toLowerCase()) ||
                obj["lineName"].toLowerCase().includes(searchTerm.toLowerCase())
        );

        return routeSearch;
    }

    const sortedRouteLines = filteredRouteLines.sort((a, b) =>
        a.timeToStation > b.timeToStation ? 1 : -1
    );


    return (
        <>
                
                <Header />
                    <BusTimes sortedRouteLines={sortedRouteLines}
                    searchTerm ={searchTerm}
                    specificLine={specificLine} 
                    setSpecificLine={setSpecificLine} 
                    setRefreshTimes={setRefreshTimes} 
                    setSearchTerm={setSearchTerm} 
                    setRouteNumber={setRouteNumber} />
                    <Disruption
                    disruptions={disruptions} 
                    setDisruptions={setDisruptions} 
                    mode={mode} 
                    setMode={setMode} 
                    refresh={refresh}
                    setRefresh={setRefresh}
                    setSpecificDisruption={setSpecificDisruption}
                    specificDisruption={specificDisruption}
                    />
            <BrowserRouter>
            <Routes>
                <Route path="/" 
                />
                <Route path="/Bus-times" 
                />
                <Route path="/Disruptions" />
                
            </Routes>
            </BrowserRouter>
    

            

        
        </>
    )
}