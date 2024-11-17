import { create } from "zustand";

const useModalStore = create((set) => ({
  surveyOpen: false,
  setSurveyOpen: (open) => set({ surveyOpen: open }),
}));
export default useModalStore;
