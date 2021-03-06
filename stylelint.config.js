module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-order'],
  plugins: ['stylelint-order'],
  rules: {
    'rule-empty-line-before': 'never',
    'order/properties-order': [
      { unspecified: 'bottom' },
      {
        emptyLineBefore: 'never',
        groupName: 'layout',
        properties: [
          'position',
          'z-index',
          'display',
          'grid',
          'grid-area',
          'grid-auto-columns',
          'grid-auto-flow',
          'grid-auto-rows',
          'grid-column',
          'grid-column-end',
          'grid-column-gap',
          'grid-column-start',
          'grid-gap',
          'grid-row',
          'grid-row-end',
          'grid-row-gap',
          'grid-row-start',
          'grid-template',
          'grid-template-areas',
          'grid-template-columns',
          'grid-template-rows',
          'align-content',
          'align-items',
          'align-self',
          'flex',
          'flex-basis',
          'flex-direction',
          'flex-flow',
          'flex-grow',
          'flex-shrink',
          'flex-wrap',
          'justify-content',
          'order',
          'float',
        ]
      },
      {
        emptyLineBefore: 'never',
        groupName: 'box model',
        properties: [
          'width',
          'height',
          'margin',
          'margin-top',
          'margin-right',
          'margin-bottom',
          'margin-left',
          'padding',
          'padding-top',
          'padding-right',
          'padding-bottom',
          'padding-left',
          'box-shadow',
          'background',
          'background-attachment',
          'background-blend-mode',
          'background-clip',
          'background-color',
          'background-image',
          'background-origin',
          'background-position',
          'background-repeat',
          'background-size',
          'border',
          'border-width',
          'border-style',
          'border-color',
          'border-radius',
          'border-top',
          'border-top-color',
          'border-top-style',
          'border-top-width',
          'border-right',
          'border-right-color',
          'border-right-style',
          'border-right-width',
          'border-bottom',
          'border-bottom-color',
          'border-bottom-left-radius',
          'border-bottom-right-radius',
          'border-bottom-style',
          'border-bottom-width',
          'border-left',
          'border-left-color',
          'border-left-style',
          'border-left-width'
        ]
      },
      {
        emptyLineBefore: 'never',
        groupName: 'font',
        properties: [
          'transition',
          'transition-delay',
          'transition-duration',
          'transition-property',
          'transition-timing-function',
        ]
      },
      {
        emptyLineBefore: 'never',
        groupName: 'typography',
        properties: [
          'color',
          'font',
          'font-family',
          "font-style",
          'font-size',
          'font-size-adjust',
          'font-stretch',
          'font-variant',
          'font-weight',
          'text-align',
          'text-shadow',
          'text-transform'
        ]
      },
      {
        emptyLineBefore: 'never',
        groupName: 'misc',
        properties: [
        ]
      },
    ]
  }
}

// border-radius, border-top-left-radius, border-top-right-radius, border-bottom-right-radius, border-bottom-left-radius, border-image,
// border-image-source, border-image-slice, border-image-width, border-image-outset, border-image-repeat,
// line-height, position, z-index, top, right, bottom, left, display, visibility,
//   float, clear, overflow, overflow-x, overflow-y, clip, zoom, align-content, align-items,
// align-self, flex, flex-flow, flex-basis, flex-direction, flex-grow, flex-shrink, flex-wrap,
// justify-content, order, box-sizing, width, min-width, max-width, height, min-height, max-height,
//   margin, margin-top, margin-right, margin-bottom, margin-left, padding, padding-top, padding-right,
// padding-bottom, padding-left, table-layout, empty-cells, caption-side, border-spacing, border-collapse,
// list-style, list-style-position, list-style-type, list-style-image, content, quotes, counter-reset, counter-increment,
//   resize, cursor, user-select, nav-index, nav-up, nav-right, nav-down, nav-left, transition, transition-delay, transition-timing-function,
// transition-duration, transition-property, transform, transform-origin, animation, animation-name, animation-duration, animation-play-state,
// animation-timing-function, animation-delay, animation-iteration-count, animation-direction, text-align, text-align-last, vertical-align,
// white-space, text-decoration, text-emphasis, text-emphasis-color, text-emphasis-style, text-emphasis-position, text-indent, text-justify,
// letter-spacing, word-spacing, text-outline, text-transform, text-wrap, text-overflow, text-overflow-ellipsis, text-overflow-mode,
// word-wrap, word-break, tab-size, hyphens, pointer-events, opacity, outline, outline-width,
// outline-style, outline-color, outline-offset, background, background-color, background-image, background-repeat,
// background-attachment, background-position, background-position-x, background-position-y, background-clip, background-origin,
// background-size, box-decoration-break, box-shadow, text-shadow
