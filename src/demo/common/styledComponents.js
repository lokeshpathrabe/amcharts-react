import styled from 'styled-components';

export const LargeChartContainer = styled.div`
  display: inline-flex;
  height: 400px;
  width: 100%;
  padding: 20px;
  font-family: 'cursive';
`;

export const MediumChartContainer = styled.div`
  display: inline-flex;
  height: 400px;
  width: 800px;
  padding: 20px;
  font-family: 'cursive';
`;

export const SmallChartContainer = styled.div`
  display: inline-flex;
  height: 400px;
  width: 500px;
  padding: 20px;
  font-family: 'cursive';
`;

export const chartContainers = {
  small: SmallChartContainer,
  medium: MediumChartContainer,
  large: LargeChartContainer,
};
