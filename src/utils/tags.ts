export const tags = {
  '!top': ['fable', 'page', 'agent'],
  '!attrs': {},
  fable: {
    attrs: {},
    children: ['page'],
  },
  page: {
    attrs: {
      background: ['bg.png', 'noite.png'],
      soundtrack: null,
      sound: null,
      title: null,
    },
    children: ['agent'],
  },
  agent: {
    attrs: {
      img: ['name_image'],
      x: null,
      y: null,
      width: null,
      height: null,
      sprite: null,
      text: null,
      color: null,
      'font-size': null,
      'frame-count': null,
      fps: null,
      draggable: null,
      'on-touch': ['_NEXT_PAGE', '_PREV_PAGE', '_GOTO_PAGE:'],
      'on-trigger': null,
    },
    children: [],
  },
};
