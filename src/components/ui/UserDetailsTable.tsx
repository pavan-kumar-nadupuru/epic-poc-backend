// UserDetailsTable.tsx
import React from "react";

interface UserDetails {
    name: string;
    gender: string;
    birthDate: string;
    patientEpicId: string;
}

interface UserDetailsTableProps {
    userDetails: UserDetails;
}

const UserDetailsTable: React.FC<UserDetailsTableProps> = ({ userDetails }) => {
    return (
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
    );
};

export default UserDetailsTable;