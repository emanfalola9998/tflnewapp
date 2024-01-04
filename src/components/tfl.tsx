import '../App.css';
import tflpng from '../images/tflpng.png'
import { useState, useEffect } from "react";
import axios from "axios";
import { types } from "util";
import { linesInterface } from "../utils/types";
import Disruption from "./Disruptions";
import * as dotenv from 'dotenv'
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
    }, [refreshTimes, searchTerm, routeNumber])


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
            <section className="gradient-background">
                <div className="container col-xxl-8  ">
                    <div className="row flex-lg-row-reverse align-items-center g-5 ">
                        <div className="col-10 col-sm-8 col-lg-6">
                            <div>
                                <img src={tflpng} className="d-block mx-lg-auto img-fluid mt-4" alt="Bootstrap Themes" height="200"
                                    loading="lazy" />
                            </div>
                        </div>
                    </div>
                    <h1 className="display-2 fw-bold text-body-emphasis lh-1  mt-n4 ">Bus Lines</h1>

                    <br />

                </div>
            </section>

            {/* <div> */}
            {/* <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <input className="input-group-text"
                            placeholder="Please enter desired route number"
                            onChange={(e) => {
                                setRouteNumber(e.target.value);
                            }}
                        />
                    </div>
                </div> */}
            {/* <br></br> */}
            {/* Displaying {filteredRouteLines.length} out of {allLines.length} */}
            {/* </div> */}
            <div className='container mt-5'>
                <h2 className='display-8 '>Bus Times </h2>
                <div className='input-group mb-3'>
                    <div className='input-group-prepend '>
                        <input className="input-group-text"
                            placeholder="Type in station Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <input className="input-group-text"
                            placeholder="Enter route number"
                            onChange={(e) => {
                                setRouteNumber(e.target.value);
                            }}
                        />

                        <div className='btn-toolbar' role={'toolbar'} aria-label="Toolbar with button groups">
                            <div className='btn-group mr-2' role="group" aria-label='First group' >
                                {sortedRouteLines.slice(0, 5).map((line) => {
                                    const timeText = Math.floor(line.timeToStation) <= 60 ? "is due" : `in ${Math.floor(line.timeToStation / 60)} mins`;
                                    return (
                                        <button
                                            type="button"
                                            className="btn btn-dark"
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
            <Disruption />
                </div>


            </div>




        </>

    )
}