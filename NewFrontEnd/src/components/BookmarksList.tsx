import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { HousePost } from '../assets/models/PostModels';
import {
  getHousingFavorites,
  selectHousingFavorites,
} from '../redux/slices/housing';
import MyListCard from './Bookmark';
import HouseProfile from './HouseProfile';

const MyList: React.FC<{}> = () => {
  const favorites = useSelector(selectHousingFavorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHousingFavorites());
  }, [dispatch]);

  return (
    <Container className="my-list">
      <span className="title">Bookmarks</span>
      {favorites && // TODO this should be handled within the loader component (not yet made)
        Object.values(favorites).map((favorite) => (
          <Row key={favorite.roomId}>
            <MyListCard
              {...favorite} // TODO
            />
          </Row>
        ))}
    </Container>
  );
};

export default MyList;
