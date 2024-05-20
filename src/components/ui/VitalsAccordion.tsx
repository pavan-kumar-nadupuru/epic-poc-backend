// VitalsAccordion.tsx
import React from "react";
import { Accordion, Card } from "react-bootstrap";

interface VitalsAccordionProps {
    vitals: any;
}

const VitalsAccordion: React.FC<VitalsAccordionProps> = ({ vitals }) => {
    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Header style={{
                    backgroundColor: 'none',
                    fontSize: '1rem'
                }}>Show Vitals &gt;</Accordion.Header>
                <Accordion.Body>
                    <table className="table table-bordered">
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

export default VitalsAccordion;