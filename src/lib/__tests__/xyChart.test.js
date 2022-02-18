import React from 'react';
import ColumnChart from 'lib/Column.chart.js';
import * as amcharts from '@amcharts/amcharts4/charts';
import {
  defaultChartConfig,
  getExpectedSeriesConfig,
  getExpectedyAxesConfig,
} from '../__utils__/helpers';

describe('XYChart test', () => {
  it('XYChart with a XYCursor test', () => {
    const tooltipText = '{categoryX}: {valueY}';
    const tooltipHTML =
      '<strong>{categoryX}</strong>: <strong>{valueY}</strong>';
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
      tooltipText,
      tooltipHTML,
    });
    chart.addLabelLegend();
    chart.addXYCursorLines();
    expect(
      chart.getChartObj().cursor instanceof amcharts.XYCursor,
    ).toBeTruthy();
    expect(chart.getChartObj().series.getIndex(0).tooltipText).toEqual(
      tooltipText,
    );
    expect(chart.getChartObj().series.getIndex(0).tooltipHTML).toEqual(
      tooltipHTML,
    );
  });

  it('XYChart with a secondary Y-axis test', () => {
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
    chart.addSecondaryYAxis({
      seriesName: 'Country Visits',
      opposite: true,
      title: 'Secondary Axis',
    });
    expect(chart.getChartObj().yAxes).toHaveLength(2);
    const titles = chart
      .getChartObj()
      .getyAxesConfig()
      .map(config => config.title);
    expect(titles).toEqual(['Visits', 'Secondary Axis']);
  });

  it('XYChart hide x-axis test', () => {
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
    chart.hideXAxis();
    expect(
      chart.getChartObj().xAxes.getIndex(0).renderer.disabled,
    ).toBeTruthy();
  });

  it('XYChart hide y-axis test', () => {
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
    chart.hideYAxis();
    expect(
      chart.getChartObj().yAxes.getIndex(0).renderer.disabled,
    ).toBeTruthy();
  });

  it('XYChart hideXAxisGridLines test', () => {
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
    chart.hideXAxisGridLines();
    expect(
      chart.getChartObj().xAxes.getIndex(0).renderer.grid.template.disabled,
    ).toBeTruthy();
  });

  it('XYChart hideYAxisGridLines test', () => {
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
    chart.hideYAxisGridLines();

    expect(
      chart.getChartObj().yAxes.getIndex(0).renderer.grid.template.disabled,
    ).toBeTruthy();
  });

  it('XYChart rotateXAxisLabels test', () => {
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
    chart.rotateXAxisLabels(90);
    expect(
      chart.getChartObj().xAxes.getIndex(0).renderer.labels.template.rotation,
    ).toEqual(90);
  });
});
