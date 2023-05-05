
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { disruptionInterface } from "../utils/types";
import * as dotenv from 'dotenv'
dotenv.config();

export default function Disruption(): JSX.Element{
    const [disruptions, setDisruptions] = useState<disruptionInterface[]>([])
    const [mode, setMode] = useState<string>("none") 
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
        async function getDisruptions(){
            try{
                const response = await axios.get(`https://api.tfl.gov.uk/StopPoint/Mode/${mode}/Disruption?app_id=${APP_KEY}&app_key=587856dbb7ae4388b5bde2edb573fedd`)
                setDisruptions(response.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        getDisruptions()
    }, [mode])

    
    
    

        

        

    return (
        <>
        <hr></hr>
            <select onChange={(e) => setMode(e.target.value)} value={mode}>
                    <option>none</option>
                    <option>tube</option>
                    <option>bus</option>
            </select>

            {mode !== "none" && disruptions.slice(0, 3).map((line) => {
            return (
                <button
                type="button"
                className="add-paste-buttons"
                onClick={() => setSpecificDisruption(line)}
                key={line.atcoCode}
                >
                {line.commonName}
                </button>
            );
            })}

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
        
        </>
    )
}