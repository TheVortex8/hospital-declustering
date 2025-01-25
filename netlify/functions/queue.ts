import { Handler } from '@netlify/functions';
import { getQueue } from './mchacks-routes';

const handler: Handler = async (event) => {
  const sort = event?.queryStringParameters?.['sort'] ||  'arrival_time';

  return {
    statusCode: 200,
    body: JSON.stringify({ message: getQueue(sort) }),
  };
};

export { handler };