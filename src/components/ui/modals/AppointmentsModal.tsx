import React from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";

interface AppointmentsModalProps {
  show: boolean;
  onHide: () => void;
  appointments: any;
}

const AppointmentsModal: React.FC<AppointmentsModalProps> = ({ show, onHide, appointments }) => {
  const renderContent = () => {
    if (appointments === null) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      );
    } else if (appointments.length === 0) {
      return <Alert variant="info">No Data Found</Alert>;
    } else {
      return (
        <table className="table table-bordered">
          <thead>
            <tr>
              {Object.keys(appointments[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment: any, index: number) => (
              <tr key={index}>
                {Object.values(appointment).map((value: any, i: number) => (
                  <td key={i}>{typeof value == 'string' ? value : JSON.stringify(value) || "-"}</td>
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
        <Modal.Title>Appointments</Modal.Title>
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

export default AppointmentsModal;
