import { useEffect, useState } from 'react';
import { amcore, amcharts } from 'lib/adapter/amcharts';

export const useBaseLegend = props => {
  const [legend, setLegend] = useState();
  useEffect(() => {
    const {
      markerHeight,
      markerWidth,
      fontSize,
      fontFamily,
      fontWeight,
      position,
      align,
      clickable,
      clickableFontColor,
      nonClickableFontColor,
      onClick,
      toggleOnClick,
    } = props;

    const legend = new amcharts.Legend();
    legend.useDefaultMarker = true;
    legend.labels.template.fontSize = fontSize;
    legend.labels.template.fontFamily = fontFamily;
    legend.labels.template.fontWeight = fontWeight;

    if (clickable) {
      legend.labels.template.fill = amcore.color(clickableFontColor);
    } else {
      legend.labels.template.fill = amcore.color(nonClickableFontColor);
      legend.itemContainers.template.clickable = false;
      legend.itemContainers.template.focusable = false;
      legend.itemContainers.template.cursorOverStyle =
        amcore.MouseCursorStyle.default;
    }

    legend.contentAlign = align;

    // Marker config
    const markerTemplate = legend.markers.template;
    markerTemplate.width = markerWidth;
    markerTemplate.height = markerHeight;
    markerTemplate.dy = -1;
    markerTemplate.children.each(children => {
      children.cornerRadius(8, 8, 8, 8);
    });

    // Control positioning
    legend.position = position;
    switch (position) {
      case 'top':
        legend.dy = -16;
        break;
      case 'bottom':
        legend.dy = 16;
        break;
      case 'left':
        legend.dx = -16;
        break;
      case 'right':
        legend.dx = 16;
        break;
      default:
        legend.dx = 0;
        break;
    }

    if (!toggleOnClick) {
      legend.itemContainers.template.togglable = false;
    }

    if (onClick) {
      legend.itemContainers.template.events.on('hit', ev => {
        onClick.call(null, ev, legend);
      });
    }
    setLegend(legend);
  }, []);
  return legend;
};
