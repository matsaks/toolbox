import { createSlice } from "@reduxjs/toolkit";

// if darkMode is true, then darkMode is active, else light mode is active
interface darkModeState {
    active: boolean;
}

// initial state is light mode
const initialState: darkModeState = {
    active: false
};

/*
Slice for dark darkMode and light darkMode theme toggle, using redux toolkit
*/
export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggleActive: (state: darkModeState) => {
            state.active = !state.active;
        }
    }
});

export const { toggleActive } = darkModeSlice.actions;
export default darkModeSlice.reducer;