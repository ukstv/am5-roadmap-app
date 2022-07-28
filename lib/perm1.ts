import * as dagCbor from "@ipld/dag-cbor";
import * as uint8arrays from "uint8arrays";

export function createResource(
  resource: string,
  action: string,
  toggleSource: string,
  togglePath: string
): string {
  const payload = {
    resource: resource,
    action: action,
    toggleSource: toggleSource,
    togglePath: togglePath,
  };
  const bytes = dagCbor.encode(payload);
  const blob = uint8arrays.toString(bytes, "base64url");
  return `ipld+perm1://${blob}`;
}

export function parseResource(input: string) {
  const s = input.replace(`ipfs+perm1://`, "");
  const blob = uint8arrays.fromString(s, "base64url");
  const payload = dagCbor.decode(blob);
  return payload;
}
