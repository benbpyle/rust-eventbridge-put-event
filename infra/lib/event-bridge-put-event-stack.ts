import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { RustFunction } from "cargo-lambda-cdk";
import { FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";
import { CfnRule, EventBus, Rule } from "aws-cdk-lib/aws-events";
import { LogGroup } from "aws-cdk-lib/aws-logs";
import { RemovalPolicy } from "aws-cdk-lib";
import { CloudWatchLogGroup } from "aws-cdk-lib/aws-events-targets";

export class EventBridgePutEventStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const rustFunction = new RustFunction(this, "RustFunction", {
            manifestPath: "./Cargo.toml",
            environment: {
                EVENT_BUS_NAME: "default",
            },
        });

        rustFunction.addFunctionUrl({
            authType: FunctionUrlAuthType.NONE,
        });

        const bus = EventBus.fromEventBusName(this, "EventBus", "default");
        bus.grantPutEventsTo(rustFunction);

        const rule = new Rule(this, `ForwardToCloudWatch`, {
            description: "Send sample events to CloudWatch",
            eventBus: bus,
            eventPattern: {
                detailType: ["rust-demo"],
            },
        });

        const logGroup = new LogGroup(this, "RuleLogGroup", {
            logGroupName: "rust-demo",
            removalPolicy: RemovalPolicy.DESTROY,
        });

        rule.addTarget(new CloudWatchLogGroup(logGroup));
    }
}
