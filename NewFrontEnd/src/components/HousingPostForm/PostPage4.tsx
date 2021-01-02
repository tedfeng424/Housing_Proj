import React from 'react';
import * as z from 'zod';
import {
  largeAmenitiesIcons,
  amenitiesTranslations,
} from '../../assets/icons/all';
import { WizardFormStep } from '../WizardForm';
import ToggleGroup from '../basics/ToggleGroup';

type Amenity = keyof typeof largeAmenitiesIcons;

export const page4Schema = z.object({
  amenities: z.string().array(),
});

export type Page4Store = z.infer<typeof page4Schema>;

type Page4TypedStore = {
  amenities: Array<Amenity>;
};

export const page4InitialStore: Page4TypedStore = {
  amenities: [],
};

const PostPage4: React.FC<WizardFormStep<Page4TypedStore>> = ({
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

export default PostPage4 as React.FC;
