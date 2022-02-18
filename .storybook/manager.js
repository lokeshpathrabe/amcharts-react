import React from 'react';
import { addons, types } from '@storybook/addons';
import { light } from './theme';

addons.setConfig({
  theme: light,
  panelPosition: 'right',
  selectedPanel: 'storysource',
});

setTimeout(function () {
  addons.elements.panel['storybookjs/knobs/panel'].title = 'Controls';
  addons.elements.panel['storybook/source-loader/panel'].title = 'Source';
}, 0);
