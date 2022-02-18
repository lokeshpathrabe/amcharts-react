import { amcore } from 'lib/adapter/amcharts';
import scrollbar_grip from './scroll_grip.svg';

export const customizeScrollGrip = grip => {
  grip.icon.disabled = true;
  const img = grip.createChild(amcore.Image);
  img.height = 6;
  img.width = 6;
  img.dy = -3;
  img.dx = -3;
  img.marginTop = 0;
  img.href = scrollbar_grip;
  grip.background.fill = amcore.color('#ffffff');
  grip.background.stroke = amcore.color('#ced4da');
  grip.maxHeight = 8;
  grip.height = 16;
  grip.width = 16;
  grip.background.width = 8;
  grip.showSystemTooltip = false;
};
