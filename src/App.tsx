import "./App.css";
import LandingPage from "./pages/LandingPage";
import IntroPage from "./pages/IntroPage";
import SaveTheDatePage from "./pages/SaveTheDatePage";
import CoupleInfoPage from "./pages/CoupleInfoPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import GalleryPage from "./pages/GalleryPage";
import LoveStoryPage from "./pages/LoveStoryPage";
import GiftRegistryPage from "./pages/GiftRegistryPage";
import RSVPPage from "./pages/RSVPPage";
import WishesPage from "./pages/WishesPage";
import ThankYouPage from "./pages/ThankYouPage";

function App() {
  return (
    <div>
      <LandingPage />
      <IntroPage />
      <CoupleInfoPage />
      <SaveTheDatePage />
      <EventDetailsPage />
      <GalleryPage />
      <LoveStoryPage />
      <GiftRegistryPage />
      <RSVPPage />
      <WishesPage />
      <ThankYouPage />
    </div>
  );
}

export default App;
