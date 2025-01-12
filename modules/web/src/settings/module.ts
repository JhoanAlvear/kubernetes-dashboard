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

import {NgModule} from '@angular/core';

import {ComponentsModule} from '@common/components/module';
import {SharedModule} from '../shared.module';

import {SettingsComponent} from './component';
import {SettingsEntryComponent} from './entry/component';
import {GlobalSettingsComponent} from './global/component';
import {AddFallbackNamespaceDialogComponent} from './global/namespace/adddialog/dialog';
import {NamespaceSettingsComponent} from './global/namespace/component';
import {EditFallbackNamespaceDialogComponent} from './global/namespace/editdialog/dialog';
import {SaveAnywayDialogComponent} from './global/saveanywaysdialog/dialog';
import {SettingsHelperService} from './global/service';
import {LocalSettingsComponent} from './local/component';
import {SettingsRoutingModule} from './routing';


const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  imports: [SharedModule, ComponentsModule, SettingsRoutingModule  ],
  declarations: [
    GlobalSettingsComponent,
    LocalSettingsComponent,
    SettingsComponent,
    SettingsEntryComponent,
    NamespaceSettingsComponent,
    AddFallbackNamespaceDialogComponent,
    EditFallbackNamespaceDialogComponent,
    SaveAnywayDialogComponent,
    
  ],
  providers: [SettingsHelperService],
})
export class SettingsModule {}
