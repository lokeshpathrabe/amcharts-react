import ColumnChart from 'lib/Column.chart.js';
import { getExpectedxAxesConfig } from '../__utils__/helpers';
import { getCategoryAxisData } from '../__utils__/generateData';

describe('Chart xAxes test', () => {
  it('Axis label font and style test', () => {
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
      name: 'Country Visits',
      value: 'day',
    });

    const xAxesConfig = chart.getChartObj().getxAxesConfig();
    expect(xAxesConfig).toEqual(getExpectedxAxesConfig(chart));
  });

  it('xAxis maxZoomCount for non clickable column series test', () => {
    const chart = new ColumnChart({
      id: 'chart-container',
      chartTitle: 'Category Column Series',
      xAxis: {
        type: 'category',
        dataKey: 'country',
        title: 'Country',
      },
      yAxis: {
        title: 'Visits',
      },
    });
    chart.addColumnSeries({
      name: 'Country Visits',
      value: 'visits',
    });
    chart.bindData(getCategoryAxisData(100));

    chart._getPlotContainerWidth = jest.fn(() => 400);

    const chartObj = chart.getChartObj();
    chartObj.events.dispatchImmediately('datavalidated');
    expect(chartObj.xAxes.getIndex(0).maxZoomCount).toEqual(23);
  });

  it('xAxis maxZoomCount for clickable column series test', () => {
    const chart = new ColumnChart({
      id: 'chart-container',
      chartTitle: 'Category Column Series',
      xAxis: {
        type: 'category',
        dataKey: 'country',
        title: 'Country',
      },
      yAxis: {
        title: 'Visits',
      },
    });
    chart.addColumnSeries({
      name: 'Country Visits',
      value: 'visits',
      clickable: true,
    });
    chart.bindData(getCategoryAxisData(100));

    chart._getPlotContainerWidth = jest.fn(() => 400);

    const chartObj = chart.getChartObj();
    chartObj.events.dispatchImmediately('datavalidated');
    expect(chartObj.xAxes.getIndex(0).maxZoomCount).toEqual(18);
  });

  it('rotate xAxis labels', () => {
    const chart = new ColumnChart({
      id: 'chart-container',
      chartTitle: 'Category Column Series',
      xAxis: {
        type: 'category',
        dataKey: 'country',
        title: 'Country',
      },
      yAxis: {
        title: 'Visits',
      },
    });
    chart.addColumnSeries({
      name: 'Country Visits',
      value: 'visits',
      clickable: true,
    });
    chart.rotateXAxisLabels(90);
    chart.bindData(getCategoryAxisData(100));
    const rotation = chart.getChartObj().xAxes.getIndex(0).renderer.labels
      .template.rotation;
    expect(rotation).toEqual(90);
  });

  it('Hide xAxes grid line', () => {
    const chart = new ColumnChart({
      id: 'chart-container',
      chartTitle: 'Category Column Series',
      xAxis: {
        type: 'category',
        dataKey: 'country',
        title: 'Country',
      },
      yAxis: {
        title: 'Visits',
      },
    });
    chart.addColumnSeries({
      name: 'Country Visits',
      value: 'visits',
      clickable: true,
    });
    chart.hideXAxisGridLines();
    expect(
      chart.getChartObj().xAxes.getIndex(0).renderer.grid.template.disabled,
    ).toBeTruthy();
  });

  it('Hide xaxis', () => {
    const chart = new ColumnChart({
      id: 'chart-container',
      chartTitle: 'Category Column Series',
      xAxis: {
        type: 'category',
        dataKey: 'country',
        title: 'Country',
      },
      yAxis: {
        title: 'Visits',
      },
    });
    chart.addColumnSeries({
      name: 'Country Visits',
      value: 'visits',
      clickable: true,
    });
    chart.hideXAxis();
    expect(
      chart.getChartObj().xAxes.getIndex(0).renderer.disabled,
    ).toBeTruthy();
  });
});
