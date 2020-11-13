import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getHousingPostsAPI, searchHousingPostsAPI } from '../../apis';
import { HousePost } from '../../assets/models/PostModels';
import { FilterModel } from '../../assets/models/FilterModel';
import { AppThunk, RootState } from '../store';

interface HousingState {
  posts?: HousePost[];
  // TODO eventually do this: searchResults?: HousePost[];     and have a 'SearchResultsLoading' boolean
  favorites?: HousePost[];
}

const initialState: HousingState = {
  posts: undefined,
  favorites: undefined,
};

export const housingSlice = createSlice({
  name: 'housing',
  initialState,
  reducers: {
    setHousingPosts: (
      state,
      action: PayloadAction<HousePost[] | undefined>,
    ) => {
      state.posts = action.payload;
    },
    appendToHousingPosts: (state, action: PayloadAction<HousePost[]>) => {
      if (state.posts) {
        state.posts.push(...action.payload);
      } else {
        state.posts = action.payload;
      }
    },
    setHousingFavorites: (
      state,
      action: PayloadAction<HousePost[] | undefined>,
    ) => {
      state.favorites = action.payload;
    },
    appendToHousingFavorites: (state, action: PayloadAction<HousePost[]>) => {
      if (state.favorites) {
        state.favorites.push(...action.payload);
      } else {
        state.favorites = action.payload;
      }
    },
  },
});

export const {
  setHousingPosts,
  appendToHousingPosts,
  setHousingFavorites,
  appendToHousingFavorites,
} = housingSlice.actions;

// thunks below
export const getHousingPosts = (): AppThunk => async (dispatch) => {
  // get the housing and then set the housing in redux
  const housingPosts = await getHousingPostsAPI();
  dispatch(setHousingPosts(housingPosts));
};

export const searchHousingPosts = (housePost: FilterModel): AppThunk => async (
  dispatch,
) => {
  const searchResults = await searchHousingPostsAPI(housePost);
  dispatch(setHousingPosts(searchResults)); // TODO this is temporary. eventually have a separate var for the search results
};

export const newHousingPost = (housePost: HousePost): AppThunk => async (
  dispatch,
) => {
  const result = true; // TODO await newHousingPostAPI(housePost);
  dispatch(appendToHousingPosts([housePost]));
};

export const getHousingFavorites = (): AppThunk => async (dispatch) => {
  const favorites: HousePost[] = []; // TODO await getHousingFavoritesAPI();
  dispatch(setHousingFavorites(favorites));
};

export const newHousingFavorite = (housePost: HousePost): AppThunk => async (
  dispatch,
) => {
  // TODO eventually change the housePost in here to just be the housePostId
  const result = true; // TODO await newHousingFavoriteAPI(housePostId);
  dispatch(appendToHousingFavorites([housePost]));
};

// export const updateHousingPosts = (apiCall: HousingAPICall): AppThunk => (
//   dispatch,
// ) => {
//   // await simulation
//   apiCall().then((response: any) => {
//     dispatch(
//       setHousingPosts(
//         response
//           ? response.map((room: any) => ({
//               name: room.name,
//               pricePerMonth: room.pricePerMonth,
//               roomType: room.roomType,
//               early: room.early,
//               late: room.late,
//               distance: room.distance,
//               location: room.location,
//               photo: room.photo,
//               profilePhoto: room.profilePhoto,
//               stayPeriod: room.stayPeriod,
//               leaserName: room.leaserName,
//               leaserSchoolYear: room.leaserSchoolYear,
//               leaserMajor: room.leaserMajor,
//               leaserIntro: room.leaserIntro,
//               leaserEmail: room.leaserEmail,
//               leaserPhone: room.leaserPhone,
//               other: room.other,
//               facilities: room.facilities,
//             }))
//           : [],
//       ),
//     );
//   });
// };

export const selectHousingPosts = (state: RootState) => state.housing.posts;
export const selectHousingFavorites = (state: RootState) =>
  state.housing.favorites;

export default housingSlice.reducer;
