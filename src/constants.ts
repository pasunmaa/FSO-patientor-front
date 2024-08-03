export const apiBaseUrl = 'http://localhost:3001/api';

import { Patient, Gender } from "./types";

export const emptyPatient: Patient = {
    id: "",
    name: "",
    occupation: "",
    gender: Gender.Other,
};
