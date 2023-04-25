import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EditExistingCatalogListComponent } from '../edit-existing-catalog-list/edit-existing-catalog-list.component';
import { JsonEditorOptions, JsonEditorComponent } from 'ang-jsoneditor';
import { MenuItem, MessageService } from 'primeng/api';
@Component({
  selector: 'api-catalog-request-popup',
  templateUrl: './api-catalog-request-popup.component.html',
  styleUrls: ['./api-catalog-request-popup.component.scss'],
})
export class ApiCatalogRequestPopupComponent implements OnInit {
  rawRequest: any;
  @Output() cancel = new EventEmitter();
  @Input() ans = '';
  @Input() inputData = [];
  @Output() jsonResponse = new EventEmitter();
  public editorOptions: any;
  public editorOptions2: any;
  public datas: any;
  public data: any;
  modifiedJson: any;
  // items: MenuItem[];
  messageService: any;
  // activeIndex: any = 0;
  constructor(private apiCatalog: EditExistingCatalogListComponent) {
    this.editorOptions = {
      mode: 'code',
      onEvent: (node: { path: string | any[] }, event: MouseEvent) => {
        //var container = document.getElementById("path");
        if (event.type === 'click') {
          let absolute = 'object.';
          for (let i = 0; i < node.path.length; i++) {
            //console.log(node.path[i]);
            if (typeof node.path[i] === 'number') {
              absolute = absolute.substring(0, absolute.length - 1);
              /* eslint-disable */ absolute += '[' + node.path[i] + ']';
            } else {
              absolute += node.path[i];
            }
            if (i !== node.path.length - 1) {
              absolute += '.';
            }
          }
          this.ans = absolute;
          console.log(this.ans);
        }
      },
    };
    this.editorOptions2 = {
      mode: 'code',
      onEvent: (node: { path: string | any[] }, event: MouseEvent) => {
        //var container = document.getElementById("path");
        if (event.type === 'click') {
          let absolute = 'object.';
          for (let i = 0; i < node.path.length; i++) {
            //console.log(node.path[i]);
            if (typeof node.path[i] === 'number') {
              absolute = absolute.substring(0, absolute.length - 1);
              /* eslint-disable */ absolute += '[' + node.path[i] + ']';
            } else {
              absolute += node.path[i];
            }
            if (i !== node.path.length - 1) {
              absolute += '.';
            }
          }
          this.ans = absolute;
          console.log(this.ans);
        }
      },
    };
    // this.editorOptions = {
    //   mode: 'view',
    //   onEvent: (node: any, event: MouseEvent) => {
    //     if (event.type === 'click') {
    //       console.log(event, event.type, event.target);
    //       let absolute = 'object.';
    //       let abs = '';
    //       for (let i = 0; i < node.path.length; i++) {
    //         if (typeof node.path[i] === 'number') {
    //           absolute = absolute.substring(0, absolute.length - 1);
    //           /* eslint-disable */ absolute += '[' + node.path[i] + ']';
    //           abs = abs.substring(0, abs.length - 1);
    //           abs += '.' + node.path[i] + '';
    //         } else {
    //           absolute += node.path[i];
    //           abs += node.path[i];
    //         }
    //         if (i !== node.path.length - 1) {
    //           absolute += '.';
    //           abs += '.';
    //         }
    //       }
    //       this.ans = absolute;
    //       let x = this.data;
    //       const a = abs.split('.');
    //       for (let i = 0; i < a.length; i++) {
    //         x = x[a[i]];
    //       }
    //       // this.addFormArray('record', {
    //       //   //field: this.ans.split('.')[1],
    //       //   // field: this.ans.substring(this.ans.lastIndexOf('.') + 1),
    //       //   field: this.ans.substring(this.ans.indexOf('.') + 1),
    //       //   // value: this.data[this.ans.split('.')[1]],
    //       //   value: x,
    //       //   ans: this.ans.substring(this.ans.indexOf('.') + 1),
    //       //   isCreated: true,
    //       // });
    //     }
    //   },
    // };
    // this.data = {
    //   id: 12212,
    //   firstName: 'John',
    //   lastName: 'Smith',
    //   address: {
    //     street: '1431 Main St',
    //     city: 'Beverly Hills',
    //     state: 'CA',
    //     zipCode: '90210',
    //     qwerty: [
    //       {
    //         q: 'zdds',
    //         r: 'sda',
    //       },
    //       {
    //         q: 'ad',
    //         r: 'sddsa',
    //       },
    //       {
    //         q: 'sdfsd',
    //         r: 'fef',
    //       },
    //     ],
    //   },
    //   phoneNumber: '310-447-4121',
    //   ssn: '622-11-9999',
    // };
    // this.items = [
    //   {
    //     label: 'Actions',
    //     items: [
    //       {
    //         label: 'Add Data Set',
    //         icon: 'pi pi-plus-circle',
    //         command: () => {
    //           this.addData();
    //         },
    //       },
    //       {
    //         label: 'Automate Validation',
    //         icon: 'pi pi-cog',
    //         command: () => {
    //           this.automate();
    //         },
    //       },
    //       {
    //         label: 'Execute',
    //         icon: 'pi pi-sync',
    //         command: () => {
    //           this.execute();
    //         },
    //       },
    //       {
    //         label: 'Clear',
    //         icon: 'pi pi-times',
    //         command: () => {
    //           this.clear();
    //         },
    //       },
    //       {
    //         label: 'Delete',
    //         icon: 'pi pi-trash',
    //         command: () => {
    //           this.delete();
    //         },
    //       },
    //     ],
    //   },
    // ];
    // this.editorOptions2 = {
    //   mode: 'code',
    //   onEvent: (node: { path: string | any[] }, event: MouseEvent) => {
    //     //var container = document.getElementById("path");
    //     if (event.type === 'click') {
    //       let absolute = 'object.';
    //       for (let i = 0; i < node.path.length; i++) {
    //         //console.log(node.path[i]);
    //         if (typeof node.path[i] === 'number') {
    //           absolute = absolute.substring(0, absolute.length - 1);
    //           /* eslint-disable */ absolute += '[' + node.path[i] + ']';
    //         } else {
    //           absolute += node.path[i];
    //         }
    //         if (i !== node.path.length - 1) {
    //           absolute += '.';
    //         }
    //       }
    //       this.ans = absolute;
    //       console.log(this.ans);
    //     }
    //   },
    // };
    // this.datas = {
    //   id: 12212,
    //   firstName: 'John',
    //   lastName: 'Smith',
    //   address: {
    //     street: '1431 Main St',
    //     city: 'Beverly Hills',
    //     state: 'CA',
    //     zipCode: '90210',
    //     qwerty: [
    //       {
    //         q: 'zdds',
    //         r: 'sda',
    //       },
    //       {
    //         q: 'ad',
    //         r: 'sddsa',
    //       },
    //       {
    //         q: 'sdfsd',
    //         r: 'fef',
    //       },
    //     ],
    //   },
    //   phoneNumber: '310-447-4121',
    //   ssn: '622-11-9999',
    // };
    // this.items = [
    //   {
    //     label: 'Actions',
    //     items: [
    //       {
    //         label: 'Add Data Set',
    //         icon: 'pi pi-plus-circle',
    //         command: () => {
    //           this.addDatas();
    //         },
    //       },
    //       {
    //         label: 'Automate Validation',
    //         icon: 'pi pi-cog',
    //         command: () => {
    //           this.automates();
    //         },
    //       },
    //       {
    //         label: 'Execute',
    //         icon: 'pi pi-sync',
    //         command: () => {
    //           this.executes();
    //         },
    //       },
    //       {
    //         label: 'Clear',
    //         icon: 'pi pi-times',
    //         command: () => {
    //           this.clears();
    //         },
    //       },
    //       {
    //         label: 'Delete',
    //         icon: 'pi pi-trash',
    //         command: () => {
    //           this.deletes();
    //         },
    //       },
    //     ],
    //   },
    // ];
  }
  ngOnInit(): void {}

  addData(): void {
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Success',
      detail: 'Data Added',
    });
  }
  automate(): void {
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Success',
      detail: 'Validation Automated',
    });
  }
  execute(): void {
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Success',
      detail: 'Execution Completed',
    });
  }
  clear(): void {
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Success',
      detail: 'Cleared',
    });
  }
  delete(): void {
    this.messageService.add({
      key: 'tc',
      severity: 'warn',
      summary: 'Delete',
      detail: 'Data Deleted',
    });
  }
  addDatas(): void {
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Success',
      detail: 'Data Added',
    });
  }
  automates(): void {
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Success',
      detail: 'Validation Automated',
    });
  }
  executes(): void {
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Success',
      detail: 'Execution Completed',
    });
  }
  clears(): void {
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Success',
      detail: 'Cleared',
    });
  }
  deletes(): void {
    this.messageService.add({
      key: 'tc',
      severity: 'warn',
      summary: 'Delete',
      detail: 'Data Deleted',
    });
  }
  // jsonEditor(): void {
  //   this.activeIndex = 1;
  // }
  // clickSidebar(): void {
  //   this.apiCatalog.clickrequest(false);
  // }

  addDataEditor(): void {}
  cancelScreen() {
    this.cancel.emit();
  }

  onChangeJson(event: any) {
    console.log(Object.getPrototypeOf(event).constructor.name);
    if (Object.getPrototypeOf(event).constructor.name === 'Object') {
      console.log(event);
      this.modifiedJson = event;
    }
  }

  saveResponse() {
    this.jsonResponse.emit(this.modifiedJson);
  }
}
