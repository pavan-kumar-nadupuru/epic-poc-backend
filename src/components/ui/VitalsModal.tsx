import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

interface VitalsModalProps {
  show: boolean;
  onHide: () => void;
  vitals: any;
}

const VitalsModal: React.FC<VitalsModalProps> = ({ show, onHide, vitals }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Vitals</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '80vh' }} className="overflow-auto">
        {vitals ? (
          <table className="table table-bordered overflow-auto">
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
                    <td key={i}>{value || "-"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
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

export default VitalsModal;