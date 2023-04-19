import { Collection, Product } from '@shopify/hydrogen/storefront-api-types';
import { Link } from "~/components"
import SmartImage from '~/components/global/SmartImage';
import { SerializeFrom } from '@shopify/remix-oxygen';
import ProductCard from '~/components/shop/ProductCard';
import Carousel, { DotProps } from "react-multi-carousel";
import { RxDot, RxDotFilled } from 'react-icons/rx';

type DefaultCarouselProps = {
  textOnTop: boolean;
}

type CollectionCarouselProps = DefaultCarouselProps & {
  collections: SerializeFrom<Collection[]>;
};

export const MyDots = ({
  onClick,
  carouselState,
  index,
  active,
}: DotProps) => {
  return onClick ? <button
    onClick={() => onClick()}
  >
    {
      <RxDotFilled className={`hover:opacity-80 w-6 h-6 sm:w-8 sm:h-8 ${active ? "text-custom-signatere-green" : "text-custom-placeholder-green"}`}/>
    }
  </button> : null
}

export function CollectionCarousel({
  collections,
  textOnTop = false
}: CollectionCarouselProps) {
  const haveCollections = collections && collections.length > 0;
  if (!haveCollections) return null;

  const responsive = {
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
      responsive={responsive}
      draggable={false}
      itemClass="my-carousel-item"
      showDots={true}
      renderDotsOutside
      dotListClass='my-dot-list'
      customDot={<MyDots />}
    >
      {collections.map((coll) => {
        if (!coll.image) return null

        return (
            <Link  key={coll.id} to={`/collections/${coll.handle}`} prefetch="intent">
              <SmartImage
                image={coll.image}
                widths={[280, 350,450,550, 650]}
                sizes="(max-width: 768px) 80vw, 60vw"
                alt={coll.image?.altText ?? coll.title}
/*                 className="h-[300px] sm:h-auto w-carousel-item-sm md:w-carousel-item-md lg:w-carousel-item-lg " */
                className="w-full "
                loading='eager'
              />
              {textOnTop ?  (
                <div className="absolute z-[2] inset-0 w-full h-full grid place-items-center basic-animation group-hover:bg-black/10">
                  <h3 className="z-[3] text-xl md:text-2xl lg:text-3xl  font-bold uppercase text-white basic-animation opacity-0 group-hover:opacity-100">
                    {coll.title}
                  </h3>
                </div>
              ): (
                <h3 className='mt-2 lg:mt-3 xl:mt-4 font-medium text-sm md:text-md xl:text-lg'>{coll.title}</h3>
              )}
            </Link>
        )
      })}
    </Carousel>
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
  * -  comparePrice of first the variant (To Be Implementedb
  * */
export function ProductCarousel({
  products,
  textOnTop,
}: ProductCarouselProps) {
  if (!products || products.length == 0) return null;

  const responsive = {
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
      responsive={responsive}
      draggable={false}
      itemClass="my-carousel-item"
      showDots={true}
      renderDotsOutside
      dotListClass='my-dot-list'
      customDot={<MyDots />}
    >
      {products.map((prod) => {
        const variant = prod.variants.nodes[0];
        if(!variant.image) return null;

        return (
          <Link key={prod.id } to={`/products/${prod.handle}`} prefetch="intent">
            <ProductCard
              title={prod.title}
              money={variant.price}
              img={variant.image}
              textOnTop={textOnTop}
            />
          </Link>
        )
      })}
    </Carousel>
  )
}

export function Skeleton() {
  return (
    <ul className='grid w-full snap-mandatory snap-x scroll-px-6 grid-rows-1 grid-flow-col justify-start gap-6 md:gap-10 lg:gap-12 overflow-x-scroll hiddenScroll'>
      {[1,2,3,4,5].map((x) => (
        <li key={x} className="snap-start relative group cursor-pointer w-carousel-item-sm md:w-carousel-item-md lg:w-carousel-item-lg " />
      ))}
    </ul>
  );
}

