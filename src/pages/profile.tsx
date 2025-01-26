import { useEffect, useState } from 'react';
import { Patient, PatientsQueue } from '../../types/patient.ts';

export default function Profile() {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [average, setAverage] = useState<number>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const storedPatientName = localStorage.getItem('patientName');
        const response = await fetch('/api/get');
        const data: PatientsQueue = await response.json();
        
        const patient = data.patients?.find(
          (p: Patient) => p.name === storedPatientName
        );

        const average = data.averageWaitTimes[patient.queuePosition.category];

        if (patient) {
          setPatientData(patient);
          setAverage(average);
        } else {
          setError('Patient not found');
        }
      } catch (err) {
        setError('Failed to fetch patient data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!patientData) return <div>No patient data found</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Patient Profile</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <p><strong>Name:</strong> {patientData.name}</p>
      <p><strong>Age:</strong> {new Date().getFullYear() - new Date(patientData.birthDate).getFullYear()}</p>
      <p><strong>Current Phase:</strong> {patientData.status.current_phase}</p>
      <p><strong>Average waiting time for phase:</strong> {average} minutes</p>
      <p><strong>Current position in queue for category:</strong> {patientData.queuePosition.category}</p>
      <p><strong>Current position in phase for phase:</strong> {patientData.queuePosition.phase}</p>
      <p><strong>Triage Category:</strong> {
        {
          1: 'resuscitation',
          2: 'emergent',
          3: 'urgent',
          4: 'less urgent',
          5: 'non-urgent'
        }[patientData.triageCategory] || patientData.triageCategory
      }</p>
      <p><strong>Arrival time:</strong> {new Date(patientData.arrivalTime).toLocaleDateString()}</p>
      </div>
    </div>
  );
}