import { Component, OnInit, ViewChild } from '@angular/core';
import { IApiRequest } from '../../model/api-request.model';
import { HttpHeaders, HttpResponse } from '@angular/common/http/http';
import { ITaskExecution } from '../../model/task-execution.model';
import { ITestRun } from 'app/entities/UiTestController/test-run/test-run.model';
import { IEnvironment } from 'app/entities/UiTestController/environment/environment.model';
// import { MenuService } from 'app/layouts/main/ng-prime/service/app.menu.service';
import { TaskExecutionService } from '../../service/task-execution.service';
import { TestRunService } from 'app/entities/UiTestController/test-run/service/test-run.service';
import { ApiCollectionsService } from '../../service/api-collections.service';
import { EnvironmentService } from 'app/entities/UiTestController/environment/service/environment.service';
import { ProjectService } from '../../service/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataUtils } from 'app/core/util/data-util.service';
import { ApiRequestService } from '../../service/api-request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { IApiCatalogDashboard } from '../../model/api-catalog-dashboard-count.modal';
import { IApiCollections } from '../../model/api-collections.model';
import { PrimeNGConfig, MenuItem } from 'primeng/api';
import { IApiTest } from 'app/entities/TestOpsCtrl/api-test/model/api-test.model';
//import { ITEMS_PER_PAGE, SORT, ASC, DESC } from 'app/config/pagination.constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { ApiTestService } from 'app/entities/TestOpsCtrl/api-test/service/api-test.service';
import { combineLatest } from 'rxjs';
import { NgScrollbar } from 'ngx-scrollbar';
import { MessageService } from 'primeng/api';
import { AccountService } from 'app/core/auth/account.service';
import { json } from 'stream/consumers';

@Component({
  selector: 'api-catalog-list',
  templateUrl: './api-catalog-list.component.html',
  styleUrls: ['./api-catalog-list.component.scss'],
  providers: [MessageService],
})
export class ApiCatalogListComponent implements OnInit {
  // UI list 3
  size = 20;
  isGlobalFavourite = false;
  apiTests?: IApiTest[];
  collectionDetail!: IApiCollections;
  currentSearch: string;
  openSidebar = false;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  itemdetail: any;
  searchCard: any;
  apiCatalogCount!: IApiCatalogDashboard;
  sidebarclass!: any;
  drawercom!: any;
  selectedApiIndex = 0;
  apiList: IApiRequest[] = [];
  testRun: ITestRun = {};
  selectedApiEndPoint = [];
  displayImport = false;
  taskExecutions: ITaskExecution[] = [];
  apicatelogdata: any;
  items = [
    {
      label: 'Import',
      icon: 'pi pi-cloud-download',
      command: () => {
        this.displayImport = true;
      },
    },
    {
      label: 'Add Collection',
      icon: 'pi pi-plus',
    },
  ];

  apiSpecification = 'POSTMAN_COLLECTION';
  isRunning = false;
  //
  apiRequests?: IApiRequest[];

  doRefresh = false;
  environments: IEnvironment[] = [];
  selectedEnvId: any = null;
  title: any = 'API Catalog';
  tabView: any = 0;
  bg_color!: boolean;
  ind: any = 0;
  apiCollection: IApiCollections[] = [];
  activeData: any;
  copyAllCatalogData: any[] = [];
  // menuitems: MenuItem[] = [];
  cardData: any = [];
  cardStatus = ['Rest', 'Soap'];
  selectedLevel: any;
  dropdown = [
    { name: 'Version- 0.01' },
    { name: 'Version- 0.02' },
    { name: 'Version- 0.03' },
    { name: 'Version- 0.04' },
    { name: 'Version- 0.05' },
  ];
  /*eslint-disable */
  pageStartSize: number = 0;
  pageSize: any = 20;
  @ViewChild(NgScrollbar, { static: true }) scrollbarRef!: NgScrollbar;
  architecture: any;
  data: any;
  apiCatalogCountPublished: any;
  selectedIndex = 0;
  publishedCounts: any = 0;
  nonPublishedCounts: any = 0;
  constructor(
    private accountService: AccountService,
    protected apiRequestService: ApiRequestService,
    protected apiTestService: ApiTestService,
    protected activatedRoute: ActivatedRoute,
    protected dataUtils: DataUtils,
    protected router: Router,
    protected modalService: NgbModal,
    protected projectService: ProjectService,
    protected environmentService: EnvironmentService,
    protected apiCollectionsService: ApiCollectionsService,
    protected testRunService: TestRunService,
    protected taskExecutionService: TaskExecutionService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) {
    this.currentSearch = this.activatedRoute.snapshot.queryParams['search'] ?? '';
  }

  ngOnInit(): void {
    // this.menuitems = [
    //   {
    //     label: 'Edit',
    //     icon: 'pi pi-fw pi-pencil',
    //     command: (event: any) => this.contextmenuClick(event),
    //   },
    //   { label: 'Details', icon: 'pi pi-fw pi-id-card' },
    // ];
    const state = ['catalogs', 'active', 'inactive', 'ageing'];
    // for (let i = 0; i < 54; i++) {
    //   const random = i % 2;
    //   const obj: any = {
    //     name: 'ACCOUNTS',
    //     isFavourite: i % 5 === 0 ? true : false,
    //     isStatus: this.cardStatus[random],
    //     apino: 21,
    //     state: state[i % 4],
    //     //version: this.dropdown[0].name,
    //   };
    //   this.cardData.push(obj);
    // }

    const a = window.innerWidth;
    let b = window.innerHeight;
    b = b - 0.45 * b;
    const c = a * b;
    const myElement = document.getElementById('cardT');
    const x: any = myElement?.getBoundingClientRect().width;
    const y: any = myElement?.getBoundingClientRect().height;
    const z = x * y;
    this.size = c / z;

    this.getCount();
    this.getCollections(this.size);
    this.accountService.isFavourite.subscribe(res => {
      this.isGlobalFavourite = res;
      this.getCollections(this.size);
    });
  }

  // /////////// menu click ///////////////////////////
  menuitems(card: any) {
    event?.stopPropagation();
    return [
      {
        label: 'Mode of Action',
        items: [
          {
            label: 'Edit',
            icon: 'icon pi pi-pencil',
            command: (event: any) => {
              this.edit(card);
            },
          },
          {
            label: 'Execute',
            icon: 'icon play-outlined',
            command: (event: any) => {
              //this.navigateToEdit(event, card);
            },
          },
          {
            label: 'Clone',
            icon: 'icon copy',
            command: (event: any) => {},
          },
          {
            label: 'Publish',
            icon: 'icon eye',
            command: (event: any) => {
              // this.publishApiTest(card);
            },
          },
          {
            label: 'Delete',
            icon: 'icon delete mr-2',
            command: (event: any) => {
              console.log(card);
              // this.deleteApiRequest(card);
            },
          },
        ],
      },
    ];
  }

  menuItemClick(event: any) {
    event.stopPropagation();
  }

  // /////////// menu click ///////////////////////////
  edit(data: any) {
    this.router.navigate(['/api-request/edit-existing-catalog-list'], {
      queryParams: { id: data.id, type: 'Edit', build: this.selectedLevel },
    });
  }

  dropdownclick(event: any) {
    event.stopPropagation();
  }
  selected() {
    //alert(id)
    // alert(this.selectedLevel)
  }
  createNewVersion() {
    console.log('123');
    this.sidebarclass = 'drawer-wrapper-api-width create-api-catalog';
    this.drawercom = 'createApiCatalog';
    this.openSidebar = true;
  }
  removesidebar() {
    this.openSidebar = false;
    this.ngOnInit();
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    if (this.currentSearch) {
      this.apiCollectionsService
        .searchCollection({
          page: pageToLoad - 1,
          query: this.currentSearch,
          size: this.size,
          sort: this.sort(),
          isPublish: this.selectedIndex === 0 ? false : true,
          'isFavourite.equals': this.isGlobalFavourite ? true : null,
        })
        .subscribe({
          next: (res: HttpResponse<IApiCollections[]>) => {
            this.isLoading = false;
            this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          },
          error: () => {
            this.isLoading = false;
            this.onError();
          },
        });
      return;
    }

    this.apiCollectionsService
      .queryCtalog({
        page: pageToLoad - 1,
        size: this.size,
        sort: this.sort(),
        query: this.currentSearch,
        isPublish: this.selectedIndex === 0 ? false : true,
        'isFavourite.equals': this.isGlobalFavourite ? true : null,
      })
      .subscribe({
        next: (res: HttpResponse<IApiCollections[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }
  searchCollection(query: string): void {
    if (query && ['name'].includes(this.predicate)) {
      this.predicate = 'id';
      this.ascending = true;
    }
    this.currentSearch = query;
    this.loadPage(1);
  }
  filterCard(label: any) {
    this.searchCard = label;
  }
  // getMenuwithData(item: any) {
  //   return [
  //     { label: 'Details'},
  //     { label: 'Edit', command: (event: any) => this.contextmenuClick(event, item) },
  //   ];
  // }
  // contextmenuClick($event: any) {
  //   switch ($event.item.label) {
  //     case 'Details':
  //       break;
  //     case 'Edit':
  //       this.router.navigate(['/api-request/edit-existing-catalog-list'], { queryParams: { id: $event.item.id } });
  //       break;
  //   }
  // }

  trackId(index: number, item: IApiTest): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  getCount() {
    this.apiCollectionsService.getCount().subscribe(res => {
      // if (res.ok) {
      //   this.apiCatalogCount = res.body ? res.body : [];
      //   this.apiCatalogCountPublished = res.body.published ? res.body.published : [];
      // }
      if (res.ok) {
        let count = 0;
        let name = '';
        this.publishedCounts = res.body ? res.body['publishedDashboardData'] : [];
        this.nonPublishedCounts = res.body ? res.body['nonPublishedDashboardData'] : [];

        if (this.selectedIndex) {
          name = 'publishedDashboardData';
          this.apiCatalogCount = res.body ? res.body[name] : [];
        } else {
          name = 'nonPublishedDashboardData';
          this.apiCatalogCount = res.body ? res.body[name] : [];
        }

        // Object.values(nonPublishedCounts).forEach((v: any) => {
        //   count = v + count;
        // });
        // Object.values(publishedCounts).forEach((v: any) => {
        //   this.totalPublishedCount = v + this.totalPublishedCount;
        // });
        // this.totalCount = count;
        // console.log(this.totalCount);
      }
    });
  }

  getCollections = (s: any) => {
    s = Math.ceil(s);
    const obj = {
      'verification.equals': 'POSITIVE',
      sort: 'desc',
      page: 0,
      size: s,
      'isFavourite.equals': this.isGlobalFavourite ? true : null,
    };
    if (this.selectedIndex === 0) {
      this.apiCollectionsService.queryCtalog(obj).subscribe(res => {
        if (res.ok) {
          this.apiCollection = res.body ? res.body : [];
          this.copyAllCatalogData = this.apiCollection;
          if (this.apiCollection.length > 0) {
          }
          // this.dropdown = this.apiCollection;
          // this.architecture[this.ind] = this.apiCollection;
          // this.apiCollection[i]['architecture'] = this.cardStatus[i];
        }
      });
    } else {
      this.apiCollectionsService.queryPublishCtalog(obj).subscribe(res => {
        if (res.ok) {
          this.apiCollection = res.body ? res.body : [];
          this.copyAllCatalogData = this.apiCollection;
          if (this.apiCollection.length > 0) {
          }
          // this.dropdown = this.apiCollection;
          // this.architecture[this.ind] = this.apiCollection;
          // this.apiCollection[i]['architecture'] = this.cardStatus[i];
        }
      });
    }
    // let count = 0;
    // let name = '';
    if (this.selectedIndex) {
      // name = 'publishedDashboardData';
      this.apiCatalogCount = this.publishedCounts;
    } else {
      //  name = 'nonPublishedDashboardData';
      this.apiCatalogCount = this.nonPublishedCounts;
    }
  };

  opensidebarclick(item: any) {
    this.sidebarclass = 'drawer-wrapper-m-width api-catalog-details';
    this.drawercom = 'detail';
    this.apicatelogdata = JSON.stringify(item);
    this.apiCollectionsService.apiCatelogRevisionById(item.id).subscribe(res => {
      if (res.ok) {
        this.itemdetail = res.body ? res.body : [];
      }
    });
    // this.itemdetail = item;
    this.openSidebar = true;
  }

  onScrollingFinished() {
    console.log('scrolll end');
    this.pageStartSize = this.pageStartSize + 1;

    const obj = {
      'verification.equals': 'POSITIVE',
      sort: 'desc',
      page: this.pageStartSize,
      size: 20,
      query: this.currentSearch,
      isPublish: this.selectedIndex === 0 ? false : true,
      'isFavourite.equals': this.isGlobalFavourite ? true : null,
    };
    this.apiCollectionsService.searchCollection(obj).subscribe(res => {
      if (res.ok) {
        console.log(res.body);
        res.body?.forEach((v: any) => {
          this.apiCollection.push(v);
          this.copyAllCatalogData.push(v);
        });
      }
      if (this.apiCollection.length > 0) {
        for (let i = 0; i < this.apiCollection.length; i++) {
          const random = i % 1;
          this.apiCollection[i]['architecture'] = this.cardStatus[random];
          //this.apiTestCollection[i]['apino'] = 21;
        }
      }
    });
  }

  collectionChange(type: string) {
    console.log(this.copyAllCatalogData);
    //this.apiCollection = [];
    switch (type) {
      case 'Active':
        this.apiCollection = this.copyAllCatalogData.filter(item => item.active);
        break;
      case 'Inactive':
        this.apiCollection = this.copyAllCatalogData.filter(item => !item.active);
        break;
      case 'Ageing':
        this.apiCollection = this.copyAllCatalogData.filter(item => item.ageing);
        break;
      case 'Catalogs':
        this.apiCollection = this.copyAllCatalogData;
        break;
    }

    //this.apiCollection = this.activeData;
  }

  searchApiCatalogCase(event: any) {
    console.log(event.value);
    if (event.value.length > 3) {
      this.apiCollection = this.apiCollection.filter((v: any) => v.name.includes(event.value));
      this.searchCollection(event.value);
    } else {
      this.apiCollection = this.copyAllCatalogData;
    }
  }

  setFavorities(event: any, item: any) {
    event.stopPropagation();
    console.log(item);

    if (item.isFavourite) {
      item.isFavourite = false;
      this.apiCollection.map((v: any) => {
        if (v.id === item.id) {
          v.isFavourite = false;
        }
      });
    } else {
      item.isFavourite = true;
      this.apiCollection.map((v: any) => {
        if (v.id === item.id) {
          v.isFavourite = true;
        }
      });
    }
    this.apiCollectionsService.updateCollectionCaseRequest(item).subscribe(
      res => {
        this.messageService.add({
          severity: 'success',
          summary: 'Updated Favorite',
          detail: 'Favorite has been updated sucessfully.',
        });
      },
      err => {}
    );
  }

  ngOnDestroy() {
    this.accountService.isFavourite.next(false);
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
        this.loadPage(pageNumber, true);
      }
    });
  }

  protected onSuccess(data: IApiCollections[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.ngbPaginationPage = this.page;
    if (navigate) {
      this.router.navigate(['/api-request'], {
        queryParams: {
          page: this.page,
          size: this.size,
          search: this.currentSearch,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.apiCollection = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
  // clickPopup(param: boolean) {
  //   console.log(param);
  //   this.sidebarSelectSnippet = param;
  //   console.log(this.sidebarSelectSnippet);
  // }
}
