import {
  defer,
  type LoaderArgs,
  type SerializeFrom,
} from '@shopify/remix-oxygen';
import { flattenConnection } from '@shopify/hydrogen';
import { Await, Form, useLoaderData } from '@remix-run/react';
import type {
  Collection,
  CollectionConnection,
  Product,
  ProductConnection,
} from '@shopify/hydrogen/storefront-api-types';
import { Suspense } from 'react';
import invariant from 'tiny-invariant';
import {
  ProductGrid
} from '~/components';
import { PRODUCT_CARD_FRAGMENT } from '~/data/fragments';
import { PAGINATION_SIZE } from '~/lib/const';
import { seoPayload } from '~/lib/seo.server';
import { HiSearch } from 'react-icons/hi';
import { NoWrapContainer } from '~/components/global/Container';
import { CollectionCarousel, ProductCarousel } from '~/components/global/Carousel';

export async function loader({ request, context: { storefront } }: LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor')!;
  const searchTerm = searchParams.get('q')!;

  const data = await storefront.query<{
    products: ProductConnection;
  }>(SEARCH_QUERY, {
    variables: {
      pageBy: PAGINATION_SIZE,
      searchTerm,
      cursor,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');
  const { products } = data;

  const getRecommendations = !searchTerm || products?.nodes?.length === 0;
  const seoCollection = {
    id: 'search',
    title: 'Search',
    handle: 'search',
    descriptionHtml: 'Search results',
    description: 'Search results',
    seo: {
      title: 'Search',
      description: `Showing ${products.nodes.length} search results for "${searchTerm}"`,
    },
    metafields: [],
    products,
    updatedAt: new Date().toISOString(),
  } satisfies Collection;

  const seo = seoPayload.collection({
    collection: seoCollection,
    url: request.url,
  });

  return defer({
    seo,
    searchTerm,
    products,
    noResultRecommendations: getRecommendations
      ? getNoResultRecommendations(storefront)
      : Promise.resolve(null),
  });
}

export default function Search() {
  const { searchTerm, products, noResultRecommendations } =
  useLoaderData<typeof loader>();
  const noResults = products?.nodes?.length === 0;

  return (
    <NoWrapContainer className='scaling-mt-header mb-8 lg:mb-16'>
      <div className='mb-6 md:mb-8 lg:mb-12 xl:mb-16'>
        <h1 className='text-3xl font-cantata font-semibold capitalize'>
        </h1>
        <Form method="get" className="relative flex w-full text-lg ">
          <button className="p-2" type="submit">
            <HiSearch className='h-4 w-4 md:w-5 md:h-5  cursor-pointer focus:ring-custom-black' />
          </button>
          <input
            className='p-2 w-full'
            defaultValue={searchTerm}
            placeholder="Search…"
            type="search"
            name="q"
          />
        </Form>
      </div>
      {!searchTerm || noResults ? (
        <>
          {noResults && (
            <section >
              <p className="opacity-50">
                No results, try something else.
              </p>
            </section>
          )}
          <Suspense>
            <Await
              errorElement="There was a problem loading related products"
              resolve={noResultRecommendations}
            >
              {(data) => (
                <div className='space-y-8 lg:space-y-16'>
                  {data?.featuredCollections && <section>
                    <h2 className='text-lg md:text-xl lg:text-3xl  font-cantata mb-4 lg:mb-8'>
                      Trending Collections.
                    </h2>
                    <CollectionCarousel
                      collections={
                        data!.featuredCollections as SerializeFrom<Collection[]>
                      }
                      textOnTop={false}
                    />
                  </section>
                  }
                  {data?.featuredProducts &&
                    (
                      <section>
                        <h2 className='text-lg md:text-xl lg:text-3xl  font-cantata mb-4 lg:mb-8'>
                          Trending Products.
                        </h2>
                        <ProductCarousel
                          products={
                            data?.featuredProducts as SerializeFrom<Product[]>
                          }
                          textOnTop={false}
                        />
                      </section>
                    )
                  }
                </div>
              )
              }
            </Await>
          </Suspense>
        </>
      ) : (
          <section >
            <ProductGrid
              key="search"
              url={`/search?q=${searchTerm}`}
              collection={{ products } as Collection}
            />
          </section>
        )}
    </NoWrapContainer>
  );
}

const SEARCH_QUERY = `#graphql
${PRODUCT_CARD_FRAGMENT}
query search(
$searchTerm: String
$country: CountryCode
$language: LanguageCode
$pageBy: Int!
$after: String
) @inContext(country: $country, language: $language) {
products(
first: $pageBy
sortKey: RELEVANCE
query: $searchTerm
after: $after
) {
nodes {
...ProductCard
}
pageInfo {
startCursor
endCursor
hasNextPage
hasPreviousPage
}
}
}
`;

export async function getNoResultRecommendations(
  storefront: LoaderArgs['context']['storefront'],
) {
  const data = await storefront.query<{
    featuredCollections: CollectionConnection;
    featuredProducts: ProductConnection;
  }>(SEARCH_NO_RESULTS_QUERY, {
    variables: {
      pageBy: PAGINATION_SIZE,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');

  return {
    featuredCollections: flattenConnection(data.featuredCollections),
    featuredProducts: flattenConnection(data.featuredProducts),
  };
}

const SEARCH_NO_RESULTS_QUERY = `#graphql
${PRODUCT_CARD_FRAGMENT}
query searchNoResult(
$country: CountryCode
$language: LanguageCode
$pageBy: Int!
) @inContext(country: $country, language: $language) {
featuredCollections: collections(first: 5, sortKey: UPDATED_AT) {
nodes {
id
title
handle
image {
altText
width
height
url
}
}
}
featuredProducts: products(first: $pageBy) {
nodes {
...ProductCard
}
}
}
`;
