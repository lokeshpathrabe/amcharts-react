import { amcore, amcharts } from 'lib/adapter/amcharts';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useChart } from 'lib/components/context';
import { baseSeriesProps } from './props';

const LineSeries = props => {
  const chart = useChart();
  useEffect(() => {
    if (chart) {
      const {
        name,
        xAxis,
        value,
        tootipOrientation,
        tooltipText,
        tooltipHTML,
        strokeWidth,
        strokeColor,
        fillColor,
        tooltipFill,
        tooltipColor,
        tooltipDateFormat,
        fillOpacity,
        hoverStrokeWidth,
      } = props;

      const series = new amcharts.LineSeries();
      series.name = name;

      // Tooltip config
      if (tooltipHTML) {
        series.tooltipHTML = tooltipHTML;
      }

      if (tootipOrientation)
        series.tooltip.pointerOrientation = tootipOrientation;

      if (xAxis.type === 'category') {
        series.dataFields.categoryX = xAxis.dataKey;
        series.tooltipText = tooltipText;
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = amcore.color(tooltipFill);
        series.tooltip.label.fill = amcore.color(tooltipColor);
      }
      if (xAxis.type === 'date') {
        series.dataFields.dateX = xAxis.dataKey;
        series.tooltipDateFormat = tooltipDateFormat;
        series.tooltipText = tooltipText;
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = amcore.color(tooltipFill);
        series.tooltip.label.fill = amcore.color(tooltipColor);
      }
      if (value) series.dataFields.valueY = value;

      const amStrokeColor = amcore.color(strokeColor);
      const amFillColor = amcore.color(fillColor);
      series.stroke = amStrokeColor;
      series.strokeWidth = strokeWidth;

      if (fillColor) {
        series.fill = amFillColor;
        series.fillOpacity = fillOpacity;
      }

      // Create hover state
      series.segments.template.interactionsEnabled = true;
      const hs = series.segments.template.states.create('hover');
      hs.properties.strokeWidth = hoverStrokeWidth;

      chart.series.push(series);
    }
  }, [chart]);
  return null;
};

LineSeries.propTypes = {
  name: PropTypes.string, // To be overridden
  value: PropTypes.bool,
  tootipOrientation: PropTypes.string,
  tooltipHTML: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipDateFormat: PropTypes.string,
  strokeWidth: PropTypes.number,
  hoverStrokeWidth: PropTypes.number,
  fillOpacity: PropTypes.number,
};

LineSeries.defaultProps = {
  ...baseSeriesProps,
  name: 'LineSeries',
  strokeWidth: 1,
  hoverStrokeWidth: 2,
  fillOpacity: 0.1,
};

export default LineSeries;
