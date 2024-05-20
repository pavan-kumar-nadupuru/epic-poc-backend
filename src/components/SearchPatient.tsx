import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import GetVitals from "./GetVitals";
import { Accordion, Card, Button } from 'react-bootstrap';

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

interface GetVitalsProps {
    patientId: string;
    accessToken: string;
}

const getVitals = async (patientId: string, accessToken: string, setVitals: any) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation?patient=${patientId}&category=vital-signs`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    };
    const vitals = await axios.request(config);
    const formattedVitals = vitals.data.entry.map((vital: any) => {
        const vitalType = vital.resource.code.coding[0].code;

        switch (vitalType) {
            case '5': // Blood pressure
                return {
                    Type: vital.resource.code.coding[0].display,
                    Date: vital.resource.effectiveDateTime,
                    systolic: vital.resource.component?.[0]?.valueQuantity.value || null,
                    diastolic: vital.resource.component?.[1]?.valueQuantity.value || null,
                    heartRate: null,
                    temperature: null,
                };
            case '8': // Heart rate
                return {
                    Type: vital.resource.code.coding[0].display,
                    Date: vital.resource.effectiveDateTime,
                    systolic: null,
                    diastolic: null,
                    heartRate: vital.resource.valueQuantity.value,
                    temperature: null,
                };
            case '6': // Body temperature
                return {
                    Type: vital.resource.code.coding[0].display,
                    Date: vital.resource.effectiveDateTime,
                    systolic: null,
                    diastolic: null,
                    heartRate: null,
                    temperature: vital.resource.valueQuantity.value,
                };
            // Add more cases for other vital types as needed
            default:
                return {
                    Type: vital.resource.code.coding[0].display,
                    Date: vital.resource.effectiveDateTime,
                    systolic: null,
                    diastolic: null,
                    heartRate: null,
                    temperature: null,
                };
        }
    });
    setVitals(formattedVitals);
    return vitals.data;
}

const getReports = async (patientId: string, accessToken: string, setReports: any) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation?patient=${patientId}&category=laboratory`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    };

    const reports = await axios.request(config);
    console.log(reports.data);

    const formattedReports = reports.data.entry.map((report: any) => {
        return {
            id: report.resource.id,
            status: report.resource.status,
            category: report.resource.category[0].text,
            code: report.resource.code.text,
            effectiveDateTime: report.resource.effectiveDateTime,
            value: report.resource.valueQuantity?.value,
            unit: report.resource.valueQuantity?.unit,
            referenceRange: report.resource.referenceRange[0]?.text,
        };
    });

    setReports(formattedReports);
    return formattedReports;
};

const searchUser = async (familyName: string, birthdate: string, accessToken: string) => {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient?birthdate=${birthdate}&family=${familyName}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };
    const patientInfo = await axios.request(config);
    return patientInfo.data;
}

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
                    {/* Render the user details table based on the userDetails state */}
                    <table className="table table-bordered">
                        <thead>

                        </thead>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{userDetails?.name}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{userDetails?.gender}</td>
                            </tr>
                            <tr>
                                <td>Birth Date</td>
                                <td>{userDetails?.birthDate}</td>
                            </tr>
                            <tr>
                                <td>Patient Epic ID</td>
                                <td>{userDetails?.patientEpicId}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="d-flex flex-row justify-content-between">
                        <button className="mb-3 btn btn-primary" onClick={() => {
                            getVitals(userDetails.patientEpicId, accessToken, setVitals);
                            getReports(userDetails.patientEpicId, accessToken, setReports);
                        }}>Get patient vitals</button>
                        {/* <button className="mb-3 btn btn-primary" onClick={() => getVitals(userDetails.patientEpicId, accessToken, setVitals)}>Get patient vitals</button> */}
                        {/* <button className="mb-3 btn btn-primary" onClick={() => getVitals(userDetails.patientEpicId, accessToken, setVitals)}>Get patient vitals</button> */}
                    </div>
                    {vitals && (
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Header style={{
                                    backgroundColor: 'none',
                                    fontSize: '1rem'
                                }}>Show Vitals &gt;</Accordion.Header>
                                <Accordion.Body>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                {Object.keys(vitals[0]).map((key) => (
                                                    <th key={key} scope="col">
                                                        {key}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vitals.map((vital: any, index: number) => (
                                                <tr key={index}>
                                                    {Object.values(vital).map((value: any, i) => (
                                                        <td key={i}>{value || '-'}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Accordion.Body>
                            </Card>
                        </Accordion>
                    )}
                    {reports && (
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Header style={{
                                    backgroundColor: 'none',
                                    fontSize: '1rem'
                                }}>Show Reports &gt;</Accordion.Header>
                                <Accordion.Body>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                {Object.keys(reports[0]).map((key) => (
                                                    <th key={key} scope="col">
                                                        {key}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reports.map((report: any, index: number) => (
                                                <tr key={index}>
                                                    {Object.values(report).map((value: any, i) => (
                                                        <td key={i}>{value || '-'}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Accordion.Body>
                            </Card>
                        </Accordion>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchPatient;