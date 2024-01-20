# AWS Rust SDK and EventBridge with Lambda

Purpose: Demonstrate how to deploy a Lambda Function that handles a Function URL request and
then builds a PutRequest to be executed by EventBridge. Supports the [article linked here](https://www.binaryheap.com/eventbridge-with-lambda-and-rust/)

![EventBridge with Lambda and Rust](https://www.binaryheap.com/wp-content/uploads/2024/01/rust_eb.png)

## Install

### Dependencies

-   Rust
-   Node
-   CDK

### Deploy

```bash
# Deploy
cdk deploy
# Destroy
cdk destroy
```
