export type UserRole = "ADMIN" | "LAWYER" | "EXTERNAL_LAWYER" | "STAFF" | "CLIENT" | "WARIS";
export type CaseStatus = "ACTIVE" | "PENDING" | "CLOSED" | "APPEALED";
export type PesiType = "Dainik Pesi Suchi" | "Saptahik Pesi Suchi" | "Purak Pesi Suchi";

export interface Profile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string | null;
  avatar: string;
  is_active: boolean;
  created_at: string;
}

export interface Case {
  id: number;
  case_number: string;
  title: string;
  case_type: string;
  court: string;
  client_id: string | null;
  lawyer_id: string | null;
  status: CaseStatus;
  date_bs: string | null;
  date_ad: string | null;
  description: string | null;
  created_at: string;
  client?: Profile;
  lawyer?: Profile;
}

export interface Pesi {
  id: number;
  case_id: number;
  pesi_type: PesiType;
  judge: string | null;
  court: string | null;
  date_bs: string | null;
  time: string | null;
  tarek_type: string | null;
  notes: string | null;
  created_at: string;
  case?: Case;
}

export interface Decision {
  id: number;
  case_id: number;
  type: string;
  date_bs: string | null;
  summary: string | null;
  uploaded_by: string | null;
  created_at: string;
  uploader?: Profile;
}

export interface Meeting {
  id: number;
  title: string;
  case_id: number | null;
  is_online: boolean;
  link: string | null;
  location: string | null;
  date_bs: string | null;
  time: string | null;
  attendee_ids: string[];
  created_at: string;
}

export interface MasterData {
  id: number;
  category: string;
  value: string;
  sort_order: number;
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Omit<Profile, "created_at">; Update: Partial<Profile> };
      cases: { Row: Case; Insert: Omit<Case, "id" | "created_at">; Update: Partial<Case> };
      pesi: { Row: Pesi; Insert: Omit<Pesi, "id" | "created_at">; Update: Partial<Pesi> };
      decisions: { Row: Decision; Insert: Omit<Decision, "id" | "created_at">; Update: Partial<Decision> };
      meetings: { Row: Meeting; Insert: Omit<Meeting, "id" | "created_at">; Update: Partial<Meeting> };
      master_data: { Row: MasterData; Insert: Omit<MasterData, "id">; Update: Partial<MasterData> };
    };
  };
}
