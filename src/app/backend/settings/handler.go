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

package settings

import (
	"log"
	"net/http"

	restful "github.com/emicklei/go-restful"
	"github.com/kubernetes/dashboard/src/app/backend/settings/api"
	errorsK8s "k8s.io/apimachinery/pkg/api/errors"
)

// SettingsHandler manages all endpoints related to settings management.
type SettingsHandler struct {
	manager SettingsManager
}

// Install creates new endpoints for settings management.
func (self *SettingsHandler) Install(ws *restful.WebService) {
	ws.Route(
		ws.GET("/settings/global").
			To(self.handleSettingsGlobalGet).
			Writes(api.Settings{}))
	ws.Route(
		ws.PUT("/settings/global").
			To(self.handleSettingsGlobalSave).
			Reads(api.Settings{}).
			Writes(api.Settings{}))
}

func (self *SettingsHandler) handleSettingsGlobalGet(request *restful.Request, response *restful.Response) {
	client, err := self.manager.clientManager.Client(request)
	if err != nil {
		handleInternalError(response, err)
		return
	}

	result := self.manager.GetGlobalSettings(client)
	response.WriteHeaderAndEntity(http.StatusOK, result)
}

func (self *SettingsHandler) handleSettingsGlobalSave(request *restful.Request, response *restful.Response) {
	settings := new(api.Settings)
	if err := request.ReadEntity(settings); err != nil {
		handleInternalError(response, err)
		return
	}

	client, err := self.manager.clientManager.Client(request)
	if err != nil {
		handleInternalError(response, err)
		return
	}

	if err := self.manager.SaveGlobalSettings(client, settings); err != nil {
		handleInternalError(response, err)
		return
	}
	response.WriteHeaderAndEntity(http.StatusCreated, settings)
}

// handleInternalError writes the given error to the response and sets appropriate HTTP status headers.
func handleInternalError(response *restful.Response, err error) {
	log.Print(err)
	statusCode := http.StatusInternalServerError
	statusError, ok := err.(*errorsK8s.StatusError)
	if ok && statusError.Status().Code > 0 {
		statusCode = int(statusError.Status().Code)
	}
	response.AddHeader("Content-Type", "text/plain")
	response.WriteErrorString(statusCode, err.Error()+"\n")
}

// NewSettingsHandler creates SettingsHandler.
func NewSettingsHandler(manager SettingsManager) SettingsHandler {
	return SettingsHandler{manager: manager}
}
