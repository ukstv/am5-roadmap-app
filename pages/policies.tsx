import { NextPage } from "next";
import { Container } from "../lib/components/container";
import { AddPolicyForm } from "../lib/components/add-policy-form";
import { StreamID } from "@ceramicnetwork/streamid";

const PoliciesPage: NextPage = () => {
  const handleStreamId = (streamId: StreamID) => {
    console.log("streamId", streamId.toString());
  };

  return (
    <Container>
      <AddPolicyForm onSuccess={handleStreamId} />
    </Container>
  );
};

export default PoliciesPage;
