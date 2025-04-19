import Footer from "./components/Footer";
import GifExpert from "./components/GifExpert";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <main className='max-w-[1024px] mx-auto px-5 pt-10 pb-14'>
        <GifExpert />
      </main>
      <Footer />
    </>
  );
}
