import { create } from "zustand";
import { devtools, redux } from "zustand/middleware";
import { reducer } from "./reducer";

export const initialState = {
  user: null,
};

const useSwitchStore = create(
  devtools(redux(reducer, initialState), {
    name: "useSwitchStore",
  }),
);

export default useSwitchStore;
