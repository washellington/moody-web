export interface MentalState {
  rating: number;
  mood_type: string;
  date_created: number;
  entry_date: number;
  user: string;
  notes: string;
}

export interface MoodTypeDTO {
  _id: string;
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
