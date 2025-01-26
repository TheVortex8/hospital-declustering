import { Handler } from '@netlify/functions';
import { fetchData } from './utils/db';
import { updateQueue } from './utils/patientService';

// api/v1/delete
// DELETE
// 
// {
//   "id": "123"
// }
const handler: Handler = async (event) => {
  const {id} = JSON.parse(event.body!);

  const queue = await fetchData();
  const filtered = queue.patients.filter(p => p.id !== id && p.id != null);
  const refreshedData = await updateQueue(filtered);

  return {
    statusCode: 200,
    body: JSON.stringify(refreshedData),
  };
};

export { handler };