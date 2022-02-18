import { amcore, amcharts } from 'lib/adapter/amcharts';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useChart } from 'lib/components/context';
import { baseSeriesProps } from './props';

const ColumnSeries = props => {
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
        colWidth,
        fillColor,
        strokeColor,
        cornerRadiusTopRight,
        cornerRadiusTopLeft,
        tooltipFill,
        tooltipColor,
        stacked,
        clickable,
        clickableColWidth,
        tooltipDateFormat,
        strokeWidth,
        hoverStrokeWidth,
        onClick,
        tooltipTextRenderer,
        columnRenderer,
      } = props;

      const series = chart.series.push(new amcharts.ColumnSeries());
      series.name = name;

      // Set stacked column series
      series.stacked = stacked;

      // Tooltip config
      if (tooltipHTML) {
        series.tooltipHTML = tooltipHTML;
      }

      if (tootipOrientation)
        series.tooltip.pointerOrientation = tootipOrientation;

      if (tooltipTextRenderer && typeof tooltipTextRenderer === 'function') {
        series.columns.template.adapter.add('tooltipText', (text, target) => {
          return tooltipTextRenderer(text, target.tooltipDataItem.dataContext);
        });
      }

      if (xAxis.type === 'category') {
        series.dataFields.categoryX = xAxis.dataKey;
        series.columns.template.tooltipText = tooltipText;
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = amcore.color(tooltipFill);
        series.tooltip.label.fill = amcore.color(tooltipColor);
      }
      if (xAxis.type === 'date') {
        series.dataFields.dateX = xAxis.dataKey;
        series.tooltipDateFormat = tooltipDateFormat;
        series.columns.template.tooltipText = tooltipText;
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = amcore.color(tooltipFill);
        series.tooltip.label.fill = amcore.color(tooltipColor);
      }
      if (value) series.dataFields.valueY = value;

      series.columns.template.width = colWidth;
      series.columns.template.strokeWidth = strokeWidth;
      if (clickable) {
        series.columns.template.width = clickableColWidth;
        series.columns.template.cursorOverStyle =
          amcore.MouseCursorStyle.pointer;
        const hs = series.columns.template.states.create('hover');
        hs.properties.strokeWidth = hoverStrokeWidth;
      }

      const amFillColor = amcore.color(fillColor);
      const amStrokeColor = amcore.color(strokeColor);
      series.fill = amFillColor;
      series.stroke = amStrokeColor;
      series.columns.template.column.cornerRadiusTopLeft = cornerRadiusTopLeft;
      series.columns.template.column.cornerRadiusTopRight = cornerRadiusTopRight;
      series.columns.template.column.fillOpacity = 1;

      if (onClick) {
        series.columns.template.events.on('hit', ev => {
          onClick.call(null, ev, series);
        });
      }

      if (columnRenderer) {
        series.columns.template.adapter.add('fill', (fill, target) => {
          return columnRenderer(fill, target.dataItem.dataContext);
        });
        series.columns.template.adapter.add('stroke', (stroke, target) => {
          return columnRenderer(stroke, target.dataItem.dataContext);
        });
      }
    }
  }, [chart]);
  return null;
};

ColumnSeries.propTypes = {
  name: PropTypes.string, // To be overridden
  value: PropTypes.string,
  tootipOrientation: PropTypes.string,
  tooltipHTML: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipDateFormat: PropTypes.string,
  stacked: PropTypes.bool,
};

ColumnSeries.defaultProps = {
  ...baseSeriesProps,
  cornerRadiusTopLeft: 2,
  cornerRadiusTopRight: 2,
  colWidth: 8,
  clickableColWidth: 12,
  hoverStrokeWidth: 4,
  strokeWidth: 1,
  stacked: false,
};

export default ColumnSeries;
