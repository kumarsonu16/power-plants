import { HTTPClientError } from "./httpErrors";
export class HTTP400Error extends HTTPClientError {
    readonly statusCode = 400;
    constructor(message: string | object = 'Bad Request') {
        super(message);
    }
}
