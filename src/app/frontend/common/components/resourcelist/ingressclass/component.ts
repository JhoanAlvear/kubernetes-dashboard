// Copyright 2017 The Kubernetes Authors.
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

import {HttpParams} from '@angular/common/http';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {IngressClass, IngressClassList} from '@api/root.api';
import {Observable} from 'rxjs';

import {ResourceListBase} from '@common/resources/list';
import {NotificationsService} from '@common/services/global/notifications';
import {EndpointManager, Resource} from '@common/services/resource/endpoint';
import {ResourceService} from '@common/services/resource/resource';
import {MenuComponent} from '../../list/column/menu/component';
import {ListGroupIdentifier, ListIdentifier} from '../groupids';

@Component({
  selector: 'kd-ingress-class-list',
  templateUrl: './template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngressClassListComponent extends ResourceListBase<IngressClassList, IngressClass> {
  @Input() endpoint = EndpointManager.resource(Resource.ingressClass).list();

  constructor(
    private readonly ic_: ResourceService<IngressClassList>,
    notifications: NotificationsService,
    cdr: ChangeDetectorRef
  ) {
    super('ingressclass', notifications, cdr);
    this.id = ListIdentifier.ingressClass;
    this.groupId = ListGroupIdentifier.cluster;

    // Register action columns.
    this.registerActionColumn<MenuComponent>('menu', MenuComponent);
  }

  getResourceObservable(params?: HttpParams): Observable<IngressClassList> {
    return this.ic_.get(this.endpoint, undefined, params);
  }

  map(ingressClassList: IngressClassList): IngressClass[] {
    return ingressClassList.items;
  }

  getDisplayColumns(): string[] {
    return ['name', 'controller', 'created'];
  }
}
