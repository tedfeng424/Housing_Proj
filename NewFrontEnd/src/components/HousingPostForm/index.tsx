import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/slices/auth';
import { newHousingPost } from '../../redux/slices/housing';
import { dummyUser, User } from '../../assets/models/User';
import HouseProfile, { facilityToIcon } from '../HouseProfile';
import Page2, { Page2Store, page2InitialStore, page2Schema } from './PostPage2';
import Page3, { Page3Store, page3InitialStore, page3Schema } from './PostPage3';
import Page4, { Page4Store, page4InitialStore, page4Schema } from './PostPage4';
import Page5, { Page5Store, page5InitialStore, page5Schema } from './PostPage5';
import Page6, { Page6Store, page6InitialStore, page6Schema } from './PostPage6';
import WizardForm from '../WizardForm';
import {
  CreateHousePostProperties,
  HousePostUserData,
} from '../../assets/models/PostModels';

type Store = Page2Store & Page3Store & Page4Store & Page5Store & Page6Store; // Page1Store &

const initialStore = [
  page2InitialStore,
  page3InitialStore,
  page4InitialStore,
  page5InitialStore,
  page6InitialStore,
];

const schemas = [
  page2Schema,
  page3Schema,
  page4Schema,
  page5Schema,
  page6Schema,
];

interface HousingPostProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const tempEmptyHouseData: Omit<CreateHousePostProperties, 'photos'> & {
  photos: string[];
} = {
  // TODO temporary. shouldn't need this eventually
  name: 'Loading...',
  location: 'Loading...',
  distance: 'Loading...',
  pricePerMonth: 0,
  stayPeriod: 12,
  early: 'Loading...',
  late: 'Loading...',
  roomType: 'Loading...',
  photos: [],
  other: [],
  facilities: [],
  negotiable: false,
  numBeds: '0',
  numBaths: '0',
};

const storeToHouseData = ({
  propertyType,
  selectedLocation,
  price,
  stayPeriod,
  earlyInterval,
  earlyMonth,
  lateInterval,
  lateMonth,
  numBeds,
  numBaths,
  roomType,
  pictures,
  preferences,
  amenities,
}: Store): Omit<CreateHousePostProperties, 'photos'> & { photos: string[] } => {
  return {
    name: propertyType,
    location: selectedLocation,
    distance: '___ min', // will calculate the minutes in the API post, showing as '___'
    pricePerMonth: price,
    stayPeriod,
    early: `${earlyInterval} ${earlyMonth}`,
    late: `${lateInterval} ${lateMonth}`,
    roomType: roomType, // TODO need to change database to hold array of strings
    numBeds: numBeds,
    numBaths: numBaths,
    photos: pictures.map((picture) => URL.createObjectURL(picture)), // TODO need to change a ton of things to be able to display files as well as strings pictures,
    other: preferences,
    facilities: amenities as (keyof typeof facilityToIcon)[],
    negotiable: false, // TODO not in the house post yet
  };
};

const userToHousePostUser = ({
  name,
  email,
  phone,
  major,
  schoolYear,
  description,
}: User): HousePostUserData => ({
  leaserName: name,
  leaserEmail: email,
  leaserPhone: phone,
  leaserSchoolYear: schoolYear,
  leaserIntro: description,
  leaserMajor: major,
  profilePhoto: '', // TODO need to actually have profile photo here
});

const HousingPost: React.FC<HousingPostProps> = ({ show, setShow }) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<Store>();
  const [houseData, setHouseData] = useState<
    Omit<CreateHousePostProperties, 'photos'> & { photos: string[] }
  >();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (previewData) setHouseData(storeToHouseData(previewData));
  }, [previewData]);

  return (
    <>
      <HouseProfile
        show={showPreview}
        onHide={() => {
          setShowPreview(false);
          setShow(true);
        }}
        {...tempEmptyHouseData}
        {...houseData}
        {...userToHousePostUser(user || dummyUser)}
        localURL
        aboveModalContent={
          <div className="house-post-preview-buttons-wrapper">
            <Button
              variant="secondary"
              onClick={() => {
                setShowPreview(false);
                setShow(true);
              }}
            >
              Edit Post
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                if (houseData) {
                  setShowPreview(false);
                  dispatch(
                    newHousingPost({
                      ...houseData,
                      photos: previewData?.pictures as File[],
                    }),
                  );
                }

                // TODO need to reset the form here
              }}
            >
              Publish Post
            </Button>
          </div>
        }
        aboveModalContentClassName="house-post-preview-buttons"
        modalClassName="house-post-preview-modal"
      />

      <WizardForm<Store>
        show={show}
        setShow={setShow}
        onSubmit={(data) => {
          console.log('clicked');
          console.log(data);
          setPreviewData(data);
          setShowPreview(true);
          // dispatch(
          //   userPost(() => postHousing(FormMation(pictures, posts))),
          // ); // TODO
          return true;
        }}
        title="Make your post"
        initialStore={initialStore}
        schemas={schemas}
        lastButtonText="Preview"
        // TODO customLastButton={
        //   <Button
        //     variant="secondary"
        //     className="m-0"
        //     onClick={() => {
        //       setShowPreview(true);
        //     }}
        //   >
        //     Preview
        //   </Button>
        // }
      >
        <Page2 />
        <Page3 />
        <Page4 />
        <Page5 />
        <Page6 />
      </WizardForm>
    </>
  );
};

export default HousingPost;
