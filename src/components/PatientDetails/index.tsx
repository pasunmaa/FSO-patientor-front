import { useEffect, useState } from 'react';

import { Patient } from "../../types";
import { emptyPatient } from "../../constants";
import { getPatientById } from '../../services/patients';

import { Container, Typography, CircularProgress } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface PatientDetailsProps {
    id: string;
    setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}
  
const PatientDetails = ({ id, setSelectedId }: PatientDetailsProps) => {
  const [patient, setPatient] = useState<Patient>(emptyPatient);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        //console.log('PatientDetails, useEffect: Fetching patient data for ID:', id);
        const patientData = await getPatientById(id);
        setPatient(patientData);
        setSelectedId(id);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id, setSelectedId]);

  if (loading) {
    return <CircularProgress />;
  }

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
      <Typography variant="h3">Patient Details</Typography>
      <Typography variant="h4">{patient.name}</Typography>
      <Typography variant="h6">Gender: {getGenderIcon(patient.gender)}</Typography>
      {patient.ssn && <Typography variant="h6">SSN: {patient.ssn}</Typography>}
      <Typography variant="h6">Occupation: {patient.occupation}</Typography>
    </Container>
  );
};

export default PatientDetails;