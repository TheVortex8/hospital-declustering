import { faker } from "@faker-js/faker";
import { InvestigationState, Patient, PatientPhase, PatientsQueue, Status, TriageCategory } from "../../../types/patient";
import { fetchData, updateDb } from "./db";

export const updateQueue = async (patients: Patient[]) => {
  const currentQueue = await fetchData();
  currentQueue.patients = patients;
  currentQueue.patients.sort((a, b) => {
    if (a.status.current_phase !== b.status.current_phase) {
      return Object.values(PatientPhase).indexOf(a.status.current_phase) - Object.values(PatientPhase).indexOf(b.status.current_phase);
    }
    
    if (a.triageCategory !== b.triageCategory) {
      return a.triageCategory - b.triageCategory;
    }

    return a.arrivalTime.getTime() - b.arrivalTime.getTime();
  });

  for (const patient of currentQueue.patients) {
    
    const samePhasePatients = currentQueue.patients.filter(p => 
      p.status.current_phase === patient.status.current_phase
    );
    
    const allPatientsSortedByArrival = [...currentQueue.patients].sort((a, b) => 
      a.arrivalTime.getTime() - b.arrivalTime.getTime()
    );

    patient.queuePosition = {
      global: allPatientsSortedByArrival.indexOf(patient) + 1,
      phase: samePhasePatients.indexOf(patient) + 1,
      categoryInPhase: samePhasePatients.filter(p => p.triageCategory === patient.triageCategory).indexOf(patient) + 1,
      categoryGlobal: currentQueue.patients.filter(p => p.triageCategory === patient.triageCategory).indexOf(patient) + 1
    };
  }

  const queue: PatientsQueue = {
    waitingCount: currentQueue.patients.length,
    longuestWaitTimePerPhase: Object.values(PatientPhase).reduce((acc, phase) => {
      const patientsInPhase = currentQueue.patients.filter(p => p.status.current_phase === phase);
      const maxWait = patientsInPhase.length ? Math.ceil(Math.max(...patientsInPhase.map(p => (new Date().getTime() - p.arrivalTime.getTime()) / 60000))) : 0;
      acc[phase] = maxWait;
      return acc;
    }, {} as Record<PatientPhase, number>),
    categoryBreakdown: {
      [TriageCategory.RESUSCITATION]: currentQueue.patients.filter(patient => patient.triageCategory === TriageCategory.RESUSCITATION).length,
      [TriageCategory.EMERGENT]: currentQueue.patients.filter(patient => patient.triageCategory === TriageCategory.EMERGENT).length,
      [TriageCategory.URGENT]: currentQueue.patients.filter(patient => patient.triageCategory === TriageCategory.URGENT).length,
      [TriageCategory.LESS_URGENT]: currentQueue.patients.filter(patient => patient.triageCategory === TriageCategory.LESS_URGENT).length,
      [TriageCategory.NON_URGENT]: currentQueue.patients.filter(patient => patient.triageCategory === TriageCategory.NON_URGENT).length,
    },
    averageWaitTimes: {
      [TriageCategory.RESUSCITATION]: Math.ceil(currentQueue.patients.reduce((sum, patient) => sum + (patient.triageCategory === TriageCategory.RESUSCITATION ? (new Date().getTime() - patient.arrivalTime.getTime()) / 60000 : 0), 0) / currentQueue.patients.filter(patient => patient.triageCategory === TriageCategory.RESUSCITATION).length),
      [TriageCategory.EMERGENT]: Math.ceil(currentQueue.patients.reduce((sum, patient) => sum + (patient.triageCategory === TriageCategory.EMERGENT ? (new Date().getTime() - patient.arrivalTime.getTime()) / 60000 : 0), 0) / currentQueue.patients.filter(patient => patient.triageCategory === TriageCategory.EMERGENT).length),
      [TriageCategory.URGENT]: Math.ceil(currentQueue.patients.reduce((sum, patient) => sum + (patient.triageCategory === TriageCategory.URGENT ? (new Date().getTime() - patient.arrivalTime.getTime()) / 60000 : 0), 0) / currentQueue.patients.filter(patient => patient.triageCategory === TriageCategory.URGENT).length),
      [TriageCategory.LESS_URGENT]: Math.ceil(currentQueue.patients.reduce((sum, patient) => sum + (patient.triageCategory === TriageCategory.LESS_URGENT ? (new Date().getTime() - patient.arrivalTime.getTime()) / 60000 : 0), 0) / currentQueue.patients.filter(patient => patient.triageCategory === TriageCategory.LESS_URGENT).length),
      [TriageCategory.NON_URGENT]: Math.ceil(currentQueue.patients.reduce((sum, patient) => sum + (patient.triageCategory === TriageCategory.NON_URGENT ? (new Date().getTime() - patient.arrivalTime.getTime()) / 60000 : 0), 0) / currentQueue.patients.filter(patient => patient.triageCategory === TriageCategory.NON_URGENT).length),
    },
    patients: currentQueue.patients,
  };

  await updateDb(queue);
  
  return queue;
}
const generateMockTriageCategory = () => {
  const roll = Math.random() * 100;
  if (roll < 10) return TriageCategory.RESUSCITATION;
  if (roll < 16) return TriageCategory.EMERGENT;
  if (roll < 61) return TriageCategory.URGENT;
  if (roll < 91) return TriageCategory.LESS_URGENT;
  return TriageCategory.NON_URGENT;
};

const generateMockArrivalTime = (triageCategory) => {
  const waitRanges = {
    [TriageCategory.RESUSCITATION]: [0, 5],
    [TriageCategory.EMERGENT]: [15, 30],
    [TriageCategory.URGENT]: [30, 120],
    [TriageCategory.LESS_URGENT]: [60, 240],
    [TriageCategory.NON_URGENT]: [120, 360]
  };
  const [min, max] = waitRanges[triageCategory];
  const minutesAgo = Math.floor(Math.random() * (max - min + 1)) + min;
  const arrivalTime = new Date(Date.now() - minutesAgo * 60000);
  return arrivalTime;
};

const generateMockPatientStatus = () => {
  const phases = Object.values(PatientPhase);
  const phase = phases[Math.floor(Math.random() * phases.length)];
  
  const status: Status = { current_phase: phase };

  if (phase === PatientPhase.REGISTERED || phase === PatientPhase.TRIAGED) {
    return status;
  }

  if (phase === PatientPhase.INVESTIGATIONS_PENDING) {
    const states = [InvestigationState.ORDERED, InvestigationState.PENDING];
    status.investigations = {
      labs: states[Math.floor(Math.random() * states.length)],
      imaging: states[Math.floor(Math.random() * states.length)]
    };
  } else {
    status.investigations = {
      labs: InvestigationState.REPORTED,
      imaging: InvestigationState.REPORTED
    };
  }

  return status;
};

export const generateMockPatients = (count): PatientsQueue => {
  const patients: Patient[] = [];
  for (let i = 0; i < count; i++) {
    const triageCategory = generateMockTriageCategory();
    const arrivalTime = generateMockArrivalTime(triageCategory);

    const patientCreated: Patient = {
      id: 'anon' + i,
      name: faker.person.fullName(),
      birthDate: faker.date.birthdate(),
      arrivalTime: arrivalTime,
      status: generateMockPatientStatus(),
      triageCategory: triageCategory,
    };
    patients.push(patientCreated);
  }

  patients.sort((a, b) => {
    if (a.status.current_phase !== b.status.current_phase) {
      return Object.values(PatientPhase).indexOf(a.status.current_phase) - Object.values(PatientPhase).indexOf(b.status.current_phase);
    }
    
    if (a.triageCategory !== b.triageCategory) {
      return a.triageCategory - b.triageCategory;
    }

    return a.arrivalTime.getTime() - b.arrivalTime.getTime();
  });

  for (let i = 0; i < patients.length; i++) {
    
    const samePhasePatients = patients.filter(patient => 
      patient.status.current_phase === patients[i].status.current_phase
    );
    
    const allPatientsSortedByArrival = [...patients].sort((a, b) => 
      a.arrivalTime.getTime() - b.arrivalTime.getTime()
    );

    patients[i].queuePosition = {
      global: allPatientsSortedByArrival.indexOf(patients[i]) + 1,
      phase: samePhasePatients.indexOf(patients[i]) + 1,
      categoryInPhase: samePhasePatients.filter(patient => 
      patient.triageCategory === patients[i].triageCategory
      ).indexOf(patients[i]) + 1,
      categoryGlobal: patients.filter(patient => 
      patient.triageCategory === patients[i].triageCategory
      ).indexOf(patients[i]) + 1
    };
  }

  const queue: PatientsQueue = {
    waitingCount: patients.length,
    longuestWaitTimePerPhase: Object.values(PatientPhase).reduce((acc, phase) => {
      const patientsInPhase = patients.filter(p => p.status.current_phase === phase);
      const maxWait = patientsInPhase.length ? Math.ceil(Math.max(...patientsInPhase.map(p => (new Date().getTime() - p.arrivalTime.getTime()) / 60000))) : 0;
      acc[phase] = maxWait;
      return acc;
    }, {} as Record<PatientPhase, number>),
    categoryBreakdown: {
      [TriageCategory.RESUSCITATION]: patients.filter(patient => patient.triageCategory === TriageCategory.RESUSCITATION).length,
      [TriageCategory.EMERGENT]: patients.filter(patient => patient.triageCategory === TriageCategory.EMERGENT).length,
      [TriageCategory.URGENT]: patients.filter(patient => patient.triageCategory === TriageCategory.URGENT).length,
      [TriageCategory.LESS_URGENT]: patients.filter(patient => patient.triageCategory === TriageCategory.LESS_URGENT).length,
      [TriageCategory.NON_URGENT]: patients.filter(patient => patient.triageCategory === TriageCategory.NON_URGENT).length,
    },
    averageWaitTimes: {
      [TriageCategory.RESUSCITATION]: Math.ceil(patients.reduce((sum, patient) => sum + (patient.triageCategory === TriageCategory.RESUSCITATION ? (new Date().getTime() - patient.arrivalTime.getTime()) / 60000 : 0), 0) / patients.filter(patient => patient.triageCategory === TriageCategory.RESUSCITATION).length),
      [TriageCategory.EMERGENT]: Math.ceil(patients.reduce((sum, patient) => sum + (patient.triageCategory === TriageCategory.EMERGENT ? (new Date().getTime() - patient.arrivalTime.getTime()) / 60000 : 0), 0) / patients.filter(patient => patient.triageCategory === TriageCategory.EMERGENT).length),
      [TriageCategory.URGENT]: Math.ceil(patients.reduce((sum, patient) => sum + (patient.triageCategory === TriageCategory.URGENT ? (new Date().getTime() - patient.arrivalTime.getTime()) / 60000 : 0), 0) / patients.filter(patient => patient.triageCategory === TriageCategory.URGENT).length),
      [TriageCategory.LESS_URGENT]: Math.ceil(patients.reduce((sum, patient) => sum + (patient.triageCategory === TriageCategory.LESS_URGENT ? (new Date().getTime() - patient.arrivalTime.getTime()) / 60000 : 0), 0) / patients.filter(patient => patient.triageCategory === TriageCategory.LESS_URGENT).length),
      [TriageCategory.NON_URGENT]: Math.ceil(patients.reduce((sum, patient) => sum + (patient.triageCategory === TriageCategory.NON_URGENT ? (new Date().getTime() - patient.arrivalTime.getTime()) / 60000 : 0), 0) / patients.filter(patient => patient.triageCategory === TriageCategory.NON_URGENT).length),
    },
    patients,
  };
  
  return queue;
}