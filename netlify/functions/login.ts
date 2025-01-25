import { Handler } from '@netlify/functions';
import db from './db.json';

// api/v1/login
// POST
// {
//   "id": "anon1",
//   "birthDate": "19660408"
// }

const handler: Handler = async (event) => {
  const { id, birthDate } = JSON.parse(event.body!);
  
  const year = birthDate.substring(0, 4);
  const month = birthDate.substring(4, 6);
  const date = birthDate.substring(6, 8);

  const patient = db.patients.find(patient => 
    patient.id === id &&
    new Date(patient.birthDate).getFullYear() == year &&
    new Date(patient.birthDate).getMonth() + 1 == month &&
    new Date(patient.birthDate).getDate() == date
  );

  if (patient) {
    return {
      statusCode: 200,
      body: JSON.stringify(patient),
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Unauthorized' }),
    };
  }
};

export { handler };