import { NextPage } from "next";
import { Container } from "../lib/components/container";
import * as uint8arrays from "uint8arrays";
import { AddPolicyForm } from "../lib/components/add-policy-form";
import { CacaoBlock } from "ceramic-cacao";

const PoliciesPage: NextPage = () => {
  const handleBlock = (block: CacaoBlock) => {
    console.log("block", block);
    console.log("base64", uint8arrays.toString(block.bytes, "base64"));
  };

  return (
    <Container>
      <AddPolicyForm onSuccess={handleBlock} />
    </Container>
  );
};

export default PoliciesPage;
