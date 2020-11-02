import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { PathProps } from '../../components/HouseCard';

interface HousingState {
  posts: PathProps[];
}

const initialState: HousingState = {
  posts: [],
};

type HousingAPICall = () => any;

export const housingSlice = createSlice({
  name: 'housing',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setHousingPosts: (state, action: PayloadAction<PathProps[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { setHousingPosts } = housingSlice.actions;

// thunks below
export const updateHousingPosts = (apiCall: HousingAPICall): AppThunk => (
  dispatch,
) => {
  // await simulation
  apiCall().then((response: any) => {
    dispatch(
      setHousingPosts(
        response
          ? response.map((room: any) => ({
              name: room['name'],
              pricePerMonth: room['pricePerMonth'],
              roomType: room['roomType'],
              early: room['early'],
              late: room['late'],
              distance: room['distance'],
              location: room['location'],
              photo: room['photo'],
              profilePhoto: room['profilePhoto'],
              stayPeriod: room['stayPeriod'],
              leaserName: room['leaserName'],
              leaserSchoolYear: room['leaserSchoolYear'],
              leaserMajor: room['leaserMajor'],
              leaserIntro: room['leaserIntro'],
              leaserEmail: room['leaserEmail'],
              leaserPhone: room['leaserPhone'],
              other: room['other'],
              facilities: room['facilities'],
            }))
          : [],
      ),
    );
  });
};

export const selectingHousingPosts = (state: RootState) => state.housing.posts;

export default housingSlice.reducer;
