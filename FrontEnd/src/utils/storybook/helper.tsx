import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Props } from '@utils';
import { Story } from '@storybook/react';

export const StoryTemplate = <P extends Props, T extends FunctionComponent<P>>(
  Component: T,
): Story => {
  const ComponentWrapper = (args: Props): JSX.Element => (
    <div className="d-flex flex-column align-items-center mt-3">
      <Component
        {...(args as JSX.IntrinsicAttributes &
          JSX.LibraryManagedAttributes<T, PropsWithChildren<P>>)}
      />
    </div>
  );

  return ComponentWrapper;
};
