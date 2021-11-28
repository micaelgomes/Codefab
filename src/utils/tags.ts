export const tags = {
  '!top': ['fable', 'page', 'agent'],
  '!attrs': {},
  fable: {
    attrs: {
      width: null,
      height: null,
      title: null,
      thumb: null,
      'start-in': null,
    },
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
      img: ['path', 'src'],
      x: null,
      y: null,
      width: null,
      height: null,
      sprite: null,
      text: null,
      color: null,
      'font-size': null,
      'animation-name': null,
      animation: null,
      'frame-count': null,
      draggable: null,
      'on-touch': [
        '_NEXT_PAGE',
        '_PREV_PAGE',
        'STOP_SOUNDTRACK',
        'PLAY_SOUNDTRACK',
      ],
      'on-trigger': null,
    },
    children: [],
  },
};
