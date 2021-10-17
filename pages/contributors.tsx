import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BrandImage } from "../components/BrandImage";
import { Button } from "../components/Button";
import { HomeNavbar } from "../components/HomeNavbar";
import { Meta } from "../components/Meta";
import { Typography } from "../components/Typography";
import { MainLayout } from "../layouts/MainLayout";

const Contributors: NextPage = () => {
  const { push } = useRouter();
  return (
    <>
      <Meta />
      <MainLayout>
        <div className="mt-2">
        <HomeNavbar />
        Contributors
        </div>
      </MainLayout>
    </>
  );
};

export default Contributors;
