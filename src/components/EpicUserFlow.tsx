import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getReports, getVitals, searchUser, getPatientAllergies } from '../helpers';
import ReportsModal from "./ui/ReportsModal";
import UserDetailsTable from "./ui/UserDetailsTable";
import VitalsModal from "./ui/VitalsModal";
import AllergiesModal from "./ui/AllergiesModal";

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

const EpicUserFlow: React.FC<SearchPatientProps> = ({
    accessToken
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [vitals, setVitals] = useState<any>(null);
    const [reports, setReports] = useState<any>(null);
    const [allergies, setAllergies] = useState<any>(null);

    const [showVitalsModal, setShowVitalsModal] = useState(false);
    const [showReportsModal, setShowReportsModal] = useState(false);
    const [showAllergiesModal, setShowAllergiesModal] = useState(false);

    const lazy = localStorage.getItem('lazy');

    const onSubmit = async (data: FormData) => {
        setUserDetails(null);
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
        <div className="container overflow-auto">
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
                                {...(lazy ? { value: 'McGinnis' } : {})}
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
                                {...(lazy ? { value: new Date('1952-05-24').toISOString().split('T')[0] } : {})}
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
                    <div className="d-flex flex-row justify-content-around">
                        <button
                            className="mb-3 btn btn-primary"
                            onClick={() => {
                                getVitals(userDetails.patientEpicId, accessToken, setVitals);
                                setShowVitalsModal(true);
                            }}
                        >
                            View Vitals
                        </button>
                        <button
                            className="mb-3 mx-4 btn btn-primary"
                            onClick={() => {
                                getReports(userDetails.patientEpicId, accessToken, setReports);
                                setShowReportsModal(true);
                            }}
                        >
                            View Reports
                        </button>
                        <button
                            className="mb-3 btn btn-primary"
                            onClick={() => {
                                getPatientAllergies(userDetails.patientEpicId, accessToken, setAllergies);
                                setShowAllergiesModal(true);
                            }}
                        >
                            View Allergies
                        </button>
                    </div>
                    {<VitalsModal
                        show={showVitalsModal}
                        onHide={() => setShowVitalsModal(false)}
                        vitals={vitals}
                    />}
                    {<ReportsModal
                        show={showReportsModal}
                        onHide={() => setShowReportsModal(false)}
                        reports={reports}
                    />}
                    {<AllergiesModal
                        show={showAllergiesModal}
                        onHide={() => setShowAllergiesModal(false)}
                        allergies={allergies}
                    />}
                </div>
            )}
        </div>
    );
};

export default EpicUserFlow;