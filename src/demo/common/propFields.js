import { select } from '@storybook/addon-knobs';

export const chartSize = (defaultValue = 'medium', groupID) =>
  select(
    'size',
    { small: 'small', medium: 'medium', large: 'large' },
    defaultValue,
    groupID,
  );

export const legendAlign = (defaultValue = 'center', groupID) =>
  select(
    'align',
    {
      left: 'left',
      center: 'center',
      right: 'right',
    },
    defaultValue,
    groupID,
  );

export const legendPosition = (defaultValue = 'top', groupID) =>
  select(
    'position',
    { left: 'left', top: 'top', right: 'right', bottom: 'bottom' },
    defaultValue,
    groupID,
  );
