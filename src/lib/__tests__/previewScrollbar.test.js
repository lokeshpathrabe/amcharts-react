import * as amcharts from '@amcharts/amcharts4/charts';
import ColumnChart from 'lib/Column.chart.js';
import { getDateAxisData } from 'lib/__utils__/generateData';

describe('Preview Scrollbar test', () => {
  it('PreviewScrollbar should have preview series', () => {
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
    chart.addPreviewScrollBarX(['Success']);
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

    expect(
      chart.getChartObj().scrollbarX instanceof amcharts.XYChartScrollbar,
    ).toBeTruthy();
    expect(chart.getChartObj().scrollbarX.series.getIndex(0).name).toEqual(
      'Success',
    );
  });
});
