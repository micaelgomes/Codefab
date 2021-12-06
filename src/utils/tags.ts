export const tags = {
  '!top': ['fable', 'page', 'agent'],
  '!attrs': {},
  fable: {
    attrs: { 'start-in': null },
    children: ['page'],
  },
  page: {
    attrs: {
      background: ['name_image_file'],
      soundtrack: ['name_audio_file'],
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
      draggable: ['true', 'false'],
      'on-touch': ['_NEXT_PAGE', '_PREV_PAGE', '_GOTO_PAGE:'],
      'on-trigger': null,
      'on-press': ['true', 'false'],
      'on-drop': null,
      'drop-zone': null,
    },
    children: [],
  },
};
