import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ApiRequestHeaderService } from '../../service/api-request-header.service';
import { ApiRequestParamService } from '../../service/api-request-param.service';
import { EditExistingCatalogListComponent } from '../edit-existing-catalog-list/edit-existing-catalog-list.component';

@Component({
  selector: 'api-catalog-execution-popup',
  templateUrl: './api-catalog-execution-popup.component.html',
  styleUrls: ['./api-catalog-execution-popup.component.scss'],
})
export class ApiCatalogExecutionPopupComponent implements OnInit {
  Executionlogs: any;
  treeData: any = [];
  @Output() cancel = new EventEmitter();
  @Input() inputData: any;
  paramsDetails: any;
  requestHeaderDetails: any;
  public editorOptions: any;
  constructor(
    private apiCatalog: EditExistingCatalogListComponent,
    private apiRequestParamService: ApiRequestParamService,
    private apiRequestHeaderService: ApiRequestHeaderService
  ) {
    this.editorOptions = {
      mode: 'view',
      /* eslint-disable */
      onEvent: (node: { path: string | any[] }, event: MouseEvent) => {
        //var container = document.getElementById("path");
        // if (event.type === 'click') {
        //   let absolute = 'object.';
        //   for (let i = 0; i < node.path.length; i++) {
        //     //console.log(node.path[i]);
        //     if (typeof node.path[i] === 'number') {
        //       absolute = absolute.substring(0, absolute.length - 1);
        //       /* eslint-disable */ absolute += '[' + node.path[i] + ']';
        //     } else {
        //       absolute += node.path[i];
        //     }
        //     if (i !== node.path.length - 1) {
        //       absolute += '.';
        //     }
        //   }
        //   this.ans = absolute;
        //   console.log(this.ans);
        // }
      },
    };
  }

  ngOnInit(): void {
    this.getAPIRequestParamsDetails();
    this.getAPIRequestHeadersDetails();
  }

  ngOnChanges(): void {
    this.getAPIRequestParamsDetails();
    this.getAPIRequestHeadersDetails();
  }
  split_at_index(value: any, index: number): any {
    const cindex: number = index + 1;
    const returnval: any = [value.substring(0, cindex), value.substring(cindex)].filter((val: any) => {
      const valr = val != null;
      return valr;
    });
    return returnval;
  }

  generateSplit(nodelabel: any): any {
    const index = nodelabel.search(/(?!:\/\/)(:)/);
    const returnData: any = this.split_at_index(nodelabel, index)
      .map((val: string) => {
        const retuns = `<span>${val}</span>`;
        return retuns;
      })
      .join('');
    return returnData;
  }
  // clickSidebar(): void {
  //   this.apiCatalog.clickexecution(false);
  // }
  cancelScreen() {
    this.cancel.emit();
  }

  getAPIRequestParamsDetails() {
    this.apiRequestParamService.apiCatalogParamquery(this.inputData).subscribe(
      res => {
        if (res.body) {
          this.paramsDetails = res.body;
        }
      },
      err => {}
    );
  }

  getAPIRequestHeadersDetails() {
    this.apiRequestHeaderService.apiCatalogHeaderquery(this.inputData).subscribe(
      res => {
        console.log(res);
        if (res.body) {
          this.requestHeaderDetails = res.body;
        }
      },
      err => {}
    );
  }
}
