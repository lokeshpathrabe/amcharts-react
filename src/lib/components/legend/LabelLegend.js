import { amcore, amcharts } from 'lib/adapter/amcharts';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useChart } from 'lib/components/context';
import { useBaseLegend } from './useBaseLegend';
import { baseLegendProps } from './props';

/**
 *
 * @param {object} cfg
 * @param {string} [cfg.align=right] - Horizontally align legend. Posible values left/right/center. This will work for position "top" and "bottom"
 * @param {string} cfg.position=top - Position legend around chart. Posible values top/bottom/left/right
 * @param {boolean} cfg.clickable=true - Toggle legend click interaction
 */
const LabelLegend = props => {
  const chart = useChart();
  const legend = useBaseLegend(props);
  const { clickable, renderer } = props;
  useEffect(() => {
    if (chart) {
      chart.legend = legend;
      chart.legend.interactionsEnabled = clickable;
      if (renderer && typeof renderer === 'function') {
        chart.legend.data = renderer(chart.legend.data);
      }
    }
  }, [chart]);
  return null;
};

LabelLegend.defaultProps = {
  ...baseLegendProps,
};

LabelLegend.propTypes = {
  clickable: PropTypes.bool,
  markerWidth: PropTypes.number,
  markerHeight: PropTypes.number,
  position: PropTypes.string,
  align: PropTypes.string,
  data: PropTypes.array,
  toggleOnClick: PropTypes.bool,
  onClick: PropTypes.func,
};

export default LabelLegend;
