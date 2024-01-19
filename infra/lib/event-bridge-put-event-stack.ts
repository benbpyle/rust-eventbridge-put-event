import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { RustFunction } from "cargo-lambda-cdk";
import { FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";
import { EventBus } from "aws-cdk-lib/aws-events";

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
    }
}
