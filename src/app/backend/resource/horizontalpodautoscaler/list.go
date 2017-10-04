// Copyright 2017 The Kubernetes Dashboard Authors.
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

package horizontalpodautoscaler

import (
	"github.com/kubernetes/dashboard/src/app/backend/api"
	"github.com/kubernetes/dashboard/src/app/backend/errors"
	"github.com/kubernetes/dashboard/src/app/backend/resource/common"
	autoscaling "k8s.io/api/autoscaling/v1"
	k8sClient "k8s.io/client-go/kubernetes"
)

type HorizontalPodAutoscalerList struct {
	ListMeta api.ListMeta `json:"listMeta"`

	// Unordered list of Horizontal Pod Autoscalers.
	HorizontalPodAutoscalers []HorizontalPodAutoscaler `json:"horizontalpodautoscalers"`

	// List of non-critical errors, that occurred during resource retrieval.
	Errors []error `json:"errors"`
}

// HorizontalPodAutoscaler (aka. Horizontal Pod Autoscaler)
type HorizontalPodAutoscaler struct {
	ObjectMeta                      api.ObjectMeta `json:"objectMeta"`
	TypeMeta                        api.TypeMeta   `json:"typeMeta"`
	ScaleTargetRef                  ScaleTargetRef `json:"scaleTargetRef"`
	MinReplicas                     *int32         `json:"minReplicas"`
	MaxReplicas                     int32          `json:"maxReplicas"`
	CurrentCPUUtilizationPercentage *int32         `json:"currentCPUUtilizationPercentage"`
	TargetCPUUtilizationPercentage  *int32         `json:"targetCPUUtilizationPercentage"`
}

func GetHorizontalPodAutoscalerList(client k8sClient.Interface, nsQuery *common.NamespaceQuery) (*HorizontalPodAutoscalerList, error) {
	channel := common.GetHorizontalPodAutoscalerListChannel(client, nsQuery, 1)
	hpaList := <-channel.List
	err := <-channel.Error

	nonCriticalErrors, criticalError := errors.HandleError(err)
	if criticalError != nil {
		return nil, criticalError
	}

	return toHorizontalPodAutoscalerList(hpaList.Items, nonCriticalErrors), nil
}

func GetHorizontalPodAutoscalerListForResource(client k8sClient.Interface, namespace, kind, name string) (*HorizontalPodAutoscalerList, error) {
	nsQuery := common.NewSameNamespaceQuery(namespace)
	channel := common.GetHorizontalPodAutoscalerListChannel(client, nsQuery, 1)
	hpaList := <-channel.List
	err := <-channel.Error

	nonCriticalErrors, criticalError := errors.HandleError(err)
	if criticalError != nil {
		return nil, criticalError
	}

	filteredHpaList := make([]autoscaling.HorizontalPodAutoscaler, 0)
	for _, hpa := range hpaList.Items {
		if hpa.Spec.ScaleTargetRef.Kind == kind && hpa.Spec.ScaleTargetRef.Name == name {
			filteredHpaList = append(filteredHpaList, hpa)
		}
	}

	return toHorizontalPodAutoscalerList(filteredHpaList, nonCriticalErrors), nil
}

func toHorizontalPodAutoscalerList(hpas []autoscaling.HorizontalPodAutoscaler, nonCriticalErrors []error) *HorizontalPodAutoscalerList {
	hpaList := &HorizontalPodAutoscalerList{
		HorizontalPodAutoscalers: make([]HorizontalPodAutoscaler, 0),
		ListMeta:                 api.ListMeta{TotalItems: len(hpas)},
		Errors:                   nonCriticalErrors,
	}

	for _, hpa := range hpas {
		horizontalPodAutoscaler := toHorizontalPodAutoScaler(&hpa)
		hpaList.HorizontalPodAutoscalers = append(hpaList.HorizontalPodAutoscalers, horizontalPodAutoscaler)
	}
	return hpaList
}

func toHorizontalPodAutoScaler(hpa *autoscaling.HorizontalPodAutoscaler) HorizontalPodAutoscaler {
	return HorizontalPodAutoscaler{
		ObjectMeta: api.NewObjectMeta(hpa.ObjectMeta),
		TypeMeta:   api.NewTypeMeta(api.ResourceKindHorizontalPodAutoscaler),
		ScaleTargetRef: ScaleTargetRef{
			Kind: hpa.Spec.ScaleTargetRef.Kind,
			Name: hpa.Spec.ScaleTargetRef.Name,
		},
		MinReplicas:                     hpa.Spec.MinReplicas,
		MaxReplicas:                     hpa.Spec.MaxReplicas,
		CurrentCPUUtilizationPercentage: hpa.Status.CurrentCPUUtilizationPercentage,
		TargetCPUUtilizationPercentage:  hpa.Spec.TargetCPUUtilizationPercentage,
	}

}
