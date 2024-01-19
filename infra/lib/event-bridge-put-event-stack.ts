import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { RustFunction } from "cargo-lambda-cdk";

export class EventBridgePutEventStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new RustFunction(this, "RustFunction", {
            manifestPath: "./Cargo.toml",
        });
    }
}
