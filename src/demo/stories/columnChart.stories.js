import React, { useState } from 'react';
import {
  MediumChartContainer,
  LargeChartContainer,
  SmallChartContainer,
} from 'common/styledComponents';
import { select } from '@storybook/addon-knobs';
import ColumnDocs from 'docs/columnchart.docs.mdx';
import statusRed from 'assets/icons/status_red.svg';
import statusGreen from 'assets/icons/status_green.svg';
import warning from 'assets/icons/warning.svg';
import {
  countryData,
  clickableColumnData,
  getDateAxisData,
} from 'common/generateData';

import RColumnChart from 'lib/Column.chart';
import RColumnSeries from 'lib/components/series/ColumnSeries';
import RLineSeries from 'lib/components/series/LineSeries';
import RScrollbar from 'lib/components/scrollbar/scrollbar';
import RPreviewScrollbar from 'lib/components/scrollbar/PreviewScrollbar';
import RLabelLegend from 'lib/components/legend/LabelLegend';
import RIconLegend from 'lib/components/legend/LegendWithIcon';
import CursorLines from 'lib/components/CursorLines';

export default {
  title: 'Charts/Column Chart',
  component: RColumnChart,
  parameters: {
    // docs: {
    //   page: ColumnDocs,
    // },
    knobs: {
      disabled: true,
    },
    viewMode: 'canvas',
    options: { selectedPanel: 'storybook/source-loader/panel' },
  },
};

export const categoryColumnChart = () => {
  return (
    <MediumChartContainer style={{ height: '500px' }}>
      <RColumnChart
        id="doc-col-chart"
        chartTitle="Category Column Series"
        xAxis={{
          type: 'category',
          dataKey: 'country',
          title: 'Country',
          rotateLabel: 90,
        }}
        yAxis={{
          title: 'Visits',
        }}
        data={countryData}
      >
        <RColumnSeries name="Country Visits" value="visits" />
        <RLabelLegend align="right" />
        <RScrollbar />
      </RColumnChart>
    </MediumChartContainer>
  );
};

categoryColumnChart.parameters = {
  storysource: {
    disabled: false,
    selected: true,
  },
  knobs: {
    disabled: true,
  },
};

export const withPreviewScrollbar = () => {
  return (
    <MediumChartContainer style={{ height: '500px' }}>
      <RColumnChart
        id="doc-col-chart"
        chartTitle="Category Column Series"
        xAxis={{
          type: 'category',
          dataKey: 'country',
          rotateLabel: 90,
        }}
        yAxis={{
          title: 'Visits',
        }}
        data={countryData}
      >
        <RColumnSeries
          name="Country Visits"
          value="visits"
          strokeColor="#A0EBCD"
          fillColor="#A0EBCD"
        />
        <RLabelLegend align="right" clickable={false} />
        <RPreviewScrollbar
          series={['Country Visits']}
          xAxis={{ minGridDistance: 50 }}
        />
      </RColumnChart>
    </MediumChartContainer>
  );
};

export const clickableColumnChart = () => {
  return (
    <MediumChartContainer>
      <RColumnChart
        id="doc-col-chart"
        chartTitle="Category Column Series"
        xAxis={{
          type: 'category',
          dataKey: 'country',
          title: 'Country',
          minGridDistance: 50,
        }}
        yAxis={{
          title: 'Visits',
        }}
        data={clickableColumnData}
      >
        <RColumnSeries
          name="Country Visits "
          value="visits"
          clickable={true}
          onClick={(ev, series) => {
            alert(
              `Clicked on ${ev.target.dataItem.dataContext.country} value: ${ev.target.dataItem.dataContext.visits}`,
            );
          }}
        />
        <RLabelLegend
          align="left"
          onClick={(ev, legend) => {
            alert(`Clicked on ${ev.target.dataItem.name}`);
          }}
          toggleOnClick={false}
        />
        <RScrollbar />
      </RColumnChart>
    </MediumChartContainer>
  );
};

export const dateAxisChart = props => {
  const chartData = getDateAxisData(
    new Date('06-1-2020'),
    new Date('12-31-2020'),
    'date',
    ['cases'],
  );
  chartData.forEach(data => {
    data.date = new Date(data.date);
  });
  return (
    <MediumChartContainer>
      <RColumnChart
        id="column-date-chart"
        chartTitle="Date Axis Chart"
        xAxis={{
          type: 'date',
          dataKey: 'date',
          title: 'Date',
          minGridDistance: 100,
          dateFormat: 'MMM dd, yyyy hh:mm:ss',
        }}
        yAxis={{
          title: 'Cases',
        }}
        data={chartData}
      >
        <RColumnSeries
          value="cases"
          tooltipText="{dateX.formatDate('MMM dd')}: [bold]{valueY}[/]"
          fillColor="#616DDC"
          strokeColor="#616DDC"
        />
        <RLabelLegend />
        <RScrollbar />
      </RColumnChart>
    </MediumChartContainer>
  );
};

export const multiColumnSeries = () => {
  const chartData = getDateAxisData(
    new Date('12-1-2020'),
    new Date('12-31-2020'),
    'date',
    ['success', 'warning'],
  );
  chartData.forEach((data, i) => {
    data.date = new Date(data.date);
  });

  return (
    <MediumChartContainer>
      <RColumnChart
        id="doc-col-chart"
        chartTitle="Multi Column Series"
        xAxis={{
          type: 'date',
          dataKey: 'date',
          title: 'Country',
          minGridDistance: 50,
        }}
        yAxis={{
          title: 'value1',
        }}
        data={chartData}
      >
        <RColumnSeries
          name="Success"
          value="success"
          fillColor="#81C784"
          strokeColor="#81C784"
          tooltipText="{dateX}: [bold]{valueY}[/]"
          colWidth={6}
        />
        <RColumnSeries
          name="Warning"
          value="warning"
          fillColor="#FBC02E"
          strokeColor="#FBC02E"
          tooltipText="{dateX}: [bold]{valueY}[/]"
          colWidth={6}
        />
        <RIconLegend
          align="center"
          position="bottom"
          icons={[
            {
              name: 'Success',
              path: statusGreen,
            },
            {
              name: 'Warning',
              path: warning,
            },
          ]}
        />
      </RColumnChart>
    </MediumChartContainer>
  );
};

export const stackedColumnSeries = () => {
  const chartData = getDateAxisData(
    new Date('11-1-2020'),
    new Date('12-31-2020'),
    'date',
    ['value1', 'value2', 'value3'],
  );
  chartData.forEach((data, i) => {
    data.date = new Date(data.date);
  });
  return (
    <MediumChartContainer>
      <RColumnChart
        id="doc-col-chart"
        chartTitle="Stacked Column Series"
        xAxis={{
          type: 'date',
          dataKey: 'date',
          title: 'Country',
          minGridDistance: 50,
          labelRenderer: (label, data) => {
            return `m ${label}`;
          },
        }}
        yAxis={{
          title: 'value1',
          labelRenderer: (label, data) => {
            return `m ${label}`;
          },
        }}
        data={chartData}
      >
        <RColumnSeries
          name="Success"
          value="value1"
          fillColor="#81C784"
          strokeColor="#81C784"
          tooltipText="{dateX.formatDate('MMMM dd')}: [bold]{valueY}[/]"
          stacked={true}
        />
        <RColumnSeries
          name="Warning"
          value="value2"
          fillColor="#FBC02E"
          strokeColor="#FBC02E"
          tooltipText="{dateX.formatDate('MMMM dd')}: [bold]{valueY}[/]"
          stacked={true}
        />
        <RColumnSeries
          name="Failed"
          value="value3"
          fillColor="#EF5350"
          strokeColor="#EF5350"
          tooltipText="{dateX.formatDate('MMMM dd')}: [bold]{valueY}[/]"
          stacked={true}
        />

        <RScrollbar />
        <RIconLegend
          align="center"
          icons={[
            {
              name: 'Success',
              path: statusGreen,
            },
            {
              name: 'Warning',
              path: warning,
            },
            {
              name: 'Failed',
              path: statusRed,
            },
          ]}
        />
      </RColumnChart>
    </MediumChartContainer>
  );
};

export const columnLineSeries = () => {
  const selectRecords = () =>
    select(
      '# of Records',
      { 20: '20', 50: '50', 300: '300', 1000: '1000' },
      '300',
    );
  const chartRef = React.useRef({});
  const dataSetLen = selectRecords();
  const chartData = getDateAxisData(
    new Date('5-1-2019'),
    new Date('12-31-2020'),
    'date',
    ['files', 'size'],
  );
  const currentChartData = Array.prototype.slice.call(chartData, 0, dataSetLen);

  // For charts with dates on xAxis, the value must be instance of Date
  currentChartData.forEach((data, i) => {
    data.date = new Date(data.date);
  });

  return (
    <LargeChartContainer>
      <RColumnChart
        key={dataSetLen}
        id="doc-col-chart"
        chartTitle="Column Line Series"
        xAxis={{
          type: 'date',
          dataKey: 'date',
          title: 'Backup Date',
          minGridDistance: 50,
          dateFormat: 'MMM dd, yyyy',
        }}
        yAxis={{
          title: '# Files',
          autoScale: true,
        }}
        data={currentChartData}
      >
        <RColumnSeries
          name="# Files"
          value="files"
          tooltipText="{dateX.formatDate('MMM dd')}: [bold]{valueY}[/]"
          columnRenderer={(color, dataContext) => {
            if (dataContext.files > 590) {
              return '#E16153';
            }
            return color;
          }}
        />
        <RLineSeries
          name="Size"
          value="size"
          strokeColor="#6C757D"
          fillColor="#6C757D"
          fillOpacity={0}
          tooltipText="{dateX.formatDate('MMM dd')}: [bold]{valueY}[/]"
        />
        <RPreviewScrollbar series={['# Files']} />
        <RLabelLegend
          renderer={data => {
            data.push({ name: '#customer', fill: '#E16153' });
            return data;
          }}
        />
        <CursorLines />
      </RColumnChart>
    </LargeChartContainer>
  );
};

columnLineSeries.parameters = {
  knobs: {
    disabled: false,
  },
};
