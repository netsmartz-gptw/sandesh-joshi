import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAuthCatalog } from 'app/entities/TestOpsCtrl/auth-catalog/model/auth-catalog.model';
import { AuthCatalogService } from 'app/entities/TestOpsCtrl/auth-catalog/service/auth-catalog.service';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { EditExistingCatalogAuthComponent } from '../edit-existing-catalog-auth/edit-existing-catalog-auth.component';
import { EditExistingCatalogListComponent } from '../edit-existing-catalog-list/edit-existing-catalog-list.component';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { combineLatest } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ApiCollectionsService } from '../../service/api-collections.service';
import { ApiRequestService } from '../../service/api-request.service';
// import { Input } from 'blockly';
//import { HttpHeaders, HttpResponse } from '@angular/common/http/http';

@Component({
  selector: 'api-catalog-auth-list',
  templateUrl: './api-catalog-auth-list.component.html',
  styleUrls: ['./api-catalog-auth-list.component.scss'],
})
export class ApiCatalogAuthListComponent implements OnInit {
  @Output() public myOutput: EventEmitter<any> = new EventEmitter<any>();
  @Input() authId: any;
  @Input() collectionId: any;
  dropdown = [{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }, { name: 'Option 4' }, { name: 'Option 5' }];
  menuitems: MenuItem[] = [];
  menuitems2: MenuItem[] = [];
  public enableEdit = false;
  sidebarclass!: any;
  drawercom!: any;
  openSidebar = false;
  tabView: any = 0;
  bg_color!: boolean;
  array: any = [];
  ind: any = 0;
  cardData: any = [];
  cardData2: any = [];
  authCollection: IAuthCatalog[] = [];
  authCollectionData: any;
  dataAuth: any;
  // cardStatus = ['OAUTH1'];
  name = ['FUND TRANSFER', 'AUTH NAME'];
  getDataValue: any;
  editData: any;
  // pagination
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  totalItems = 0;
  currentSearch: string;
  authDataByid: any;
  constructor(
    private primengConfig: PrimeNGConfig,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    //private apiCatalog: EditExistingCatalogListComponent,
    private authCatalogService: AuthCatalogService,
    protected apiCollectionsService: ApiCollectionsService,
    private apiRequestService: ApiRequestService
  ) {
    this.currentSearch = this.activatedRoute.snapshot.queryParams['search'] ?? '';
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.menuitems = [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: () => {
          this.editAuthModal();
        },
      },
      {
        label: 'Details',
        icon: 'pi pi-fw pi-id-card',
        command: () => {
          this.goToEditAuthModal();
        },
      },
    ];
    this.menuitems2 = [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: () => {
          this.editAuthModal();
        },
      },
      {
        label: 'Details',
        icon: 'pi pi-fw pi-id-card',
        command: () => {
          this.goToEditAuthModal();
        },
      },
    ];

    for (let i = 0; i < 5; i++) {
      const random = i % 2;
      const obj: any = {
        name: this.name[random],
        isFavourite: i % 5 === 0 ? true : false,
        isStatus: 'OAUTH1',
        // apino: 21,
        // state: state[i % 3],
        // version: this.dropdown[0].name,
      };
      this.cardData.push(obj);
    }
    for (let i = 0; i < 8; i++) {
      const random = i % 2;
      const obj: any = {
        name: this.name[random],
        isFavourite: i % 5 === 0 ? true : false,
        isStatus: 'OAUTH1',
        // apino: 21,
        // state: state[i % 3],
        // version: this.dropdown[0].name,
      };
      this.cardData2.push(obj);
    }
    // if(this.authId !== undefined){
    this.getAuthCollections();
    // }

    // this.authCollectionData = this.groupByType(this.authCollection);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.authId) {
      this.getAuthCollections();
    }
  }

  /* eslint-disable */
  groupByType(array: any) {
    return array.reduce((r: any, a: any) => {
      r[a.type] = r[a.type] || [];
      r[a.type].push(a);
      return r;
    }, Object.create(null));
  }

  dropdownclick(event: any) {
    event.stopPropagation();
  }
  createAuthModal() {
    console.log('123');
    this.sidebarclass = 'drawer-wrapper-api-width create-auth-modal';
    // this.drawercom = 'createAuthModal';
    this.openSidebar = true;
  }
  editAuthModal() {
    console.log('123');
    this.sidebarclass = 'drawer-wrapper-api-width edit-auth-modal';
    this.drawercom = 'editAuthModal';
    this.openSidebar = true;
  }
  removesidebar() {
    this.openSidebar = false;
  }

  workspace_published(flag: number): void {
    console.log(flag);
    if (flag === 0) {
      this.tabView = flag;
      this.bg_color = true;
      this.ind = 0;
    } else if (flag === 1) {
      this.tabView = flag;
      this.bg_color = false;
      this.ind = 1;
    }
  }
  goToEditAuthModal(): void {
    // this.apiCatalog.onClickToCatalog(false);
  }

  getAuthCollections = () => {
    if (this.authId !== undefined) {
      this.authCatalogService.find(this.authId).subscribe(res => {
        if (res.ok) {
          this.authDataByid = res.body;
          // this.authCollection = res.body ? res.body : [];
          // this.authCollectionData = this.groupByType(this.authCollection);
        }
      });
    } else {
      this.authCatalogService.getAuth().subscribe(res => {
        if (res.ok) {
          this.authCollection = res.body ? res.body : [];
          this.authCollectionData = this.groupByType(this.authCollection);
        }
      });
    }
  };

  // onchange(value: any) {
  //   if (value) {
  //     const realData = this.authCollectionData;
  //     for (const property in realData) {
  //       if (property == value.type) {
  //         this.authCollectionData[property].push(value);
  //         this.getDataValue = value;
  //       }
  //     }
  //     // this.authCollectionData.push(value);
  //     this.openSidebar = false;
  //   }
  // }

  onchange(value: any) {
    if (value.screenType === 'Create') {
      const realData = this.authCollectionData;
      for (const property in realData) {
        if (property == value.type) {
          this.authCollectionData[property].push(value);
          this.getDataValue = value;
          // this.authDataByid = value
          this.myOutput.emit(value);
        }
      }
      // this.authCollectionData.push(value);
      this.openSidebar = false;
    } else {
      // this.authCollection.push(item);
      this.getAuthCollections();
      this.getDataValue = value;
      //this.authDataByid = value
      this.myOutput.emit(value);
    }
    this.openSidebar = false;
  }

  // edit(authData: any, isEdit: boolean) {
  //   //this.authCatalogService.edit = true;
  //   this.enableEdit = isEdit;
  //   this.authCatalogService.seteditData(authData);
  //   this.createAuthModal();
  // }

  edit(authData: any, isEdit: boolean) {
    this.enableEdit = isEdit;
    this.editData = authData;
    this.createAuthModal();
  }
  published() {
    const id = this.collectionId.id;
    const obj = {
      id: id,
      name: this.collectionId.name,
      description: this.collectionId.description,
      type: this.collectionId.type,
      active: this.collectionId.active,
      ageing: this.collectionId.ageing,
      isPublished: true,
      architecture: this.collectionId.architecture,
      authCatalog: this.authDataByid,
      versions: [],
    };
    this.apiCollectionsService.updatePublish(obj, id).subscribe((res: any) => {
      console.log('Published');
    });
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        // this.loadPage(pageNumber, true);
      }
    });
  }

  protected onSuccess(data: IAuthCatalog[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.ngbPaginationPage = this.page;
    if (navigate) {
      this.router.navigate(['/api-request'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          search: this.currentSearch,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.authCollection = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
