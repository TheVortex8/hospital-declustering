import { useEffect, useState } from 'react';
import { Patient, PatientsQueue } from '../../types/patient.ts';

export default function Profile() {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [average, setAverage] = useState<number>(null);
  const [numberInPhase, setNumberInPhase] = useState<number>(null);
  const [longuest, setLonguest] = useState<number>(null);
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

        const average = data.averageWaitTimes[patient.triageCategory];
        const longuest = data.longuestWaitTimePerPhase[patient.status.current_phase];
        const number = data.patients.filter((p: Patient) => p.status.current_phase === patient.status.current_phase).length;

        if (patient) {
          setPatientData(patient);
          setAverage(average);
          setLonguest(longuest);
          setNumberInPhase(number);
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
      <button
      style={{
        position: 'absolute',
        top: '10px',
        left: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#00796b',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={() => window.location.href = '/games'}
    >
      Back
    </button>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Patient Profile</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <p><strong>Name:</strong> {patientData.name}</p>
      <p><strong>Age:</strong> {new Date().getFullYear() - new Date(patientData.birthDate).getFullYear()}</p>
      <p><strong>Triage Category:</strong> {
        {
          1: 'resuscitation',
          2: 'emergent',
          3: 'urgent',
          4: 'less urgent',
          5: 'non-urgent'
        }[patientData.triageCategory] || patientData.triageCategory
      }</p>
      <p><strong>Current Phase:</strong> {patientData.status.current_phase}</p>
      {patientData.status.current_phase !== 'discharged' && patientData.status.current_phase !== 'admitted' && (
        <p><strong>Number of patients in phase:</strong> {numberInPhase}</p>
      )}
      <p><strong>Arrival time:</strong> {new Date(patientData.arrivalTime).toLocaleDateString()}</p>
      {patientData.status.current_phase !== 'discharged' && 
       patientData.status.current_phase !== 'admitted' && 
       patientData.status.current_phase !== 'treatment' && (
        <>
          <p><strong>Current position in phase:</strong> {patientData.queuePosition.phase}</p>
          <p><strong>Average waiting time for phase:</strong> {average} minutes</p>
          <p><strong>Longest wait time for phase:</strong> {longuest} minutes</p>
        </>
      )}
      </div>
    </div>
  );
}