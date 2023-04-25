import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCollectionsService } from '../../service/api-collections.service';
import { FormControl } from '@angular/forms';
import { EditExistingCatalogListComponent } from '../edit-existing-catalog-list/edit-existing-catalog-list.component';
import { ApiCatalogListComponent } from '../api-catalog-list/api-catalog-list.component';

@Component({
  selector: 'create-new-version-management',
  templateUrl: './create-new-version-management.component.html',
  styleUrls: ['./create-new-version-management.component.scss'],
})
export class CreateNewVersionManagementComponent implements OnInit {
  dropdown = [{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }, { name: 'Option 4' }, { name: 'Option 5' }];
  sidebarSelectSnippet: any;
  tabView: any = false;
  bg_color!: boolean;
  ind: any = 1;
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
  @Output() cancel = new EventEmitter();
  constructor(private router: Router, private tservice: ApiCollectionsService, private apiCatalog: EditExistingCatalogListComponent) {}

  ngOnInit(): void {}

  // clickSidebar(): void {
  //   this.apiCatalog.clickPopup(false);
  // }
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

  onFileChange() {}

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
    this.importEnvirInput.patchValue(name);
  }
  clickImportBuild(name: string): void {
    console.log(name);
    this.importBuildInput.patchValue(name);
  }
  clickImportUrl(name: string): void {
    console.log(name);
    this.importUrlEnvirInput.patchValue(name);
  }
  clickImportUrlBuild(name: string): void {
    console.log(name);
    this.importUrlBuildInput.patchValue(name);
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
    this.manuallyProtocolInput.patchValue(name);
  }
  clickManuallyEnvir(name: string): void {
    console.log(name);
    this.manuallyEnvirInput.patchValue(name);
  }
  clickManuallyBuild(name: string): void {
    console.log(name);
    this.manuallyBuildInput.patchValue(name);
  }

  cancelScreen() {
    this.cancel.emit();
  }

  browseropenClick(event: any) {
    const inputEle: HTMLElement = event.target.parentNode.nextSibling.nextSibling as HTMLElement;
    inputEle.click();
  }
}
