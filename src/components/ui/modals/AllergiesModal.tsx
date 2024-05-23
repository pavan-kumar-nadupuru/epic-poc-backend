import React from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";

interface AllergiesModalProps {
    show: boolean;
    onHide: () => void;
    allergies: any;
}

const AllergiesModal: React.FC<AllergiesModalProps> = ({ show, onHide, allergies }) => {
    const renderContent = () => {
        if (allergies === null) {
            return (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            );
        } else if (allergies.length === 0) {
            return <Alert variant="info">No Data Found</Alert>;
        } else {
            return (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            {Object.keys(allergies[0]).map(key => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allergies.map((allergy: any, index: number) => (
                            <tr key={index}>
                                {Object.values(allergy).map((value: any, i: number) => (
                                    <td key={i}>{value || "-"}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Allergies</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '80vh' }} className="overflow-auto">
                {renderContent()}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AllergiesModal;
