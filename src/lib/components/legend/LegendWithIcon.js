import { amcore } from 'lib/adapter/amcharts';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useChart } from 'lib/components/context';
import LabelLegend from './LabelLegend';
import { useBaseLegend } from './useBaseLegend';
import { baseLegendProps } from './props';

/**
 * Legend with custom icon and label
 */
const LegendWithIcon = props => {
  const chart = useChart();
  const legend = useBaseLegend(props);
  const { clickable, items, toggleOnClick } = props;
  useEffect(() => {
    if (chart) {
      const { icons } = props;

      if (icons) {
        const marker = legend.markers.template;
        marker.disposeChildren();

        // Add custom image instead
        const image = marker.createChild(amcore.Image);
        image.width = 16;
        image.height = 16;
        image.valign = 'top';
        image.dy = -3;
        image.dx = -2;

        image.adapter.add('href', function (href, target) {
          if (
            target.dataItem &&
            target.dataItem.dataContext &&
            target.dataItem.dataContext.name
          ) {
            const icon = icons.filter(
              icon => icon.name === target.dataItem.dataContext.name,
            );
            return icon[0]?.path;
          } else {
            return href;
          }
        });

        legend.itemContainers.template.events.on('hit', function (ev) {
          if (toggleOnClick) {
            ev.target.dataItem.marker.opacity = ev.target.isActive ? 1 : 0.4;
          }
        });
      }
      chart.legend = legend;
      chart.legend.interactionsEnabled = clickable;

      if (items) {
        const seriesNames = chart.legend.data.map(s => s.name);
        const ldata = items.map(item => {
          if (typeof item === 'string' && seriesNames.indexOf(item) > -1) {
            return chart.legend.data.filter(d => d.name === item)[0];
          }
          return item;
        });
        chart.legend.data = ldata;
      }
    }
  }, [chart]);
  return null;
};

LegendWithIcon.defaultProps = {
  ...baseLegendProps,
};

LegendWithIcon.propTypes = {
  clickable: PropTypes.bool,
  markerWidth: PropTypes.number,
  markerHeight: PropTypes.number,
  position: PropTypes.string,
  align: PropTypes.string,
  data: PropTypes.array,
  toggleOnClick: PropTypes.bool,
  onClick: PropTypes.func,
};

export default LegendWithIcon;
