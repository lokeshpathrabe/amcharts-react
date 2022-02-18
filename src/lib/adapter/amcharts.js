import * as amcore from '@amcharts/amcharts4/core';
import * as amcharts from '@amcharts/amcharts4/charts';
import animated_themes from '@amcharts/amcharts4/themes/animated';

amcore.useTheme(animated_themes);

// Enable paid license
amcore.options.commercialLicense = true;

// Daisy-chaining multiple charts
// amcore.options.queue = true;

// Lazy-loading charts
amcore.options.onlyShowOnViewport = true;

export { amcharts, amcore, animated_themes };
