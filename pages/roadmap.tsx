import { NextPage } from "next";
import { Container } from "../lib/components/container";
import { useEffect, useState } from "react";
import accessRoadmap from "../lib/fancy/access-roadmap"

const RoadmapPage: NextPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRoadmap().catch(err => console.log(err))
  }, [])

  let loadRoadmap = async () => {
    setLoading(true)
    await accessRoadmap()
    setLoading(false);
  };

  console.log("data:", data)
  return <Container>Roadmap</Container>;
};

export default RoadmapPage;
