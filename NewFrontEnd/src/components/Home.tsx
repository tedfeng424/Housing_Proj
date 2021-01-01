import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { selectShowNewUserPopup } from '../redux/slices/auth';
import HousingList from './HouseCardList';
import Filter from './Filter';
import TV from './TV';
import Login from './Login';
import HousingPost from './HousingPostForm';
import BookmarksList from './BookmarksList';
import NewUserSetup from './NewUserSetup';
import FilterForm from './FilterForm';
import ToggleGroup from './basics/ToggleGroup'; // TODO delete once done testing
import triple from '../assets/icons/test/all';

const Home: React.FC = () => {
  const showNewUserPopup = useSelector(selectShowNewUserPopup);

  const [showLogin, setShowLogin] = useState<boolean>(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [showHousingPost, setShowHousingPost] = useState<boolean>(false);
  const handleShowHousingPost = () => setShowHousingPost(true);

  const [showFilterForm, setShowFilterForm] = useState<boolean>(false);
  const handleShowFilterForm = () => setShowFilterForm(true);

  return (
    <Container fluid>
      {/* Modals */}
      <Login show={showLogin} handleClose={handleCloseLogin} />
      <HousingPost show={showHousingPost} setShow={setShowHousingPost} />

      {/* temp */}
      <FilterForm show={showFilterForm} setShow={setShowFilterForm} />

      {showNewUserPopup !== undefined && ( // TODO temporary. Should handle in the wizard form i think
        <NewUserSetup
          show={showNewUserPopup !== undefined}
          setShow={(value: boolean) => {
            console.log(
              'uhhh no clicking out of this form buddy! we gotta make the x look disabled in the future.',
            );
          }}
          name={showNewUserPopup?.name}
          email={showNewUserPopup?.email}
        />
      )}

      {/* The actual home page */}
      <Row>
        <Col md={{ span: 8, offset: 1 }} className="my-auto">
          <div className="mb-5">
            <Filter />
          </div>

          <ToggleGroup
            content={[
              { label: 'single', icon: triple },
              { label: 'double', icon: triple },
              { label: 'triple', icon: triple },
            ]}
            onSelect={(a, b) => {
              console.log();
              console.log(a);
              console.log(b);
              console.log();
            }}
            singleSelect
            hideLabels
            label="Select a room type"
            required
            error="Error! Make sure to fix this"
          />

          <ToggleGroup
            label="bla blee bloo"
            content={[
              { label: 'single', icon: triple },
              { label: 'double', icon: triple },
              { label: 'triple', icon: triple },
              { label: 'single', icon: triple },
              { label: 'single', icon: triple },
              { label: 'single', icon: triple },
              { label: 'single', icon: triple },
              { label: 'double', icon: triple },
              { label: 'triple', icon: triple },
              { label: 'double', icon: triple },
              { label: 'triple', icon: triple },
              { label: 'double', icon: triple },
              { label: 'triple', icon: triple },
              { label: 'double', icon: triple },
              { label: 'triple', icon: triple },
            ]}
            onSelect={(a, b) => {
              console.log();
              console.log(a);
              console.log(b);
              console.log();
            }}
            singleSelect
            hideLabels
            center
          />

          <ToggleGroup
            content={[
              'hello',
              'hello there',
              'why hello there sir',
              'ganga',
              'hello there',
              'why hello there sir',
              'ganga',
              'hello there',
              'why hello there sir',
              'ganga',
              'hello there',
              'why hello there sir',
              'ganga',
              'hello there',
              'why hello there sir',
              'ganga',
              'hello there',
              'why hello there sir',
              'ganga',
              'hello there',
              'why hello there sir',
              'ganga',
              'hello there',
              'why hello there sir',
              'ganga',
              'hello there',
              'why hello there sir',
              'ganga',
              'hello there',
              'why hello there sir',
              'ganga',
            ]}
            onSelect={(a, b) => {
              console.log();
              console.log(a);
              console.log(b);
              console.log();
            }}
            center
          />
          <Button onClick={(e) => handleShowFilterForm()}>filter</Button>

          <div>
            <HousingList />
          </div>
        </Col>
        <div className="home-sidebar d-flex flex-column">
          <div className="mb-3">
            <TV>
              {/* TODO !user will be hardcoded to false while new-user-popup is being worked on */}
              {false ? (
                <>
                  <div className="special-text mt-3">Hello</div>
                  <div className="tv-separator" />
                  <Button variant="secondary" onClick={handleShowLogin}>
                    Sign in to post
                  </Button>
                </>
              ) : (
                <>
                  {/* TODO this is temporary for while the 'Post ur request' is disabled */}
                  <div className="special-text mt-3">Hello</div>
                  <div className="tv-separator" />
                  <Button variant="secondary" onClick={handleShowHousingPost}>
                    Post here
                  </Button>
                  {/* <Button>Post ur request</Button> */}
                </>
              )}
            </TV>
          </div>

          <div className="home-bookmarks-list-wrapper">
            <BookmarksList />
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Home;
