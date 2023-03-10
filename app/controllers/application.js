import Controller from '@ember/controller';
import { set, get } from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class ApplicationController extends Controller {

  data = "OK";

  constructor(owner, args) {
    super(owner, args);
    console.log("controller");
     const rows10 = { len: 1000 };
      for (let i = 0; i < 1000; i += 1) {
        rows10[i] = {
          cells: {
            0: { text: 'A-' + i },
            1: { text: 'B-' + i },
            2: { text: 'C-' + i },
            3: { text: 'D-' + i },
            4: { text: 'E-' + i },
            5: { text: 'F-' + i },
          }
        };
      }
      const rows = {
        len: 80,
        1: {
          cells: {
            0: { text: 'testingtesttestetst' },
            2: { text: 'testing' },
          },
        },
        2: {
          cells: {
            0: { text: 'render', style: 0 },
            1: { text: 'Hello' },
            2: { text: 'haha', merge: [1, 1] },
          }
        },
        8: {
          cells: {
            8: { text: 'border test', style: 0 },
          }
        }
      };

   this.data ={
          freeze: 'B3',
          styles: [
            {
              bgcolor: '#f4f5f8',
              textwrap: true,
              color: '#900b09',
              border: {
                top: ['thin', '#0366d6'],
                bottom: ['thin', '#0366d6'],
                right: ['thin', '#0366d6'],
                left: ['thin', '#0366d6'],
              },
            },
          ],
          merges: [
            'C3:D4',
          ],
          cols: {
            len: 10,
            2: { width: 200 },
          },
          rows,
        };


  }


}
