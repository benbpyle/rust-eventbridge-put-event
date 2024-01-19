#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { EventBridgePutEventStack } from "../lib/event-bridge-put-event-stack";

const app = new cdk.App();
new EventBridgePutEventStack(app, "EventBridgePutEventStack", {});
