import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ApiRequestRoutingModule } from './route/api-request-routing.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { CommondeclareModule } from '../commondeclare.module';
import { ApiCatalogListComponent } from './component/api-catalog-list/api-catalog-list.component';
import { ApiCatalogAuthListComponent } from './component/api-catalog-auth-list/api-catalog-auth-list.component';
import { ApiCatalogEditAuthComponent } from './component/api-catalog-edit-auth/api-catalog-edit-auth.component';
import { ApiCatalogCreateAuthComponent } from './component/api-catalog-create-auth/api-catalog-create-auth.component';
import { CreateApiCatalogComponent } from './component/create-api-catalog/create-api-catalog.component';
import { CreateNewVersionManagementComponent } from './component/create-new-version-management/create-new-version-management.component';
//import { EditExistingCatalogListComponent } from './component/edit-existing-catalog-list/edit-existing-catalog-list.component';
import { EditExistingCatalogAuthComponent } from './component/edit-existing-catalog-auth/edit-existing-catalog-auth.component';
import { MenuModule } from 'primeng/menu';
import { ApiCatalogRequestPopupComponent } from './component/api-catalog-request-popup/api-catalog-request-popup.component';
import { ApiCatalogResponsePopupComponent } from './component/api-catalog-response-popup/api-catalog-response-popup.component';
import { ApiCatalogExecutionPopupComponent } from './component/api-catalog-execution-popup/api-catalog-execution-popup.component';
import { ClipboardModule } from 'ngx-clipboard';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { FilterPipe } from './pipe/filter.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { ApiCatalogDetailComponent } from './component/api-catalog-detail/api-catalog-detail.component';
import { TestOpsCtrlApiTestModule } from '../api-test/api-test.module';
import { EditExistingCatalogListComponent } from './component/edit-existing-catalog-list/edit-existing-catalog-list.component';
import { UiTestControllerEnvironmentModule } from '../environment/environment.module';

@NgModule({
  imports: [
    SharedModule,
    CommondeclareModule,
    ToastModule,
    RippleModule,
    ApiRequestRoutingModule,
    NgxJsonViewerModule,
    ScrollPanelModule,
    CardModule,
    TagModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
    SidebarModule,
    TableModule,
    InputSwitchModule,
    MultiSelectModule,
    OverlayPanelModule,
    ChipModule,
    MenuModule,
    ClipboardModule,
    NgJsonEditorModule,
    TooltipModule,
    TestOpsCtrlApiTestModule,
    UiTestControllerEnvironmentModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ApiCatalogListComponent,
    ApiCatalogAuthListComponent,
    ApiCatalogEditAuthComponent,
    ApiCatalogCreateAuthComponent,
    CreateApiCatalogComponent,
    CreateNewVersionManagementComponent,
    EditExistingCatalogListComponent,
    EditExistingCatalogAuthComponent,
    ApiCatalogRequestPopupComponent,
    ApiCatalogResponsePopupComponent,
    ApiCatalogExecutionPopupComponent,
    FilterPipe,
    ApiCatalogDetailComponent,
  ],
  entryComponents: [],
  exports: [ApiCatalogAuthListComponent, ApiCatalogDetailComponent],
})
export class TestOpsCtrlApiRequestModule {}
