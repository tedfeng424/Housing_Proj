import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { selectHousingFavorites } from '../redux/slices/housing';
import MyListCard from './MyListCard';

const MyList: React.FC<{}> = () => {
  const favorites = useSelector(selectHousingFavorites);
  return (
    <Container className="my-list">
      My list
      <Row>
        <MyListCard
          photos={[
            'https://cdn.vox-cdn.com/thumbor/op7DSI_UdWcXSbVGqA4wKYc2v3E=/0x0:1800x1179/1200x800/filters:focal(676x269:964x557)/cdn.vox-cdn.com/uploads/chorus_image/image/66741310/3zlqxf_copy.0.jpg',
          ]}
          name="Keen"
          phone="123-456-7890"
          email="email@email.com"
        />
      </Row>
      {favorites &&
        favorites.map((
          favorite, // TODO this should be handled within the loader component (not yet made)
        ) => (
          <Row>
            <MyListCard
              name={favorite.leaserName}
              phone={favorite.leaserPhone}
              email={favorite.leaserEmail}
              photos={favorite.photos}
            />
          </Row>
        ))}
    </Container>
  );
};

export default MyList;
