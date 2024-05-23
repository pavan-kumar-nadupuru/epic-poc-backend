import React from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";

interface VitalsModalProps {
  show: boolean;
  onHide: () => void;
  vitals: any;
}

const VitalsModal: React.FC<VitalsModalProps> = ({ show, onHide, vitals }) => {
  const renderContent = () => {
    if (vitals === null) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      );
    } else if (vitals.length === 0) {
      return <Alert variant="info">No Data Found</Alert>;
    } else {
      return (
        <table className="table table-bordered">
          <thead>
            <tr>
              {Object.keys(vitals[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vitals.map((vital: any, index: number) => (
              <tr key={index}>
                {Object.values(vital).map((value: any, i: number) => (
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
        <Modal.Title>Vitals</Modal.Title>
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

export default VitalsModal;
