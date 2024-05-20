import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

interface AllergiesModalProps {
    show: boolean;
    onHide: () => void;
    allergies: any;
}

const AllergiesModal: React.FC<AllergiesModalProps> = ({ show, onHide, allergies }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Allergies</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '400px' }} className="overflow-auto">
                {allergies ? (<table className="table table-bordered">
                    <thead>
                        <tr>
                            {Object.keys(allergies[0]).map((key) => (
                                <th key={key} scope="col">
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allergies.map((allergy: any, index: number) => (
                            <tr key={index}>
                                {Object.values(allergy).map((value: any, i) => (
                                    <td key={i}>{value || "-"}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                        <Spinner animation="border" variant="primary" />
                    </div>
                )}
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