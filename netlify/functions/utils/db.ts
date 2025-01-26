import { MongoClient } from 'mongodb';
import { PatientsQueue } from '../../../types/patient';

// Replace with your MongoDB connection URI
const uri = process.env.MONGODB_URI!;

export async function fetchData(): Promise<PatientsQueue> {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("hospital");
    const collection = database.collection("queue");

    // Fetch all documents
    const [q] = await collection.find().toArray();
    
    const queue = q as unknown as PatientsQueue;
    queue.patients = queue.patients.map(p => {
      p.arrivalTime = new Date(p.arrivalTime);
      p.birthDate = new Date(p.birthDate);
      return p;
    });

    return queue;

  } finally {
    await client.close();
  }
}

export async function updateDb(queue: PatientsQueue): Promise<void> {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("hospital");
    const collection = database.collection("queue");

    await collection.replaceOne(
      {}, // match first document
      queue
    );

  } finally {
    await client.close();
  }
}