import type { NextPage } from "next";
import { useAccount } from "../lib/fancy/use-account";
import { Container } from "../lib/components/container";

const Home: NextPage = () => {
  const account = useAccount();

  return (
    <Container>
      <div>INDEX</div>
    </Container>
  );
};

export default Home;
