import './Disruptions.scss'
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { disruptionInterface } from "../../utils/types";
import * as dotenv from 'dotenv'
dotenv.config();

type DisruptionProps = {
    disruptions: disruptionInterface[];
    setDisruptions: React.Dispatch<React.SetStateAction<disruptionInterface[]>>
    mode: string
    setMode: React.Dispatch<React.SetStateAction<string>>
    refresh: boolean
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    specificDisruption: disruptionInterface
    setSpecificDisruption: React.Dispatch<React.SetStateAction<disruptionInterface>>
}

export default function Disruption({disruptions, setDisruptions, mode, setMode, refresh, setRefresh, setSpecificDisruption, specificDisruption}: DisruptionProps): JSX.Element {


    // const API_KEY = process.env.API_KEY
    const APP_KEY = process.env.APP_KEY

    // const API = process.env.APIfares
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
    }, [mode, refresh, APP_KEY])



    





    return (
        <>
            <div className='disruption'>
                <h2 className="disruption__heading">Disruption Data</h2>

                <div className="disruption__drop-down">
                        <select onChange={(e) => setMode(e.target.value)} value={mode} className="dropdown show col-1">
                            <option className="dropdown">none</option>
                            <option className="dropdown-item">tube</option>
                            <option className="dropdown-item">bus</option>

                        </select>
                </div>
                <div className='disruption__elements' role={'toolbar'} aria-label="Toolbar with button groups" >
                    <div className=' ' role="group" aria-label='First group' >

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
                <div className="p-0">

        {specificDisruption.commonName !== "0" && (
            <ul className="">
                <li className="">
                    Name: <b>{specificDisruption.commonName}</b>
                </li>
                <li className="">
                    From: <b>{specificDisruption.fromDate}</b> to To: <b>{specificDisruption.toDate}</b>
                </li>
                <li className="">
                    Description:<b> {specificDisruption.description}</b>
                </li>
                <li className="">
                    Apperance: <b>{specificDisruption.appearance}</b>
                </li>
            </ul>
        )}
        <br />

        <button
            className=""
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
        <button className=""
            onClick={() => setRefresh(true)}
        >
            Refresh
        </button>

    </div>

            </div>
            




        </>
    )
}