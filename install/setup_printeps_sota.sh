#!/bin/bash

VERSION=19.7.2
SPEAKERCTL_FILE="speakerctl.sh"
SOTA_CONFIG_FILE="sota_config.yaml"
JAR_FILE="sota-ros-service-servers-$VERSION.jar"

if [ ! -e $SPEAKERCTL_FILE ];then
  wget "https://printeps.org/libs/sota-ros-service-servers/$SPEAKERCTL_FILE"
fi

if [ ! -e $SOTA_CONFIG_FILE ];then
  wget "https://printeps.org/libs/sota-ros-service-servers/$SOTA_CONFIG_FILE"
fi

if [ ! -e $JAR_FILE ];then
  wget "https://printeps.org/libs/sota-ros-service-servers/$JAR_FILE"
fi


env > ~/.ssh/environment
