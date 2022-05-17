// @ts-check
'use-strict'

const radix = require('tailwindcss-radix')
const forms = require('@tailwindcss/forms')

/**
 * turns a string or an array of strings from pixel values to rem values
 * @example
 * rem('16px')
 * // returns '1rem'
 * @example
 * rem(['16px'])
 * // returns ['1rem']
 */
const rem = (px) => {
  if (typeof px === 'string') {
    return Number.parseFloat((Number.parseInt(px) / 16).toString()) + 'rem'
  } else if (Array.isArray(px)) {
    return px.map(rem)
  }
}

/**
 * from name to css variable. Does not take opacity into consideration on purpose.
 * @example
 * v('text-primary')
 * // returns `var(--text-primary)`
 */
const v = (variableName) => `var(--${variableName})`

const fontSize = {
  caption: rem(['12px', '16px']),
  body: rem(['14px', '20px']),
  'body-lg': rem(['18px', '24px']),
  subtitle: rem(['20px', '28px']),
  title: rem(['28px', '36px']),
  'title-lg': rem(['40px', '52px']),
  display: rem(['68px', '92px']),
}

const textColor = {
  white: '#ffffff',
  black: '#000000',
  primary: v('text-primary'),
  secondary: v('text-secondary'),
  tertiary: v('text-tertiary'),
  disabled: v('text-disabled'),
}

const backgroundColor = {
  control: {
    DEFAULT: v('bg-control-default'),
  },
  accent: {
    DEFAULT: v('bg-accent-default'),
    disabled: v('bg-accent-disabled'),
  },
  solid: {
    primary: v('bg-solid-primary'),
    secondary: v('bg-solid-secondary'),
    tertiary: v('bg-solid-tertiary'),
    quaternary: v('bg-solid-quaternary'),
  },
  subtle: {
    secondary: v('bg-subtle-secondary'),
    tertiary: v('bg-subtle-tertiary'),
  },
}

const borderColor = {
  surface: {
    DEFAULT: v('border-surface-default'),
    flyout: v('border-surface-flyout'),
  },
  card: {
    DEFAULT: v('border-card-default'),
  },
}

const colors = {
  system: {
    attention: '#005fb7',
    'attention-bg': '#f6f6f6',
    success: '#0f7b0f',
    'success-bg': '#dff6dd',
    caution: '#9d5d00',
    'caution-bg': '#fff4ce',
    critical: '#c42b1c',
    'critical-bg': '#fde7e9',
  },
}

const borderRadius = {
  base: rem('4px'),
  DEFAULT: rem('7px'),
}

const spacing = {
  0.75: rem('3px'),
  1.75: rem('7px'),
  7.5: rem('30px'),
}

const boxShadow = {
  tooltip: v('shadow-tooltip'),
  flyout: v('shadow-flyout'),
}

const gridAutoRows = { 17.5: rem('70px') }
const gridAutoColumns = { 20: rem('80px') }

const transitionTimingFunction = {
  point: 'cubic-bezier(0.55, 0.55, 0, 1)',
}

module.exports = {
  content: [
    './index.html',
    './{assets,components,public,views}/**/*.{tsx,svg}',
  ],
  theme: {
    fontSize,
    textColor,
    extend: {
      spacing,
      backgroundColor,
      borderColor,
      colors,
      borderRadius,
      boxShadow,
      gridAutoRows,
      gridAutoColumns,
      transitionTimingFunction,
    },
  },
  plugins: [radix({ variantPrefix: '' }), forms],
}
