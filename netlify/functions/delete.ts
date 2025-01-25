import { Handler } from '@netlify/functions';
import { data } from './utils/db';

// api/v1/delete?id=anon14
// DELETE
const handler: Handler = async (event) => {
  const id = event.queryStringParameters?.['id'];
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Patient ID is required' }),
    };
  }

  const refreshedData = data.patients.filter(patient => patient.id !== id);

  return {
    statusCode: 200,
    body: JSON.stringify(refreshedData),
  };
};

export { handler };