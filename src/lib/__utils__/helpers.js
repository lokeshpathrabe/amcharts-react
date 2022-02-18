export const setupTest = async () => {
  page.setDefaultTimeout(10000);

  await page.setViewport({
    width: 800,
    height: 450,
    deviceScaleFactor: 1,
  });
  await page.goto('http://localhost:4444');
  page.evaluate(() => {
    am4core.options.autoSetClassName = true;
    am4core.options.classNamePrefix = 'amcharts-';
  });
  await expect(page.title()).resolves.toMatch('amcharts-react');
};

const compareconfig = (config, expectedConfig) => {
  let result = null;
  Object.keys(config).forEach(key => {
    if (Object.keys(expectedConfig).indexOf(key) > -1) {
      result = config[key] === expectedConfig[key];
    }
  });
};

export const getExpectedSeriesConfig = chart => {
  const expectedConfig = [];
  chart.getConfig().series.forEach(({ ...config }) => {
    if (config.clickable) {
      config.colWidth = config.clickableColWidth;
    } else {
      config.hoverStrokeWidth = undefined;
    }
    if (config.xAxis.type === 'category') {
      config.tooltipDateFormat = undefined;
    }
    if (!config.tootipOrientation) {
      config.tootipOrientation = 'horizontal';
    }

    delete config.clickable;
    delete config.clickableColWidth;

    expectedConfig.push(config);
  });
  return expectedConfig;
};

export const getExpectedxAxesConfig = chart => {
  const expectedConfig = [];
  const config = chart.getConfig().chart;
  expectedConfig.push({
    axesLabelSize: config.axesLabelSize,
    axesLabelColor: config.axesLabelColor,
    type: config.xAxis.type,
    title: config.xAxis.title,
    minGridDistance: config.xAxis.minGridDistance,
    dateFormat: {
      year: config.xAxis.dateFormat,
      month: config.xAxis.dateFormat,
      week: config.xAxis.dateFormat,
      day: config.xAxis.dateFormat,
      hour: 'HH:mm:ss',
      minute: 'HH:mm:ss',
      second: 'HH:mm:ss',
      millisecond: 'mm:ss SSS',
    },
  });
  return expectedConfig;
};

export const getExpectedyAxesConfig = chart => {
  const expectedConfig = [];
  const config = chart.getConfig().chart;
  expectedConfig.push({
    axesLabelSize: config.axesLabelSize,
    axesLabelColor: config.axesLabelColor,
    title: config.yAxis.title,
    minGridDistance: config.yAxis.minGridDistance,
    gridLineWidth: config.gridLineWidth,
    gridLineOpacity: config.gridLineOpacity,
    opposite: config.yAxis.opposite,
  });
  return expectedConfig;
};

export const getExpectedLegendConfig = chart => {
  const expectedConfig = chart.getConfig().legends.map(config => {
    let dy = 0;
    let dx = 0;
    switch (config.position) {
      case 'top':
        dy = -16;
        break;
      case 'bottom':
        dy = 16;
        break;
      case 'left':
        dx = -16;
        break;
      case 'right':
        dx = 16;
        break;
      default:
        dx = 0;
        break;
    }
    return {
      fontSize: config.fontSize,
      fontFamily: config.fontFamily,
      fontWeight: config.fontWeight,
      clickable: config.clickable,
      labelFill: config.clickableFontColor,
      align: config.align,
      markerWidth: 12,
      markerHeight: 12,
      position: config.position,
      dy,
      dx,
    };
  });
  return expectedConfig[0];
};

export const defaultChartConfig = {
  chart: {
    axesLabelSize: 10,
    axesLabelColor: '#6c757d',
    gridLineWidth: 1,
    gridLineOpacity: 0.05,
    chartTitle: 'Category Column Series',
    chartFontFamily: 'Open Sans',
    chartTitleSize: 14,
    chartTitleWeight: 600,
    chartTitleAlign: 'left',
    id: 'chart-container',
    xAxis: {
      type: 'category',
      dataKey: 'country',
      title: 'Country',
      minGridDistance: 5,
      dateFormat: 'MMM dd',
      minCellDistance: 8,
    },
    yAxis: {
      title: 'Visits',
      minGridDistance: 30,
      autoScale: false,
      opposite: false,
    },
  },
  series: [
    {
      name: 'Country Visits',
      value: 'visits',
      tootipOrientation: null,
      tooltipFill: '#ffffff',
      tooltipColor: '#6c757d',
      fillColor: '#3ca6d4',
      strokeColor: '#3ca6d4',
      tooltipHTML: null,
      tooltipText: '{categoryX}: [bold]{valueY}[/]',
      tooltipDateFormat: 'MMM-dd',
      cornerRadiusTopLeft: 2,
      cornerRadiusTopRight: 2,
      colWidth: 8,
      clickableColWidth: 12,
      hoverStrokeWidth: 4,
      strokeWidth: 1,
      stacked: false,
      clickable: true,
      xAxis: {
        dataKey: 'country',
        type: 'category',
      },
    },
  ],
  legends: [
    {
      fontSize: 12,
      fontFamily: 'Open Sans',
      fontWeight: 400,
      clickable: true,
      clickableFontColor: '#2171b5',
      nonClickableFontColor: '#6c757d',
      markerWidth: 12,
      markerHeight: 12,
      position: 'top',
      align: 'right',
    },
  ],
};
