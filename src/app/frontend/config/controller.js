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

/**
 * @final
 */
export class ConfigController {
  /**
   * @param {!backendApi.Config} config
   * @param {!angular.Resource} kdConfigMapListResource
   * @param {!angular.Resource} kdSecretListResource
   * @ngInject
   */
  constructor(config, kdConfigMapListResource, kdSecretListResource) {
    /** @export {!backendApi.Config} */
    this.config = config;
    /** @export {!angular.Resource} */
    this.kdConfigMapListResource = kdConfigMapListResource;
    /** @export {!angular.Resource} */
    this.kdSecretListResource = kdSecretListResource;
    /** @export */
    this.i18n = i18n;
  }

  /**
   * @return {boolean}
   * @export
   */
  shouldShowZeroState() {
    /** @type {number} */
    let resourcesLength =
        this.config.configMapList.listMeta.totalItems + this.config.secretList.listMeta.totalItems;

    return resourcesLength === 0;
  }
}

const i18n = {
  /** @export {string} @desc Label that appears above the list of resources. */
  MSG_CONFIG_CONFIG_MAPS_LABEL: goog.getMsg('Config Maps'),
  /** @export {string} @desc Label that appears above the list of resources. */
  MSG_CONFIG_SECRETS_LABEL: goog.getMsg('Secrets'),
};
