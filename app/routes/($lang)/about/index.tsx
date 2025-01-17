import InstagramGallery from '~/components/homepage/InstagramGallery';
import { Container } from '~/components/global/Container';
import { HeadersFunction, LinksFunction } from '@shopify/remix-oxygen';
import { seoPayload } from '~/lib/seo.server';
import { json } from '@shopify/remix-oxygen';
import { Heading, Text } from '~/components/ui';
import { delay, motion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import { AnalyticsPageType } from '@shopify/hydrogen';

export const link: LinksFunction = () => [
  {
    rel: "preload",
    href: "/portrait.JPG",
    as: "image",
    type: "image/svg"
  }
]


export const headers: HeadersFunction = () => ({
  "Cache-Control": "max-age=300, s-maxage=3600",
});

export async function loader() {
  const seo = seoPayload.customPage({
    title: "About",
    description: "Learn all about Art by Bori",
    url: "https://www.artbybori.com/about"
  })

  return json({
    seo,
    analytics: {
      pageType: AnalyticsPageType.page
    }
  })
}

export default function About() {
  return (
    <>
      <section className="flex flex-col md:grid md:grid-cols-2  w-full h-fit md:h-minus-header scaling-mt-header">
        <div className="relative overflow-hidden bg-custom-signature-green h-minus-header">
          <img
            src='https://cdn.shopify.com/s/files/1/0694/7661/4408/files/IMG_5080.jpg?v=1681895607'
            className='absolute inset-0 w-full h-full object-cover object-center fadeIn'
          />

        </div>

        <div className="md:h-minus-header bg-custom-signature-green text-custom-white flex items-end justify-center px-6 md:px-8 lg:px-12  ">
          <div className="py-12 md:py-20 lg:py-28 md:pt-0">
            <Heading as="h1" size="md" className="mb-8 md:mb-16 lg:mb-20">Hi&nbsp;there!</Heading>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Text >
                I always wanted to be an independent artist, I&apos;d thought
                about it since I was a little girl. In 2017 I got accepted in
                the Secondary School of Visual Arts. Here I learned all the
                basics of working with clay for four years. Then I wanted to
                experiment on my own so I bought my first wheel and started
                throwing small cups and mugs and then bigger and bigger objects.
                Low and behold, Art by Bori was born.
              </Text>
              <Text  size='md' className='flex flex-col space-y-6'>
                <span>
                  I make one of a kind ceramics in small batches that I sell in my
                  online shop or sometimes on local art markets.
                </span>
                <span>
                  With the pieces I sell and create, I hope to brighten your
                  spaces and everyday rituals.
                </span>
              </Text>
            </div>
          </div>
        </div>
      </section>

      <TextGrid />

      <InstagramGallery />
    </>
  );
}

const TextGrid = () => {
  const item: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition:{
        duration:0.3
      }
    }
  }

  const list: Variants = {
    visible: {
      transition: {
        staggerChildren: .4,
      }
    }
  }


  const [ref, inView] = useInView({
    threshold:.3,
    triggerOnce: true
  })
  return (
    <Container as="section" className="grid place-items-center">
      <motion.ul
        ref={ref}
        className='flex flex-col lg:flex-row items-start justify-center gap-y-4 md:gap-y-10 lg:gap-y-12 gap-x-16 my-20 md:my-28 lg:my-40'
        variants={list}
        animate={inView ? "visible" : "hidden"}
      >
        {texts.map(txt => (
          <motion.li
            key={txt.id}
            className="grid place-items-center"
            variants={item}
          >
            <div
              className='flex flex-col items-center justify-center'
            >
              <div className='h-44 w-fit grid place-items-center'>
                <txt.icon />
              </div>
              <Text  className='mt-4 lg:mt-6 sm:w-1/2 lg:w-full flex flex-col items-center justify-center gap-y-4'>
                {txt.body}
              </Text>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Container>
  )
}


const SVG1 = () => (
  <svg
    width="120"
    height="60"
    viewBox="0 0 140 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 md:h-20 md:w-20 lg:h-28 lg:w-28"
  >
    <path
      d="M107.938 37.5099C106.444 37.5099 102.626 38.2281 99.1141 38.2281C95.6018 38.2281 91.0788 38.8072 88.4498 38.8072C85.5218 38.8072 81.7066 39.5064 79.0319 38.2418C76.3848 36.9902 76.4373 32.4313 78.53 30.6098C83.5416 26.2477 91.7424 25.9348 97.8382 25.3647C105.007 24.6942 112.498 25.1329 119.685 25.2391C121.636 25.2679 125 25.3284 125 28.0658C125 31.0638 117.871 32.9076 115.7 34.0018C111.778 35.9781 112.333 37.5099 107.938 37.5099Z"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M77.0303 34C76.9339 36.4939 77.295 39.688 77.0303 42.0586C76.8245 43.9016 77.7196 46.8895 77.7196 48.7455C77.7196 52.2666 77.7813 54.5911 79.4427 57.6614C81.0716 60.6716 81.6003 63.6725 84.8264 65.2776C87.6528 66.6839 90.8421 66.2183 93.6735 67.4047C97.37 68.9534 102.902 66.9911 106.736 66.9911C109.205 66.9911 113.453 65.4792 115.316 64.0369C120.791 59.7997 127 55.6433 127 47.8882"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M125.166 30C125.166 30.759 124.792 32.3761 125.166 32.3981C126.851 32.4971 128.567 32.3981 130.255 32.3981C133.773 32.3981 135.501 32.6361 136.984 36.1641C138.151 38.9391 138.893 43.9428 135.853 45.7285C133.007 47.3997 129.82 46.616 127.201 48"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M127.409 37C127.409 37.759 126.199 42.8949 127.937 42.9916C129.436 43.0749 131.359 42.5455 132.163 41.2163C134.745 36.9437 130.837 37.4993 127.409 37.4993"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M43.1547 15.0902C41.6823 15.3092 38.0183 16.534 34.5567 17.0487C31.0951 17.5634 26.7169 18.7627 24.1258 19.148C21.24 19.5771 17.576 20.784 14.7657 20.0044C11.9843 19.2327 11.408 15.0014 13.2197 13.0071C17.5582 8.23144 25.5978 6.73977 31.5272 5.31828C38.5007 3.64651 45.9436 2.95522 53.0424 2.00029C54.9693 1.74108 58.2923 1.30426 58.6694 3.84034C59.0824 6.61789 59.3683 7.91007 57.3789 9.242C53.7857 11.6477 47.4866 14.4461 43.1547 15.0902Z"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M12.4634 17.1285C13.5796 22.3137 16.3797 34.2161 17.5353 38.4691C21.348 52.5022 23.837 55.3115 28.1401 64.1655C29.6522 67.2767 36.1242 67.4639 36.1242 67.4639C36.1242 67.4639 46.7375 65.8858 50.5013 65.3262C52.9244 64.9659 57.0493 63.0429 58.6675 61.3503C63.4211 56.378 59.7127 11.0056 58.577 3.36746"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M17.643 40.3524C15.8484 40.378 13.1242 41.5992 11.3331 41.7268C7.59972 41.9927 5.75044 41.8786 3.93009 38.3646C2.49824 35.6005 1.36038 30.5138 4.46169 28.4487C7.36421 26.516 10.5036 24.8429 14.1291 25.1669"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M11.7816 28.7949C13.5658 28.7754 14.7438 37.109 14.1874 37.192C10.5358 38.9925 6.77725 40.4148 6.51682 32.8583C7.23818 31.3277 10.2435 28.8117 11.7816 28.7949Z"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const SVG2 = () => (
  <svg
    width="120"
    height="160"
    viewBox="0 0 125 167"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={"h-16 w-16 md:h-20 md:w-20 lg:h-28 lg:w-28"}
  >
    <path
      d="M2.1121 158.691C1.88806 147.444 1.65082 136.333 5.13857 125.569C7.38941 118.622 9.61178 111.659 12.7667 105.064C19.069 91.8888 27.4201 78.2233 41.7925 72.8305C49.2902 70.0172 56.3649 68.175 64.376 68.175C69.6734 68.175 74.9722 68.1372 80.2694 68.175C82.1315 68.1882 83.833 68.4215 85.579 69.0634C88.3974 70.0996 91.034 71.497 93.5434 73.1503C96.2828 74.9552 98.5363 77.4103 101.349 79.0496C103.139 80.0934 105.927 82.3219 106.951 84.2353C107.879 85.9695 109.197 86.7571 110.109 88.5028C111.788 91.7151 112.659 95.334 113.578 98.8266C114.512 102.376 115.353 105.952 116.375 109.47C117.122 112.043 118.673 114.311 119.667 116.791C120.629 119.193 121.182 121.595 121.578 124.148C122.227 128.324 122.429 132.596 122.87 136.799C123.172 139.682 122.852 142.381 122.852 145.275C122.852 147.934 122.852 150.594 122.852 153.253"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M122.129 152.78C120.899 154.138 119.904 155.475 118.17 156.241C115.271 157.52 111.897 157.625 108.861 158.443C106.134 159.177 103.124 159.072 100.273 159.072C97.4196 159.072 94.7226 159.702 91.7912 159.702C87.9269 159.702 87.603 152.462 87.603 149.791C87.603 147.784 86.3842 145.784 86.336 143.725C86.2908 141.796 85.7039 140.001 85.3681 138.167C84.7481 134.779 83.1261 131.704 82.5173 128.378C82.2673 127.012 81.3952 125.143 80.8807 123.763C80.3216 122.264 79.7792 119.24 78.763 118.007C77.721 115.017 77.8367 114.442 76.5632 111.566C75.9009 110.071 76.0624 109.602 74.9422 108.691C74.4791 107.542 72.9318 106.662 72.4691 106.391C71.2774 105.695 69.2441 103.673 67.8233 103.861C66.127 104.086 60.6716 103.433 59.5433 104.666C58.257 106.071 57.5111 110.987 57.5111 112.716C57.5111 117.101 58.4717 121.179 58.8485 125.546C59.2965 130.737 59.0949 135.996 59.0949 141.208C59.0949 145.049 58.0261 148.354 57.2119 151.993C56.7377 154.113 56.0294 156.72 54.8363 158.583C50.8787 164.76 40.619 163.251 34.5462 164.281C25.1319 165.878 15.6279 163.163 6.19649 163.163C4.35807 163.163 3.05921 162.667 2.4658 161.03C1.97648 159.68 2.27836 158.951 2 157.569"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M61.1943 75.1222C61.1943 70.6738 61.4295 66.1988 61.5274 61.7452C61.6198 57.5476 62.7289 53.3608 63.5259 49.2507C64.4997 44.2289 65.368 39.1904 66.1906 34.1443C66.7377 30.7884 67.4667 27.4679 68.0411 24.1204C68.2117 23.1263 68.517 22.0004 68.8308 21.0362C69.1885 19.937 68.9525 18.8223 68.9525 17.6689"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M70.8636 22.3241C70.0321 20.824 68.7016 19.7782 68.7016 18.0523C68.7016 19.2232 66.1512 22.7687 64.5281 23.4589C62.7892 24.4941 58.7316 24.1632 58.7316 21.8484C58.7316 20.6234 61.1661 16.677 62.4414 15.5218C60.857 15.4613 57.8859 11.8125 58.7316 10.8055C59.8916 9.42425 60.5952 8.73497 62.7892 8.73497C63.9485 8.73497 65.2237 9.03369 66.2671 9.4388C67.0776 9.7535 66.2671 9.4388 67.8681 10.2304C67.6583 8.15982 66.9733 7.6047 67.0786 5.51412C67.1583 3.93173 69.7466 1.28991 71.7158 2.17809C73.8636 3.14676 75.1502 7.54085 74.0529 9.71853C73.5283 10.7596 74.3423 9.99093 75.3744 9.61363C77.4916 8.83967 80.291 9.0479 82.4578 9.4388C84.6827 9.84018 85.9954 10.3787 88.0621 11.2655C88.6528 11.5189 89.8269 13.8954 88.294 14.8314C83.5083 17.7535 82.3272 15.5887 77.1646 15.5218C76.7781 15.5168 74.2744 15.4349 74.4982 15.5218C75.0182 15.7237 75.3744 15.8667 76.1212 16.4418C76.9327 17.3621 77.1411 17.4219 77.9761 18.2505C79.6714 19.9326 80.8978 23.2459 79.4447 25.4886C78.6041 26.786 74.3076 26.5464 73.4548 25.4886C72.7035 24.5568 71.5193 23.5071 70.8636 22.3241Z"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M65.5469 14.2986C65.5469 11.2043 69.4063 11.5909 71.7561 11.5909C72.525 11.5909 74.5166 12.1976 74.2225 13.1427C73.9871 13.899 70.8347 14.9814 69.9623 15.0111C69.0907 15.0407 65.5469 15.278 65.5469 14.2986Z"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M66.2339 73.8555C67.8966 76.7348 57.7095 75.8716 57.6741 75.8716C55.3915 73.5869 58.2518 73.8556 60.8697 73.8556C61.8429 73.8556 65.6178 72.7886 66.2339 73.8555Z"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M60.3233 75.1222C57.6833 70.909 54.148 65.9921 51.2346 61.9639C46.4876 55.4007 40.4351 49.5366 34.5643 43.9437C30.2423 39.8263 26.4932 35.4429 22.8916 30.7266"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M10.9052 30.9992C11.2265 30.6994 12.5943 29.9254 12.7899 29.6972C15.2039 28.801 16.5288 28.9721 18.4956 29.057C19.2992 29.0918 23.0819 30.4348 22.8847 30.593C21.8121 31.4532 19.1783 32.1702 17.8263 32.3805C16.6438 32.5644 15.9299 32.4 14.8077 32.4C14.359 32.4 9.69387 32.1297 10.9052 30.9992Z"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />{' '}
    <path
      d="M42.2851 51.7637C41.1677 50.1204 38.794 41.4159 41.6745 41.1726C43.6061 41.1727 42.6248 45.5787 42.9079 48.4333C42.9079 49.7416 42.9079 51.29 42.9079 52.4892"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />{' '}
    <path
      d="M36.8202 45.6542C32.9827 44.4803 26.3542 43.6591 23.7627 47.2663"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M37.6908 47.2661C35.3953 49.4808 26.3342 49.4017 23.7627 48.041"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M61.1943 75.9928C63.4265 68.9874 65.8105 61.4258 68.4173 54.5761C69.9984 50.4218 78.4059 38.8444 81.2159 37.6907"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M80.5734 37.2555C82.6894 35.8234 85.5823 32.0666 87.9181 30.9491C88.4897 30.6756 89.6617 29.8926 90.327 29.8575C91.748 29.7827 89.4667 32.8865 89.3146 33.0329C87.0415 35.2225 84.407 36.755 81.1006 37.0683C80.2808 37.146 78.8506 35.2764 78.5061 34.9704C76.324 33.0329 76.6529 33.4702 74.7161 32.3589C72.9777 31.5116 71.8259 32.3375 71.0559 33.1156C69.2642 34.9264 76.324 37.4731 79.8842 37.6907"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M74.5897 44.1181C76.8501 44.1181 79.0669 43.8742 81.2978 43.7891C81.856 43.7678 82.471 43.7891 82.9406 44.4105C83.3717 48.0482 75.1527 48.2887 74.252 44.6811"
      stroke="#273120"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const SVG3 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="96"
    height="107"
    fill="none"
    viewBox="0 0 96 107"
    className={"h-12 w-12 md:h-16 md:w-16 lg:h-24 lg:h-24"}
  >
    <path
      stroke="#273120"
      strokeLinecap="round"
      strokeWidth="3"
      d="M17.223 83.07c3.154 12.3 11.733 17.817 23.193 21.265 2.942 1.184 7 .531 8.853 0 2.971-.852 8.163-.084 10.668-1.48 3.742-2.085 14.353-6.45 17.218-9.324 6.275-6.294 9.723-19.52 9.723-29.227 0-10.814 1.936-21.906-5.987-29.853-4.696-4.71-20.954.956-20.954-6.482 0-3.586 1.61-23.92-2.015-24.525C54.677 2.9 52.85 2 49.27 2c-.774 0-4.426 0-7.82.514 0 6.286-.738 11.293-.738 16.28 0 5.955.823 8.99-2.065 14.06-5.93 10.41-17.79 6.79-21.985 18.943-2.22 6.434-1.054 24.969.562 31.273z"
    />
    <path
      stroke="#273120"
      strokeLinecap="round"
      strokeWidth="3"
      d="M74.932 32.046c.63-5.716 13.359-9.596 17.872-2.663 1.636 2.513 1.359 5.58 1.189 8.66-.216 3.909-5.063 6.82-7.446 6.82"
    />
    <path
      stroke="#273120"
      strokeLinecap="round"
      strokeWidth="3"
      d="M78.77 32.936c.421-3.646 8.907-6.12 11.916-1.699 1.09 1.603.905 3.559.792 5.524-.144 2.492-4.112 5.543-5.7 5.543M20.553 45.113c-4.101-4.275-13.038-5.596-17.72 2.062-3.359 7.572 4.028 13.042 11.714 13.042"
    />
    <path
      stroke="#273120"
      strokeLinecap="round"
      strokeWidth="3"
      d="M17.994 48.164c-2.121-2.506-6.744-3.28-9.166 1.209-1.737 4.439 2.084 7.646 6.06 7.646"
    />
  </svg>
);


interface Txt {
  body: JSX.Element | string,
  icon: () => JSX.Element,
  id: number
}

const texts: Txt[] = [
  {
    body:"As a passionate artist, I specialize in creating functional and decorative ceramics that are both beautiful and practical. Each piece is carefully handcrafted in my home studio using high-quality materials and techniques, ensuring that every item is unique and made to last.",
    icon: SVG1,
    id: 1
  },
  {
    body: (
      <>
        <span>Whether you are looking for a one-of-a-kind mug to enjoy your morning coffee, a beautiful vase to brighten up your home decor, or a personalized gift for a loved one, I offer a variety of products that are perfect for any occasion.</span>
        <span>I believe that every piece of ceramics has its own story to tell, and I strive to imbue my creations with a sense of warmth and personality. From the natural textures and colors of my glazes to the details of my hand-built pieces, my work is inspired by the beauty of the world around me.</span>
      </>
    ),
    icon: SVG2,
    id: 2
  },
  {
    body: "So, take a look around my website and discover the joy of handmade ceramics. If you have any questions or special requests, feel free to contact me at artbybori@gmail.com, and I will be more than happy to assist you. Thank you for visiting my website, and I hope you find something that speaks to you.",
    icon: SVG3,
    id: 3
  },
]

