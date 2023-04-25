import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
//import { ApiCatalogAuthListComponent } from '../api-catalog-auth-list/api-catalog-auth-list.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthCatalogService } from 'app/entities/TestOpsCtrl/auth-catalog/service/auth-catalog.service';
@Component({
  selector: 'api-catalog-create-auth',
  templateUrl: './api-catalog-create-auth.component.html',
  styleUrls: ['./api-catalog-create-auth.component.scss'],
})
export class ApiCatalogCreateAuthComponent implements OnInit {
  @Output() public createAuthData = new EventEmitter<any>();
  @Input() isEdit: any;
  @Input() currentDataGet: any;
  createFromAuthCatalog: FormGroup;
  value =
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfVUlPV3hGVkFEZjhDeGxxbW91V1JWZzlXWjg1dGd2RUd3OUVvZlByY0RrIn0.eyJleHAiOjE2NjAzMDk3OTUsImlhdCI6MTY2MDMwOTQ5NSwianRpIjoiOTU3MTA2ODYtMWY0Mi00YzI1LWE0ZDgtZDM3MjU3MWZlMGJlIiwiaXNzIjoiaHR0cDovLzE3Mi4xNi4yNC4yNzo5MDgwL2F1dGgvcmVhbG1zL2poaXBzdG...';
  @Output() cancel = new EventEmitter();

  dropdown = ['No Auth', 'Basic Auth', 'Bearer Token', 'API Key', 'Digest Auth', 'oauth1', 'oauth2'];
  authType: any;
  keyType: any;
  grantType: any;
  onselectGrantType: any;
  tablecontent = [{ test: 'a' }];
  customcheckbox: string[] = [];
  grantTypeDropdown = ['AUTHORIZATION_CODE', 'IMPLICIT', 'PASSWORD_CREDENTIALS', 'CLIENT_CREDENTIALS'];
  apiKeyOptions = ['HEADER', 'QUERY_PARAM'];
  dropdownOptions = [{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }, { name: 'Option 4' }, { name: 'Option 5' }];
  auth1 = true;
  auth2 = false;
  auth3 = false;
  auth4 = false;
  auth5 = false;
  auth6 = false;
  auth7 = false;
  finalObj: any;

  constructor(
    // private apiCatalog: AuthCatalogListComponent,
    protected router: Router,
    private _fb: FormBuilder,
    private authCatalogService: AuthCatalogService
  ) {
    this.authType = this.dropdown[0];
    this.createFromAuthCatalog = _fb.group({
      userName: '',
      type: '',
      description: '',
      password: '',
      token: '',
      grantType: '',
      key: '',
      value: '',
      signatureMethod: '',
      consumerKey: '',
      accessToken: '',
      tokenSecret: '',
      customcheckbox: '',
      authorizationUrl: '',
      callbackUrl: '',
      includeKeyAs: '',
      clientId: '',
      clientSecret: '',
      scope: '',
      state: '',
    });
  }

  // ngOnInit(): void {
  //   //this.onselectAuth({ value: true, name: 'OAuth 2.0' });
  //   // const getdata = this.authCatalogService.geteditData();
  //   // if (this.isEdit === true) {
  //   //   this.getUpdateApi(getdata);
  //   // } else {
  //   //   this.isEdit = false;
  //   //   //this.createAuthCatalog();
  //   // }
  // }

  // ngOnChanges(): void {
  //   //this.onselectAuth({ value: true, name: 'OAuth 2.0' });
  //   const getdata = this.authCatalogService.geteditData();
  //   if (this.isEdit === true) {
  //     this.getUpdateApi(getdata);
  //   } else {
  //     this.isEdit = false;
  //     //this.createAuthCatalog();
  //   }
  // }

  ngOnInit(): void {
    // // comment code
    if (this.isEdit === true) {
      this.getUpdateApi(this.currentDataGet);
    } else {
      this.isEdit = false;
      //this.createAuthCatalog();
    }
  }

  ngOnChanges(): void {
    if (this.isEdit === true) {
      this.getUpdateApi(this.currentDataGet);
    } else {
      this.isEdit = false;
      //this.createAuthCatalog();
    }
  }

  getUpdateApi(value: any) {
    console.log('patch data', value);
    //this.id = value.id;
    this.createFromAuthCatalog.patchValue({
      // type: this.authType,
      type: value.type ? value.type : null,
      description: value.description ? value.description : null,
      tag: 'Intelligent Movies empower',
      authorizationUrl: value.authorizationUrl ? value.authorizationUrl : null,
      tokenUrl: 'up Wooden',
      password: value.password ? value.password : null,
      clientCredentials: 'Intranet hardware',
      secretKey: 'application',
      key: value.key ? value.key : null,
      value: value.value ? value.value : null,
      includeKeyAs: value.includeKeyAs ? value.includeKeyAs : null,
      token: value.token ? value.token : null,
      userName: value.userName ? value.userName : null,
      accessKey: 'gold',
      grantType: value.grantType ? value.grantType : null,
      code: 'Money algorithm',
      redirectUri: 'Planner',
      clientId: value.clientId ? value.clientId : null,
      clientSecret: value.clientSecret ? value.clientSecret : null,
      accessToken: value.accessToken ? value.accessToken : null,
      consumerKey: value.consumerKey ? value.consumerKey : null,
      consumerSecret: 'Cotton',
      tokenSecret: value.tokenSecret ? value.tokenSecret : null,
      signatureMethod: value.signatureMethod ? value.signatureMethod : null,
      isActive: false,
      expiresIn: 115,
      lastUpdateTime: '',
    });

    const authType: string = this.createFromAuthCatalog.value.type;

    if (authType === this.dropdown[0]) {
      this.auth1 = true;
      this.auth2 = false;
      this.auth3 = false;
      this.auth4 = false;
      this.auth5 = false;
      this.auth6 = false;
      this.auth7 = false;
    }
    if (authType === this.dropdown[1]) {
      this.auth1 = false;
      this.auth2 = true;
      this.auth3 = false;
      this.auth4 = false;
      this.auth5 = false;
      this.auth6 = false;
      this.auth7 = false;
    }
    if (authType === this.dropdown[2]) {
      this.auth1 = false;
      this.auth2 = false;
      this.auth3 = true;
      this.auth4 = false;
      this.auth5 = false;
      this.auth6 = false;
    }
    if (authType === this.dropdown[3]) {
      this.auth1 = false;
      this.auth2 = false;
      this.auth3 = false;
      this.auth4 = true;
      this.auth5 = false;
      this.auth6 = false;
      this.auth7 = false;
    }
    if (authType === this.dropdown[4]) {
      this.auth1 = false;
      this.auth2 = false;
      this.auth3 = false;
      this.auth4 = false;
      this.auth5 = true;
      this.auth6 = false;
      this.auth7 = false;
    }
    if (authType === this.dropdown[5]) {
      this.auth1 = false;
      this.auth2 = false;
      this.auth3 = false;
      this.auth4 = false;
      this.auth5 = false;
      this.auth6 = true;
      this.auth7 = false;
    }
    if (authType === this.dropdown[6]) {
      this.auth1 = false;
      this.auth2 = false;
      this.auth3 = false;
      this.auth4 = false;
      this.auth5 = false;
      this.auth6 = false;
      this.auth7 = true;
    }
  }

  onselectKey(event: any): void {
    //  console.log(event.value);
    // this.keyType = event.value;
  }

  // onselectGrantType(event: any): void {
  //    //  console.log(event.value);
  //    this.keyType = event.value;
  // }

  onselectAuth(event: any): void {
    //  console.log(event.value);
    this.authType = event.value;
    // console.log(this.authType, this.dropdown[0].name);
    if (this.authType === this.dropdown[0]) {
      this.auth1 = true;
      this.auth2 = false;
      this.auth3 = false;
      this.auth4 = false;
      this.auth5 = false;
      this.auth6 = false;
      this.auth7 = false;
      this.createFromAuthCatalog.reset();
      this.createFromAuthCatalog.patchValue({
        type: 'No Auth',
      });
    }
    if (this.authType === this.dropdown[1]) {
      this.auth1 = false;
      this.auth2 = true;
      this.auth3 = false;
      this.auth4 = false;
      this.auth5 = false;
      this.auth6 = false;
      this.auth7 = false;
      this.createFromAuthCatalog.reset();
      this.createFromAuthCatalog.patchValue({
        type: 'Basic Auth',
      });
    }
    if (this.authType === this.dropdown[2]) {
      this.auth1 = false;
      this.auth2 = false;
      this.auth3 = true;
      this.auth4 = false;
      this.auth5 = false;
      this.auth6 = false;
      this.createFromAuthCatalog.reset();
      this.createFromAuthCatalog.patchValue({
        type: 'Bearer Token',
      });
    }
    if (this.authType === this.dropdown[3]) {
      this.auth1 = false;
      this.auth2 = false;
      this.auth3 = false;
      this.auth4 = true;
      this.auth5 = false;
      this.auth6 = false;
      this.auth7 = false;
      this.createFromAuthCatalog.reset();
      this.createFromAuthCatalog.patchValue({
        type: 'API Key',
      });
    }
    if (this.authType === this.dropdown[4]) {
      this.auth1 = false;
      this.auth2 = false;
      this.auth3 = false;
      this.auth4 = false;
      this.auth5 = true;
      this.auth6 = false;
      this.auth7 = false;
      this.createFromAuthCatalog.reset();
      this.createFromAuthCatalog.patchValue({
        type: 'Digest Auth',
      });
    }
    if (this.authType === this.dropdown[5]) {
      this.auth1 = false;
      this.auth2 = false;
      this.auth3 = false;
      this.auth4 = false;
      this.auth5 = false;
      this.auth6 = true;
      this.auth7 = false;
      this.createFromAuthCatalog.reset();
      this.createFromAuthCatalog.patchValue({
        type: 'oauth1',
      });
    }
    if (this.authType === this.dropdown[6]) {
      this.auth1 = false;
      this.auth2 = false;
      this.auth3 = false;
      this.auth4 = false;
      this.auth5 = false;
      this.auth6 = false;
      this.auth7 = true;
      this.createFromAuthCatalog.reset();
      this.createFromAuthCatalog.patchValue({
        type: 'oauth2',
      });
    }
  }

  createAuthCatalog() {
    //this.finalObj = {}
    this.finalObj = {
      type: this.createFromAuthCatalog.value.type ? this.createFromAuthCatalog.value.type : null,
      description: this.createFromAuthCatalog.value.description ? this.createFromAuthCatalog.value.description : null,
      tag: 'Intelligent Movies empower',
      authorizationUrl: this.createFromAuthCatalog.value.authorizationUrl ? this.createFromAuthCatalog.value.authorizationUrl : null,
      tokenUrl: 'up Wooden',
      password: this.createFromAuthCatalog.value.password ? this.createFromAuthCatalog.value.password : null,
      clientCredentials: 'Intranet hardware',
      secretKey: 'application',
      key: this.createFromAuthCatalog.value.key ? this.createFromAuthCatalog.value.key : null,
      value: this.createFromAuthCatalog.value.value ? this.createFromAuthCatalog.value.value : null,
      includeKeyAs: this.createFromAuthCatalog.value.includeKeyAs ? this.createFromAuthCatalog.value.includeKeyAs : null,
      token: this.createFromAuthCatalog.value.token ? this.createFromAuthCatalog.value.token : null,
      userName: this.createFromAuthCatalog.value.userName ? this.createFromAuthCatalog.value.userName : null,
      accessKey: 'gold',
      grantType: this.createFromAuthCatalog.value.grantType ? this.createFromAuthCatalog.value.grantType : null,
      code: 'Money algorithm',
      redirectUri: 'Planner',
      clientId: this.createFromAuthCatalog.value.clientId ? this.createFromAuthCatalog.value.clientId : null,
      clientSecret: this.createFromAuthCatalog.value.clientSecret ? this.createFromAuthCatalog.value.clientSecret : null,
      accessToken: this.createFromAuthCatalog.value.accessToken ? this.createFromAuthCatalog.value.accessToken : null,
      consumerKey: this.createFromAuthCatalog.value.consumerKey ? this.createFromAuthCatalog.value.consumerKey : null,
      consumerSecret: 'Cotton',
      tokenSecret: this.createFromAuthCatalog.value.tokenSecret ? this.createFromAuthCatalog.value.tokenSecret : null,
      signatureMethod: this.createFromAuthCatalog.value.signatureMethod ? this.createFromAuthCatalog.value.signatureMethod : null,
      isActive: false,
      expiresIn: 115,
      lastUpdateTime: '',
    };
    if (this.isEdit === false) {
      this.authCatalogService.createAuth(this.finalObj).subscribe((response: any) => {
        if (response.ok) {
          const obj = response?.body;
          obj['screenType'] = 'Create';
          this.createAuthData.emit(obj);
          // this.createFromAuthCatalog.reset();
        }
      });
    } else {
      this.finalObj['id'] = this.currentDataGet.id;
      //this.finalObj['id'] = this.authCatalogService.editAuthData.id;
      this.authCatalogService.updateCatalog(this.currentDataGet.id, this.finalObj).subscribe((response: any) => {
        if (response.ok) {
          const obj = response?.body;
          obj['screenType'] = 'Edit';
          this.createAuthData.emit(obj);
          // this.createFromAuthCatalog.reset();
        }
      });
    }
  }

  cancelScreen() {
    this.createFromAuthCatalog.reset();
    this.cancel.emit('cancel');
  }

  // cancelScreen() {
  //   this.cancel.emit();
  //   this.createFromAuthCatalog.reset();
  // }
}
