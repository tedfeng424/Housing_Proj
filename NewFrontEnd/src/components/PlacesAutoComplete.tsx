import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Form } from 'react-bootstrap';

interface PathProps {
  className?: string;
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
  initialAddress?: string;
  isValid?: boolean;
  isInvalid?: boolean;
}

const AutoComplete: React.FC<PathProps> = ({
  className = '',
  onChange,
  onSelect,
  initialAddress = '',
  isValid,
  isInvalid,
}) => {
  const [address, setAddress] = useState<string>(initialAddress);
  // TODO
  // (add) => {
  //   dispatch(setPost(['address', add]));
  //   getDurationInMinutes(add).then((distance: any) => {
  //     dispatch(setPost(['distance', distance ? distance : 'unknown']));
  //   });
  // }
  return (
    <PlacesAutocomplete
      value={address}
      onChange={(value) => {
        setAddress(value);
        if (onChange) onChange(value);
      }}
      onSelect={(value) => {
        setAddress(value);
        if (onSelect) onSelect(value);
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <Form.Control
            // TODO fix prop spread is forbidden
            {...getInputProps({
              placeholder: 'Search Places ...',
              className,
            })}
            isValid={isValid}
            isInvalid={isInvalid}
          />
          <div>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => (
              // TODO: Missing "key" prop for element in iterator
              <div
                {
                  /* TODO fix 'Prop spreading is forbidden' */
                  ...getSuggestionItemProps(suggestion, {
                    className: suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item',
                    style: suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' },
                  })
                }
                key={suggestion.description}
              >
                <span>{suggestion.description}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </PlacesAutocomplete>
  );
};

export default AutoComplete;
