import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { HousingAPICall, updateHousingPosts } from './housing';
import { getHousing } from '../../apis/index';

export interface UserPost {
  // PostPage1
  name?: string;
  leaserSchoolYear?: string;
  leaserMajor?: string;
  leaserEmail?: string;
  leaserPhone?: string;

  // PostPage2
  price?: number;
  roomType?: string;
  address?: string;
  distance: string;

  // PostPage3
  stayPeriod: number;
  earlyInterval: string;
  earlyMonth: string;
  lateInterval: string;
  lateMonth: string;

  // PostPage4
  other: string[];
  facilities: string[];

  // PostPage5
  leaserIntro?: string;
}

interface UserPostState {
  post: UserPost;
  photo: File[];
}

const initialState: UserPostState = {
  post: {
    stayPeriod: 1,
    earlyInterval: 'Anytime',
    earlyMonth: 'Anytime',
    lateInterval: 'Anytime',
    lateMonth: 'Anytime',
    other: [],
    facilities: [],
    distance: 'unknown',
  },
  photo: [],
};

export const postSlice = createSlice({
  name: 'housePost',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPost: (state: any, action: PayloadAction<any[]>) => {
      state.post[action.payload[0]] = action.payload[1];
      console.log(action.payload);
    },
    setPicture: (state: any, action: PayloadAction<File[]>) => {
      console.log(action.payload);
      state.photo = action.payload;
    },
  },
});
export const { setPost, setPicture } = postSlice.actions;

const selectPost = (state: RootState) => state.housePost.post;
const selectPicture = (state: RootState) => state.housePost.photo;
export { selectPost, selectPicture };

export const userPost = (apiCall: HousingAPICall): AppThunk => (dispatch) => {
  apiCall().then((response: any) => {
    // TODO should be informing user new post is created!
    // refresh the page with new posting
    console.log(response);
    dispatch(updateHousingPosts(getHousing));
  });
};

export default postSlice.reducer;
