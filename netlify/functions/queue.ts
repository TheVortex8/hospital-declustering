import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  const sort = event?.queryStringParameters['sort'];

  return {
    statusCode: 200,
    body: JSON.stringify({ message: sort }),
  };
};

export { handler };