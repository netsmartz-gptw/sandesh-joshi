import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IApiCollections } from '../../model/api-collections.model';
import { ApiCollectionsService } from '../../service/api-collections.service';
import { MessageService } from 'primeng/api';
import { ApiRequestService } from '../../service/api-request.service';
@Component({
  selector: 'api-catalog-detail',
  templateUrl: './api-catalog-detail.component.html',
  styleUrls: ['./api-catalog-detail.component.scss'],
  providers: [MessageService],
})
export class ApiCatalogDetailComponent implements OnInit {
  // @Input() collectionId: any;
  // authDataByid: any;
  @Output() cancel = new EventEmitter();
  apitestdetail: any;
  dropdown = [];
  catelogId: any;
  inputdatas: any = [
    { field: 'Account_id', value: 'Saving Account' },
    { field: 'Label', value: 'e0ab1bfe-e7d9-4c25-9680-bac241b54885' },
    { field: 'Currency', value: 'e0ab1bfe-e7d9-4c25-9680-bac241b54885' },
  ];
  validations: any = [{ field: 'Response Code', validation: 'Equals', value: '200' }];
  api_tags: any[] = [{ name: 'Regression' }];
  selectedTags: any = [{ name: 'Regression' }];
  // @Input() executionCount!: number;
  // @Input() collectionDetail!: IApiCollections;
  @Input() set card(values: any) {
    this.apitestdetail = values;
    this.catelogId = this.apitestdetail.id;
  }
  //collectionDetail!: IApiCollections;
  constructor(
    protected apiCollectionsService: ApiCollectionsService,
    private messageService: MessageService,
    private apiRequestService: ApiRequestService
  ) {}

  ngOnInit(): void {}
  /* eslint-disable */
  published() {
    const id = this.apitestdetail.id;
    const obj = {
      id: id,
      name: this.apitestdetail.name,
      description: this.apitestdetail.description,
      type: this.apitestdetail.type,
      active: this.apitestdetail.active,
      ageing: this.apitestdetail.ageing,
      isPublished: true,
      architecture: this.apitestdetail.architecture.toUpperCase(),
      authCatalog: this.apitestdetail.authCatalog,
      versions: [],
    };
    this.apiCollectionsService.updatePublish(obj, id).subscribe((res: any) => {
      console.log('Published');
    });
    this.cancelScreen();
  }

  createNewVersion(e: any) {
    this.apiCollectionsService.apiCatelogRevision(this.catelogId, e.value).subscribe((res: any) => {
      // alert(JSON.stringify(res.body));
    });
  }

  cancelScreen() {
    this.cancel.emit();
  }

  deleteAPITest() {
    this.apiCollectionsService.delete(this.apitestdetail.id).subscribe(
      res => {
        this.messageService.add({
          severity: 'error',
          summary: 'Authentication Failed',
          detail: 'API Key or URL is invalid.',
        });
      },
      err => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: err.error.title,
          detail: err.error.detail,
        });
      }
    );
  }
}
