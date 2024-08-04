export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

// Define special omit for unions
// https://github.com/microsoft/TypeScript/issues/42680
type UnionOmit<T, K extends string | number | symbol > = T extends unknown ? Omit<T, K> : never;

export type NonSensitivePatientEntry = UnionOmit<Patient, 'ssn'>;

export type NewPatientEntry = UnionOmit<Patient, 'id'>;

export enum EntryType {
    Hospital = 'Hospital',
    OccupationalHealthcare = 'OccupationalHealthcare',
    HealthCheck = 'HealthCheck',
}

interface BaseEntry {
    id: string;
    description: string;
    type: EntryType;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

// HospitalEntry definition
interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    //type: "Hospital";
    discharge: Discharge;
}

// OccupationalHealthcareEntry definition
interface SickLeave {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    //type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

// HealthCheckEntry definition
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    //type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
