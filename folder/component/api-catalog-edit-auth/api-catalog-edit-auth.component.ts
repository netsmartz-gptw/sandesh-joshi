import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiCatalogAuthListComponent } from '../api-catalog-auth-list/api-catalog-auth-list.component';

@Component({
  selector: 'api-catalog-edit-auth',
  templateUrl: './api-catalog-edit-auth.component.html',
  styleUrls: ['./api-catalog-edit-auth.component.scss'],
})
export class ApiCatalogEditAuthComponent implements OnInit {
  editAuthModal: any;
  auth_type: any;
  tablecontent = [{ test: 'a' }];
  dropdown = [
    { name: 'No Auth' },
    { name: 'Basic Auth' },
    { name: 'Digest Auth' },
    { name: 'OAuth 1.0' },
    { name: 'OAuth 2.0' },
    { name: 'Bearer Token' },
    { name: 'Hawk Authentication' },
    { name: 'AWS Signature' },
  ];
  value =
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfVUlPV3hGVkFEZjhDeGxxbW91V1JWZzlXWjg1dGd2RUd3OUVvZlByY0RrIn0.eyJleHAiOjE2NjAzMDk3OTUsImlhdCI6MTY2MDMwOTQ5NSwianRpIjoiOTU3MTA2ODYtMWY0Mi00YzI1LWE0ZDgtZDM3MjU3MWZlMGJlIiwiaXNzIjoiaHR0cDovLzE3Mi4xNi4yNC4yNzo5MDgwL2F1dGgvcmVhbG1zL2poaXBzdG...';
  @Output() cancel = new EventEmitter();
  constructor(private apiCatalog: ApiCatalogAuthListComponent) {}

  ngOnInit(): void {}

  cancelScreen() {
    this.cancel.emit();
  }
}
