import { useEffect, useState } from 'react';
import { Patient, PatientsQueue } from '../../types/patient.ts';
import logo from '../assets/logo.png';
import '../styles/profile.css'; // Import the CSS file

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

  const progress = patientData.queuePosition.phase / numberInPhase * 100;

  return (
    <div className="profile-container">
      <button
        className="back-button"
        onClick={() => window.location.href = '/games'}
      >
        Back
      </button>
      <h1 className="profile-title">Patient Profile</h1>
      <div className="profile-box">
        <div className="profile-picture">
          {/* Placeholder for profile picture */}
          <img src={logo} alt="Profile" />
        </div>
        <div className="profile-info">
          <p><strong>{patientData.name}</strong></p>
          <p>Age: {new Date().getFullYear() - new Date(patientData.birthDate).getFullYear()}</p>
        </div>
      </div>
      <div className="profile-box triage">
        <p><strong>Triage Category</strong> <span className={`triage-${patientData.triageCategory}`}>{
          {
            1: 'resuscitation',
            2: 'emergent',
            3: 'urgent',
            4: 'less urgent',
            5: 'non-urgent'
          }[patientData.triageCategory] || patientData.triageCategory
        }</span></p>
        <p><strong>Current Phase</strong> {patientData.status.current_phase}</p>
      </div>
      <div className="profile-box triage">
        {patientData.status.current_phase !== 'discharged' && patientData.status.current_phase !== 'admitted' && (
          <>
            <p><strong>Number of patients in phase</strong> {numberInPhase}</p>
            <p><strong>Current position in phase</strong> {patientData.queuePosition.phase}</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          </>
        )}
      </div>
      <div className="profile-box triage">
        <p><strong>Arrival time</strong> {new Date(patientData.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        {patientData.status.current_phase !== 'discharged' && 
         patientData.status.current_phase !== 'admitted' && 
         patientData.status.current_phase !== 'treatment' && (
          <>
            <p><strong>Est. waiting time</strong> {average} minutes</p>
            <p><strong>Longest wait</strong> {longuest} minutes</p>
          </>
        )}
      </div>
    </div>
  );
}