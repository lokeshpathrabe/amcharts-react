import ColumnChart from 'lib/Column.chart.js';
import * as amcore from '@amcharts/amcharts4/core';
import { getDateAxisData } from '../__utils__/generateData';

describe('Chart Icon Legend test', () => {
  it('Icon legend default config for font and style', () => {
    const chart = new ColumnChart({
      id: 'chart-container',
      chartTitle: 'Category Column Series',
      xAxis: {
        type: 'date',
        dataKey: 'country',
        title: 'Country',
      },
      yAxis: {
        title: 'Day',
      },
    });
    chart.addColumnSeries({
      name: 'Success',
      value: 'cases1',
    });
    chart.addColumnSeries({
      name: 'Warning',
      value: 'cases2',
    });
    chart.addLabelIconLegend({
      align: 'center',
      icons: [
        {
          name: 'Success',
          path: '/testpath1.svg',
        },
        {
          name: 'Warning',
          path: '/testpath2.svg',
        },
      ],
    });
    const data = getDateAxisData('06-1-2020', '12-31-2020', 'date', [
      'cases1',
      'cases2',
    ]);
    data.forEach(d => {
      d.date = new Date(d.date);
    });
    chart.bindData(data);
    const chartObj = chart.getChartObj();
    chartObj.events.dispatchImmediately('datavalidated');

    const marker = chartObj.legend.markers.template.children.getIndex(0);
    expect(marker.width).toEqual(16);
    expect(marker.height).toEqual(16);
    expect(marker instanceof amcore.Image).toBeTruthy();
  });
});
