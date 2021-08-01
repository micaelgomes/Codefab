export const tags = {
  '!top': ['fable', 'scene', 'agent'],
  '!attrs': {},
  toto: {},
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
      id: null,
      'item-descriptor': null,
      img: ['path', 'src'],
      x: null,
      y: null,
      width: null,
      height: null,
      sprite: null,
      text: null,
    },
    children: [],
  },
};
