import { Handler } from '@netlify/functions';
import { generateMockPatients } from './utils/patientService';
import { data } from './utils/db';

// api/v1/get?generate=true
// GET
const handler: Handler = async (event) => {
  const generate = event.queryStringParameters?.['generate'] ?? false;
  return {
    statusCode: 200,
    body: generate ? JSON.stringify(generateMockPatients(20)): JSON.stringify(data),
  };
};

export { handler };