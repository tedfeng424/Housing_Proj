import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { HousePost } from '../assets/models/PostModels';
import {
  getHousingFavorites,
  selectHousingFavorites,
} from '../redux/slices/housing';
import Bookmark from './Bookmark';
import HouseProfile from './HouseProfile';

const BookmarksList: React.FC<{}> = () => {
  const favorites = useSelector(selectHousingFavorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHousingFavorites());
  }, [dispatch]);

  return (
    <div className="bookmarks-list">
      <div className="bookmarks-list-title">Bookmarks</div>
      {favorites && // TODO this should be handled within the loader component (not yet made)
        Object.values(favorites).map((favorite) => (
          <Bookmark
            key={favorite.roomId}
            {...favorite} // TODO
          />
        ))}
    </div>
  );
};

export default BookmarksList;
