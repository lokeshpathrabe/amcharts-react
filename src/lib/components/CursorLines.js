import { useLayoutEffect } from 'react';
import { amcore, amcharts } from 'lib/adapter/amcharts';
import { useChart } from './context';

const CursorLines = () => {
  const chart = useChart();
  useLayoutEffect(() => {
    if (chart) {
      chart.cursor = new amcharts.XYCursor();
      chart.cursor.behavior = 'none';
    }
  }, [chart]);
  return null;
};

export default CursorLines;
