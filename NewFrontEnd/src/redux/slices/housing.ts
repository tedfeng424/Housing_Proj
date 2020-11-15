import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getHousingPostsAPI, searchHousingPostsAPI } from '../../apis';
import { HousePost } from '../../assets/models/PostModels';
import { FilterModel } from '../../assets/models/FilterModel';
import { AppThunk, RootState } from '../store';

// TODO probably split up this housing slice into several folders, where thunks are in a
// folder, selectors in another, reducers in another, and then export them and import
// them to here

// TODO temporary way to get id of a housePost. Should be in the model/returned from the backend though
export const getHousePostId = (housePost: HousePost) =>
  housePost.leaserEmail +
  housePost.location +
  housePost.early +
  housePost.pricePerMonth;

interface HousingState {
  posts?: HousePost[]; // TODO change this to be a object from the housepost's id to the housepost, then change favorites to be id: boolean
  // TODO eventually do this: searchResults?: HousePost[];     and have a 'SearchResultsLoading' boolean
  favorites?: { [id: string]: HousePost };
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
      state.favorites = {};

      if (action.payload) {
        action.payload.forEach((housePost) => {
          const id = getHousePostId(housePost); // TODO temporary
          if (state.favorites) state.favorites[id] = housePost;
        });
      }
    },
    addToHousingFavorites: (state, action: PayloadAction<HousePost>) => {
      if (!state.favorites) state.favorites = {};

      const id = getHousePostId(action.payload); // TODO temporary
      state.favorites[id] = action.payload;
    },
    // Pass in the HousePost ID (temporarily use the function defined above)
    removeFromHousingFavorites: (state, action: PayloadAction<string>) => {
      if (state.favorites) {
        delete state.favorites[action.payload];
      }
    },
  },
});

// export the reducers that should be accessible by outside files
export const {} = housingSlice.actions;
// do NOT export these reducers. Only declare them and use them in the THUNKS
const {
  setHousingPosts,
  appendToHousingPosts,
  setHousingFavorites,
  addToHousingFavorites,
  removeFromHousingFavorites,
} = housingSlice.actions;

// PUT THUNKS HERE
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
  if (result) {
    dispatch(appendToHousingPosts([housePost]));
  } else {
    // handle the error
  }
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
  if (result) {
    dispatch(addToHousingFavorites(housePost));
  } else {
    // handle error here
  }
};

export const removeHousingFavorite = (housePostId: string): AppThunk => async (
  dispatch,
) => {
  const result = true; // TODO await API(housePostId);
  if (result) {
    dispatch(removeFromHousingFavorites(housePostId));
  } else {
    // handle error here
  }
};

// SELECTORS HERE
export const selectHousingPosts = (state: RootState) => state.housing.posts;
export const selectHousingFavorites = (state: RootState) =>
  state.housing.favorites;

export default housingSlice.reducer;
