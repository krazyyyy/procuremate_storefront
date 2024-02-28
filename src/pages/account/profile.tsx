import AccountLayout from "@modules/account/templates/account-layout"
import ProfileTemplate from "@modules/account/templates/profile-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import { useRouter } from "next/router"
const Profile: NextPageWithLayout = () => {

  return (
    <>
      <ProfileTemplate />
    </>
  )
}

const ProfileLayout = ({ page }: any) => {
  const { pathname } = useRouter();

  const getTitleAndDescription = () => {
    if (pathname.includes('profile')) {
      return {
        title: 'Procuremate Profile Management',
        description: 'Access and update your profile details at Procuremate. Keep your information current to get the best items and shopping experience always.',
        canonical: 'https://www.fiercefightgear.com/account/profile'
      };
    } else if (pathname.includes('design')) {
      return {
        title: 'Your Design',
        description: 'Your designs.',
        canonical: ''
      };
    } else {
      return {
        title: 'Procuremate Order Tracking and Management',
        description: 'Easily track and manage your customized boxing items and orders at Procuremate. Stay updated on the status of your fight gear shipments.',
        canonical: 'https://www.fiercefightgear.com/account/order'
      };
    }
  };

  const { title, description, canonical } = getTitleAndDescription();

  return (
    <Layout>
      <Head title={title} description={description} canonical={canonical} />
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  );
};


Profile.getLayout = (page: ReactElement) => {
  return <ProfileLayout page={page} />;
};

export default Profile
