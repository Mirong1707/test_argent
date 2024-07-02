import { ArraySignatureType, Signature } from "starknet";

/**
 * Convert all BigInt values in an object to strings.
 * @template T
 * @param {T} obj - The object to convert.
 * @returns {T} - The object with BigInt values converted to strings.
 */
export function convertBigIntToString<T>(obj: T): T {
  if (typeof obj === "bigint") {
    return obj.toString() as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString) as T;
  }

  if (obj !== null && typeof obj === "object") {
    const newObj: object = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // @ts-expect-error to avoid issue with serialization of bigint
        newObj[key] = convertBigIntToString(obj[key]);
      }
    }
    return newObj as T;
  }

  return obj;
}

export function isArraySignatureType(
  instance: Signature,
): instance is ArraySignatureType {
  return (
    Array.isArray(instance) &&
    instance.every((item) => typeof item === "string")
  );
}

export function parseSignature(signature: Signature): [string, string] {
  if (isArraySignatureType(signature)) {
    return [signature[0].toString(), signature[1].toString()];
  } else {
    return [signature.r.toString(10), signature.s.toString(10)];
  }
}
