import { NextPage } from "next";
import { Container } from "../lib/components/container";
import { AddPolicyForm } from "../lib/components/add-policy-form";
import { StreamID } from "@ceramicnetwork/streamid";
import { useState } from "react";

const PoliciesPage: NextPage = () => {
  const handleStreamId = (streamId: StreamID) => {
    console.log('streamId', streamId)
  };

  return (
    <Container>
      <AddPolicyForm onSuccess={handleStreamId} />
    </Container>
  );
};

export default PoliciesPage;
