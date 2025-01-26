export enum PatientPhase {
  TRIAGED = "triaged",
  REGISTERED = "registered",
  INVESTIGATIONS_PENDING = "investigations_pending",
  TREATMENT = "treatment",
  ADMITTED = "admitted",
  DISCHARGED = "discharged"
}

export enum InvestigationState {
  ORDERED = "ordered",
  PENDING = "pending",
  REPORTED = "reported"
}

export enum TriageCategory {
  RESUSCITATION = 1,
  EMERGENT = 2,
  URGENT = 3,
  LESS_URGENT = 4,
  NON_URGENT = 5
}

export interface Patient {
  id: string;
  name: string;
  arrivalTime: Date;
  birthDate: Date;
  triageCategory: TriageCategory;
  queuePosition?: {
    global: number;
    categoryGlobal: number;
    phase: number;
    categoryInPhase: number;
  };
  status: Status;
}

export interface Status {
  current_phase: PatientPhase;
  investigations?: {
    labs: InvestigationState;
    imaging: InvestigationState;
  };
}

export interface PatientsQueue {
  waitingCount: number;
  longuestWaitTimePerPhase: Record<PatientPhase, number>;
  patients: Patient[];
  categoryBreakdown: Record<TriageCategory, number>;
  averageWaitTimes: Record<TriageCategory, number>;
}