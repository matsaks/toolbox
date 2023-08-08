import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './Store';


interface IAction {
    type: string
    payload: IAdFiltersSlice
}

interface SetAdFilterAction {
    type: string;
    payload: {
        field: keyof IAdFiltersSlice;
        value: string | number | null | undefined;
    }
}

interface IAdFiltersSlice {
    search: string | undefined;
    category: string;
    minPrice: number | undefined;
    maxPrice: number | undefined;
    zipCode: number | undefined;
}

const initialState: IAdFiltersSlice = {
    search: "",
    category: "",
    minPrice: undefined,
    maxPrice: undefined,
    zipCode: undefined,
}

export const AdFiltersSlice = createSlice({
    name: 'AdFilters',
    initialState,
    reducers: {
        setAdFilters(_, action: IAction) {
            return action.payload;
        },
        setAdFilter(state, action: SetAdFilterAction) {
            return { ...state, [action.payload.field]: action.payload.value };
        }
    },
})

export const { setAdFilters, setAdFilter } = AdFiltersSlice.actions
export const selectAdFilters = (state: RootState) => state.AdFilters;

export default AdFiltersSlice.reducer