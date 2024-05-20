import axios from "axios";

function removeAndRedirect(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('createdAt');
    window.location.href = '/';
}

export const getVitals = async (patientId: string, accessToken: string, setVitals: any) => {
    try {
        setVitals(null);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation?patient=${patientId}&category=vital-signs`,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const vitals = await axios.request(config);
        const formattedVitals = vitals.data.entry.map((vital: any) => {
            const vitalType = vital.resource.code.coding[0].code;

            switch (vitalType) {
                case '5': // Blood pressure
                    return {
                        Type: vital.resource.code.coding[0].display,
                        Date: vital.resource.effectiveDateTime,
                        systolic: vital.resource.component?.[0]?.valueQuantity.value || null,
                        diastolic: vital.resource.component?.[1]?.valueQuantity.value || null,
                        heartRate: null,
                        temperature: null,
                    };
                case '8': // Heart rate
                    return {
                        Type: vital.resource.code.coding[0].display,
                        Date: vital.resource.effectiveDateTime,
                        systolic: null,
                        diastolic: null,
                        heartRate: vital.resource.valueQuantity.value,
                        temperature: null,
                    };
                case '6': // Body temperature
                    return {
                        Type: vital.resource.code.coding[0].display,
                        Date: vital.resource.effectiveDateTime,
                        systolic: null,
                        diastolic: null,
                        heartRate: null,
                        temperature: vital.resource.valueQuantity.value,
                    };
                // Add more cases for other vital types as needed
                default:
                    return {
                        Type: vital.resource.code.coding[0].display,
                        Date: vital.resource.effectiveDateTime,
                        systolic: null,
                        diastolic: null,
                        heartRate: null,
                        temperature: null,
                    };
            }
        });
        setVitals(formattedVitals);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            removeAndRedirect();
          } else {
            console.error('Error retrieving vitals:', error);
          }
    }
};

export const getReports = async (patientId: string, accessToken: string, setReports: any) => {
    try {
        setReports(null);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation?patient=${patientId}&category=laboratory`,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };

        const reports = await axios.request(config);
        console.log(reports.data);

        const formattedReports = reports.data.entry.map((report: any) => {
            return {
                id: report.resource.id,
                status: report.resource.status,
                category: report.resource.category[0].text,
                code: report.resource.code.text,
                effectiveDateTime: report.resource.effectiveDateTime,
                value: report.resource.valueQuantity?.value,
                unit: report.resource.valueQuantity?.unit,
                referenceRange: report.resource.referenceRange[0]?.text,
            };
        });

        setReports(formattedReports);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            removeAndRedirect();
          } else {
            console.error('Error retrieving reports:', error);
          }
    }
};

export const searchUser = async (familyName: string, birthdate: string, accessToken: string) => {
    try {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient?birthdate=${birthdate}&family=${familyName}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
        const patientInfo = await axios.request(config);
        return patientInfo.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            removeAndRedirect();
          } else {
            console.error('Error retrieving patient info:', error);
          }
    }
};

export const getPatientAllergies = async (patientId: string, accessToken: string, setAllergies: any) => {
    try {
        setAllergies(null);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/AllergyIntolerance?patient=${patientId}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };

        const allergies = await axios.request(config);
        console.log(allergies.data);

        const formattedAllergies = allergies.data.entry.map((allergy: any) => {
            return {
                id: allergy.resource.id,
                clinicalStatus: allergy.resource.clinicalStatus.coding[0].display,
                verificationStatus: allergy.resource.verificationStatus.coding[0].display,
                category: allergy.resource.category.join(', '),
                criticality: allergy.resource.criticality,
                code: allergy.resource.code.text,
                onsetPeriod: JSON.stringify(allergy.resource.onsetPeriod),
                reaction: allergy.resource.reaction.map((reaction: any) => reaction.manifestation[0].text).join(', '),
            };
        });

        setAllergies(formattedAllergies);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            removeAndRedirect();
          } else {
            console.error('Error retrieving allergies:', error);
          }
    }
};