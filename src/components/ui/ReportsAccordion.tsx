// ReportsAccordion.tsx
import React from "react";
import { Accordion, Card } from "react-bootstrap";

interface ReportsAccordionProps {
    reports: any;
}

const ReportsAccordion: React.FC<ReportsAccordionProps> = ({ reports }) => {
    return (
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
    );
};

export default ReportsAccordion;