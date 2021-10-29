import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BrandImage } from "../components/BrandImage";
import { Button } from "../components/Button";
import { HomeNavbar } from "../components/HomeNavbar";
import { Meta } from "../components/Meta";
import { Playlist } from "../components/Playlist";
import { Card, HorizontalCard } from "../components/v2/Card";
import { PageTitle } from "../components/v2/PageTitle";
import { MainLayout } from "../layouts/MainLayout";

const Contributors: NextPage = () => {
  const { push } = useRouter();
  return (
    <>
      <Meta />
      <MainLayout noScroll>
        <div className="mt-2">
          <HomeNavbar />
          <div className="d-flex">
            <div className="col-sm-12 col-md-3 flex-shrink-0">
              <PageTitle className="text-light">Playlist for today</PageTitle>
              <Playlist>
              <HorizontalCard
              subTitle="Awesome"
              title="Song Title"
              image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
              />
              <HorizontalCard
              subTitle="Awesome"
              title="Song Title"
              image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
              />
              <HorizontalCard
              subTitle="Awesome"
              title="Song Title"
              image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
              />
              <HorizontalCard
              subTitle="Awesome"
              title="Song Title"
              image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
              />
              <HorizontalCard
              subTitle="Awesome"
              title="Song Title"
              image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
              />
              </Playlist>
            </div>
            <div className="flex-grow-1">
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <PageTitle className="text-light">
                      Recently Played
                    </PageTitle>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <Card
                      subTitle="Awesome"
                      title="Song Title"
                      image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
                    />
                  </div>
                  <div className="col-sm-3">
                    <Card
                      subTitle="Awesome"
                      title="Song Title"
                      image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
                    />
                  </div>
                  <div className="col-sm-3">
                    <Card
                      subTitle="Awesome"
                      title="Song Title"
                      image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
                    />
                  </div>
                  <div className="col-sm-3">
                    <Card
                      subTitle="Awesome"
                      title="Song Title"
                      image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
                    />
                  </div>
                  <div className="col-sm-3">
                    <Card
                      subTitle="Awesome"
                      title="Song Title"
                      image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
                    />
                  </div>
                  <div className="col-sm-3">
                    <Card
                      subTitle="Awesome"
                      title="Song Title"
                      image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
                    />
                  </div>
                  <div className="col-sm-3">
                    <Card
                      subTitle="Awesome"
                      title="Song Title"
                      image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
                    />
                  </div>
                  <div className="col-sm-3">
                    <Card
                      subTitle="Awesome"
                      title="Song Title"
                      image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
                    />
                  </div>
                  <div className="col-sm-3">
                    <Card
                      subTitle="Awesome"
                      title="Song Title"
                      image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
                    />
                  </div>
                  <div className="col-sm-3">
                    <Card
                      subTitle="Awesome"
                      title="Song Title"
                      image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
                    />
                  </div>
                  <div className="col-sm-3">
                    <Card
                      subTitle="Awesome"
                      title="Song Title"
                      image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
                    />
                  </div>
                  <div className="col-sm-3">
                    <Card
                      subTitle="Awesome"
                      title="Song Title"
                      image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
                    />
                  </div>
                  <div className="col-sm-3">
                    <Card
                      subTitle="Awesome"
                      title="Song Title"
                      image="https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg"
                    />
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
