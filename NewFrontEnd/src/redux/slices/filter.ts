import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
interface FilterState {
  show: boolean;
}
const initialState: FilterState = {
  show: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
      console.log(state.show);
    },
  },
});

export const { setShow } = filterSlice.actions;
export const selectShow = (state: RootState) => state.filter.show;
export default filterSlice.reducer;
