import { useEffect, useState } from 'react';

import { Patient, Entry, Diagnosis } from "../../types";
import { emptyPatient } from "../../constants";
import { getPatientById } from '../../services/patients';
import diagnoseService from "../../services/diagnoses";

import { Container, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface PatientDetailsProps {
    id: string;
    setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}
const PatientDetails = ({ id, setSelectedId }: PatientDetailsProps) => {
  const [patient, setPatient] = useState<Patient>(emptyPatient);
  const [diagnoses, setDiagnoses] = useState<Array<Diagnosis>>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        //console.log('PatientDetails, useEffect: Fetching patient data for ID:', id);
        const patientData = await getPatientById(id);
        //console.log(patientData);
        setPatient(patientData);
        setSelectedId(id);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    fetchPatient();

    const fetchDiagnosesList = async () => {
      try {
        const diagnosesData = await diagnoseService.getAll();
        setDiagnoses(diagnosesData);
      } catch (error) {
        console.error('Failed to fetch diagnoses:', error);
      }
    };
    void fetchDiagnosesList();

  }, [id, setSelectedId]);

  const getDiagnosisNameByCode = (code: string): string => {
    const diagnosis = diagnoses.find((diagnosis) => diagnosis.code === code);
    return diagnosis ? diagnosis.name : "";
  };

  if (id === "") {
    return <Typography variant="h6">Patient not found</Typography>;
  }

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  return (
    <Container>
      <br />
      <Typography variant="h4">{patient.name} {getGenderIcon(patient.gender)}</Typography>
      <br />
      {patient.ssn && <Typography variant="body1">SSN: {patient.ssn}</Typography>}
      <Typography variant="body1">Occupation: {patient.occupation}</Typography>
      <br />
      <Typography variant="h6">Entries:</Typography>
      <br />
      {patient.entries.map((entry: Entry) => (
        <div key={entry.id}>
          <Typography variant="body1">{entry.date}: {entry.description}</Typography>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code: string) => (
                <li key={code}>{code} {getDiagnosisNameByCode(code)}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </Container>
  );
};

export default PatientDetails;