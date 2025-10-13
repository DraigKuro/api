import { CustomError } from "./customError";

export const ControllerError = (statusCode: number, message: string) =>
    new CustomError(statusCode, message, "controller");

export const ServiceError = (message = "Error en servicio") =>
    new CustomError(500, message, "service");
