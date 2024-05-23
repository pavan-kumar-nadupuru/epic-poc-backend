import React from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";

interface ReportsModalProps {
  show: boolean;
  onHide: () => void;
  reports: any;
}

const ReportsModal: React.FC<ReportsModalProps> = ({ show, onHide, reports }) => {
  const renderContent = () => {
    if (reports === null) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      );
    } else if (reports.length === 0) {
      return <Alert variant="info">No Data Found</Alert>;
    } else {
      return (
        <table className="table table-bordered">
          <thead>
            <tr>
              {Object.keys(reports[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map((report: any, index: number) => (
              <tr key={index}>
                {Object.values(report).map((value: any, i: number) => (
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
        <Modal.Title>Reports</Modal.Title>
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

export default ReportsModal;
