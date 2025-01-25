import * as fs from 'fs';
import * as path from 'path';

const dbFilePath = path.join(__dirname, '../../../../../db.json');
export const data = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
export const saveToDb = (newData) => {
  Object.assign(data, newData);
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  return data;
}
