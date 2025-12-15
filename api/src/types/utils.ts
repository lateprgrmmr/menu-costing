import * as t from "io-ts";
import { isRight } from "fp-ts/Either";
import { PathReporter } from "io-ts/PathReporter";


export const validateRequestPayload = <T, U = T>(
    type: t.HasProps | ((body: T) => t.HasProps),
    options?: {
        mapperFn?: (result: T) => U;
        quiet?: boolean;
    }
): (body: T) => U => {
    return (body: T): U => {
        let iotsType: t.HasProps;
        if (typeof type === 'function') {
            iotsType = type(body);
        } else {
            iotsType = type;
        }

        if (!body) {
            throw new Error(`Unable to validate request payload. ${JSON.stringify(body)}`)
        }

        const deserializedBody = JSON.parse(JSON.stringify(body));
        const validatedResult = t.exact(iotsType).decode(deserializedBody);

        if (isRight(validatedResult)) {
            const value = validatedResult.right;
            const originalKeys = Object.keys(deserializedBody);
            const sanitizedKeys = Object.keys(value);

            if (sanitizedKeys.length < originalKeys.length && !options?.quiet) {
                const removedKeys = originalKeys.filter((k) => !sanitizedKeys.includes(k));
                console.warn('Unused keys in request payload', removedKeys.join(', '));
            }

            return options?.mapperFn ? options.mapperFn(value) : (value as unknown as U);
        } else {
            throw new Error(PathReporter.report(validatedResult).join('\n'));
        }
    }
}