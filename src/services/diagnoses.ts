import axios from 'axios';
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  try {
    const { data } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`);
    return data;
  } catch (error) {
    console.error('Error fetching diagnoses:', error);
    throw error;
  }
};

export default {
    getAll
};