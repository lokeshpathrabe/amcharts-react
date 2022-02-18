import ColumnChart from 'lib/Column.chart.js';
import { getExpectedLegendConfig } from '../__utils__/helpers';
import { getDateAxisData } from '../__utils__/generateData';

describe('Chart Label Legend test', () => {
  it('Label legend default config for font and style', () => {
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
    chart.addLabelLegend();
    const data = getDateAxisData('06-1-2020', '12-31-2020', 'date', ['cases']);
    data.forEach(d => {
      d.date = new Date(d.date);
    });
    chart.bindData(data);
    chart.getChartObj().events.dispatchImmediately('datavalidated');

    expect(chart.getChartObj().getLegendConfig()).toEqual(
      getExpectedLegendConfig(chart),
    );
  });

  it('Label legend position right test', () => {
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
    chart.addLabelLegend({ position: 'right' });
    const data = getDateAxisData('06-1-2020', '12-31-2020', 'date', ['cases']);
    data.forEach(d => {
      d.date = new Date(d.date);
    });
    chart.bindData(data);
    chart.getChartObj().events.dispatchImmediately('datavalidated');

    expect(chart.getChartObj().getLegendConfig().position).toEqual('right');
    expect(chart.getChartObj().getLegendConfig().dx).toEqual(16);
  });

  it('Label legend position left test', () => {
    const chart = new ColumnChart({
      id: 'chart-container',
      chartTitle: 'Category Column Series',
      xAxis: {
        type: 'date',
        dataKey: 'date',
        title: 'Date',
      },
      yAxis: {
        title: 'Cases',
      },
    });
    chart.addColumnSeries({
      name: 'Country Cases',
      value: 'cases',
    });
    chart.addLabelLegend({ position: 'left' });
    const data = getDateAxisData('06-1-2020', '12-31-2020', 'date', ['cases']);
    data.forEach(d => {
      d.date = new Date(d.date);
    });
    chart.bindData(data);
    chart.getChartObj().events.dispatchImmediately('datavalidated');

    expect(chart.getChartObj().getLegendConfig().position).toEqual('left');
    expect(chart.getChartObj().getLegendConfig().dx).toEqual(-16);
  });

  it('Label legend position bottom test', () => {
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
    chart.addLabelLegend({ position: 'bottom' });
    const data = getDateAxisData('06-1-2020', '12-31-2020', 'date', ['cases']);
    data.forEach(d => {
      d.date = new Date(d.date);
    });
    chart.bindData(data);
    chart.getChartObj().events.dispatchImmediately('datavalidated');

    expect(chart.getChartObj().getLegendConfig().position).toEqual('bottom');
    expect(chart.getChartObj().getLegendConfig().dy).toEqual(16);
  });

  it('Label legend non clikable test', () => {
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
    chart.addLabelLegend({ clickable: false });
    const data = getDateAxisData('06-1-2020', '12-31-2020', 'date', ['cases']);
    data.forEach(d => {
      d.date = new Date(d.date);
    });
    chart.bindData(data);

    expect(chart.getChartObj().getLegendConfig().clickable).toEqual(false);
    expect(chart.getChartObj().getLegendConfig().labelFill).toEqual('#6c757d');
  });

  it('Label legend on click handler test', () => {
    const handler = jest.fn();
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
    chart.addLabelLegend({ clickable: true });
    chart.onLegendClick(handler);
    const data = getDateAxisData('06-1-2020', '12-31-2020', 'date', ['cases']);
    data.forEach(d => {
      d.date = new Date(d.date);
    });
    chart.bindData(data);

    expect(
      chart.getChartObj().legend.itemContainers.template.events.has('hit'),
    ).toEqual(true);

    chart
      .getChartObj()
      .legend.itemContainers.template.events.dispatchImmediately('hit');

    expect(handler).toBeCalledTimes(1);
  });
});
