import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Accordion, Card, Button } from 'react-bootstrap';
import { searchUser, getReports, getVitals } from '../helpers'
import ReportsAccordion from "./ui/ReportsAccordion";
import VitalsAccordion from "./ui/VitalsAccordion";
import UserDetailsTable from "./ui/UserDetailsTable";

interface FormData {
    familyName: string;
    birthdate: string;
}

interface SearchPatientProps {
    accessToken: string;
}

interface UserDetails {
    name: string;
    gender: string;
    birthDate: string;
    patientEpicId: string;
}

// const getVitals = async (patientId: string, accessToken: string, setVitals: any) => {
//     let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation?patient=${patientId}&category=vital-signs`,
//         headers: {
//             'Authorization': `Bearer ${accessToken}`,
//         }
//     };
//     const vitals = await axios.request(config);
//     const formattedVitals = vitals.data.entry.map((vital: any) => {
//         const vitalType = vital.resource.code.coding[0].code;

//         switch (vitalType) {
//             case '5': // Blood pressure
//                 return {
//                     Type: vital.resource.code.coding[0].display,
//                     Date: vital.resource.effectiveDateTime,
//                     systolic: vital.resource.component?.[0]?.valueQuantity.value || null,
//                     diastolic: vital.resource.component?.[1]?.valueQuantity.value || null,
//                     heartRate: null,
//                     temperature: null,
//                 };
//             case '8': // Heart rate
//                 return {
//                     Type: vital.resource.code.coding[0].display,
//                     Date: vital.resource.effectiveDateTime,
//                     systolic: null,
//                     diastolic: null,
//                     heartRate: vital.resource.valueQuantity.value,
//                     temperature: null,
//                 };
//             case '6': // Body temperature
//                 return {
//                     Type: vital.resource.code.coding[0].display,
//                     Date: vital.resource.effectiveDateTime,
//                     systolic: null,
//                     diastolic: null,
//                     heartRate: null,
//                     temperature: vital.resource.valueQuantity.value,
//                 };
//             // Add more cases for other vital types as needed
//             default:
//                 return {
//                     Type: vital.resource.code.coding[0].display,
//                     Date: vital.resource.effectiveDateTime,
//                     systolic: null,
//                     diastolic: null,
//                     heartRate: null,
//                     temperature: null,
//                 };
//         }
//     });
//     setVitals(formattedVitals);
//     return vitals.data;
// }

// const getReports = async (patientId: string, accessToken: string, setReports: any) => {
//     let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation?patient=${patientId}&category=laboratory`,
//         headers: {
//             'Authorization': `Bearer ${accessToken}`,
//         }
//     };

//     const reports = await axios.request(config);
//     console.log(reports.data);

//     const formattedReports = reports.data.entry.map((report: any) => {
//         return {
//             id: report.resource.id,
//             status: report.resource.status,
//             category: report.resource.category[0].text,
//             code: report.resource.code.text,
//             effectiveDateTime: report.resource.effectiveDateTime,
//             value: report.resource.valueQuantity?.value,
//             unit: report.resource.valueQuantity?.unit,
//             referenceRange: report.resource.referenceRange[0]?.text,
//         };
//     });

//     setReports(formattedReports);
//     return formattedReports;
// };

// const searchUser = async (familyName: string, birthdate: string, accessToken: string) => {

//     let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient?birthdate=${birthdate}&family=${familyName}`,
//         headers: {
//             'Authorization': `Bearer ${accessToken}`
//         }
//     };
//     const patientInfo = await axios.request(config);
//     return patientInfo.data;
// }

const SearchPatient: React.FC<SearchPatientProps> = ({
    accessToken
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [userDetails, setUserDetails] = React.useState<UserDetails | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [vitals, setVitals] = React.useState<any>(null);
    const [reports, setReports] = React.useState<any>(null);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const { familyName, birthdate } = data;
            const patient = await searchUser(familyName, birthdate, accessToken);
            const name = patient.entry[0].resource.name[0].text;
            const gender = patient.entry[0].resource.gender;
            const birthDate = patient.entry[0].resource.birthDate;
            const patientEpicId = patient.entry[0].resource.id;
            setUserDetails({
                name,
                gender,
                birthDate,
                patientEpicId
            })
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-search-container container overflow-auto">
            <h2 className="mb-4">User Search</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="search-form">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className={`form-control ${errors.familyName ? "is-invalid" : ""}`}
                                id="familyName"
                                placeholder="Last Name (McGinnis)"
                                {...register("familyName", { required: true })}
                            />
                            <label htmlFor="familyName">Last (Family) Name</label>
                            {errors.familyName && <div className="invalid-feedback">Family Name is required</div>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input
                                type="date"
                                className={`form-control ${errors.birthdate ? "is-invalid" : ""}`}
                                id="birthdate"
                                placeholder="Birthdate"
                                {...register("birthdate", { required: true })}
                            />
                            <label htmlFor="birthdate">Birthdate (1952-05-24)</label>
                            {errors.birthdate && <div className="invalid-feedback">Birthdate is required</div>}
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block w-100">
                    Search
                </button>
            </form>
            {loading && (
                <div className="d-flex justify-content-center mt-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                </div>
            )}
            {userDetails && (
                <div className="user-details-table mt-4">
                    <UserDetailsTable userDetails={userDetails} />
                    <button className="mb-3 btn btn-primary" onClick={() => {
                        getVitals(userDetails.patientEpicId, accessToken, setVitals);
                        getReports(userDetails.patientEpicId, accessToken, setReports);
                    }}>Get patient vitals</button>
                    {vitals && <VitalsAccordion vitals={vitals} />}
                    {reports && <ReportsAccordion reports={reports} />}
                </div>
            )}
        </div>
    );
};

export default SearchPatient;