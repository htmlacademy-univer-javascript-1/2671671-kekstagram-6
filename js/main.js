import { similarArray } from './util.js';
import { initGallery } from './gallery.js';
import { initForm } from './form.js';

initGallery();
initForm();

console.dir(similarArray, { depth: null, colors: true });
