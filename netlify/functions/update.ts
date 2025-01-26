import { Handler } from '@netlify/functions';
import { updateQueue } from './utils/patientService';
import { fetchData } from './utils/db';

// api/v1/update
// POST
// check types/patient.ts for the expected body
const handler: Handler = async (event) => {
  const patientToUpdate = parseWithDates(event.body!);
  const data = await fetchData();
  const patientIndex = data.patients.findIndex(patient => patient.id === patientToUpdate.id);

  if (patientIndex === -1) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Patient not found' }),
    };
  }

  data.patients = data.patients.map(patient => {
    if (patient.id === patientToUpdate.id) {
      return patientToUpdate;
    }
    return patient;
  })

  const refreshedData = updateQueue(data.patients);

  return {
    statusCode: 200,
    body: JSON.stringify(refreshedData),
  };
};

export { handler };

function parseWithDates(jsonString) {
  return JSON.parse(jsonString, (key, value) => {
    // Check if the value looks like a date string
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
      return new Date(value); // Convert to Date object
    }
    return value; // Otherwise, return the value as is
  });
}