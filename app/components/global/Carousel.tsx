import { Collection, Product } from '@shopify/hydrogen/storefront-api-types';
import { Link, Heading } from '../ui';
import SmartImage from '~/components/global/SmartImage';
import { SerializeFrom } from '@shopify/remix-oxygen';
import ProductCard from '~/components/shop/ProductCard';
import Carousel, { DotProps } from "react-multi-carousel";
import { RxDotFilled } from 'react-icons/rx';
import clsx from 'clsx';
import { Image } from '@shopify/hydrogen';

type DefaultCarouselProps = {
  textOnTop: boolean;
  size: "small" | "normal"
}

type CollectionCarouselProps = DefaultCarouselProps & {
  collections: SerializeFrom<Collection[]>;
};

export function CollectionCarousel({
  collections,
  textOnTop = false,
  size
}: CollectionCarouselProps) {
  const haveCollections = collections && collections.length > 0;
  if (!haveCollections) return null;

  return (
    <CarouselWrapper size={size}>
      {collections.filter(c => c.image).map((coll) => {
        return (
          <Link key={coll.id} to={`/categories/${coll.handle}?sort=featured`} prefetch="intent" className="relative group  rounded-md">
            <div className='bg-custom-placeholder-green rounded-md group relative basic-animation shadow-sm aspect-[4/5]'>
              <div className='aspect-[4/5] w-full object-cover fadeIn card-image'>
                <Image
                  data={coll.image!}
                  alt={coll.image!.altText ?? coll.title}
                  className="w-full rounded-md "
                  loading='eager'
                  widths={[400]}
                  loaderOptions={{
                    crop: 'center',
                    scale: 2,
                    width: 400,
                    height: 600
                  }}
                />
              </div>

              {textOnTop ? (
                <div className="absolute left-0 top-0 w-full h-full bg-black/10 grid place-items-center lg:opacity-0 lg:hover:opacity-100 basic-animation">
                  <Heading font='font-sans' as="h3" bold size='sm' color="white" className="z-[10] uppercase  text-center">
                    {coll.title}
                  </Heading>
                </div>
              ) : (
                <h3 className='mt-2 lg:mt-3 xl:mt-4 font-medium text-sm md:text-md xl:text-lg '>{coll.title}</h3>
              )}
            </div>
          </Link>
        )
      })}
    </CarouselWrapper>
  )
}

type ProductCarouselProps = DefaultCarouselProps & {
  products: SerializeFrom<Product[]>;
};

/***
  * This version takes an array of Products and displays them with a `ProductCard`.
  * Please make sure that your version of Product has the following:
  * - title of the product
  * - the first variant
  * - image of the first variant
  * - price of the first variant
  * -  comparePrice of first the variant (To Be Implementedb)
  * */
export function ProductCarousel({
  products,
  textOnTop,
  size
}: ProductCarouselProps) {
  if (!products || products.length == 0) return null;
  return (
    <CarouselWrapper size={size}>
      {products.map((prod) => {
        const variant = prod.variants.nodes[0];
        if (!variant.image) return null;

        return (
          <Link key={prod.id} to={`/products/${prod.handle}`} prefetch="intent">
            <ProductCard
              title={prod.title}
              money={variant.price}
              img={variant.image}
              textOnTop={textOnTop}
            />
          </Link>
        )
      })}
    </CarouselWrapper>
  )
}

const CarouselWrapper = ({
  children,
  size
}: {
  children: React.ReactNode,
  size: "small" | "normal"
}) => {
  const responsive = size === "small" ? {
    md: {
      breakpoint: { max: 10000, min: 768 },
      items: 3
    },
    sm: {
      breakpoint: { max: 768, min: 640 },
      items: 2
    },
    xs: {
      breakpoint: { max: 640, min: 0 },
      items: 1
    }
  } : {
    lg: {
      breakpoint: { max: 10000, min: 1024 },
      items: 4
    },
    md: {
      breakpoint: { max: 1024, min: 768 },
      items: 3
    },
    sm: {
      breakpoint: { max: 768, min: 640 },
      items: 2
    },
    xs: {
      breakpoint: { max: 640, min: 0 },
      items: 1
    }
  };

  return (
    <Carousel
      //@ts-ignore
      responsive={responsive}
      arrows={false}
      draggable={false}
      itemClass='p-2 overflow-hidden relative'
      dotListClass='static flex  w-full my-2 lg:my-4'
      showDots={true}
      customDot={<MyDots />}
      renderDotsOutside
    >
      {children}
    </Carousel>
  )
}

export const MyDots = ({
  onClick,
  carouselState,
  active,
}: DotProps) => {
  if (!carouselState || !onClick) return <></>

  return carouselState?.slidesToShow < carouselState?.totalItems ? (
    <button
      onClick={() => onClick()}
    >
      {
        <RxDotFilled className={`hover:opacity-80 w-6 h-6 lg:w-8 lg:h-8 ${active ? "text-black/60" : "text-custom-placeholder-green"}`} />
      }
    </button>) : <></>
}


export function Skeleton({ size }: {size: DefaultCarouselProps['size']}) {
  return (
    <CarouselWrapper size={size}>
        {[1, 2, 3, 4, 5].map((x) => (
          <li key={x} className=" aspect-[4/5] relative group  rounded-md w-full max-w-[400px] bg-custom-placeholder-green rounded-md group relative basic-animation shadow-sm aspect-[4/5]">
          </li>
        ))}
    </CarouselWrapper>
  );
}

