#!/bin/bash

VERSION=19.8.1
SPEAKERCTL_FILE="speakerctl.sh"
SOTA_CONFIG_FILE="sota_config.yaml"
JAR_FILE="sota-ros-service-servers-$VERSION.jar"
JETTY_ALPN_AGENT_FILE="jetty-alpn-agent-2.0.9.jar"

if [ ! -e $SPEAKERCTL_FILE ];then
  wget "https://printeps.org/libs/sota-ros-service-servers/$SPEAKERCTL_FILE"
fi

if [ ! -e $SOTA_CONFIG_FILE ];then
  wget "https://printeps.org/libs/sota-ros-service-servers/$SOTA_CONFIG_FILE"
fi

if [ ! -e $JAR_FILE ];then
  wget "https://printeps.org/libs/sota-ros-service-servers/$JAR_FILE"
fi

if [ ! -e $JETTY_ALPN_AGENT_FILE ];then
  wget "https://repo.maven.apache.org/maven2/org/mortbay/jetty/alpn/jetty-alpn-agent/2.0.9/jetty-alpn-agent-2.0.9.jar"
fi

env > ~/.ssh/environment
