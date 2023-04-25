import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ArchitectureType } from 'app/entities/enumerations/architecture-type.model';
import { HttpMethod } from 'app/entities/enumerations/http-method.model';
import { ApiSource } from 'app/entities/enumerations/api-source.model';
import { AuthType } from 'app/entities/enumerations/auth-type.model';
import { IncludeKeyAs } from 'app/entities/enumerations/include-key-as.model';
import { BodyType } from 'app/entities/enumerations/body-type.model';
import { RawType } from 'app/entities/enumerations/raw-type.model';
import { IApiRequest, ApiRequest } from '../model/api-request.model';

import { ApiRequestService } from './api-request.service';

describe('ApiRequest Service', () => {
  let service: ApiRequestService;
  let httpMock: HttpTestingController;
  let elemDefault: IApiRequest;
  let expectedResult: IApiRequest | IApiRequest[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ApiRequestService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      architecture: ArchitectureType.REST,
      method: HttpMethod.GET,
      source: ApiSource.DEFAULT,
      url: 'AAAAAAA',
      description: 'AAAAAAA',
      name: 'AAAAAAA',
      entityName: 'AAAAAAA',
      postScript: 'AAAAAAA',
      preScript: 'AAAAAAA',
      assertion: 'AAAAAAA',
      authType: AuthType.NO_AUTH,
      authKey: 'AAAAAAA',
      authValue: 'AAAAAAA',
      includeKeyAs: IncludeKeyAs.HEADER,
      username: 'AAAAAAA',
      password: 'AAAAAAA',
      token: 'AAAAAAA',
      consumerKey: 'AAAAAAA',
      consumerSecret: 'AAAAAAA',
      tokenSecret: 'AAAAAAA',
      workstation: 'AAAAAAA',
      domain: 'AAAAAAA',
      host: 'AAAAAAA',
      port: 0,
      bodyType: BodyType.NONE,
      rawText: 'AAAAAAA',
      rawType: RawType.TEXT,
      binaryContentType: 'image/png',
      binary: 'AAAAAAA',
      binaryName: 'AAAAAAA',
      graphQlQuery: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ApiRequest', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ApiRequest()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ApiRequest', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          architecture: 'BBBBBB',
          method: 'BBBBBB',
          source: 'BBBBBB',
          url: 'BBBBBB',
          description: 'BBBBBB',
          name: 'BBBBBB',
          entityName: 'BBBBBB',
          postScript: 'BBBBBB',
          preScript: 'BBBBBB',
          assertion: 'BBBBBB',
          authType: 'BBBBBB',
          authKey: 'BBBBBB',
          authValue: 'BBBBBB',
          includeKeyAs: 'BBBBBB',
          username: 'BBBBBB',
          password: 'BBBBBB',
          token: 'BBBBBB',
          consumerKey: 'BBBBBB',
          consumerSecret: 'BBBBBB',
          tokenSecret: 'BBBBBB',
          workstation: 'BBBBBB',
          domain: 'BBBBBB',
          host: 'BBBBBB',
          port: 1,
          bodyType: 'BBBBBB',
          rawText: 'BBBBBB',
          rawType: 'BBBBBB',
          binary: 'BBBBBB',
          binaryName: 'BBBBBB',
          graphQlQuery: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ApiRequest', () => {
      const patchObject = Object.assign(
        {
          method: 'BBBBBB',
          source: 'BBBBBB',
          name: 'BBBBBB',
          assertion: 'BBBBBB',
          authKey: 'BBBBBB',
          includeKeyAs: 'BBBBBB',
          password: 'BBBBBB',
          consumerKey: 'BBBBBB',
          consumerSecret: 'BBBBBB',
          tokenSecret: 'BBBBBB',
          port: 1,
          binaryName: 'BBBBBB',
          graphQlQuery: 'BBBBBB',
        },
        new ApiRequest()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ApiRequest', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          architecture: 'BBBBBB',
          method: 'BBBBBB',
          source: 'BBBBBB',
          url: 'BBBBBB',
          description: 'BBBBBB',
          name: 'BBBBBB',
          entityName: 'BBBBBB',
          postScript: 'BBBBBB',
          preScript: 'BBBBBB',
          assertion: 'BBBBBB',
          authType: 'BBBBBB',
          authKey: 'BBBBBB',
          authValue: 'BBBBBB',
          includeKeyAs: 'BBBBBB',
          username: 'BBBBBB',
          password: 'BBBBBB',
          token: 'BBBBBB',
          consumerKey: 'BBBBBB',
          consumerSecret: 'BBBBBB',
          tokenSecret: 'BBBBBB',
          workstation: 'BBBBBB',
          domain: 'BBBBBB',
          host: 'BBBBBB',
          port: 1,
          bodyType: 'BBBBBB',
          rawText: 'BBBBBB',
          rawType: 'BBBBBB',
          binary: 'BBBBBB',
          binaryName: 'BBBBBB',
          graphQlQuery: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ApiRequest', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addApiRequestToCollectionIfMissing', () => {
      it('should add a ApiRequest to an empty array', () => {
        const apiRequest: IApiRequest = { id: 123 };
        expectedResult = service.addApiRequestToCollectionIfMissing([], apiRequest);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(apiRequest);
      });

      it('should not add a ApiRequest to an array that contains it', () => {
        const apiRequest: IApiRequest = { id: 123 };
        const apiRequestCollection: IApiRequest[] = [
          {
            ...apiRequest,
          },
          { id: 456 },
        ];
        expectedResult = service.addApiRequestToCollectionIfMissing(apiRequestCollection, apiRequest);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ApiRequest to an array that doesn't contain it", () => {
        const apiRequest: IApiRequest = { id: 123 };
        const apiRequestCollection: IApiRequest[] = [{ id: 456 }];
        expectedResult = service.addApiRequestToCollectionIfMissing(apiRequestCollection, apiRequest);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(apiRequest);
      });

      it('should add only unique ApiRequest to an array', () => {
        const apiRequestArray: IApiRequest[] = [{ id: 123 }, { id: 456 }, { id: 90596 }];
        const apiRequestCollection: IApiRequest[] = [{ id: 123 }];
        expectedResult = service.addApiRequestToCollectionIfMissing(apiRequestCollection, ...apiRequestArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const apiRequest: IApiRequest = { id: 123 };
        const apiRequest2: IApiRequest = { id: 456 };
        expectedResult = service.addApiRequestToCollectionIfMissing([], apiRequest, apiRequest2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(apiRequest);
        expect(expectedResult).toContain(apiRequest2);
      });

      it('should accept null and undefined values', () => {
        const apiRequest: IApiRequest = { id: 123 };
        expectedResult = service.addApiRequestToCollectionIfMissing([], null, apiRequest, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(apiRequest);
      });

      it('should return initial array if no ApiRequest is added', () => {
        const apiRequestCollection: IApiRequest[] = [{ id: 123 }];
        expectedResult = service.addApiRequestToCollectionIfMissing(apiRequestCollection, undefined, null);
        expect(expectedResult).toEqual(apiRequestCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
