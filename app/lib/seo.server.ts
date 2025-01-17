import type {SeoConfig} from '@shopify/hydrogen';
import {
  Article,
  Blog,
  Collection,
  CollectionConnection,
  Page,
  Product,
  ProductVariant,
  ShopPolicy,
  Shop,
} from '@shopify/hydrogen/storefront-api-types';

import type {
  Article as SeoArticle,
  BreadcrumbList,
  Blog as SeoBlog,
  CollectionPage,
  Offer,
  Organization,
  Product as SeoProduct,
  WebPage,
} from 'schema-dts';

const DESCRIPTION_FALLBACK = 'Handmade ceramics for your Home';
const TITLE_TEMPLATE_FALLBACK = "%s | Art by Bori"

function root({
  shop,
  url,
}: {
  shop: Shop;
  url: Request['url'];
}): SeoConfig<Organization> {
  return {
    title: shop?.name,
    titleTemplate: TITLE_TEMPLATE_FALLBACK,
    description: truncate(shop?.description ?? ''),
    handle: '@shopify',
    url,
    robots: {
      noIndex: false,
      noFollow: false,
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: shop.name,
      logo: shop.brand?.logo?.image?.url,
      sameAs: [
        //'https://twitter.com/shopify',
        'https://facebook.com/artbybori',
        'https://instagram.com/artbybori',
        //'https://youtube.com/shopify',
        'https://tiktok.com/@artbybori',
      ],
      url,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${url}search?q={search_term}`,
        query: "required name='search_term'",
      },
    },
  };
}

function home(): SeoConfig<WebPage> {
  return {
    title: 'Home',
    titleTemplate: TITLE_TEMPLATE_FALLBACK,
    description: DESCRIPTION_FALLBACK,
    robots: {
      noIndex: false,
      noFollow: false,
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Home page',
    },
  };
}

function productJsonLd({
  product,
  selectedVariant,
  url,
}: {
  product: Product;
  selectedVariant: ProductVariant;
  url: Request['url'];
}): SeoConfig<SeoProduct | BreadcrumbList>['jsonLd'][] {
  const origin = new URL(url).origin;
  const variants = product.variants.nodes;
  const description = truncate(
    product?.seo?.description ?? product?.description,
  );
  const offers: Offer[] = (variants || []).map((variant) => {
    const variantUrl = new URL(url);
    for (const option of variant.selectedOptions) {
      variantUrl.searchParams.set(option.name, option.value);
    }
    const availability = variant.availableForSale
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock';

    return {
      '@type': 'Offer',
      availability,
      price: parseFloat(variant.price.amount),
      priceCurrency: variant.price.currencyCode,
      sku: variant?.sku ?? '',
      url: variantUrl.toString(),
    };
  });
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Products',
          item: `${origin}/products`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: product.title,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      brand: {
        '@type': 'Brand',
        name: product.vendor,
      },
      description,
      image: [selectedVariant?.image?.url ?? ''],
      name: product.title,
      offers,
      sku: selectedVariant?.sku ?? '',
      url,
    },
  ];
}

function product({
  product,
  url,
  selectedVariant,
}: {
  product: Product;
  selectedVariant: ProductVariant;
  url: Request['url'];
}) {
  const description = truncate(
    product?.seo?.description ?? product?.description ?? DESCRIPTION_FALLBACK,
  );
  return {
    title: product?.seo?.title ?? product?.title,
    description,
    media: selectedVariant?.image,
    jsonLd: productJsonLd({product, selectedVariant, url}),
  };
}

function collectionJsonLd({
  url,
  collection,
}: {
  url: Request['url'];
  collection: Collection;
}): SeoConfig<CollectionPage | BreadcrumbList>['jsonLd'][] {
  const siteUrl = new URL(url);
  const itemListElement: CollectionPage['mainEntity'] =
    collection.products.nodes.map((product, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        url: `/products/${product.handle}`,
      };
    });

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Collections',
          item: `${siteUrl.host}/categories`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: collection.title,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: collection?.seo?.title ?? collection?.title ?? '',
      description: truncate(
        collection?.seo?.description ?? collection?.description ?? '',
      ),
      image: collection?.image?.url,
      url: `/categories/${collection.handle}`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement,
      },
    },
  ];
}

function allProducts({
  collection,
  url,
  title
}: {
  collection: Collection,
  url: Request['url'],
  title: string
}) {
  return {
    title,
    description: truncate(
      collection?.seo?.description ??
        collection?.description ??
        DESCRIPTION_FALLBACK,
    ),
    titleTemplate: TITLE_TEMPLATE_FALLBACK,
    media: {
      type: 'image',
      url: collection?.image?.url,
      height: collection?.image?.height,
      width: collection?.image?.width,
      altText: collection?.image?.altText,
    },
    jsonLd: collectionJsonLd({collection, url}),
  }
}

function collection({
  collection,
  url,
}: {
  collection: Collection;
  url: Request['url'];
}) {
  return {
    title: collection.title ?? "Category",
    description: truncate(
      collection?.seo?.description ??
        collection?.description ??
        DESCRIPTION_FALLBACK,
    ),
    titleTemplate: TITLE_TEMPLATE_FALLBACK,
    media: {
      type: 'image',
      url: collection?.image?.url,
      height: collection?.image?.height,
      width: collection?.image?.width,
      altText: collection?.image?.altText,
    },
    jsonLd: collectionJsonLd({collection, url}),
  };
}

function collectionsJsonLd({
  url,
  collections,
}: {
  url: Request['url'];
  collections: CollectionConnection;
}): SeoConfig<CollectionPage>['jsonLd'] {
  const itemListElement: CollectionPage['mainEntity'] = collections.nodes.map(
    (collection, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        url: `/categories/${collection.handle}`,
      };
    },
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Collections',
    description: 'All collections',
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement,
    },
  };
}

function listCollections({
  collections,
  url,
}: {
  collections: CollectionConnection;
  url: Request['url'];
}): SeoConfig<CollectionPage> {
  return {
    title: 'Collections',
    titleTemplate: TITLE_TEMPLATE_FALLBACK,
    description: 'All Art by Bori collections',
    url,
    jsonLd: collectionsJsonLd({collections, url}),
  };
}

function article({
  article,
  url,
}: {
  article: Article;
  url: Request['url'];
}): SeoConfig<SeoArticle> {
  return {
    title: article?.seo?.title ?? article?.title,
    description: truncate(article?.seo?.description ?? DESCRIPTION_FALLBACK),
    titleTemplate: '%s | Journal',
    url,
    media: {
      type: 'image',
      url: article?.image?.url,
      height: article?.image?.height,
      width: article?.image?.width,
      altText: article?.image?.altText,
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      alternativeHeadline: article.title,
      articleBody: article.contentHtml,
      datePublished: article?.publishedAt,
      description: truncate(
        article?.seo?.description || article?.excerpt || '',
      ),
      headline: article?.seo?.title || '',
      image: article?.image?.url,
      url,
    },
  };
}

function blog({
  blog,
  url,
}: {
  blog: Blog;
  url: Request['url'];
}): SeoConfig<SeoBlog> {
  return {
    title: blog?.seo?.title,
    description: truncate(blog?.seo?.description || DESCRIPTION_FALLBACK),
    titleTemplate: '%s | Blog',
    url,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: blog?.seo?.title || blog?.title || '',
      description: blog?.seo?.description || '',
      url,
    },
  };
}

function page({
  page,
  url,
}: {
  page: Page;
  url: Request['url'];
}): SeoConfig<WebPage> {
  return {
    description: truncate(page?.seo?.description || DESCRIPTION_FALLBACK),
    title: page?.seo?.title,
    titleTemplate: TITLE_TEMPLATE_FALLBACK,
    url,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
    },
  };
}

function customPage({
  title,
  description,
  url
}: {
  title: string,
  description: string,
  url: Request['url']
}) {
  return {
    description: truncate(description),
    title,
    titleTemplate: TITLE_TEMPLATE_FALLBACK,
    url,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title
    }
  }
}

function policy({
  policy,
  url,
}: {
  policy: ShopPolicy;
  url: Request['url'];
}): SeoConfig<WebPage> {
  return {
    description: truncate(policy?.body ?? ''),
    title: policy?.title,
    titleTemplate: '%s | Policy',
    url,
  };
}

function policies({
  policies,
  url,
}: {
  policies: ShopPolicy[];
  url: Request['url'];
}): SeoConfig<WebPage | BreadcrumbList> {
  const origin = new URL(url).origin;
  const itemListElement: BreadcrumbList['itemListElement'] = policies
    .filter(Boolean)
    .map((policy, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: policy.title,
        item: `${origin}/policies/${policy.handle}`,
      };
    });
  return {
    title: 'Policies',
    titleTemplate: '%s | Policies',
    description: 'Art by Bori store policies',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        description: 'Art by Bori store policies',
        name: 'Policies',
        url,
      },
    ],
  };
}

export const seoPayload = {
  article,
  blog,
  collection,
  home,
  listCollections,
  page,
  customPage,
  policies,
  policy,
  product,
  allProducts,
  root,
};

/**
 * Truncate a string to a given length, adding an ellipsis if it was truncated
 * @param str - The string to truncate
 * @param num - The maximum length of the string
 * @returns The truncated string
 * @example
 * ```js
 * truncate('Hello world', 5) // 'Hello...'
 * ```
 */
function truncate(str: string, num = 155): string {
  if (typeof str !== 'string') return '';
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num - 3) + '...';
}
