import { create } from "zustand";

type TranscriptStore = {
  transcripts: string[];
  setTranscripts: (newTranscripts: string[]) => void;
  addTranscript: (line: string) => void;
  clearTranscripts: () => void;
};

export const useTranscriptStore = create<TranscriptStore>((set) => ({
  transcripts: [],
  setTranscripts: (newTranscripts) => set({ transcripts: newTranscripts }),
  addTranscript: (line) =>
    set((state) => ({ transcripts: [...state.transcripts, line] })),
  clearTranscripts: () => set({ transcripts: [] }),
}));
