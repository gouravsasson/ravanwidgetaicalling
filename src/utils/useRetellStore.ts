import { create } from "zustand";

export const useRetellStore = create((set) => ({
  retellWebClient: null,

  setRetellWebClient: (client) => set({ retellWebClient: client }),

  stopAgent: () => {
    set((state) => {
      if (state.retellWebClient) {
        state.retellWebClient.stopCall();
      } else {
        console.warn("RetellWebClient is not set");
      }
      return state;
    });
  },
}));
