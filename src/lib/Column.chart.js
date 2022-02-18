import React, { useLayoutEffect, useState } from 'react';
import { amcore, amcharts } from 'lib/adapter/amcharts';
import { deepMerge } from 'utils/functions';
import { ChartContext, useChart } from './components/context';
import { baseChartProps } from './props';
import DataSet from 'lib/components/DataSet';
import PropTypes from 'prop-types';

const cloneChildren = (children, props) => {
  if (children) {
    const { xAxis, yAxis } = props;
    if (Array.isArray(children)) {
      return children.map(
        child =>
          child &&
          React.cloneElement(child, deepMerge({ xAxis, yAxis }, child.props)),
      );
    }
    return React.cloneElement(children, { xAxis, yAxis });
  }
};

const _fixYAxisScale = chart => {
  chart.yAxes.each(valueAxis => {
    valueAxis.min = valueAxis.minZoomed;
    valueAxis.max = valueAxis.maxZoomed + 0.1 * valueAxis.maxZoomed;
  });
};

const _onDataValidated = (chart, props) => {
  const maxZoomCount = _calculateMaxZoomCount(chart, props);
  chart.xAxes.each(axis => (axis.maxZoomCount = maxZoomCount));
  // Disable scrollbar if not needed
  if (chart.scrollbarX) {
    chart.xAxes.getIndex(0).reinit();
    if (chart.data.length > maxZoomCount) {
      chart.scrollbarX.disabled = false;
      chart.xAxes.getIndex(0).zoom({
        start: 0,
        end: 0.999,
      });
      // Reinit scrollbar chart
      if (chart.scrollbarX.scrollbarChart)
        chart.scrollbarX.scrollbarChart.reinit();
    } else {
      chart.xAxes.getIndex(0).zoom({
        start: 0,
        end: 1,
      });
      chart.scrollbarX.disabled = true;
    }
  }
};

/**
 * Checks if all column series in chart are as stacked column series
 * @returns {boolean} stacked
 */
const _isStacked = chart => {
  let isStacked = true;
  chart?.series?.each(s => {
    isStacked = isStacked && s.stacked;
  });
  return isStacked;
};

const _calculateMaxZoomCount = (chart, { xAxis }) => {
  const seriesCnt = chart.series.length;
  if (seriesCnt) {
    const containerWidth = chart.plotContainer.pixelWidth;
    const isStacked = _isStacked(chart);
    const multiSeries = chart.series.length > 1;
    const dataLength = (chart.data && chart.data.length) || 0;
    const maxZoomCount = 100;

    let isClusterColumnSeries = multiSeries && !isStacked;
    chart.series.each(s => {
      isClusterColumnSeries =
        isClusterColumnSeries && s instanceof amcharts.ColumnSeries;
    });

    const minimumColumnDistance = xAxis.minCellDistance;

    if (isClusterColumnSeries) {
      const colWidth = chart.series.getIndex(0).columns.template.width;
      return (
        Math.round(
          containerWidth / (colWidth * seriesCnt + minimumColumnDistance),
        ) - 2
      );
    }

    return (
      Math.round(
        containerWidth /
          (chart.series.getIndex(0).columns.template.width +
            minimumColumnDistance),
      ) - 2
    );
  }
  return null;
};

/**
 * @param {number} deg - Degree by which to rotate the xAxis labels.
 */
const rotateXAxisLabels = (chart, deg) => {
  chart.xAxes.each(axis => {
    axis.renderer.labels.template.horizontalCenter = 'left';
    axis.renderer.labels.template.verticalCenter = 'middle';
    axis.renderer.labels.template.rotation = deg;
  });
};

/**
 * TODO: Solve the chart=undefined problem
 */
const _attachClusterColumnHandler = () => {
  const chart = useChart();
  if (chart) {
    chart.series.each(s => {
      if (s instanceof amcharts.ColumnSeries) {
        s.events.on('hidden', _clusterColumns, chart);
        s.events.on('shown', _clusterColumns, chart);
      }
    });
  }
};

const _clusterColumns = chart => {
  const series = chart.series.getIndex(0);
  const xAxis = chart.xAxes.getIndex(0);
  const xAxisType =
    { category: 'categoryX', date: 'dateX' }[appliedConfig.xAxis.type] ||
    'categoryX';

  xAxis.renderer.cellStartLocation = 0.1;
  xAxis.renderer.cellEndLocation = 0.9;
  const width =
    1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
  if (series.dataItems.length > 1) {
    const x0 = xAxis.getX(series.dataItems.getIndex(0), xAxisType);
    const x1 = xAxis.getX(series.dataItems.getIndex(1), xAxisType);
    const delta = ((x1 - x0) / chart.series.length) * width;
    if (amcore.isNumber(delta)) {
      const middle = chart.series.length / 2;

      let newIndex = 0;
      chart.series.each(function (series) {
        if (!series.isHidden && !series.isHiding) {
          series.dummyData = newIndex;
          newIndex++;
        } else {
          series.dummyData = chart.series.indexOf(series);
        }
      });
      const visibleCount = newIndex;
      const newMiddle = visibleCount / 2;

      chart.series.each(function (series) {
        const trueIndex = chart.series.indexOf(series);
        const newIndex = series.dummyData;

        const dx = (newIndex - trueIndex + middle - newMiddle) * delta;

        series.animate(
          { property: 'dx', to: dx },
          series.interpolationDuration,
          series.interpolationEasing,
        );
        series.bulletsContainer.animate(
          { property: 'dx', to: dx },
          series.interpolationDuration,
          series.interpolationEasing,
        );
      });
    }
  }
};

const multiColumnSeriesAnimation = children => {
  if (Array.isArray(children)) {
    let colSeriesCount = 0;
    children.forEach(child => {
      if (child?.type?.name === 'ColumnSeries') {
        colSeriesCount++;
      }
    });

    if (colSeriesCount > 1) {
      _attachClusterColumnHandler();
    }
  }
};

const ColumnChart = ({ children, ...otherProps }) => {
  const props = deepMerge(ColumnChart.defaultProps, otherProps);
  const {
    id,
    xAxis,
    yAxis,
    axesLabelColor,
    axesLabelSize,
    gridLineWidth,
    gridLineOpacity,
    chartTitle,
    chartTitleAlign,
    chartTitleSize,
    chartTitleWeight,
    chartFontFamily,
    data,
    loading,
  } = props;

  const [chart, setChart] = useState();

  useLayoutEffect(() => {
    const mychart = amcore.create(id, amcharts.XYChart);
    //Chart level config
    mychart.fontFamily = chartFontFamily;

    //Add chart title
    if (chartTitle) {
      const title = mychart.titles.create();
      title.text = chartTitle;
      title.fontSize = chartTitleSize;
      title.marginBottom = 30;
      title.align = chartTitleAlign;
      title.fontWeight = chartTitleWeight;
      title.fontFamily = chartFontFamily;
    }

    let chartXAxis = null;
    if (xAxis.type === 'category') {
      const categoryAxis = mychart.xAxes.push(new amcharts.CategoryAxis());
      categoryAxis.dataFields.category = xAxis.dataKey;
      categoryAxis.renderer.minGridDistance = xAxis.minGridDistance;
      categoryAxis.minZoomCount = xAxis.minZoomCount;
      categoryAxis.renderer.grid.template.location = 0.5;
      categoryAxis.renderer.disabled = xAxis.hidden;
      chartXAxis = categoryAxis;
    }
    if (xAxis.type === 'date') {
      const dateAxis = mychart.xAxes.push(new amcharts.DateAxis());
      dateAxis.dataFields.date = xAxis.dataKey;
      dateAxis.renderer.minGridDistance = xAxis.minGridDistance;
      dateAxis.showOnInit = false;
      dateAxis.keepSelection = true;
      dateAxis.minZoomCount = xAxis.minZoomCount;
      dateAxis.renderer.grid.template.location = 0.5;
      dateAxis.renderer.disabled = xAxis.hidden;
      dateAxis.renderer.labels.template.dx = 10;
      if (xAxis.dateFormat) {
        dateAxis.dateFormats.setKey('minute', 'HH:mm:ss');
        dateAxis.dateFormats.setKey('hour', 'HH:mm:ss');
        dateAxis.dateFormats.setKey('second', 'HH:mm:ss');
        dateAxis.dateFormats.setKey('millisecond', 'mm:ss SSS');
        dateAxis.dateFormats.setKey('day', xAxis.dateFormat);
        dateAxis.dateFormats.setKey('month', xAxis.dateFormat);
        dateAxis.dateFormats.setKey('year', xAxis.dateFormat);
        dateAxis.dateFormats.setKey('week', xAxis.dateFormat);

        dateAxis.periodChangeDateFormats.setKey('minute', 'HH:mm:ss');
        dateAxis.periodChangeDateFormats.setKey('hour', 'HH:mm:ss');
        dateAxis.periodChangeDateFormats.setKey('second', 'HH:mm:ss');
        dateAxis.periodChangeDateFormats.setKey('millisecond', 'mm:ss SSS');
        dateAxis.periodChangeDateFormats.setKey('day', xAxis.dateFormat);
        dateAxis.periodChangeDateFormats.setKey('month', xAxis.dateFormat);
        dateAxis.periodChangeDateFormats.setKey('year', xAxis.dateFormat);
        dateAxis.periodChangeDateFormats.setKey('week', xAxis.dateFormat);
      }
      chartXAxis = dateAxis;
    }

    chartXAxis.renderer.grid.template.disabled = true;
    chartXAxis.renderer.labels.template.fill = axesLabelColor;
    chartXAxis.renderer.labels.template.fontSize = axesLabelSize;
    chartXAxis.renderer.labels.template.fontFamily = chartFontFamily;
    chartXAxis.renderer.baseGrid.disabled = true;

    if (xAxis.title) {
      chartXAxis.title.text = xAxis.title;
      chartXAxis.title.fontFamily = chartFontFamily;
      chartXAxis.title.fontSize = axesLabelSize;
      chartXAxis.title.fill = axesLabelColor;
      chartXAxis.title.dy = 8;
    }

    if (xAxis.labelRenderer && typeof xAxis.labelRenderer === 'function') {
      chartXAxis.renderer.labels.template.adapter.add(
        'text',
        (label, target) => {
          return xAxis.labelRenderer(label, target.dataItem);
        },
      );
    }

    const valueAxis = mychart.yAxes.push(new amcharts.ValueAxis());
    valueAxis.calculateTotals = true;
    valueAxis.renderer.minGridDistance = yAxis.minGridDistance;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.grid.template.disabled = false;
    valueAxis.renderer.grid.template.strokeWidth = gridLineWidth;
    valueAxis.renderer.grid.template.strokeOpacity = gridLineOpacity;
    valueAxis.renderer.labels.template.fill = axesLabelColor;
    valueAxis.renderer.labels.template.fontSize = axesLabelSize;
    valueAxis.renderer.labels.template.fontFamily = chartFontFamily;
    valueAxis.renderer.opposite = yAxis.opposite;
    valueAxis.renderer.disabled = yAxis.hidden;

    if (yAxis.title) {
      valueAxis.title.text = yAxis.title;
      valueAxis.title.fontFamily = chartFontFamily;
      valueAxis.title.fontSize = axesLabelSize;
      valueAxis.title.fill = axesLabelColor;
      valueAxis.title.dx = -8;
    }

    if (yAxis.labelRenderer && typeof yAxis.labelRenderer === 'function') {
      valueAxis.renderer.labels.template.adapter.add(
        'text',
        (label, target) => {
          return yAxis.labelRenderer(label, target.dataItem);
        },
      );
    }

    if (xAxis?.rotateLabel) {
      rotateXAxisLabels(mychart, xAxis.rotateLabel);
    }

    //Add on ready event handler
    mychart.events.on('datavalidated', ev => _onDataValidated(mychart, props));
    if (yAxis.min) {
      valueAxis.min = yAxis.min;
    }
    if (yAxis.max) {
      valueAxis.max = yAxis.max;
    }
    if (!yAxis.autoScale) {
      mychart.events.on('ready', ev => _fixYAxisScale(mychart));
    }
    setChart(mychart);
    return () => mychart.dispose();
  }, []);

  multiColumnSeriesAnimation(children);

  return (
    <ChartContext.Provider value={chart}>
      <div style={{ width: '100%', height: '100%' }} id={id} />
      {cloneChildren(children, props)}
      <DataSet data={data} />
    </ChartContext.Provider>
  );
};

ColumnChart.propTypes = {
  type: PropTypes.string
};

ColumnChart.defaultProps = {
  ...baseChartProps,
  xAxis: {
    type: 'category', // One of [category|date]
    dataKey: 'some_category',
    title: null,
    minGridDistance: 5,
    dateFormat: 'MMM dd',
    minCellDistance: 8,
  },
  yAxis: {
    title: null,
    minGridDistance: 30,
    autoScale: false,
    opposite: false,
  },
};

export default ColumnChart;
