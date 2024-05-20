import axios from "axios";
import { useEffect, useState } from "react";



interface GetVitalsProps {
    vitals: any;
}

const getVitals = async (patientId: string, accessToken: string) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation?patient=${patientId}&category=vital-signs`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    };
    const vitals = await axios.request(config);
    return vitals.data;
}


const GetVitals: React.FC<GetVitalsProps> = ({
    vitals
}) => {
    const formattedVitals = vitals.entry.map((vital: any) => {
        // Figure out what kind of vital this is
        const vitalType = vital.resource.code.coding[0].display;
        return {
            vitalType
        }
    });
    return (
        <div>
            <h2>Vitals</h2>
            {JSON.stringify(formattedVitals)}
        </div>
    );
}


export default GetVitals;