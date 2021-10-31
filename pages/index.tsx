import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BrandImage } from "../components/BrandImage";
import { Button } from "../components/Button";
import { HomeNavbar } from "../components/HomeNavbar";
import { Meta } from "../components/Meta";
import { Typography } from "../components/Typography";
import { MainLayout } from "../layouts/MainLayout";

const Home: NextPage = () => {
  const { push } = useRouter();
  return (
    <>
      <Meta />
      <MainLayout>
        <div className="mt-2">
        <HomeNavbar />
        <div className="d-flex my-5 py-3">
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
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  push("/new");
                }}
              >
                Version 2 (Beta)
              </Button>
              <Button
                variant="outlined"
                onClick={(e) => {
                  e.preventDefault();
                  push("/playlist");
                }}
                className="ms-4"
              >
                Classic
              </Button>
            </div>
          </div>
        </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
