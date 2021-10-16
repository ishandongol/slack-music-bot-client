import type { NextPage } from "next";
import { BrandImage } from "../components/BrandImage";
import { Button } from "../components/Button";
import { Meta } from "../components/Meta";
import { Typography } from "../components/Typography";
import { MainLayout } from "../layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <>
      <Meta />
      <MainLayout>
        <div className="d-flex">
          <div>
            <BrandImage className="mb-4" />
            <Typography
              as="h1"
              variant="title"
              className="text-light mt-4 pt-4"
            >
              Feel the music,
            </Typography>
            <Typography as="h1" variant="title" className="text-light">
              set yourself <span className="text-primary">free.</span>
            </Typography>
            <Typography variant="subtitle" className="text-light mt-4">
              Invite your friends and listen to music together.
            </Typography>
            <div className="mt-4 pt-2">
              <Button>Start the party</Button>
              <Button variant="outlined" className="ms-4">Join the party</Button>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
