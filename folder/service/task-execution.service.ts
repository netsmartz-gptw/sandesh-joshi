import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITaskExecution, getTaskExecutionIdentifier } from '../model/task-execution.model';

export type EntityResponseType = HttpResponse<ITaskExecution>;
export type EntityArrayResponseType = HttpResponse<ITaskExecution[]>;

@Injectable({ providedIn: 'root' })
export class TaskExecutionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/task-executions', 'testopsctrl');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/task-executions', 'testopsctrl');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(taskExecution: ITaskExecution): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taskExecution);
    return this.http
      .post<ITaskExecution>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(taskExecution: ITaskExecution): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taskExecution);
    return this.http
      .put<ITaskExecution>(`${this.resourceUrl}/${getTaskExecutionIdentifier(taskExecution) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(taskExecution: ITaskExecution): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taskExecution);
    return this.http
      .patch<ITaskExecution>(`${this.resourceUrl}/${getTaskExecutionIdentifier(taskExecution) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  // find(id: number): Observable<EntityResponseType> {
  //   return this.http
  //     .get<ITaskExecution>(`${this.resourceUrl}/${id}`, { observe: 'response' })
  //     .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  // }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaskExecution>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITaskExecution[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITaskExecution[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addTaskExecutionToCollectionIfMissing(
    taskExecutionCollection: ITaskExecution[],
    ...taskExecutionsToCheck: (ITaskExecution | null | undefined)[]
  ): ITaskExecution[] {
    const taskExecutions: ITaskExecution[] = taskExecutionsToCheck.filter(isPresent);
    if (taskExecutions.length > 0) {
      const taskExecutionCollectionIdentifiers = taskExecutionCollection.map(
        taskExecutionItem => getTaskExecutionIdentifier(taskExecutionItem)!
      );
      const taskExecutionsToAdd = taskExecutions.filter(taskExecutionItem => {
        const taskExecutionIdentifier = getTaskExecutionIdentifier(taskExecutionItem);
        if (taskExecutionIdentifier == null || taskExecutionCollectionIdentifiers.includes(taskExecutionIdentifier)) {
          return false;
        }
        taskExecutionCollectionIdentifiers.push(taskExecutionIdentifier);
        return true;
      });
      return [...taskExecutionsToAdd, ...taskExecutionCollection];
    }
    return taskExecutionCollection;
  }

  protected convertDateFromClient(taskExecution: ITaskExecution): ITaskExecution {
    return Object.assign({}, taskExecution, {
      createTime: taskExecution.createTime?.isValid() ? taskExecution.createTime.toJSON() : undefined,
      startTime: taskExecution.startTime?.isValid() ? taskExecution.startTime.toJSON() : undefined,
      endTime: taskExecution.endTime?.isValid() ? taskExecution.endTime.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createTime = res.body.createTime ? dayjs(res.body.createTime) : undefined;
      res.body.startTime = res.body.startTime ? dayjs(res.body.startTime) : undefined;
      res.body.endTime = res.body.endTime ? dayjs(res.body.endTime) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((taskExecution: ITaskExecution) => {
        taskExecution.createTime = taskExecution.createTime ? dayjs(taskExecution.createTime) : undefined;
        taskExecution.startTime = taskExecution.startTime ? dayjs(taskExecution.startTime) : undefined;
        taskExecution.endTime = taskExecution.endTime ? dayjs(taskExecution.endTime) : undefined;
      });
    }
    return res;
  }
}
