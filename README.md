# Kubernetes Dashboard
[![Build Status](https://travis-ci.org/kubernetes/dashboard.svg?branch=master)](https://travis-ci.org/kubernetes/dashboard)
[![Coverage Status](https://codecov.io/github/kubernetes/dashboard/coverage.svg?branch=master)](https://codecov.io/github/kubernetes/dashboard?branch=master)
[![Go Report Card](https://goreportcard.com/badge/github.com/kubernetes/dashboard)](https://goreportcard.com/report/github.com/kubernetes/dashboard)

Kubernetes Dashboard is a general purpose, web-based UI for Kubernetes clusters. It allows users to
manage applications running in the cluster and troubleshoot them, as well as manage the cluster
itself.

![Dashboard UI workloads page](docs/dashboard-ui.png)

## Deployment
It is likely that the Dashboard is already installed on your cluster. Check with the following command:
```bash
kubectl get pods --all-namespaces | grep dashboard
```


If it is missing, you can install the latest stable release by running the following command:
```bash
kubectl create -f https://rawgit.com/kubernetes/dashboard/master/src/deploy/kubernetes-dashboard.yaml
```

You can also install unstable HEAD builds with the newest features that the team works on by
following the [development guide](docs/devel/head-releases.md).

Note that for the metrics and graphs to be available you need to
have [Heapster](https://github.com/kubernetes/heapster/) running in your cluster.

## Usage
You may access the UI via the apiserver proxy. Open a browser and navigate to `https://<kubernetes-master>/ui`.

Please note, this works only if the apiserver is setup to allow authentication
with username and password. Currently, the setup tool `kubeadm` is not doing so.
If username and password is unknown to you then use `kubectl config view` to find it.

## Alternative Usage
Alternatively, you may access the UI via the kubectl proxy. This is useful if you have a `kubectl`
configured with access to the cluster, but lack password credentials for use in a browser:

```bash
kubectl proxy
```

This will make the dashboard available at [http://localhost:8001/ui](http://localhost:8001/ui)

This will only be available from the machine where the command is executed, but you can see
`kubectl proxy --help` for more options.

## Documentation

* The [user guide](http://kubernetes.io/docs/user-guide/ui/) is an entry point for users of Dashboard

* The [design overview](docs/design/README.md) describes design concepts of Dashboard

* The [developer guide](docs/devel/README.md) is for anyone wanting to contribute to Dashboard

* The [troubleshooting guide](docs/user-guide/troubleshooting.md) is a collection of typical setup problems

## License

The work done has been licensed under Apache License 2.0. The license file can be found
[here](LICENSE). You can find out more about the license at:

http://www.apache.org/licenses/LICENSE-2.0
