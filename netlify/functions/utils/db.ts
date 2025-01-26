import { MongoClient } from 'mongodb';
import { Patient, PatientsQueue } from '../../../types/patient';

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
    const [queue] = await collection.find().toArray();
    return queue as unknown as PatientsQueue;

  } finally {
    await client.close();
  }
}

export async function addPatientToQueue(patient: Patient): Promise<void> {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("hospital");
    const collection = database.collection("queue");

    await collection.updateOne(
      {}, // match first document
      { $push: { patients: patient } }
    );

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