export const apiBaseUrl = 'http://localhost:3001/api';

import { Patient, Gender, EntryType } from "./types";

const emptyEntry = {
    id: "",
    description: "",
    type: EntryType.OccupationalHealthcare,
    date: "",
    specialist: "",
    employerName: "",
};

export const emptyPatient: Patient = {
    id: "",
    name: "",
    occupation: "",
    gender: Gender.Other,
    entries: [emptyEntry],
};
