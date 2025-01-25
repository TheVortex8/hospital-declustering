export enum PatientPhase {
  REGISTERED = "registered",
  TRIAGED = "triaged",
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
  id?: string;
  arrivalTime?: Date;
  triageCategory?: TriageCategory;
  queuePosition?: {
    global: number;
    category: number;
  };
  status?: Status;
  timeElapsed?: number;
}

export interface Status {
  current_phase: PatientPhase;
  investigations?: {
    labs: InvestigationState;
    imaging: InvestigationState;
  };
}