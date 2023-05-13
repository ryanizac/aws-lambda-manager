import type { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { Controller } from "../../core";
import dotenv from "dotenv";

dotenv.config();

type ControllerFactory = () => Controller;

export function adaptController(controllerFactory: ControllerFactory) {
  const controller = controllerFactory();

  return async function handler(
    event: APIGatewayEvent,
  ): Promise<APIGatewayProxyResult> {
    const response = await controller.execute({
      body: JSON.parse(event.body || "{}"),
      headers: event.headers,
      query: event.queryStringParameters || {},
      params: event.pathParameters || {},
    });

    return {
      statusCode: response.code,
      body: JSON.stringify(response.data),
    };
  };
}
