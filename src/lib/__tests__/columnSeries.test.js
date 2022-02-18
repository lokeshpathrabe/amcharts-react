import ColumnChart from 'lib/Column.chart.js';
import * as amcore from '@amcharts/amcharts4/core';
import {
  getCategoryAxisData,
  getDateAxisData,
} from 'lib/__utils__/generateData';
import {
  defaultChartConfig,
  getExpectedSeriesConfig,
} from '../__utils__/helpers';

it('Chart default column series is configured as expected', () => {
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
  const seriesConfig = chart.getChartObj().getSeriesConfig();
  expect(seriesConfig).toEqual(getExpectedSeriesConfig(chart));
});

it('Chart default clickable column series is configured as expected', () => {
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
  const seriesConfig = chart.getChartObj().getSeriesConfig();
  expect(seriesConfig).toEqual(getExpectedSeriesConfig(chart));
  expect(chart.isStacked()).toBeFalsy();
});

it('Chart default stacked column series is configured as expected', () => {
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
    stacked: true,
  });
  const seriesConfig = chart.getChartObj().getSeriesConfig();
  expect(seriesConfig).toEqual(getExpectedSeriesConfig(chart));
  expect(chart.isStacked()).toBeTruthy();
});

it('Chart default multiple column series is configured as expected', () => {
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
    name: 'Country Visits1',
    value: 'visits1',
  });
  chart.addColumnSeries({
    name: 'Country Visits2',
    value: 'visits2',
  });
  chart.getSeriesByname('Country Visits1').events.dispatchImmediately('shown');
  chart.getSeriesByname('Country Visits2').events.dispatchImmediately('shown');

  const seriesConfig = chart.getChartObj().getSeriesConfig();
  expect(seriesConfig).toEqual(getExpectedSeriesConfig(chart));

  expect(chart._hasMultiColumnSeriesCluster()).toBeTruthy();
});

it('Chart column series onclick handler test', () => {
  const clickHandler = jest.fn(ev => {});
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
  chart.onColumnClick(clickHandler);
  chart.bindData([]);
  expect(
    chart
      .getChartObj()
      .series.getIndex(0)
      .columns.template.events.hasListenersByType('hit'),
  ).toBeTruthy();
  chart
    .getChartObj()
    .series.getIndex(0)
    .columns.template.dispatchImmediately('hit');
  expect(clickHandler).toBeCalledTimes(1);
});

it('Chart column series dispose test', () => {
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
  chart.bindData([]);
  chart.dispose();

  expect(chart.series).toBeNull();
  expect(chart.legends).toBeNull();
});

it('Chart getConfig test', () => {
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
  chart.addLabelLegend();

  const config = chart.getConfig();
  expect(config).toEqual(defaultChartConfig);
});

it('ColumnChart with scrollbarX test', () => {
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
  chart.addLabelLegend();
  chart.addScrollBarX();
  chart.bindData(getCategoryAxisData(100));
  chart.getChartObj().events.dispatchImmediately('datavalidated');
  expect(
    chart.getChartObj().scrollbarX instanceof amcore.Scrollbar,
  ).toBeTruthy();
});

it('ColumnChart and LineSeries with category axis test', () => {
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
  chart.addLineSeries({
    name: 'Country Population',
    value: 'population',
  });
  chart.addLabelLegend();

  chart.bindData(getCategoryAxisData(100));
  chart.getChartObj().events.dispatchImmediately('datavalidated');

  expect(chart.getChartObj().series).toHaveLength(2);
  const titles = [];
  chart.getChartObj().series.each(cfg => titles.push(cfg.name));

  expect(titles).toEqual(['Country Visits', 'Country Population']);
});

it('ColumnChart and LineSeries with date axis test', () => {
  const chart = new ColumnChart({
    id: 'chart-container',
    chartTitle: 'Category Column Series',
    xAxis: {
      type: 'date',
      dataKey: 'date',
      title: 'Country',
    },
    yAxis: {
      title: 'Visits',
    },
  });
  chart.addColumnSeries({
    name: 'Country Visits',
    value: 'cases1',
  });
  chart.addLineSeries({
    name: 'Country Population',
    value: 'cases2',
  });
  chart.addLabelLegend();
  const data = getDateAxisData('06-1-2020', '12-31-2020', 'date', [
    'cases1',
    'cases2',
  ]);

  chart.bindData(data);
  chart.getChartObj().events.dispatchImmediately('datavalidated');

  expect(chart.getChartObj().series).toHaveLength(2);
  const titles = [];
  chart.getChartObj().series.each(cfg => titles.push(cfg.name));

  expect(titles).toEqual(['Country Visits', 'Country Population']);
});

it('ColumnChart with multiple ColumnSeries test', () => {
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
  chart.addColumnSeries({
    name: 'Country Population',
    value: 'population',
  });
  chart.addLabelLegend();

  chart.bindData(getCategoryAxisData(100));
  chart.getChartObj().events.dispatchImmediately('datavalidated');

  expect(chart.getChartObj().series).toHaveLength(2);
  const titles = [];
  chart.getChartObj().series.each(cfg => titles.push(cfg.name));
  expect(titles).toEqual(['Country Visits', 'Country Population']);
});
