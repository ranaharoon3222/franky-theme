import { generateClasses } from '@formkit/themes';
import { genesisIcons } from '@formkit/icons';
import { createMultiStepPlugin } from '@formkit/addons';
import { createProPlugin, repeater, autocomplete } from '@formkit/pro';
import { plugin, defaultConfig } from '@formkit/vue';
import { en, fr, nl } from '@formkit/i18n';

import '@formkit/pro/genesis';
import '@formkit/addons/css/multistep';

// import '@formkit/addons/css/repeater';

const pro = createProPlugin('fk-8c442f5e8c', {
  repeater,
  autocomplete,
});

const config = defaultConfig({
  locales: { en, fr, nl },
  // Define the active locale
  locale: 'en',
  theme: 'genesis',
  plugins: [createMultiStepPlugin(), pro],
  icons: {
    ...genesisIcons,
  },
});

export default config;
