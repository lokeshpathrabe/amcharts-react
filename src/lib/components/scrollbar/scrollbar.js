import { amcore } from 'lib/adapter/amcharts';
import { useEffect } from 'react';
import { useChart } from 'lib/components/context';
import { customizeScrollGrip } from './utils';

const Scrollbar = () => {
  const chart = useChart();
  useEffect(() => {
    if (chart) {
      const scrollbar = new amcore.Scrollbar();

      //set scrollbar background
      scrollbar.background.fill = amcore.color('#ced4Da');
      scrollbar.minHeight = 10;
      scrollbar.showSystemTooltip = false;
      scrollbar.thumb.showSystemTooltip = false;
      chart.zoomOutButton.disabled = true;

      //set scrollbar thumb background i.e the dragable area between grips
      scrollbar.thumb.background.fill = amcore.color('#ffffff');
      scrollbar.thumb.background.stroke = amcore.color('#ced4da');

      //set scrollbar grip
      scrollbar.startGrip.id = 'start-grip';
      scrollbar.endGrip.id = 'end-grip';

      customizeScrollGrip(scrollbar.startGrip);
      customizeScrollGrip(scrollbar.endGrip);

      chart.scrollbarX = scrollbar;
      chart.scrollbarX.parent = chart.bottomAxesContainer;
    }
  }, [chart]);
  return null;
};

export default Scrollbar;
