import {make_path} from "./../utils/helpers";

export var config = {
  index_url: "/",
  storagePath: {
    glyphAttribute(signHex) {
      return ['glyph', 'attribute', signHex].join('.');
    }
  },
  routes: {
    project_editor: '/project/editor',
    project_editor_tab(param) {
      return make_path(this.project_editor, param ? param : '/:tab');
    }
  }
};