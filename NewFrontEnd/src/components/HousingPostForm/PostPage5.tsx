import React from 'react';
import Button from 'react-bootstrap/Button';
import * as z from 'zod';
import {
  largeAmenitiesIcons,
  amenitiesTranslations,
} from '../../assets/icons/all';
import { WizardFormStep } from '../WizardForm';
import ToggleGroup from '../basics/ToggleGroup';
import { translations } from '../../assets/icons/amenities/all';

// TODO eventually copy this over to the FilterModel file
// const partialPreferences = z.object();

// type Preferences = z.infer<typeof partialPreferences>;

type Amenity = keyof typeof largeAmenitiesIcons;

export const page5Schema = z.object({
  amenities: z.string().array(),
});

export type Page5Store = z.infer<typeof page5Schema>;

type Page5TypedStore = {
  amenities: Array<Amenity>; // { [key: number]: keyof typeof largeAmenitiesIcons }
};

export const page5InitialStore: Page5TypedStore = {
  amenities: [],
};

const PostPage5: React.FC<WizardFormStep<Page5TypedStore>> = ({
  amenities,
  setStore,
}) => {
  return (
    <ToggleGroup
      toggleClassName="house-post-amenities-toggle"
      label="Please select all the amenities your place offers"
      content={(Object.keys(largeAmenitiesIcons) as [Amenity]).map((key) => ({
        label: amenitiesTranslations[key],
        icon: largeAmenitiesIcons[key],
      }))}
      initialSelected={amenities?.map(
        (amenity) => amenitiesTranslations[amenity],
      )}
      onSelect={({ label, selected }) => {
        const amenityKey = Object.keys(amenitiesTranslations).find(
          (key) => amenitiesTranslations[key as Amenity] === label,
        ) as Amenity;

        if (selected) {
          amenities.push(amenityKey);
          setStore({ amenities: [...amenities] });
        } else {
          setStore({
            amenities: amenities.filter((amenity) => amenity !== amenityKey),
          });
        }
      }}
      center
    />
  );
};

export default PostPage5 as React.FC;
