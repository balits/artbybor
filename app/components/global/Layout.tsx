import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';
import {MotionConfig} from "framer-motion"

export default function Layout({
  children,
  noFooter = false
}: {
  children: React.ReactNode,
  noFooter?: boolean
}) {
  return (
    <MotionConfig reducedMotion='user'>
      <div
        className="flex flex-col min-h-screen"
      >
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>

        <Header />
        <main role="main" id="mainContent" className="flex-grow ">
          {children}
        </main>
        {!noFooter && <Footer />}
      </div>
    </MotionConfig>
  );
}
