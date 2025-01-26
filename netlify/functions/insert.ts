import { Handler } from '@netlify/functions';
import { addPatientToQueue } from './utils/db';

// api/v1/insert
// POST
// check types/patient.ts for the expected body
const handler: Handler = async (event) => {
  const patient = parseWithDates(event.body!);
  const refreshedData = addPatientToQueue(patient);

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