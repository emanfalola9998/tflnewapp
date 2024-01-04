
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { disruptionInterface } from "../utils/types";
import * as dotenv from 'dotenv'
dotenv.config();

export default function Disruption(): JSX.Element {
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

    const API = process.env.APIfares
    useEffect(() => {
        async function getDisruptions() {
            try {
                const response = await axios.get(`https://api.tfl.gov.uk/StopPoint/Mode/${mode}/Disruption?app_id=${APP_KEY}&app_key=587856dbb7ae4388b5bde2edb573fedd`)
                setDisruptions(response.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        getDisruptions()
    }, [mode, refresh])









    return (
        <>
            <hr></hr>
            <h2 className="  mt-n4">Disruption Data</h2>

            <div className=" container ">
                <div className="row">

                    <select onChange={(e) => setMode(e.target.value)} value={mode} className="dropdown show col-1">
                        <option className="dropdown-item">none</option>
                        <option className="dropdown-item">tube</option>
                        <option className="dropdown-item">bus</option>

                    </select>
                    <div className='btn-toolbar' role={'toolbar'} aria-label="Toolbar with button groups col-1 p-8">
                        <div className='btn-group col-1 ' role="group" aria-label='First group' >

                            {mode !== "none" && disruptions.slice(0, 3).map((line) => {
                                return (
                                    <button
                                        type="button"
                                        className="btn btn-dark"
                                        onClick={() => setSpecificDisruption(line)}
                                        key={line.atcoCode}
                                    >
                                        {line.commonName}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div>

                    {specificDisruption.commonName !== "0" && (
                        <ul className="list-group">
                            <li className="list-group-item">
                                Name: <b>{specificDisruption.commonName}</b>
                            </li>
                            <li className="list-group-item">
                                From: <b>{specificDisruption.fromDate}</b> to To: <b>{specificDisruption.toDate}</b>
                            </li>
                            <li className="list-group-item">
                                Description:<b> {specificDisruption.description}</b>
                            </li>
                            <li className="list-group-item">
                                Apperance: <b>{specificDisruption.appearance}</b>
                            </li>
                        </ul>
                    )}
                    <br />

                    <button
                        className="previous-pastes"
                        onClick={() =>
                            setSpecificDisruption({
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


                        }
                    >
                        Reset
                    </button>
                    <button className="previous-pastes"
                        onClick={() => setRefresh(true)}
                    >
                        Refresh
                    </button>

                </div>

            </div>


        </>
    )
}