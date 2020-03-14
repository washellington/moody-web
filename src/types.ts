export interface MentalState {
  rating: number;
  mood_type: string;
  date_created: number;
  entry_date: number;
  user: string;
  notes: string;
  _id?: string;
}

export interface MoodTypeDTO {
  _id: string;
  err?: string;
}

export interface MentalStateOverviewDTO {
  daysMissed: number;
  averageMood: number;
  daysLogged: number;
  err?: string;
}

export interface MonthMentalStateDTO {
  mental_states: MentalState[];
  err?: string;
}

export interface MentalStateDTO {
  mental_state: MentalState;
  err?: string;
}

export interface Authentication {
  userId: string;
  email: string;
  fullName: string;
}

export interface LoggedInUser {
  userId: string;
}

export const DEFAULT_EMOTION_RATING = 3;
