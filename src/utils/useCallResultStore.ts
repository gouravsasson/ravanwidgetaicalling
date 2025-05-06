// stores/useCallResultStore.ts
import { create } from 'zustand';

interface Word {
  start: number;
  end: number;
  word: string;
}

interface TranscriptionEntry {
  role: string;
  content: string;
  words: Word[];
  metadata: {
    response_id: number;
  };
}

interface CallResult {
  id: number;
  sid: string;
  contact_id: number | null;
  contact_number: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  industry: string | null;
  address: string | null;
  custom1: string | null;
  custom2: string | null;
  custom3: string | null;
  custom4: string | null;
  calender_id: string | null;
  call_duration: number;
  status: string;
  outcome: string;
  recording_url: string;
  transcription: TranscriptionEntry[];
  transcription_text: string;
  notes: string;
  credit_deduction: string;
  errors: string;
  created_at: string;
  updated_at: string;
  quick_campaign: string;
}

interface CallResultStore {
  callResult: CallResult | null;
  setCallResult: (data: CallResult) => void;
  clearCallResult: () => void;
}

export const useCallResultStore = create<CallResultStore>((set) => ({
  callResult: null,
  setCallResult: (data) => set({ callResult: data }),
  clearCallResult: () => set({ callResult: null }),
}));
