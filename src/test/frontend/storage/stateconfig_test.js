// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import storageListModule from 'storage/module';
import {resolveStorage} from 'storage/stateconfig';

describe('StateConfig for storage list', () => {
  /** @type {!common/pagination/pagination_service.PaginationService} */
  let kdPaginationService;

  beforeEach(() => {
    angular.mock.module(storageListModule.name);
    angular.mock.inject((_kdPaginationService_) => {
      kdPaginationService = _kdPaginationService_;
    });
  });

  it('should resolve storage with no namespace', angular.mock.inject(($q) => {
    let promise = $q.defer().promise;

    let resource = jasmine.createSpyObj('$resource', ['get']);
    resource.get.and.callFake(function() {
      return {$promise: promise};
    });

    let actual = resolveStorage(resource, {}, kdPaginationService);

    expect(resource.get).toHaveBeenCalledWith(kdPaginationService.getDefaultResourceQuery(''));
    expect(actual).toBe(promise);
  }));

  it('should resolve storage', angular.mock.inject(($q) => {
    let promise = $q.defer().promise;

    let resource = jasmine.createSpyObj('$resource', ['get']);
    resource.get.and.callFake(function() {
      return {$promise: promise};
    });

    let actual = resolveStorage(resource, {namespace: 'foo'}, kdPaginationService);

    expect(resource.get).toHaveBeenCalledWith(kdPaginationService.getDefaultResourceQuery('foo'));
    expect(actual).toBe(promise);
  }));
});
