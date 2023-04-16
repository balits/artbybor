import {Image} from '@shopify/hydrogen';
import {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';

type Props = {
  image: ImageType;
};

/***
 * The banner shown first when visiting the homepage.
 * Both on Desktop and Phones this Components takes up 100vw with no margin or max-width set
 */
export default function Banner({image}: Props) {
  return (
    <section className="bg-custom-placeholder-green/50 h-screen overflow-y-hidden grid place-items-center shadow-md relative">
      <Image
        data={image}
        className="absolute inset-0 w-full h-full object-cover"
        alt={image.altText ?? 'Ceramics for your home'}
        loading="eager"
        widths={[500, 900, 1400]}
        sizes="(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px"
      />
      <div className="absolute inset-0 w-full h-full grid place-items-center">
<<<<<<< HEAD
        <div className="lg:p-4 z-[2] text-custom-white grid place-items-center">
          <h1 className="mb-12 text-5xl md:text-6xl lg:text-7xl xl:text-8xl  font-cantata ">
          Ceramics&nbsp;
          <br className="lg:hidden" />
          for&nbsp;your&nbsp;
          <br className="lg:hidden" />
          home.
          </h1>
        </div>
=======
        <h1 className="lg:p-4 z-[2] text-custom-white font-cantata text-6xl sm:text-6xl md:text-7xl lg:text-8xl grid place-items-center">
          Ceramics&nbsp;
          <br className="lg:hidden" />
          for&nbsp;your
          <br className="lg:hidden" />
          home.
        </h1>
>>>>>>> refs/remotes/origin/main
      </div>
    </section>
  );
}
