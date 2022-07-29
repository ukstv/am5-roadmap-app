import { NextPage } from "next";
import { Container } from "../lib/components/container";
import { useEffect, useState } from "react";
import accessRoadmap from "../lib/fancy/access-roadmap";
import { useRouter } from "next/router";
import { useAccount } from "../lib/fancy/use-account";

const RoadmapPage: NextPage = () => {
  const account = useAccount();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [permitted, setPermitted] = useState(false);

  useEffect(() => {
    loadRoadmap().catch((err) => console.log(err));
  }, [router.isReady]);

  let loadRoadmap = async () => {
    setLoading(true);
    if (router.query.s) {
      const gotAccess = await accessRoadmap(
        account?.address as string,
        router.query.s as string
      );
      setPermitted(gotAccess);
    }
    setLoading(false);
  };

  if (permitted) {
    return <Container>Roadmap</Container>;
  } else {
    return <Container>Not allowed to see the roadmap</Container>;
  }
};

export default RoadmapPage;
