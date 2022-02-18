import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { light } from './theme';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
    theme: light,
  },
  options: {
    storySort: { order: ['Installation', 'Changelog', 'Charts', 'Playground'] },
  },
});

addDecorator(storyFn => (
  <div style={{ textAlign: 'center', padding: '4px' }}>{storyFn()}</div>
));

addDecorator(withKnobs());
