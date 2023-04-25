import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ApiRequestRoutingResolveService } from './api-request-routing-resolve.service';
import { ApiCatalogListComponent } from '../component/api-catalog-list/api-catalog-list.component';
import { ApiCatalogAuthListComponent } from '../component/api-catalog-auth-list/api-catalog-auth-list.component';
import { EditExistingCatalogListComponent } from '../component/edit-existing-catalog-list/edit-existing-catalog-list.component';
import { AuthCatalogListComponent } from '../../auth-catalog/component/auth-catalog-list/auth-catalog-list.component';

const apiRequestRoute: Routes = [
  {
    path: '',
    component: ApiCatalogListComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  // {
  //   path: ':id/view',
  //   component: ApiRequestDetail2Component,
  //   resolve: {
  //     apiRequest: ApiRequestRoutingResolveService,
  //   },
  //   canActivate: [UserRouteAccessService],
  // },
  {
    path: 'api-catalog-auth-list',
    component: ApiCatalogAuthListComponent,
    resolve: {
      apiRequest: ApiRequestRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'edit-existing-catalog-list',
    component: EditExistingCatalogListComponent,
    resolve: {
      apiRequest: ApiRequestRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'auth-catalog-list',
    component: AuthCatalogListComponent,
    resolve: {
      apiRequest: ApiRequestRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(apiRequestRoute)],
  exports: [RouterModule],
})
export class ApiRequestRoutingModule {}
