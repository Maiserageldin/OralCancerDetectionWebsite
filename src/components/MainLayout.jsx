import BlockContainer from "./Container";
import Layout from "./Layout";
import Header from "./Header";
import Reviews from "./Reviews";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <Layout>
      <Header />
      <BlockContainer />
      <Reviews />
      <Footer />
    </Layout>
  );
}
