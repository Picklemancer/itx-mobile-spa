import Header from "~/components/Header";
import Footer from "~/components/Footer";

const Layout = (props) => {
  // ...
  return (
    <>
      <Header onClickHome={props.onClickHome} />

      <main>{props.children}</main>

      <Footer />
    </>
  );
};

export default Layout;