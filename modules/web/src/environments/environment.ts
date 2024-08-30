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

export const environment = {
  production: false,
  // msalConfig: {
  //   auth: {
  //       clientId: '51fcc177-a088-4163-91c8-58f2cb0288b1',
  //       authority: 'https://login.microsoftonline.com/428f4e2e-13bf-4884-b364-02ef9af41a1d',
  //       //redirectUri: 'http://localhost:8080/workloads?namespace=default',
  //       redirectUri: window.location.origin + '/dashboard/workloads?namespace=default',
  //    }
  // },

  msalConfig: {
    auth: {
      clientId: '01a2b0ca-b8ca-4514-a02e-037cc0a99b13',
      authority: 'https://login.microsoftonline.com/f629406d-338b-47b3-bea6-bad44301d022',
      redirectUri: window.location.origin + '/dashboard/workloads?namespace=default',
     }
},
  apiConfig: {
      scopes: ['user.read'],
      uri: 'https://graph.microsoft.com/v1.0/me'
  }
};