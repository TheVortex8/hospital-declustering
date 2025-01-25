import { Handler } from '@netlify/functions';
import db from './db.json';

// api/v1/queue
// GET
const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(db),
  };
};

export { handler };