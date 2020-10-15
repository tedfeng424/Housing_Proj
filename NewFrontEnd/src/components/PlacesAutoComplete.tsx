import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const AutoComplete: React.FC = () => {
  const [address, setAddress] = useState<string>('');

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={setAddress}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="w-75">
          <input
            // TODO fix 'Prop spreading is forbidden'
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input post-input w-100',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, index) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                // TODO: Missing "key" prop for element in iterator
                <div
                  key={index}
                  {
                    /* TODO fix 'Prop spreading is forbidden' */
                    ...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })
                  }
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AutoComplete;
