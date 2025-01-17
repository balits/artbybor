import {LoaderArgs, redirect} from '@shopify/remix-oxygen';

export async function loader({params}: LoaderArgs) {
  return redirect(params?.lang ? `${params.lang}/search?q=` : '/search?q=');
}
