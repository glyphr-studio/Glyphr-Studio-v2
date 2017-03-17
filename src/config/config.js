import {make_path} from "./../utils/helpers";
// import {storage} from "./../lib/storage/Storage";
import {testProject} from "./../test/test_project.js";

export let config = {
  version: '2.0.0',
  versionString: 'Glyphr Studio - Version 2 alpha',
  defaultGlyph: "0x0041",
  selected: {
    glyph: '0x0041'
  },

  devMode: true,
  devModeSetup() {
    console.log('devModeSetup()');
    // storage.set('GlyphrStudio', "hola!");
    window.GlyphrStudio = { currentProject: false };
    window.GlyphrStudio.currentProject = testProject;
  },

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