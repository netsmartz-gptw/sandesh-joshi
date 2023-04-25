import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { EditExistingCatalogListComponent } from '../edit-existing-catalog-list/edit-existing-catalog-list.component';

@Component({
  selector: 'api-catalog-response-popup',
  templateUrl: './api-catalog-response-popup.component.html',
  styleUrls: ['./api-catalog-response-popup.component.scss'],
})
export class ApiCatalogResponsePopupComponent implements OnInit {
  rawResponse: any;
  @Output() cancel = new EventEmitter();
  @Input() ans = '';
  @Input() inputData = [];
  public editorOptions2: any;
  public data: any;
  constructor(private apiCatalog: EditExistingCatalogListComponent) {
    this.editorOptions2 = {
      mode: 'view',
      onEvent: (node: { path: string | any[] }, event: MouseEvent) => {
        if (event.type === 'click') {
          console.log(event, event.type, event.target);
          let absolute = 'object.';
          let abs = '';
          for (let i = 0; i < node.path.length; i++) {
            if (typeof node.path[i] === 'number') {
              absolute = absolute.substring(0, absolute.length - 1);
              /* eslint-disable */ absolute += '[' + node.path[i] + ']';
              abs = abs.substring(0, abs.length - 1);
              abs += '.' + node.path[i] + '';
            } else {
              absolute += node.path[i];
              abs += node.path[i];
            }
            if (i !== node.path.length - 1) {
              absolute += '.';
              abs += '.';
            }
          }
          this.ans = absolute;
          let x = this.data;
          const a = abs.split('.');
          for (let i = 0; i < a.length; i++) {
            x = x[a[i]];
          }
          // this.addFormArray('records', {
          //   field: this.ans.substring(this.ans.indexOf('.') + 1),
          //   value: x,
          //   ans: this.ans.substring(this.ans.indexOf('.') + 1),
          //   isCreated: true,
          // });
        }
      },
    };
  }

  ngOnInit(): void {}
  // clickSidebar(): void {
  //   this.apiCatalog.clickresponse(false);
  // }
  cancelScreen() {
    this.cancel.emit();
  }
}
