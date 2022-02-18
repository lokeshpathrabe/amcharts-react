import React, { useEffect } from 'react';
import ColumnChart from 'lib/Column.chart';
import { chartContainers } from 'common/styledComponents';
import { text, number, color, select } from '@storybook/addon-knobs';
import ColumnDocs from 'docs/columnchart.docs.mdx';
import { chartSize, legendAlign, legendPosition } from 'common/propFields';
import { getCategoryAxisData } from 'common/generateData';

export default {
  title: 'Playground/Charts',
  component: ColumnChart,
  parameters: {
    docs: {
      page: ColumnDocs,
    },
    knobs: {
      disabled: true,
    },
    viewMode: 'canvas',
    options: { selectedPanel: 'storybook/source-loader/panel' },
  },
};

export const columnChart = () => {
  // Chart Editable Properties
  const size = chartSize('medium', 'chart');
  const chartTitle = text('title', 'Column Series', 'chart');
  const minGridDistance = number(
    'minGridDistance',
    50,
    { min: 10, max: 300 },
    'chart',
  );
  const fillColor = color('fillColor', '#EC8777', 'chart');
  const strokeColor = color('strokeColor', '#EC8777', 'chart');
  const recordsLen = select(
    '# of Records',
    { 20: '20', 50: '50', 120: '120' },
    '50',
    'chart',
  );
  const countryData = getCategoryAxisData(recordsLen);
  //Legend editable properties
  const lgndAlign = legendAlign('center', 'legend');
  const lgndPosition = legendPosition('top', 'legend');
  const id = 'column-chart';
  const ChartContainer = chartContainers[size];
  useEffect(() => {
    const colChart = new ColumnChart({
      id,
      chartTitle,
      xAxis: {
        type: 'category',
        dataKey: 'country',
        title: 'Country',
        minGridDistance,
      },
      yAxis: {
        title: 'Visits',
      },
    });
    colChart.addColumnSeries({
      value: 'visits',
      fillColor,
      strokeColor,
    });
    colChart.addLabelLegend({ align: lgndAlign, position: lgndPosition });
    colChart.addScrollBarX();
    colChart.bindData(countryData);
  });

  return <ChartContainer id={id} />;
};

columnChart.parameters = {
  storysource: {
    disabled: true,
  },
  knobs: {
    disabled: false,
  },
  options: { selectedPanel: 'storybookjs/knobs/panel' },
};
