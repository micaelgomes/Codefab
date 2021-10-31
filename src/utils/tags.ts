export const tags = {
  '!top': ['fable', 'scene', 'agent'],
  '!attrs': {},
  fable: {
    attrs: {
      width: null,
      height: null,
    },
    children: ['scene'],
  },
  scene: {
    attrs: {
      background: ['bg.png', 'noite.png'],
      sound: null,
      title: null,
      'id-only': ['true', 'false'],
    },
    children: ['agent'],
  },
  agent: {
    attrs: {
      img: ['path', 'src'],
      x: null,
      y: null,
      width: null,
      height: null,
      sprite: null,
      text: null,
      'animation-name': null,
      animation: null,
      'frame-count': null,
      draggable: null,
    },
    children: [],
  },
};
