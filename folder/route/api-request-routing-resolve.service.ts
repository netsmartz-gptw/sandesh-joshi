import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IApiRequest, ApiRequest } from '../model/api-request.model';
import { ApiRequestService } from '../service/api-request.service';

@Injectable({ providedIn: 'root' })
export class ApiRequestRoutingResolveService implements Resolve<IApiRequest> {
  constructor(protected service: ApiRequestService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IApiRequest> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((apiRequest: HttpResponse<ApiRequest>) => {
          if (apiRequest.body) {
            return of(apiRequest.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ApiRequest());
  }
}
