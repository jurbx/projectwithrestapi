import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import About from "./About/About";
import SignForm from "./SignForm/SignForm";
import UserAccount from "./UserAccount/UserAccount";
import SinglePost from "./SinglePost/SinglePost";

export default function Static({item}) {

  return (<>
    <Header activeTab={item} />
    {
    item === "home" ?
      <Home /> :
    item === "sign-in" || item === "sign-up" ?
      <SignForm formType={item} /> :
    item === "about" ?
      <About /> :
    item === "account" ?
      <UserAccount /> :
    item === "single-post" ?
      <SinglePost /> :
      <NotFound />
    }

    <Footer />
  </>)
}
