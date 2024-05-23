import axios from "axios";
import {
  formatVitals,
  formatReports,
  formatAllergies,
  formatMedicalHistory,
  formatPatientInfo,
} from "./formatters"; // Import the formatting functions

function removeAndRedirect() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("createdAt");
  window.location.href = "/";
}

function handleError(error: any) {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    removeAndRedirect();
  } else {
    console.error("API Error:", error.response || error.message || error);
  }
}

export const searchUser = async (
  familyName: string,
  birthdate: string,
  accessToken: string
) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient?birthdate=${birthdate}&family=${familyName}`,
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const response = await axios.request(config);
    if (response.data.total === 0) {
      return null; // Handle no patient found
    }
    return formatPatientInfo(response.data.entry[0]);
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const getVitals = async (
  patientId: string,
  accessToken: string,
  setVitals: any
) => {
  try {
    setVitals(null);
    const config = {
      method: "get",
      url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation?patient=${patientId}&category=vital-signs`,
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const vitals = await axios(config);
    setVitals(
      vitals.data.total === 0 ? [] : vitals.data.entry.map(formatVitals)
    );
  } catch (error) {
    handleError(error);
  }
};

export const getReports = async (
  patientId: string,
  accessToken: string,
  setReports: any
) => {
  try {
    setReports(null);
    const config = {
      method: "get",
      url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation?patient=${patientId}&category=laboratory`,
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const reports = await axios(config);
    setReports(
      reports.data.total === 0 ? [] : reports.data.entry.map(formatReports)
    );
  } catch (error) {
    handleError(error);
  }
};

export const getPatientAllergies = async (
  patientId: string,
  accessToken: string,
  setAllergies: any
) => {
  try {
    setAllergies(null);
    const config = {
      method: "get",
      url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/AllergyIntolerance?patient=${patientId}`,
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const allergies = await axios(config);
    setAllergies(
      allergies.data.total === 0
        ? []
        : allergies.data.entry.map(formatAllergies)
    );
  } catch (error) {
    handleError(error);
  }
};

export const getPatientMedicalHistory = async (
  patientId: string,
  accessToken: string,
  setMedicalHistory: any
) => {
  try {
    setMedicalHistory(null);
    const config = {
      method: "get",
      url: `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Condition?category=medical-history&patient=${patientId}`,
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const medicalHistory = await axios(config);
    setMedicalHistory(
      medicalHistory.data.total === 0
        ? []
        : medicalHistory.data.entry.map(formatMedicalHistory)
    );
  } catch (error) {
    handleError(error);
  }
};
