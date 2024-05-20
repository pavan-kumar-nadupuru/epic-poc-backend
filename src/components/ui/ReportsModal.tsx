import React from "react";
import { Modal, Button, Spinner, } from "react-bootstrap";

interface ReportsModalProps {
  show: boolean;
  onHide: () => void;
  reports: any;
}

const ReportsModal: React.FC<ReportsModalProps> = ({ show, onHide, reports }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Reports</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '80vh' }} className="overflow-auto">
        {reports ? (<table className="table table-bordered">
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

export default ReportsModal;