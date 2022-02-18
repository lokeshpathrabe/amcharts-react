import { amcharts, amcore } from 'lib/adapter/amcharts';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useChart } from 'lib/components/context';
import { customizeScrollGrip } from './utils';

const _onValidated = scrollbar => {
  const scrollxAxis = scrollbar.scrollbarChart.xAxes.getIndex(0);
  scrollxAxis.renderer.grid.template.disabled = true;
  scrollxAxis.renderer.labels.template.dy = 30;
  scrollxAxis.renderer.labels.template.rotation = 0;
};

const PreviewScrollbar = ({ series, xAxis }) => {
  const chart = useChart();
  useEffect(() => {
    if (chart) {
      const scrollbar = new amcharts.XYChartScrollbar();
      const seriesToPush = [];
      chart.series.each(s => {
        if (series.indexOf(s.name) > -1) {
          seriesToPush.push(s);
        }
      });

      Array.prototype.forEach.call(seriesToPush, s => {
        scrollbar.series.push(s);
      });

      //scrollbar styling
      scrollbar.minHeight = 40;
      scrollbar.showSystemTooltip = false;
      scrollbar.background.fill = amcore.color('#e9ecef');
      scrollbar.thumb.showSystemTooltip = false;
      scrollbar.thumb.background.fill = amcore.color('#cba5a4');

      scrollbar.background.stroke = amcore.color('#e9ecef');
      scrollbar.background.strokeOpacity = 1;

      //Stop autoscaling of yaxis in scrollbar series
      scrollbar.scrollbarChart.yAxes.each(valueAxis => {
        valueAxis.min = valueAxis.minZoomed;
        valueAxis.max = valueAxis.maxZoomed;
      });

      // Configure column series
      scrollbar.scrollbarChart.series.each((s, idx) => {
        s.showOnInit = false;
        if (s instanceof amcharts.ColumnSeries) {
          s.columns.template.width = 2;
        }
      });

      if (xAxis?.minGridDistance) {
        scrollbar.scrollbarChart.xAxes.getIndex(0).renderer.minGridDistance =
          xAxis.minGridDistance;
      }

      //Customize scroll grips
      customizeScrollGrip(scrollbar.startGrip);
      customizeScrollGrip(scrollbar.endGrip);

      // Events
      scrollbar.events.on('validated', () => _onValidated(scrollbar));

      chart.scrollbarX = scrollbar;
      chart.scrollbarX.parent = chart.bottomAxesContainer;
      chart.zoomOutButton.disabled = true;

      // Bring back colors
      chart.scrollbarX.scrollbarChart.plotContainer.filters.clear();
    }
  }, [chart]);
  return null;
};

PreviewScrollbar.propTypes = {
  legendSeries: PropTypes.array,
};

PreviewScrollbar.defaultProps = {
  legendSeries: [],
};

export default PreviewScrollbar;
