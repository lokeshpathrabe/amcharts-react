import ColumnChart from 'lib/Column.chart.js';
import { getExpectedyAxesConfig } from '../__utils__/helpers';
import { getDateAxisData } from '../__utils__/generateData';

describe('Chart yAxes test', () => {
  //TODO: To correct the autoScale flag actual value
  // it("y-axis default config for label font and style", () => {
  //   const chart = new ColumnChart({
  //     id: "chart-container",
  //     chartTitle: "Category Column Series",
  //     xAxis: {
  //       type: "date",
  //       dataKey: "country",
  //       title: "Country",
  //     },
  //     yAxis: {
  //       title: "Day",
  //     },
  //   });
  //   chart.addColumnSeries({
  //     name: "Country Visits",
  //     value: "day",
  //   });
  //   const data = getDateAxisData("06-1-2020", "12-31-2020", "date", ["cases"]);
  //   data.forEach((d) => {
  //     d.date = new Date(d.date);
  //   });
  //   chart.bindData(data);
  //   chart.getChartObj().events.dispatchImmediately("datavalidated");

  //   const yAxesConfig = chart.getChartObj().getyAxesConfig();
  //   expect(yAxesConfig).toEqual(getExpectedyAxesConfig(chart));
  //   expect(yAxesConfig[0].autoScale).toEqual(false);
  // });

  it('y-axis autoscale enabled test', () => {
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
        autoScale: true,
      },
    });
    chart.addColumnSeries({
      name: 'Country Visits',
      value: 'cases',
    });
    const data = getDateAxisData('06-1-2020', '12-31-2020', 'date', ['cases']);
    data.forEach(d => {
      d.date = new Date(d.date);
    });
    chart.bindData(data);

    chart.getChartObj().events.dispatchImmediately('datavalidated');

    const yAxesConfig = chart.getChartObj().getyAxesConfig();
    // expect(yAxesConfig[0].autoScale).toEqual(true);
  });

  it('Hide yAxes grid line', () => {
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
    chart.hideYAxisGridLines();
    expect(
      chart.getChartObj().yAxes.getIndex(0).renderer.grid.template.disabled,
    ).toBeTruthy();
  });

  it('Hide yaxis', () => {
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
    chart.hideYAxis();
    expect(
      chart.getChartObj().yAxes.getIndex(0).renderer.disabled,
    ).toBeTruthy();
  });
});
