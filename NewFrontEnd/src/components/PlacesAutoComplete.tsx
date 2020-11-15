import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { setPost, selectPost } from '../redux/slices/posting';
import { useSelector, useDispatch } from 'react-redux';
import { getDurationInMinutes } from '../apis/google';

interface PathProps {
  className?: string;
}

const AutoComplete: React.FC<PathProps> = ({ className = '' }) => {
  const address = useSelector(selectPost).address;
  const dispatch = useDispatch();

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(add) => dispatch(setPost(['address', add]))}
      onSelect={(add) => {
        dispatch(setPost(['address', add]));
        getDurationInMinutes(add).then((distance: any) => {
          dispatch(setPost(['distance', distance ? distance : 'unknown']));
        });
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <input
            // TODO fix 'Prop spreading is forbidden'
            {...getInputProps({
              placeholder: 'Search Places ...',
              className,
            })}
          />
          <div>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => (
              // TODO: Missing "key" prop for element in iterator
              <div
                key={suggestion}
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
