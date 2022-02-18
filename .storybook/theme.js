import { create } from '@storybook/theming/create';
import logoSvg from './../src/demo/assets/icons/amcharts.png';
import { themes } from '@storybook/theming';

export const dark = create({
  ...themes.dark,
  brandTitle: 'amCharts Library',
  brandImage: logoSvg,
});

export const light = create({
  ...themes.light,
  brandImage: logoSvg,
});
