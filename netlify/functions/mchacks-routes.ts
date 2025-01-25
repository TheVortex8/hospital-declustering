import { Patient } from "../../types/patient";

const baseRoute = "https://ifem-award-mchacks-2025.onrender.com/api/v1";

export async function getQueue(sort): Promise<Patient[]> {
  const route = `${baseRoute}/queue?sort=${sort}`;

  const response = await fetch(route);
  return await response.json();
}