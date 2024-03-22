---
date: 2024-03-22
categories:
- featured
title: Docker and Cgroups (Or how to avoid runaway CPU on limited systems)
status: draft
---

I prefer to develop on remote systems, especially now with VSCode's ability to work on remote machines. And most of the time I'm working within a container, like Docker.

The only issue I occasionally run into is the tendency for a larger project to peg the CPU when a bunch of operations are going on. This results in a serious performance penalty for the system I'm on, in some cases even locking up the ability to SSH into the machine until the system terminates the run away process.

You can limit Docker's use of CPU with some argument flags, but when you don't control that process (devcontainers), it's hard to inject those in the right places.

What I really want is the ability to limit the entire Docker process and not have to worry about a container spinning out of control. And linux gives us an easy way to do that.

In this post, I just want to go through the basic steps to add Cgroups to Docker, but it should work for any systemd controlled service.

# Docker Cgroups

TLDR of this process:

1. Create a `.slice` file to set the Cgroup limits.
2. Update the Docker `.service` system file to use that cgroup
3. Reload the systemd daemon to reload the changed configs.
4. Restart the Docker service
5. Confirm the new limitations


If you're on Ubuntu with the normal Dcker install, everything we need to alter and add to lives in here: `/lib/systemd/system`

## 1. Create our `.slice` of limits

```toml
[Unit]
Description=Slice that limits docker resources
Before=slices.target

[Slice]
CPUQuota=150%
MemoryHigh=2G
MemoryMax=4G
MemoryMaxSwap=10G
```

Change the values to suit your use case. Note, if you have 4 CPU's, the highest limit would be 400%. Take this into account.

## 2. Update the `docker.service`

Starts out something like:

```toml
[Service]
Type=notify
# the default is not to use systemd for cgroups because the delegate issues still
# exists and systemd currently does not support the cgroup feature set required
# for containers run by docker
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
ExecReload=/bin/kill -s HUP $MAINPID
TimeoutStartSec=0
RestartSec=2
Restart=always
```

The line:
```toml
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```

Simply needs to change to:

```toml
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --cgroup-parent=docker.slice
```


## 3. Reload the systemd daemon to reload the changed configs.

`sudo systemctl daemon-reload`

## 4. Restart the Docker service

`sudo systemctl restart docker`

## 5. Confirm the new limitations

Change the below values to something that matches your system profile

`$ docker run --rm -it progrium/stress --cpu 2 --io 1 --vm 2 --vm-bytes 128M --timeout 10s`
