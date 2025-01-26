import { Handler } from '@netlify/functions';
import { updateQueue } from './utils/patientService';
import { fetchData } from './utils/db';

// api/v1/insert
// POST
// check types/patient.ts for the expected body
const handler: Handler = async (event) => {
  const patient = JSON.parse(event.body!);
  patient.birthDate = new Date(patient.birthDate);
  patient.arrivalTime = new Date();

  const {patients} = await fetchData();
  const refreshedData = await updateQueue([...patients, patient]);

  return {
    statusCode: 200,
    body: JSON.stringify(refreshedData),
  };
};

export { handler };