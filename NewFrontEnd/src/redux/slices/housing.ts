import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { PathProps } from '../../components/HouseCard';

interface UserPost {
  // PostPage1
  name?: string;
  leaserSchoolYear?: number;
  leaserMajor?: string;
  leaserEmail?: string;
  leaserPhone?: string;
  
  // PostPage2
  pricePerMonth?: number;
  roomType?: string;
  address?: string;
  distance?: string;

  // PostPage3
  stayPeriod?: number;
  earlyInterval?: string;
  earlyMonth?: string;
  lateInterval?: string;
  lateMonth?: string;

  // PostPage4
  other?: string[];
  facilities?: string[];

  // PostPage5
  description?: string;
  leaserIntro?: string;

  // PostPage6
  photo?: string[];

  profilePhoto?: string;
}

// room_owner = add_user(room_json['name'], room_json['leaserEmail'],
// datetime.now(), room_json['leaserPhone'],
// room_json['leaserIntro'],
// room_json['leaserSchoolYear'],
// room_json['leaserMajor'],
// session)
// new_move_in = add_move_in(room_json['early_interval'],
// room_json['early_month'],
// room_json['late_interval'],
// room_json['late_month'], session)
// new_room = add_room(datetime.now(),
// room_json['room_type'],
// room_json['price'],
// room_json['description'],
// room_json['stay_period'],
// room_json['distance'],
// room_json['address'],
// room_owner, new_move_in, session)

interface HousingState {
  posts: PathProps[];
  userPost: UserPost;
}

const initialState: HousingState = {
  posts: [],
  userPost: {},
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

export const postHousingPost = (apiCall: HousingAPICall): AppThunk => (
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
