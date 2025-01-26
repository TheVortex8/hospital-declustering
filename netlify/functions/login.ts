import { Handler } from '@netlify/functions';
import { fetchData } from './utils/db';

// api/v1/login
// POST
// {
//   "name": "Angie Huels",
//   "birthDate": "19720326"
// }

const handler: Handler = async (event) => {
  const { name, birthDate } = JSON.parse(event.body!);
  
  const year = birthDate.substring(0, 4);
  const month = birthDate.substring(4, 6);
  const date = birthDate.substring(6, 8);

  const data = await fetchData();

  const patient = data.patients.find(patient => 
    patient.name.toLowerCase().trim() === name.toLowerCase().trim() &&
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