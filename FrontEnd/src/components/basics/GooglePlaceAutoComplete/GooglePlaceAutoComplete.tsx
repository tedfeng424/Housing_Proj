import React, { useState } from 'react';
import PlacesAutocomplete, { PropTypes } from 'react-places-autocomplete';
import { Input, Body2 } from '@basics';
import styles from './GooglePlaceAutoComplete.module.scss';
import { miscIcons } from '@icons';

interface GooglePlaceAutoCompleteProps extends PropTypes {
  className?: string;
}

const GooglePlaceAutoComplete: React.FC<GooglePlaceAutoCompleteProps> = ({
  onChange,
  onSelect,
}) => {
  const [address, setAddress] = useState<string>('');

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(address) => {
        setAddress(address);
        if (onChange) {
          onChange(address);
        }
      }}
      onSelect={onSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div>
          <Input
            icon={{ icon: miscIcons.LocationIcon }}
            {...getInputProps({
              placeholder: 'Select your address',
              className: styles.input,
            })}
          ></Input>
          <div className={styles.suggestionWrapper}>
            {suggestions.map((suggestion) => (
              // TODO: Missing "key" prop for element in iterator
              <div
                {...getSuggestionItemProps(suggestion, {
                  className: styles.suggestion,
                })}
              >
                <Body2 className={styles.body2}>{suggestion.description}</Body2>
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default GooglePlaceAutoComplete;
