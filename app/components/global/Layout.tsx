import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>

        <Header />
        <main role="main" id="mainContent" className="flex-grow ">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
