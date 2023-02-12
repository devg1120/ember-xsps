import { setModifierManager } from '@ember/modifier';
import EmberObject from '@ember/object';
import { capabilities } from '@ember/modifier';

import Spreadsheet from 'x-data-spreadsheet';

export function createSpreadsheet(el, args) {

  let { children } = el;

  console.log(args.id);
  console.log(args.data);

 //const s = new Spreadsheet("#x-spreadsheet-demo")
 const s = new Spreadsheet("#" + args.id)
  //.loadData({}) // load data
  .loadData(args.data) // load data
  .change(data => {
    // save data to db
  });
  return s;


}


class SpreadsheetModifierManager {
  capabilities= capabilities('3.22');   //GS

  constructor(owner) {
    this.owner = owner;
  }

  createModifier(factory, args) {
    return factory.create(args);
  }

  installModifier(instance, element, args) {
    let { positional, named } = args;
    instance.element = element;
    instance.didInsertElement(element, positional, named);
  }

  updateModifier(instance, args) {
    let { positional, named } = args;
    instance.didUpdate(instance.element, positional, named);
  }


  destroyModifier(instance) {
    instance.willDestroyElement();
  }
}

class SpreadsheetModifier extends EmberObject {
  didInsertElement(el, positional, args) {
    this.splitInstance = createSpreadsheet(el, args);
  }

  didUpdate(el, positional, args) {
    let { rerender } = args;
    if (this.rerender !== rerender) {
      if (this.splitInstance) {
        this.splitInstance.destroy();
        this.splitInstance = null;
      }

      this.splitInstance = createSpreadSheet(el, args);
      this.rerender = rerender;
    }
  }

  willDestroyElement() {
    if (this.splitInstance) {
      this.splitInstance.destroy();
      this.splitInstance = null;
    }
  }
}

export default setModifierManager(
  (owner) => new SpreadsheetModifierManager(owner), SpreadsheetModifier
);
