import type { NextPage } from "next";
import { useRouter } from "next/router";
import { HomeNavbar } from "../components/HomeNavbar";
import { Meta } from "../components/Meta";
import { Typography } from "../components/Typography";
import { ContributorsCard } from "../components/v2/ContributorsCard";
import config from "../config";
import { MainLayout } from "../layouts/MainLayout";

const Contributors: NextPage = () => {
  const { push } = useRouter();
  return (
    <>
      <Meta />
      <MainLayout noScroll>
        <div className="mt-2">
          <HomeNavbar />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5">
                <Typography
                  as="h1"
                  variant="title"
                  className="text-light mt-4 pt-4"
                >
                  People behind
                </Typography>
                <Typography as="h1" variant="title" className="text-light">
                  the stage
                </Typography>
                <Typography className="text-light" variant="body">
                  Music playground is live and working because of these people.
                  This is a concept of a playground where you can play with
                  music, add music and let your friends enjoy it along with you.
                  Have fun!
                </Typography>
              </div>
              <div className="col-md-7">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-4">
                    <ContributorsCard image={config.baseUrl+'/images/ishan.png'}>
                  <Typography className="text-light fs-5">Ishan Dongol</Typography>
                  <Typography className="text-light">Lead Developer</Typography>
                  </ContributorsCard>
                    </div>
                    <div className="col-md-4">
                    <ContributorsCard  image={config.baseUrl+"/images/prelisha.png"}>
                  <Typography className="text-light fs-5">Prelisha Dahal</Typography>
                  <Typography className="text-light">Designer</Typography>
                  </ContributorsCard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Contributors;
