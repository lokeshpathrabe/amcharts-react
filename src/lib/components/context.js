import React, { useContext } from 'react';

const ChartContext = React.createContext();

const useChart = () => useContext(ChartContext);

export { ChartContext, useChart };
