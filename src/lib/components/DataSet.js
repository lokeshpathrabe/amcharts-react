import { useEffect } from 'react';
import { useChart } from './context';

const DataSet = ({ data }) => {
  const chart = useChart();
  useEffect(() => {
    if (chart) {
      chart.data = data;
    }
  }, [chart, data]);
  return null;
};

export default DataSet;
