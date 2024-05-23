export function formatPatientInfo(patientData: any) {
  return {
    id: patientData.resource?.id,
    name: patientData.resource?.name[0]?.text || "No Name Provided",
    gender: patientData.resource?.gender,
    birthDate: patientData.resource?.birthDate,
    address: patientData.resource?.address[0]?.text || "No Address Provided"
  };
}

export function formatVitals(vital: any) {
  const vitalType = vital.resource?.code?.coding[0]?.code;
  switch (vitalType) {
    case "5": // Blood pressure
      return {
        Type: vital.resource?.code?.coding[0]?.display,
        Date: vital.resource?.effectiveDateTime,
        systolic: vital.resource?.component?.[0]?.valueQuantity?.value || null,
        diastolic: vital.resource?.component?.[1]?.valueQuantity?.value || null,
        heartRate: null,
        temperature: null,
      };
    case "8": // Heart rate
      return {
        Type: vital.resource?.code?.coding[0]?.display,
        Date: vital.resource?.effectiveDateTime,
        heartRate: vital.resource?.valueQuantity?.value,
        temperature: null,
      };
    case "6": // Body temperature
      return {
        Type: vital.resource?.code?.coding[0]?.display,
        Date: vital.resource?.effectiveDateTime,
        temperature: vital.resource?.valueQuantity?.value,
      };
    default:
      return {
        Type: "Unknown",
        Date: vital.resource?.effectiveDateTime,
      };
  }
}

export function formatReports(report: any) {
  return {
    id: report.resource?.id,
    status: report.resource?.status,
    category: report.resource?.category[0]?.text,
    code: report.resource?.code?.text,
    effectiveDateTime: report.resource?.effectiveDateTime,
    value: report.resource?.valueQuantity?.value,
    unit: report.resource?.valueQuantity?.unit,
    referenceRange: report.resource?.referenceRange[0]?.text,
  };
}

export function formatAllergies(allergy: any) {
  return {
    id: allergy.resource?.id,
    clinicalStatus: allergy.resource?.clinicalStatus?.coding[0]?.display,
    verificationStatus: allergy.resource?.verificationStatus?.coding[0]?.display,
    category: allergy.resource?.category?.join(", ") || "Not Specified",
    criticality: allergy.resource?.criticality,
    code: allergy.resource?.code?.text,
    onsetPeriod: JSON.stringify(allergy.resource?.onsetPeriod),
    reaction: allergy.resource?.reaction
      ?.map((r: any) => r.manifestation[0]?.text)
      .join(", ") || "No Reactions",
  };
}

export function formatMedicalHistory(condition: any) {
  return {
    id: condition.resource?.id,
    verificationStatus: condition.resource?.verificationStatus?.text,
    category: condition.resource?.category[0]?.text,
    code: condition.resource?.code?.text,
    subject: condition.resource?.subject?.display,
  };
}
