import BlockContainer from "./components/Container";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Reviews from "./components/Reviews";
import "./fontAwesome";
import Footer from "./components/Footer";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

function App() {
  return (
    <ParallaxProvider>
      <Layout>
        <Header />
        <Parallax y={[-20, 20]} tagOuter="figure">
          <BlockContainer />
        </Parallax>
        <Parallax y={[-20, 20]} tagOuter="figure">
          <Reviews />
        </Parallax>
        <Parallax y={[-20, 20]} tagOuter="figure">
          <Footer />
        </Parallax>
      </Layout>
    </ParallaxProvider>
  );
}

export default App;
