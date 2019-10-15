import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import pt from 'vuetify/src/locale/pt';
import colors from 'vuetify/es5/util/colors';


Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: colors.indigo.base,
        secondary: colors.lime.base,
        accent: colors.teal.base,
        error: colors.red.base,
        warning: colors.amber.base,
        info: colors.lightBlue.base,
        success: colors.green.base,
      },
    },
  },
    lang: {
      locales: { pt },
      current: 'pt',
    },
  icons: {
    iconfont: 'md',
  },
});
