import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IBuildVersion } from '../../model/build-version.model';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ApiCollectionsService } from '../../service/api-collections.service';
import { ApiRequestService } from '../../service/api-request.service';
import { ApiCatalogListComponent } from '../api-catalog-list/api-catalog-list.component';

@Component({
  selector: 'app-create-api-catalog',
  templateUrl: './create-api-catalog.component.html',
  styleUrls: ['./create-api-catalog.component.scss'],
  providers: [MessageService],
})
export class CreateApiCatalogComponent implements OnInit {
  createCatalog: FormGroup;
  dropdown = [{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }, { name: 'Option 4' }, { name: 'Option 5' }];
  sidebarSelectSnippet: any;
  tabView: any = true;
  bg_color!: boolean;
  ind: any = 0;
  importmanuallystyle: any = 0;
  importCard: any = true;
  showHideCard: any;
  importEnvirInput: any;
  importBuildInput: any;
  importUrlEnvirInput: any;
  importUrlBuildInput: any;
  manuallyProtocolInput: any;
  manuallyEnvirInput: any;
  manuallyBuildInput: any;
  sourceValue: any;
  showHideCardimportEnvir: any = 1;
  showHideCardimportBuild: any = 1;
  showHideCardimportUrlEnvir: any = 1;
  showHideCardUrlBuild: any = 1;
  showHideCardProtocol: any = 1;
  showHideCardManuallyEnvir: any = 1;
  showHideCardManuallyBuild: any = 1;
  buildVersion: IBuildVersion[] = [];
  public selectedFileArray: any;
  public name: any;
  public importID: any;
  selectedFile: any;
  openImportUrl: any;
  @Output() cancel = new EventEmitter();
  constructor(
    private router: Router,
    private tservice: ApiCollectionsService,
    protected apiCollectionsService: ApiCollectionsService,
    private apiCatalog: ApiCatalogListComponent,
    private apiRequest: ApiRequestService,
    private _fb: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.createCatalog = _fb.group({
      name: '',
      fileUplaod: '',
      importEnvirInput: '',
      importBuildInput: '',
      importUrlEnvirInput: '',
      importUrlBuildInput: '',
      manuallyProtocolInput: '',
      manuallyEnvirInput: '',
      manuallyBuildInput: '',
      openImportUrl: '',
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.apiCollectionsService.getBuildversions().subscribe(res => {
      if (res.ok) {
        this.buildVersion = res.body ? res.body : [];
      }
    });
  }

  apiImportManually(flag: any): void {
    console.log(flag);
    if (flag === true) {
      this.importCard = flag;
      this.importmanuallystyle = 0;
    } else if (flag === false) {
      this.importCard = flag;
      this.importmanuallystyle = 1;
    }
  }

  clickFilterimportEnvir(data: any): void {
    this.showHideCardimportEnvir = data;
  }
  clickFilterimportBuild(data: any): void {
    this.showHideCardimportBuild = data;
  }
  clickFilterUrlEnvir(data: any): void {
    this.showHideCardimportUrlEnvir = data;
  }
  clickFilterUrlBuild(data: any): void {
    this.showHideCardUrlBuild = data;
  }

  importFileUrl(flag: any): void {
    console.log(flag);
    if (flag === true) {
      this.tabView = flag;
      this.bg_color = true;
      this.ind = 0;
    } else if (flag === false) {
      this.tabView = flag;
      this.bg_color = false;
      this.ind = 1;
    }
  }

  clickImportEnvir(name: string): void {
    console.log(name);
    this.importEnvirInput = name;
  }
  clickImportBuild(name: string): void {
    console.log(name);
    this.importBuildInput = name;
  }
  clickImportUrl(name: string): void {
    console.log(name);
    this.importUrlEnvirInput = name;
  }
  clickImportUrlBuild(name: string): void {
    console.log(name);
    this.importUrlBuildInput = name;
  }

  clickFilterProtocol(data: any): void {
    this.showHideCardProtocol = data;
  }
  clickFilterManuallyEnvir(data: any): void {
    this.showHideCardManuallyEnvir = data;
  }
  clickFilterManuallyBuild(data: any): void {
    this.showHideCardManuallyBuild = data;
  }
  clickManuallyProtocol(name: string): void {
    console.log(name);
    this.manuallyProtocolInput = name;
  }
  clickManuallyEnvir(name: string): void {
    console.log(name);
    this.manuallyEnvirInput = name;
  }
  clickManuallyBuild(name: string): void {
    console.log(name);
    this.manuallyBuildInput = name;
  }

  cancelScreen() {
    this.cancel.emit();
    this.createCatalog.reset();
    // this.createCatalog;
  }

  // browseropenClick(event: any) {
  //   const inputEle: HTMLElement = event.target.parentNode.nextSibling.nextSibling as HTMLElement;
  //   inputEle.click();
  // }

  // gotoExisting() {
  //   this.router.navigate(['/api-request/edit-existing-catalog-list']);
  // }

  // browseropenClick(event: any) {
  //   this.selectedFileArray = event.target.files;
  // }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      console.log(file);
      this.createCatalog.patchValue({
        fileUplaod: file,
      });
    }
  }
  onFileRemove() {
    this.createCatalog.patchValue({
      fileUplaod: null,
    });
  }

  // onImportFileChange(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.openImportUrl = file;
  //     console.log(file);
  //     this.createCatalog.patchValue({
  //       openImportUrl: file,
  //     });
  //   }
  // }

  // this.openImportUrl = file;

  gotoExisting() {
    if (this.importCard) {
      if (this.tabView === true) {
        this.apiRequest
          .catalogImport(this.selectedFile, 1, this.importBuildInput, this.createCatalog.value.name)
          .subscribe((response: any) => {
            this.importID = response.body;
            this.apiRequest.setId(this.importID);
            this.router.navigate(['/api-request/edit-existing-catalog-list'], { queryParams: { type: 'Add' } });
          });
      } else {
        this.apiRequest.importCatalogOpenApi(this.createCatalog.controls.openImportUrl.value, 1).subscribe((response: any) => {
          this.importID = response;
          console.log('openImportApi', response.body);
          this.apiRequest.setId(this.importID);
          this.router.navigate(['/api-request/edit-existing-catalog-list'], { queryParams: { type: 'Add' } });
        });
      }
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Catalog Create Successfully' });
    } else {
      // console.log(this.manuallyBuildInput);

      const obj = {
        name: this.createCatalog.value.name,
        description: 'vertioning',
        type: 'DEFAULT',
        active: true,
        ageing: false,
        authCatalog: null,
        architecture: 'REST',
        versions: [
          {
            versionName: 'dev-5.00',
            env: {
              name: this.manuallyEnvirInput,
              description: 'deployed to dev5',
            },
            buildVersion: {
              name: this.manuallyBuildInput,
              description: 'Second build version',
            },
            apiCollections: null,
          },
        ],
      };
      this.tservice.create(obj).subscribe((response: any) => {
        this.tservice.collectionsetId(obj);
        this.router.navigateByUrl('/api-request/edit-existing-catalog-list');
      });
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Catalog Create Manually Successfully' });
    }
  }
}
