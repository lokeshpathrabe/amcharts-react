const amcharts = jest.requireActual('@amcharts/amcharts4/charts');

class XYChart extends amcharts.XYChart {
  constructor(cfg) {
    super(cfg);
  }

  /**
   * @returns {object} Series config which needs to be verified against lib config
   */
  getSeriesConfig() {
    const seriesConfig = [];
    this.series.each(series => {
      seriesConfig.push({
        name: series.name,
        colWidth: series.columns.template.width,
        cornerRadiusTopLeft: series.columns.template.column.cornerRadiusTopLeft,
        cornerRadiusTopRight:
          series.columns.template.column.cornerRadiusTopRight,
        fillColor: series.fill.hex,
        strokeColor: series.stroke.hex,
        hoverStrokeWidth:
          series.columns.template.states._dictionary?.hover?.properties
            ?.strokeWidth,
        strokeWidth: series.columns.template.strokeWidth,
        stacked: series.stacked,
        tooltipHTML: series.columns.template.tooltipHTML || null,
        tooltipText: series.columns.template.tooltipText || null,
        tootipOrientation: series.tooltip.pointerOrientation,
        tooltipColor: series.tooltip.label.fill.hex,
        tooltipDateFormat: series.tooltipDateFormat,
        tooltipFill: series.tooltip.background.fill.hex,
        value: series.dataFields.valueY,
        xAxis: {
          dataKey: series.dataFields.dateX || series.dataFields.categoryX,
          type: series.dataFields.dateX ? 'date' : 'category',
        },
      });
    });
    return seriesConfig;
  }

  /**
   * Get xAxes config
   */
  getxAxesConfig() {
    const axesConfig = [];
    this.xAxes.each(axis => {
      axesConfig.push({
        axesLabelSize: axis.renderer.labels.template.fontSize,
        axesLabelColor: axis.renderer.labels.template.fill.hex,
        type: axis.dataFields.date ? 'date' : 'category',
        title: axis.title.text,
        minGridDistance: axis.renderer.minGridDistance,
        dateFormat: {
          year: axis?.dateFormats.getKey('year'),
          month: axis?.dateFormats.getKey('month'),
          week: axis?.dateFormats.getKey('week'),
          day: axis?.dateFormats.getKey('day'),
          hour: axis?.dateFormats.getKey('hour'),
          minute: axis?.dateFormats.getKey('minute'),
          second: axis?.dateFormats.getKey('second'),
          millisecond: axis?.dateFormats.getKey('millisecond'),
        },
      });
    });
    return axesConfig;
  }

  /**
   * Get yAxes config
   */
  getyAxesConfig() {
    const axesConfig = [];
    const autoScale = this._isAutoScale();
    this.yAxes.each(axis => {
      axesConfig.push({
        axesLabelSize: axis.renderer.labels.template.fontSize,
        axesLabelColor: axis.renderer.labels.template.fill.hex,
        title: axis.title.text,
        minGridDistance: axis.renderer.minGridDistance,
        gridLineWidth: axis.renderer.grid.template.strokeWidth,
        gridLineOpacity: axis.renderer.grid.template.strokeOpacity,
        opposite: axis.renderer.opposite,
      });
    });
    return axesConfig;
  }

  getLegendConfig() {
    return {
      fontSize: this.legend.labels.template.fontSize,
      fontFamily: this.legend.labels.template.fontFamily,
      fontWeight: this.legend.labels.template.fontWeight,
      clickable: this.legend.itemContainers.template.clickable,
      labelFill: this.legend.labels.template.fill.hex,
      align: this.legend.contentAlign,
      markerWidth: this.legend.markers.template.width,
      markerHeight: this.legend.markers.template.height,
      position: this.legend.position,
      dy: this.legend.dy,
      dx: this.legend.dx,
    };
  }

  _isAutoScale() {
    let autoScale = false;
    this.yAxes.each(axis => {
      autoScale = !(
        axis.min &&
        axis.minZoomed &&
        axis.min === axis.minZoomed &&
        axis.max &&
        axis.maxZoomed &&
        axis.max === axis.maxZoomed
      );
    });
    return autoScale;
  }
}

module.exports = {
  __esModule: true,
  ...amcharts,
  XYChart,
};
