import { Component, OnInit, Inject, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonEditorOptions, JsonEditorComponent } from 'ang-jsoneditor';
import { MenuItem, MessageService } from 'primeng/api';
import { ApiRequestService } from '../../service/api-request.service';
import { ApiCollectionsService } from '../../service/api-collections.service';
import { ApiRequestParamService } from '../../service/api-request-param.service';
import { TestResultService } from 'app/entities/TestOpsCtrl/api-test/service/test-result.service';
import { ApiRequestHeaderService } from '../../service/api-request-header.service';
import { time } from 'console';
import { PrimeNGConfig } from 'primeng/api';
import { FieldInputService } from '../../service/field-input.service';
import { async } from 'rxjs';
import { ASC, DESC, ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { IApiRequest } from 'app/entities/TestOpsCtrl/api-request/model/api-request.model';
import { IApiTest } from 'app/entities/TestOpsCtrl/api-test/model/api-test.model';
import { IStep } from 'app/entities/TestOpsCtrl/api-test/model/step.model';
import { ApiTestPackService } from 'app/entities/TestOpsCtrl/api-test-pack/service/api-test-pack.service';
import { JSONPath } from 'jsonpath-plus';
import { object } from 'blockly/core/utils';
import { TaskExecutionService } from '../../service/task-execution.service';
import { AccountService } from 'app/core/auth/account.service';
import { FieldValidatorService } from '../../service/field-validator.service';
//import { ApiTestPackService } from '../../service/api-test-pack.service';
@Component({
  selector: 'edit-existing-catalog-list',
  templateUrl: './edit-existing-catalog-list.component.html',
  styleUrls: ['./edit-existing-catalog-list.component.scss'],
  providers: [MessageService],
})
export class EditExistingCatalogListComponent implements OnInit {
  enterValue = new FormControl('');
  public selectedId: any;
  public selectedPrjId: any;
  selectedEnvironment: any;
  toggleCatalog = false;
  toggleApi = true;
  ind: any = 0;
  indd: any = 0;
  tabView: any = 0;
  tabViews: any = 0;
  bg_color!: boolean;
  expandFullCard: any = false;
  Cardexpand: any = 0;
  panelOpenState = false;
  createAuthModal: any;
  editAuthModal: any;
  cardShow: any = 1;
  titleShow: any = 1;
  paramsForm!: FormGroup;
  nameForm!: FormGroup;
  requestForm!: FormGroup;
  rightTable!: FormGroup;
  leftTable!: FormGroup;
  version: any;
  changeTabView: any = true;
  apiRequest: any;
  apiExecuteRequest: any;
  getParamsData: any;
  getTestRunData: any;
  getTestResultData: any;
  getImportId: any;
  currentData: any;
  selectCardData: any;
  selectedApiIndex: any;
  editArray: any = [];
  method = ['Get', 'Post', 'Patch', 'Put', 'Opt', 'Delete'];
  currApiSearch: any;
  pageStartSizeApi = 0;
  pageStartSizeTest = 0;
  isLoadingApi = false;
  pageAPI?: number;
  itemsPerPage = ITEMS_PER_PAGE;
  ngbPaginationPageAPI = 1;
  predicate!: string;
  ascending!: boolean;
  catelogRevision: any = [];
  //apiCalling: any;
  totalItems = 0;
  rawText: any = [];
  // linkText: any = 'url';
  highlight: any = false;
  selectedOption: any;
  validations: any = [{ field: 'Response Code', validation: 'Equals', value: '200' }];
  Iurl: any;
  options1: any = [
    { name: 'GET' },
    { name: 'POST' },
    { name: 'PATCH' },
    { name: 'PUT' },
    { name: 'OPTION' },
    { name: 'DELETE' },
    { name: 'COPY' },
    { name: 'HEAD' },
    { name: 'LINK' },
    { name: 'UNLINK' },
    { name: 'PURGE' },
    { name: 'LOCK' },
    { name: 'UNLOCK' },
  ];

  sidelistplay: any = [
    {
      name: 'Add Beneficiary',
      method: 'get',
      timetaken: '',
      status: '',
      isSucess: false,
      isSelected: this.highlight,
    },
    {
      name: 'Create Accounts',
      method: 'post',
      timetaken: '2ms',
      status: '400',
      isSucess: false,
      isSelected: this.highlight,
    },
    {
      name: 'Login User',
      method: 'patch',
      timetaken: '2ms',
      status: '200 Ok',
      isSucess: true,
      isSelected: this.highlight,
    },
    {
      name: 'get Accounts',
      method: 'put',
      timetaken: '2ms',
      status: '200 Ok',
      isSucess: true,
      isSelected: this.highlight,
    },
    {
      name: 'Create Accounts',
      method: 'opt',
      timetaken: '2ms',
      status: '200 Ok',
      isSucess: true,
      isSelected: this.highlight,
    },
    {
      name: 'Create Accounts',
      method: 'delete',
      timetaken: '2ms',
      status: '400',
      isSucess: false,
      isSelected: this.highlight,
    },
  ];
  tablevalue: any = [
    {
      fieldName: 'Account_id',
      fieldValue: null,
    },
    {
      fieldName: 'Label',
      fieldValue: null,
    },
    {
      fieldName: 'Currency',
      fieldValue: null,
    },
  ];
  selectedTreeValue: any = [];
  cardShow1: any;
  highlightCard: any;
  accountName: any;
  // requestList: requestReq[];
  selectedRequestEndPoint = [];
  // items: MenuItem[];
  @ViewChild(JsonEditorComponent, { static: false }) editor?: JsonEditorComponent;
  sidebarclass!: any;
  drawercom!: any;
  openSidebar = false;
  activeIndex: any = 0;
  @Input() ans = '';
  public editorOptions: any;
  public data: any;
  items: MenuItem[];
  public editorOptions2: any;
  messageService: any;
  statusCode: any;
  dataResponce: any;
  getValObj: any;
  totalCount: any;
  responseTime: any;
  // jsonArrReq: any[];

  getAuthid: any;
  authCatalogId: any;
  paramsDetails: any;
  requestHeaderDetails: any;
  // Output() emitValidate = new EventEmitter();
  @Input() excuteAPI: any;
  /* eslint-disable */
  validateAPIType: boolean = true;
  state: any;
  deleteReq: any;
  deleteParam: any;
  deleteRequest: any;
  dataName: any;
  currentDataName: any;
  currentCatelogObj: IApiRequest = {};
  catelogeId: any;
  buildVersion: any;
  allIdData: any;
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private _fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private apiRequestService: ApiRequestService,
    private apiCollectionsService: ApiCollectionsService,
    private apiRequestParamService: ApiRequestParamService,
    private testResultService: TestResultService,
    private apiRequestHeaderService: ApiRequestHeaderService,
    private fieldInputService: FieldInputService,
    private fieldValidatorService: FieldValidatorService,
    private activatedRoute: ActivatedRoute,
    private taskExecutionService: TaskExecutionService,
    private accountService: AccountService,
    private apiTestPackService: ApiTestPackService
  ) {
    // this.jsonArrReq = [];
    this.editorOptions = {
      mode: 'view',
      onEvent: (node: any, event: MouseEvent) => {
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
          this.addFormArray('record', {
            //field: this.ans.split('.')[1],
            // field: this.ans.substring(this.ans.lastIndexOf('.') + 1),
            field: this.ans.substring(this.ans.indexOf('.') + 1),
            // value: this.data[this.ans.split('.')[1]],
            value: x,
            ans: this.ans.substring(this.ans.indexOf('.') + 1),
            isCreated: true,
          });
        }
      },
    };

    this.items = [
      {
        label: 'Actions',
        items: [
          {
            label: 'Add Data Set',
            icon: 'pi pi-plus-circle',
            command: () => {
              this.addData();
            },
          },
          {
            label: 'Automate Validation',
            icon: 'pi pi-cog',
            command: () => {
              this.automate();
            },
          },
          {
            label: 'Execute',
            icon: 'pi pi-sync',
            command: () => {
              this.execute();
            },
          },
          {
            label: 'Clear',
            icon: 'pi pi-times',
            command: () => {
              this.clear();
            },
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
              this.delete();
            },
          },
        ],
      },
    ];
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
          let x = this.dataResponce;
          const a = abs.split('.');
          for (let i = 0; i < a.length; i++) {
            x = x[a[i]];
          }
          this.addFormArray('records', {
            field: this.ans.substring(this.ans.indexOf('.') + 1),
            value: x,
            ans: this.ans.substring(this.ans.indexOf('.') + 1),
            isCreated: true,
          });
        }
      },
    };

    this.items = [
      {
        label: 'Actions',
        items: [
          {
            label: 'Add Data Set',
            icon: 'pi pi-plus-circle',
            command: () => {
              this.addData();
            },
          },
          {
            label: 'Automate Validation',
            icon: 'pi pi-cog',
            command: () => {
              this.automate();
            },
          },
          {
            label: 'Execute',
            icon: 'pi pi-sync',
            command: () => {
              this.execute();
            },
          },
          {
            label: 'Clear',
            icon: 'pi pi-times',
            command: () => {
              this.clear();
            },
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
              this.delete();
            },
          },
        ],
      },
    ];
    this.getImportId = this.apiRequestService.getId();
  }
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
  ngOnInit(): void {
    this.paramsForm = this._fb.group({
      // method: 'Get',
      dataName: this.currentData?.name,
      method: '',
      Iurl: '',
      params: this._fb.array([]),
      requestHeader: this._fb.array([]),
      records: this._fb.array([]),
      record: this._fb.array([]),
      responseHeader: this._fb.array([]),
    });
    this.primengConfig.ripple = true;
    this.addFormArray('params');
    this.addFormArray('requestHeader');
    this.addFormArray('responseHeader');

    this.selectedTreeValue.forEach((element: any) => {
      this.addFormArray('records', element.data);
      this.addFormArray('record', element.data);
    });

    this.currentData = this.apiCollectionsService.collectiongetId();
    console.log('this.currentData', this.currentData);

    this.activatedRoute.queryParams.subscribe(params => {
      const id = params.id;
      const buildVersion = params.build;
      this.catelogeId = params.id;
      this.buildVersion = buildVersion;
      if (params.type === 'Edit') {
        this.getUpdateApi(id);
      } else {
        this.getRequest();
      }
    });

    this.currApiSearch = '';
    this.pageStartSizeApi = 0;
    this.pageStartSizeTest = 0;
    const objApi = {
      sort: 'desc',
      page: this.pageStartSizeApi,
      size: 20,
      query: this.currApiSearch,
    };

    this.accountService.selectedENV.subscribe(res => {
      if (res) {
        this.selectedEnvironment = res;
      }
    });
  }

  getUpdateApi(id: any) {
    this.apiCollectionsService.find(id).subscribe((res: any) => {
      this.currentData = res.body;
      this.currentDataName = this.currentData?.name;
      this.getImportId = this.currentData.id;
      this.selectedId = this.currentData.id;
      this.catelogRevision = this.currentData.revision;
      // this.getUpdateApi = this.currentData.id;
      this.getRequest();
      this.authCatalogId = res.body.authCatalog.id;
      // this.editArray.push(res.body);
      // this.apiRequest = this.editArray;
      setTimeout(() => {
        console.log('res', res.body);
        this.allIdData = this.currentData;
        this.highlightCard = 0;
        this.titleShow = true;
        this.accountName = this.apiRequest[0]?.name;
        this.paramsForm.controls['Iurl'].setValue(this.apiRequest[0]?.url);
        this.paramsForm.controls['method'].setValue({ name: this.apiRequest[0]?.method });
        this.method = this.apiRequest.method;
        this.Iurl = this.apiRequest[0].url;
        this.selectedId = this.apiRequest[0].id;
        this.selectedApiIndex = 0;
        this.selectedPrjId = this.apiRequest[0].project.id;
        this.getParams();
        this.getAPIRequestParamsDetails();
        this.getAPIRequestHeadersDetails();
        // this.lastExecution();
        this.getFormArray('requestHeader').clear();
        this.getFormArray('params').clear();
        const currentObject = this.apiRequest.filter((item: any) => item.id == this.apiRequest[0].id);
        this.data = JSON.parse(currentObject[0].rawText);
        if (Array.isArray(this.data)) {
          this.data = Object.assign({}, this.data);
        }
        // if (Array.isArray(this.dataResponce)) {
        //   this.dataResponce = Object.assign({}, this.dataResponce);
        // }

        if (this.currentData.taskExecution.length !== 0) {
          // console.log(data.taskExecution[0].testResults[0]);
          this.dataResponce = JSON.parse(this.currentData.taskExecution[0].testResults[0].body);
          if (Array.isArray(this.dataResponce)) {
            this.dataResponce = Object.assign({}, this.dataResponce);
          }
          this.getParamsData.state = this.currentData.taskExecution[0].testResults[0].statusCode;
          this.responseTime = this.currentData.taskExecution[0].testResults[0].responseTime;
          // console.log(name);
        }
      }, 2000);
    });
  }
  openSidebarContent() {
    this.openSidebar = true;
  }
  addSelectedFiles() {
    console.log('treeValue');
    this.clearFormArray(this.getFormArray('records'));
    this.selectedTreeValue.forEach((element: any) => {
      this.addFormArray('records', element.data);
    });
    console.log(this.selectedTreeValue);
  }
  addSelectedJson() {
    console.log('treeValue');
    this.clearFormArray(this.getFormArray('record'));
    this.data.forEach((element: any) => {
      this.addFormArray('record', element.data);
    });
    console.log(this.data);
  }

  // newParams(): FormGroup {
  //   return this._fb.group({
  //     isParamSelected: false,
  //     paramField: null,
  //     paramValue: null,
  //   });
  // }

  newParams(obj?: any): FormGroup {
    return this._fb.group({
      isParamSelected: false,
      paramField: obj ? obj.paramField : null,
      paramValue: obj ? obj.paramValue : null,
      isCreated: obj ? obj.isCreated : false,
      //isCreated: obj?.isCreated ? obj.isCreated : false,
      id: obj?.id ? obj.id : 0,
    });
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }
  getFormArray(item: any, ind?: number): FormArray {
    return this.paramsForm.get(item) as FormArray;
  }

  addFormArray(item: any, values: any = {}) {
    switch (item) {
      case 'params':
        this.getFormArray(item).push(this.newParams(values));
        break;
      case 'requestHeader':
        this.getFormArray(item).push(this.newHeader(values));
        break;
      case 'responseHeader':
        this.getFormArray(item).push(this.newHeader());
        break;

      case 'records':
        this.getFormArray(item).push(this.newRightTable(values));
        break;
      case 'record':
        this.getFormArray(item).push(this.newLeftTable(values));
        break;
    }
  }

  removeFormArray(item: any, sourIndex: number) {
    this.getFormArray(item).removeAt(sourIndex);
  }

  // newHeader(): FormGroup {
  //   return this._fb.group({
  //     isParamSelected: false,
  //     paramHeader: null,
  //     paramValue: null,
  //   });
  // }
  newHeader(obj?: any): FormGroup {
    return this._fb.group({
      isParamSelected: false,
      paramHeader: obj ? obj.paramHeader : null,
      paramValue: obj ? obj.paramValue : null,
      jsonPath: '',
      isCreated: obj ? obj.isCreated : false,
      //isCreated: obj?.isCreated ? obj.isCreated : false,
      id: obj?.id ? obj.id : 0,
    });
  }
  newRightTable(params: any): FormGroup {
    return this._fb.group({
      isParamSelected: false,
      fieldName: params?.field,
      fieldValue: params?.value,
      jsonPath: params.ans,
      isCreated: params ? params.isCreated : false,
    });
  }
  newLeftTable(params: any): FormGroup {
    return this._fb.group({
      isParamSelected: false,
      fieldName: params?.field,
      fieldValue: params?.value,
      jsonPath: params.ans,
      // isCreated: params?.isCreated ? params?.isCreated : false,
      isCreated: params ? params.isCreated : false,
    });
  }
  addLeftTable(params: any) {
    console.log(this.getLeftTable());
    this.getLeftTable().push(this.newLeftTable(params));
  }
  getLeftTable(): FormArray {
    console.log(this.leftTable);
    return this.leftTable.get('record') as FormArray;
  }
  createNewVersion(e: any) {
    this.apiCollectionsService.apiCatelogRevision(this.catelogeId, e.value).subscribe((res: any) => {
      this.currentData = res.body;

      this.totalCount = this.currentData.apiRequestDTOS.length;
      this.apiRequest = this.currentData.apiRequestDTOS;
      this.getImportId = this.currentData.id;
      this.selectedId = this.currentData.id;

      // this.getUpdateApi = this.currentData.id;
      //this.getRequest();
      // this.editArray.push(res.body);
      // this.apiRequest = this.editArray;
      setTimeout(() => {
        console.log('res', res.body.apiRequestDTOS);
        this.highlightCard = 0;
        this.titleShow = true;
        this.accountName = this.apiRequest[0].name;
        this.paramsForm.controls['Iurl'].setValue(this.apiRequest[0]?.url);
        this.paramsForm.controls['method'].setValue({ name: this.apiRequest[0]?.method });
        this.method = this.apiRequest.method;
        this.Iurl = this.apiRequest[0].url;
        this.selectedId = this.apiRequest[0].id;
        this.selectedApiIndex = 0;
        this.selectedPrjId = this.apiRequest[0].project.id;
        this.getParams();
        this.getAPIRequestParamsDetails();
        this.getAPIRequestHeadersDetails();
        this.getFormArray('requestHeader').clear();
        this.getFormArray('params').clear();
        const currentObject = this.apiRequest.filter((item: any) => item.id == this.apiRequest[0].id);
        this.data = JSON.parse(currentObject[0].rawText);
      }, 0);
    });
    console.log(e['value'].name);
    if (e['value'].name === 'Add Version') {
      this.sidebarclass = 'drawer-wrapper-api-width create-version';
      this.drawercom = 'createVersion';
      this.openSidebar = true;
    }
  }
  openRawRequest() {
    this.sidebarclass = 'drawer-wrapper-s-width raw-request';
    this.drawercom = 'rawRequest';
    this.openSidebar = true;
  }
  openRawResponse() {
    this.sidebarclass = 'drawer-wrapper-s-width raw-response';
    this.drawercom = 'rawResponse';
    this.openSidebar = true;
  }
  openExcutionLogs() {
    this.sidebarclass = 'drawer-wrapper-s-width execution-logs';
    this.drawercom = 'excutionLogs';
    this.openSidebar = true;
    this.selectedId;
  }
  removesidebar() {
    this.openSidebar = false;
  }
  catalogClicked(): void {
    this.toggleApi = false;
    this.toggleCatalog = true;
  }

  apiClicked(): void {
    this.toggleApi = true;
    this.toggleCatalog = false;
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
    const index = nodelabel.indexOf(':');
    const returnData: any = this.split_at_index(nodelabel, index)
      .map((val: string) => {
        const retuns = `<span>${val}</span>`;
        return retuns;
      })
      .join('');
    return returnData;
  }

  lefthandexpand() {
    const leftPanel = document.getElementById('h-left-pane') as HTMLElement;
    leftPanel.style.flex = '0 0 calc(100% - 1px)';
    const rightPanel = document.getElementById('h-right-pane') as HTMLElement;
    rightPanel.style.flex = '0 0 calc(0% - 0px)';
  }
  tophandcloses() {
    const bottomPanel = document.getElementById('v-bottom-panes') as HTMLElement;
    bottomPanel.style.flex = '0 0 calc(100% - 1px)';
    const topPanel = document.getElementById('v-top-panes') as HTMLElement;
    topPanel.style.flex = '0 0 calc(0% - 0px)';
  }

  tophandclose() {
    const bottomPanel = document.getElementById('v-bottom-pane') as HTMLElement;
    bottomPanel.style.flex = '0 0 calc(100% - 1px)';
    const topPanel = document.getElementById('v-top-pane') as HTMLElement;
    topPanel.style.flex = '0 0 calc(0% - 0px)';
  }

  expandCard(flag: any) {
    console.log(flag);
    this.expandFullCard = flag;
  }
  FullCardexpand(flag: any) {
    console.log(flag);
    this.expandFullCard = flag;
  }
  addCard(flag: any) {
    this.cardShow = flag;
    this.cardShow1 = true;
  }
  addtitle(flag: any, event: any, data: any) {
    console.log(event);
    this.highlightCard = event;
    this.allIdData = data;
    this.titleShow = flag;
    this.accountName = data.name;
    this.paramsForm.controls['Iurl'].setValue(data?.url);
    this.paramsForm.controls['method'].setValue({ name: data?.method });
    this.method = data.method;
    this.Iurl = data.url;
    this.selectedId = data.id;
    this.selectedApiIndex = event;
    this.selectedPrjId = data.project.id;
    // this.selectCardData = data;
    this.getParams();
    // this.getExecuteTestRun();
    this.getAPIRequestParamsDetails();
    this.getAPIRequestHeadersDetails();
    this.getFormArray('requestHeader').clear();
    this.getFormArray('params').clear();
    const currentObject = this.apiRequest.filter((item: any) => item.id == data.id);
    this.currentCatelogObj = currentObject[0];
    this.data = JSON.parse(currentObject['0'].rawText);
    if (Array.isArray(this.data)) {
      this.data = Object.assign({}, this.data);
    }
    this.getFormArray('record').clear();
    this.getFormArray('records').clear();
    this.dataResponce = {};
    if (data.taskExecution.length !== 0) {
      // console.log(data.taskExecution[0].testResults[0]);
      this.dataResponce = JSON.parse(data.taskExecution[0].testResults[0].body);
      if (Array.isArray(this.dataResponce)) {
        this.dataResponce = Object.assign({}, this.dataResponce);
      }
      this.getParamsData.state = data.taskExecution[0].testResults[0].statusCode;
      this.responseTime = data.taskExecution[0].testResults[0].responseTime;
      // console.log(name);
    }
  }
  clickAuthCatalog() {
    this.router.navigate(['/api-request/auth-catalog-list']);
  }

  onClickToCatalog(param: any): void {
    console.log(param);
    // this.changeTabView = param;
    if (param === false) {
      this.activeIndex = 1;
    }
  }

  // api search start
  loadApiPage(page?: number, dontNavigate?: boolean): void {
    this.isLoadingApi = true;
    const pageToLoad: number = page ?? this.pageAPI ?? 1;

    if (this.currApiSearch) {
      this.apiRequestService
        .searchApis({
          page: pageToLoad - 1,
          query: this.currApiSearch,
          size: this.itemsPerPage,
          sort: 'desc',
        })
        .subscribe({
          next: (res: HttpResponse<IApiRequest[]>) => {
            this.isLoadingApi = false;
            this.onApiSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          },
          error: () => {
            this.isLoadingApi = false;
            this.onAPIError();
          },
        });
      return;
    }

    // this.apiRequestService
    //   .queryApis({
    //     page: pageToLoad - 1,
    //     size: this.itemsPerPage,
    //     sort: 'desc',
    //     query: this.currApiSearch,
    //   })
    //   .subscribe({
    //     next: (res: HttpResponse<IApiRequest[]>) => {
    //       this.isLoadingApi = false;
    //       this.onApiSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
    //     },
    //     error: () => {
    //       this.isLoadingApi = false;
    //       this.onAPIError();
    //     },
    //   });
  }

  searchApis(query: string): void {
    if (query && ['name'].includes(this.predicate)) {
      this.predicate = 'id';
      this.ascending = true;
    }
    this.currApiSearch = query;
    this.loadApiPage(1);
  }

  searchApi(event: any): void {
    if (event.value.length > 3) {
      // eslint-disable-next-line
      this.apiRequest = this.apiRequest.filter((v: any) => v.name.includes(event.value));
      this.searchApis(event.value);
    } else if (event.value.length === 0) {
      this.searchApis(event.value);
    }
  }

  // onApiScrollingFinished(): void {
  //   this.pageStartSizeApi = this.pageStartSizeApi + 1;

  //   const obj = {
  //     sort: 'desc',
  //     page: this.pageStartSizeApi,
  //     size: 20,
  //     query: this.currApiSearch,
  //   };

  //   if (this.currApiSearch) {
  //     this.apiRequestService.searchApis(obj).subscribe(res => {
  //       if (res.ok) {
  //         res.body?.forEach((t: any) => {
  //           this.apiRequest.push(t);
  //         });
  //       }
  //     });
  //   } else {
  //     this.apiRequestService.queryApis(obj).subscribe(res => {
  //       if (res.ok) {
  //         res.body?.forEach((t: any) => {
  //           this.apiRequest.push(t);
  //         });
  //       }
  //     });
  //   }
  // }
  // api search end

  // this.taskExecutionService.find(id).subscribe((res: any) => {
  //   this.currentData = res.body;
  // });

  getRequest = () => {
    this.apiRequestService.find(this.getImportId).subscribe(res => {
      if (res.ok) {
        this.apiRequest = res.body ? res.body : [];
        this.currentDataName = this.apiRequest[0]?.apiCollections?.name;
        this.totalCount = this.apiRequest.length;
      }
    });
  };

  prevent(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  // async editCatalogName(event: any, packDetail: any) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   event.target.scrollLeft = '0px';
  //   event.target.scrollTop = '0px';
  //   packDetail.name = event.target.textContent;
  //   const a = packDetail;
  //   for await (const e of a.childPacks) {
  //     for await (const f of e.apiTests) {
  //       delete f.steps;
  //     }
  //   }
  //   this.apiCollectionsService.update(a).subscribe();
  // }

  async editPackName(event: any, getImportId: any) {
    if (getImportId.name !== event.target.textContent) {
      event.preventDefault();
      event.stopPropagation();
      event.target.scrollLeft = '0px';
      event.target.scrollTop = '0px';
      getImportId.name = event.target.textContent;
      console.log(getImportId);
      this.apiCollectionsService.update(getImportId).subscribe(
        res => {
          this.messageService.add({
            severity: 'success',
            summary: res.status.toString(),
            detail: 'Api Catalog name has been sucessfully updated',
          });
        },
        err => {
          this.messageService.add({
            severity: 'error',
            summary: err.error.title,
            detail: err.error.detail,
          });
        }
      );
    }
  }

  getParams = () => {
    this.apiRequestParamService.find(this.selectedId).subscribe(res => {
      if (res.ok) {
        this.getParamsData = res.body ? res.body : [];
      }
    });
  };

  getExecute() {
    // this.getFormArray(‘records’).clear();
    //this.getFormArray('records').clear();
    // this.saveValuesBeforeExecute();
    this.apiRequestService.getExecute(this.selectedId, this.selectedPrjId, this.selectedEnvironment.id).subscribe(res => {
      if (res.ok) {
        this.getParamsData = res.body ? res.body : [];
        this.getExecuteTestRun(this.getParamsData.id);
        setTimeout(() => {
          this.getExecuteTestResult(this.getTestRunData?.id);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Execute Successfully' });
        }, 7000);
      }
    });
  }

  getExecuteTestRun(id: any) {
    this.apiRequestService.findTestRun(id).subscribe(res => {
      if (res.ok) {
        this.getTestRunData = res.body ? res.body : [];
        this.getParamsData.state = this.getTestRunData.state;
        //   setTimeout(() => {
        //   this.getExecuteTestResult(this.getTestRunData.id);
        // }, 2500);
      }
    });
  }

  getExecuteTestResult(id: any) {
    // setTimeout(() => {
    this.testResultService.findResult(id, this.selectedId).subscribe(res => {
      if (res.ok) {
        this.getTestResultData = res.body ? res.body : [];
        this.statusCode = this.getTestResultData[0]?.statusCode;
        this.getTestRunData.state = this.statusCode !== null ? this.statusCode : '--';
        this.getParamsData.state = this.getTestRunData.state;
        this.dataResponce = JSON.parse(this.getTestResultData[0].body ?? '');
        if (Array.isArray(this.dataResponce)) {
          this.dataResponce = Object.assign({}, this.dataResponce);
        }
        this.responseTime = this.getTestResultData[0].responseTime ? this.getTestResultData[0].responseTime + ' ms' : 0 + ' ms';
        Object.assign(this.apiRequest[this.selectedApiIndex], { status: this.getParamsData.state });
        if (this.dataResponce && this.getFormArray('records').controls.length > 0) {
          let result = this.dataResponce;
          this.getFormArray('records').controls.map((v: any, index) => {
            console.log(v);
            const formControl = this.getFormArray('records').controls[index];
            console.log(formControl.get('jsonPath'));
            formControl.get('fieldValue')?.setValue(JSONPath({ path: formControl.get('jsonPath')?.value, json: this.dataResponce }));
            // this.getFormArray('fieldValidators').controls[index].get('controlName').setValue('')
          });
          console.log(result);
        }
        //this.getFormArray('item').push(this.newRightTable('values'));
      }
    });
    // }, 1500);
  }

  getAPIRequestParamsDetails() {
    this.apiRequestParamService.apiCatalogParamquery(this.selectedId).subscribe(
      res => {
        if (res.body) {
          this.paramsDetails = res.body;
          res.body.map((r: any) => {
            console.log(r);
            this.getFormArray('params').push(
              this.newParams({
                isParamSelected: true,
                paramField: r.key,
                paramValue: r.value,
                isCreated: false,
                id: r.id,
              })
            );
            console.log(this.getFormArray('params'));
          });
        }
      },
      err => {}
    );
  }

  getAPIRequestHeadersDetails() {
    this.apiRequestHeaderService.apiCatalogHeaderquery(this.selectedId).subscribe(
      res => {
        console.log(res);
        if (res.body) {
          this.requestHeaderDetails = res.body;
          res.body.map((r: any) => {
            console.log(r);
            this.getFormArray('requestHeader').push(
              this.newHeader({
                isParamSelected: true,
                paramHeader: r.key,
                paramValue: r.value,
                isCreated: false,
                id: r.id,
              })
            );
            console.log(this.getFormArray('params'));
          });
        }
      },
      err => {}
    );
  }

  // ////////////////////////////Delete Api

  removeFormArrayHeader(event: any, id: any) {
    console.log(event);
    this.deleteReq = this.getFormArray('requestHeader').value;
    this.apiRequestHeaderService.delete(this.deleteReq[id].id).subscribe(
      res => {
        if (res.ok) {
          const a = this.paramsForm.get('requestHeader') as FormArray;
          a.removeAt(id);
          // this.getFormArray('requestHeader').value.splice(id , 1);
          //  console.log(this.getFormArray('requestHeader'))
        }
      },
      err => {}
    );
  }

  removeFormArrayParams(event: any, id: any) {
    console.log(event);
    this.deleteParam = this.getFormArray('params').value;
    this.apiRequestParamService.delete(this.deleteParam[id].id).subscribe(
      res => {
        if (res.ok) {
          const a = this.paramsForm.get('params') as FormArray;
          a.removeAt(id);
          // this.getFormArray('params').clear();
        }
      },
      err => {}
    );
  }

  removeRequest(event: any, data: any) {
    console.log(event, data);
    this.deleteRequest = this.apiRequest;
    this.apiRequestService.delete(this.deleteRequest[event].id).subscribe(
      res => {},
      err => {}
    );
  }

  // ////////////////////////////Delete Api

  saveData() {
    console.log(this.getFormArray('record').value);
    let dataCrea: any = [];
    this.getFormArray('record').value.forEach((key: any) => {
      const obj = {
        fieldName: key.fieldName,
        fieldValue: key.fieldValue,
        jsonPath: key.jsonPath,
        type: 'REQUEST',
        step: {
          id: null,
        },
        // apiRequest: {
        //   id: this.selectedId,
        // },
      };
      dataCrea.push(obj);
    });
    // this.selectedAPI.url = this.paramsForm.value.url;

    this.fieldInputService.createNew(dataCrea, this.selectedId).subscribe((response: any) => {});
  }

  updateParamsValue(executeApi: any) {
    console.log('update');
    const updateValue = Object.keys(this.getDirtyValues(this.getFormArray('params')));
    const formValue = this.getFormArray('params').value;
    updateValue.forEach((v: any, index) => {
      console.log(formValue[v]);
      if (!formValue[v].isCreated) {
        const apiParams = this.paramsDetails.filter((p: any) => p?.id === formValue[v]?.id);
        console.log(apiParams);
        const obj = {
          key: formValue[v].paramField,
          value: formValue[v].paramValue,
          id: formValue[v].id,
          description: '',
          apiRequest: apiParams[0].apiRequest,
          //apiRequest: apiParams[0].apiRequest,
          active: true,
        };
        this.apiRequestParamService.update(obj).subscribe(
          res => {
            //if(index == (updateValue.length -1) && executeApi){
            this.getExecute();
            //}
            this.getAPIRequestParamsDetails();
            this.getFormArray('params').clear();
          },
          err => {}
        );
      }
    });
  }

  createParamsValue(executeApi: any) {
    console.log('create params value');
    const updateValue = Object.keys(this.getDirtyValues(this.getFormArray('params')));
    const formValue = this.getFormArray('params').value;
    updateValue.forEach((v: any, index) => {
      console.log(formValue[v]);
      const obj = {
        key: formValue[v].paramField,
        value: formValue[v].paramValue,
        description: '',
        active: true,
        apiRequest: '',
      };
      this.apiRequestService.getIds(this.selectedId).subscribe((res: any) => {
        obj.apiRequest = res.body[0];
        this.apiRequestParamService.create(obj).subscribe(
          res1 => {
            console.log(res1);
            // if(index == (updateValue.length -1) && executeApi){
            this.getExecute();
            //  }
            this.getAPIRequestParamsDetails();
            this.getFormArray('params').clear();
          },
          err => {}
        );
      });
    });
  }

  updateRequestHeaderValue(executeApi: any) {
    console.log('update');
    const requestHeaderupdateValue = Object.keys(this.getDirtyValues(this.getFormArray('requestHeader')));
    const formValue = this.getFormArray('requestHeader').value;
    requestHeaderupdateValue.forEach((v: any, index) => {
      console.log(formValue[v]);
      if (!formValue[v].isCreated) {
        const apiHeader = this.requestHeaderDetails.filter((p: any) => p?.id === formValue[v]?.id);
        console.log(apiHeader);
        const obj = {
          key: formValue[v].paramHeader,
          value: formValue[v].paramValue,
          id: formValue[v].id,
          description: '',
          apiRequest: apiHeader[0].apiRequest,
          //apiRequest: apiParams[0].apiRequest,
          active: true,
        };
        this.apiRequestHeaderService.update(obj).subscribe(
          res => {
            //if(index == (updateValue.length -1) && executeApi){
            this.getExecute();
            //}
            this.getAPIRequestHeadersDetails();
            this.getFormArray('requestHeader').clear();
          },
          err => {}
        );
      }
    });
  }

  createRequestHeaderValue(executeApi: any) {
    console.log('create params value');
    const requestHeaderupdateValue = Object.keys(this.getDirtyValues(this.getFormArray('requestHeader')));
    const formValue = this.getFormArray('requestHeader').value;
    requestHeaderupdateValue.forEach((v: any, index) => {
      console.log(formValue[v]);
      const obj = {
        key: formValue[v].paramHeader,
        value: formValue[v].paramValue,
        description: '',
        active: true,
        apiRequest: '',
      };
      this.apiRequestService.getIds(this.selectedId).subscribe((res: any) => {
        obj.apiRequest = res.body[0];
        this.apiRequestHeaderService.create(obj).subscribe(
          res1 => {
            console.log(res1);
            // if(index == (updateValue.length -1) && executeApi){
            this.getExecute();
            //  }
            this.getAPIRequestHeadersDetails();
            this.getFormArray('requestHeader').clear();
          },
          err => {}
        );
      });
    });
  }

  clickcancel() {
    this.router.navigate(['/api-request']);
  }

  // save data in right table

  submit() {
    //setTimeout(() => {
    console.log(this.getFormArray('params').value);
    const updateValue = Object.keys(this.getDirtyValues(this.getFormArray('params')));
    const createValue = this.getFormArray('params').value.filter((v: any) => v.isCreated == true);
    const requestHeaderupdateValue = Object.keys(this.getDirtyValues(this.getFormArray('requestHeader')));
    const requestHeadercreateValue = this.getFormArray('requestHeader').value.filter((v: any) => v.isCreated == true);
    //  const updateFieldInputValue = Object.keys(this.getDirtyValues(this.getFormArray('records')));
    const updateFieldInputValue = Object.keys(this.getDirtyValues(this.getFormArray('record')));
    const createFieldInputValue = this.getFormArray('record').value.filter((v: any) => v.isCreated == true);
    const updateFieldInputValidators = Object.keys(this.getDirtyValues(this.getFormArray('records')));
    const createFieldInputValidators = this.getFormArray('records').value.filter((v: any) => v.isCreated == true);
    const urlChange = this.paramsForm.get('Iurl')?.dirty;
    const methodChange = this.paramsForm.get('method')?.dirty;
    console.log(updateFieldInputValidators, createFieldInputValidators);
    // console.log('requestHeaderupdateValue', requestHeaderupdateValue);
    // console.log('requestHeadercreateValue', requestHeadercreateValue);

    if (updateValue.length > 0) {
      this.updateParamsValue(false);
    }
    if (createValue.length > 0) {
      this.createParamsValue(false);
    }
    if (requestHeaderupdateValue.length > 0) {
      this.updateRequestHeaderValue(false);
    }
    if (requestHeadercreateValue.length > 0) {
      this.createRequestHeaderValue(false);
    }
    if (updateFieldInputValue.length > 0) {
      // this.saveFieldInputsData()
    }
    if (createFieldInputValue.length > 0) {
      // this.saveData();
      this.saveFieldInputsData();
    }
    if (updateFieldInputValidators.length > 0) {
      // this.saveFieldValidatorsData();
    }
    if (createFieldInputValidators.length > 0) {
      this.saveFieldValidatorsData();
    }
    if (urlChange || methodChange) {
      this.saveApiRequestDetails();
    }
    // }, 5000);
  }

  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls).forEach(key => {
      let currentControl = form.controls[key];

      if (currentControl.dirty) {
        if (currentControl.controls) dirtyValues[key] = this.getDirtyValues(currentControl);
        else dirtyValues[key] = currentControl.value;
      }
    });

    return dirtyValues;
  }

  saveValuesBeforeExecute() {
    const updateValue = Object.keys(this.getDirtyValues(this.getFormArray('params')));
    const createValue = this.getFormArray('params').value.filter((v: any) => v.isCreated == true);
    const requestHeaderupdateValue = Object.keys(this.getDirtyValues(this.getFormArray('requestHeader')));
    const requestHeadercreateValue = this.getFormArray('requestHeader').value.filter((v: any) => v.isCreated == true);
    const urlChange = this.paramsForm.get('Iurl')?.dirty;
    const methodChange = this.paramsForm.get('method')?.dirty;
    const updateFieldInputValue = Object.keys(this.getDirtyValues(this.getFormArray('record')));
    const createFieldInputValue = this.getFormArray('record').value.filter((v: any) => v.isCreated == true);
    const updateFieldInputValidators = Object.keys(this.getDirtyValues(this.getFormArray('records')));
    const createFieldInputValidators = this.getFormArray('records').value.filter((v: any) => v.isCreated == true);
    //   if (urlChange || methodChange) {
    //     this.saveApiRequestDetails();
    //   }
    //   if (createFieldInputValue.length > 0) {
    //     this.saveData();
    //   }
    // }
    // this.emitValidate.emit({ count: 1, selectedAPI: null });

    if (updateValue.length > 0) {
      this.updateParamsValue(true);
    }
    if (createValue.length > 0) {
      this.createParamsValue(true);
    }
    if (requestHeaderupdateValue.length > 0) {
      this.updateRequestHeaderValue(true);
    }
    if (requestHeadercreateValue.length > 0) {
      this.createRequestHeaderValue(true);
    }
    if (urlChange || methodChange) {
      this.saveApiRequestDetails();
    }
    if (updateFieldInputValue.length > 0) {
      // this.saveFieldInputsData()
    }
    if (createFieldInputValue.length > 0) {
      this.saveFieldInputsData();
    }
    if (updateFieldInputValidators.length > 0) {
      // this.saveFieldValidatorsData();
    }
    if (createFieldInputValidators.length > 0) {
      this.saveFieldValidatorsData();
    }
    if (updateValue.length <= 0 || createValue <= 0) {
      if (this.validateAPIType) {
        this.getExecute();
      } else {
        this.executeSelectedAPILocally();
      }
    }
  }

  saveApiRequestDetails() {
    this.currentCatelogObj.url = this.paramsForm.value.Iurl;
    this.currentCatelogObj.method = this.paramsForm.value.method.name;
    this.apiRequestService.updateUrlCatalog(this.selectedId, this.currentCatelogObj).subscribe(
      res => {},
      err => {}
    );
  }

  saveFieldInputsData() {
    console.log(this.getFormArray('record').value);
    let dataCrea: any = [];
    this.getFormArray('record').value.forEach((key: any) => {
      const obj = {
        fieldName: key.fieldName,
        fieldValue: key.fieldValue,
        jsonPath: key.jsonPath,
        sources: 'USER_INPUT',
        type: 'REQUEST',
        step: null,
        apiRequest: {
          id: this.selectedId,
        },
        blocklyDesignJson: '',
        blocklyCodeGen: '',
      };

      dataCrea.push(obj);
      this.fieldInputService.create(obj).subscribe(
        (res: any) => {},
        err => {}
      );
    });

    //  this.fieldInputService.createNew(dataCrea, this.selectedAPI.id).subscribe((response: any) => {});
  }

  // saveFieldValidatorsData() {
  //   console.log(this.getFormArray('records').value);
  //   let dataCrea: any = [];
  //   this.getFormArray('records').value.forEach((key: any) => {
  //     const obj = {
  //       fieldName: key.fieldName,
  //       fieldValue: key.fieldValue,
  //       jsonPath: key.jsonPath,
  //       type: 'REQUEST',
  //       // step: {
  //       //   id: null,
  //       // },
  //       sources: 'USER_INPUT',
  //       // type: 'REQUEST',
  //        step: null,
  //       apiRequest: {
  //         id: this.selectedId,
  //       },
  //       blocklyDesignJson: '',
  //       blocklyCodeGen: '',
  //     };
  //     dataCrea.push(obj);
  //     this.fieldValidatorService.create(obj).subscribe(
  //       (res: any) => {},
  //       err => {}
  //     );
  //   });

  //  // this.fieldInputService.createNew(dataCrea, this.selectedId).subscribe((response: any) => {});
  // }

  saveFieldValidatorsData() {
    console.log(this.getFormArray('records').value);
    this.getFormArray('records').value.forEach((v: any) => {
      const obj = {
        fieldName: v.fieldName,
        fieldValue: v.fieldValue,
        source: 'USER_INPUT',
        jsonPath: v.jsonPath,
        type: 'RESPONSE',
        step: null,
        apiRequest: {
          id: this.selectedId,
        },
      };

      this.fieldValidatorService.create(obj).subscribe(
        (res: any) => {
          console.log(res);
        },
        err => {}
      );
    });
  }

  executeSelectedAPILocally() {
    // console.log(this.selectedAPI);
    this.apiRequestService.getIds(this.selectedId).subscribe((res: any) => {
      console.log(res);
      this.clearFormArray(this.getFormArray('params'));
      this.clearFormArray(this.getFormArray('requestHeader'));
      //this.getAPIRequestHeadersDetails();
      this.getAPIRequestParamsDetails();
      this.getAPIRequestHeadersDetails();
      switch (res?.body[0].method) {
        case 'GET':
          // code block

          console.log(this.getFormArray('params').value);
          this.apiRequestService.getLocalAPI(res?.body[0].url, this.getFormArray('params').value).subscribe((res: any) => {
            console.log(res, 'test');
          });
          // console.log(item)
          break;
        case 'GET':
          // code block

          console.log(this.getFormArray('requestHeader').value);
          this.apiRequestService.getLocalAPI(res?.body[0].url, this.getFormArray('requestHeader').value).subscribe((res: any) => {
            console.log(res, 'test');
          });
          // console.log(item)
          break;
        case 'POST':
          // code block
          this.apiRequestService.postLocalAPI(res?.body[0].url, JSON.parse(res?.body[0]?.rawText)).subscribe((res: any) => {
            console.log(res, 'test');
          });
          break;
        case 'PUT':
          // code block
          this.apiRequestService.putLocalAPI(res?.body[0].url, JSON.parse(res?.body[0]?.rawText)).subscribe((res: any) => {
            console.log(res, 'test');
          });
          break;
        case 'DELETE':
          this.apiRequestService.deleteLocalAPI(res?.body[0].url, this.getFormArray('params').value).subscribe((res: any) => {
            console.log(res, 'test');
          });
          // code block
          break;
        case 'DELETE':
          this.apiRequestService.deleteLocalAPI(res?.body[0].url, this.getFormArray('requestHeader').value).subscribe((res: any) => {
            console.log(res, 'test');
          });
          // code block
          break;
        default:
        // code block
      }
    });
  }

  // auth catalog save call

  getData(createauthID: any) {
    console.log(createauthID.id);
    this.getAuthid = createauthID.id;
  }

  saveDataAuthCatalog() {
    const obj = {
      id: this.getImportId,
      name: 'Api Collection',
      description: null,
      type: 'POSTMAN_COLLECTION',
      active: true,
      ageing: false,
      isPublished: false,
      architecture: 'REST',
      authCatalog: {
        id: this.getAuthid,
        // "id": 15802
      },
      //versions: [],
    };
    this.apiRequestService.updateAuthCatalog(this.getImportId, obj).subscribe((response: any) => {
      //this.tservice.collectionsetId(obj);
      // this.router.navigateByUrl('/api-request/edit-existing-catalog-list');
    });

    this.refreshAuthCollectionData();
  }

  generatAutoTestCase() {
    this.sidebarclass = 'drawer-wrapper-api-width create-version';
    this.drawercom = 'createTest';
    this.openSidebar = true;
  }

  refreshAuthCollectionData() {
    //refreshAuth
    this.apiRequestService.refreshAuth(this.getAuthid).subscribe((response: any) => {});
    this.toggleApi = true;
    this.toggleCatalog = false;
  }

  saveJsonData(event: any) {
    console.log(event);
    let item = JSON.stringify(event);
    this.allIdData.rawText = item;
    console.log(this.allIdData);
    this.openSidebar = false;
    this.apiRequestService.update(this.allIdData).subscribe(
      res => {},
      err => {}
    );
  }

  protected onApiSuccess(data: IApiRequest[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.pageAPI = page;
    this.ngbPaginationPageAPI = this.pageAPI;
    //if (navigate) {
    //  this.router.navigate(['/api-test-pack'], {
    //    queryParams: {
    //      page: this.page,
    //      size: this.itemsPerPage,
    //      search: this.currApiSearch,
    //      sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
    //    },
    //  });
    //}
    this.apiRequest = data ?? [];
    this.ngbPaginationPageAPI = this.pageAPI;
  }
  protected onAPIError(): void {
    this.ngbPaginationPageAPI = this.pageAPI ?? 1;
  }
}
