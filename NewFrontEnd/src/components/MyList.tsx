import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { HousePost } from '../assets/models/PostModels';
import {
  getHousingFavorites,
  selectHousingFavorites,
} from '../redux/slices/housing';
import MyListCard from './MyListCard';

const MyList: React.FC<{}> = () => {
  const favorites = useSelector(selectHousingFavorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHousingFavorites());
  }, [dispatch]);

  return (
    <Container className="my-list">
      My list
      <Row>
        <MyListCard
          photos={[
            'https://cdn.vox-cdn.com/thumbor/op7DSI_UdWcXSbVGqA4wKYc2v3E=/0x0:1800x1179/1200x800/filters:focal(676x269:964x557)/cdn.vox-cdn.com/uploads/chorus_image/image/66741310/3zlqxf_copy.0.jpg',
          ]}
          leaserName="Keen"
          leaserPhone="123-456-7890"
          leaserEmail="email@email.com"
        />
      </Row>
      {favorites && // TODO this should be handled within the loader component (not yet made)
        Object.values(favorites).map((favorite) => (
          <Row key={JSON.stringify(favorite) /* TODO favorite.id */}>
            <MyListCard
              {...favorite} // TODO
              // name={favorite.leaserName}
              // phone={favorite.leaserPhone}
              // email={favorite.leaserEmail}
              // photos={favorite.photos}
            />
          </Row>
        ))}
    </Container>
  );
};

export default MyList;
