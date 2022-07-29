import React, { FormEvent, useState } from "react";
import { CacaoBlock } from "ceramic-cacao";
import { useSiwe } from "../fancy/use-siwe";
import addAccess from "../fancy/add-access";
import { createResource } from "../perm1";
import { StreamID } from "@ceramicnetwork/streamid";

type Props = {
  onSuccess: (streamId: StreamID) => void;
  onError?: (error: Error) => void;
};
export function AddPolicyForm(props: Props) {
  const siweFn = useSiwe();
  const [subject, setSubject] = useState("");
  const [streamId, setStreamId] = useState("");

  const renderStreamId = () => {
    if (streamId) {
      return (
        <p>
          <a className={"underline decoration-1"} href={`/roadmap?s=${streamId}`}>{streamId}</a>
        </p>
      );
    } else {
      return <></>;
    }
  };

  const handleAddPolicy = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const streamId = await addAccess(async (streamId) => {
        const resource = createResource(
          "http://roadmap.ceramic.network",
          "read",
          `ceramic://${streamId}`,
          "$.policy"
        );
        return siweFn({ uri: subject, resources: [resource] });
      });
      setStreamId(streamId.toString());
      props.onSuccess(streamId);
    } catch (e: any) {
      props.onError?.(e);
    }
  };

  return (
    <div className={"border rounded-lg p-2"}>
      <h4 className={"font-bold"}>Add Policy</h4>
      <form onSubmit={handleAddPolicy}>
        <input
          type={"text"}
          className={"border rounded-md px-2 w-1/2"}
          placeholder={"did:pkh:eip155:0xdeadbeaf"}
          value={subject}
          onChange={(e) => setSubject(e.currentTarget.value)}
        />
        <div className={"my-2"}>
          <button
            type={"submit"}
            className={"border rounded-md px-2 py-1 bg-sky-500 text-white"}
          >
            Add policy
          </button>
        </div>
      </form>
      {renderStreamId()}
    </div>
  );
}
