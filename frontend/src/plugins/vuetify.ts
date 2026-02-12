import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'appThemeLight',
    themes: {
      appThemeLight: {
        dark: false,
        colors: {
          primary: '#0d9488',
          'primary-darken-1': '#0f766e',
          secondary: '#64748b',
          surface: '#f8fafc',
          background: '#f1f5f9',
        },
      },
      appThemeDark: {
        dark: true,
        colors: {
          primary: '#0d9488',
          'primary-darken-1': '#0f766e',
          secondary: '#94a3b8',
          surface: '#1e293b',
          background: '#0f172a',
        },
      },
    },
  },
  defaults: {
    VCard: {
      elevation: 2,
      rounded: 'lg',
    },
    VBtn: {
      rounded: 'lg',
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: 'lg',
      hideDetails: 'auto',
    },
  },
})
