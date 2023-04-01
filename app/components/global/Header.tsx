import {Form, useParams} from '@remix-run/react';
import {useEffect, useState} from 'react';
import Container from '~/components/global/Container';
import Logo from '~/components/global/Logo';
import Nav from '~/components/global/Nav';
import {BiShoppingBag} from 'react-icons/bi';
import {HiBars2} from 'react-icons/hi2';
import clsx from 'clsx';
import {Drawer, useDrawer} from '../Drawer';
import {useCartFetchers} from '~/hooks/useCartFetchers';

export default function Header() {
  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();
  /*
  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer(); */

  const addToCartFetchers = useCartFetchers('ADD_TO_CART');

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  const scrollDirection = useScroll();

  return (
    <>
      <header
        className={clsx(
          `transition-all transform-gpu  duration-500 ease-in-out fixed z-30 bg-custom-white w-full h-header-base md:h-header-md lg:h-header-lg`,
          scrollDirection === 'down'
            ? '-top-header-base md:-top-header-md lg:-top-header-lg'
            : 'top-0',
        )}
      >
        <Container className="flex items-center justify-between h-full">
          <button
            onClick={() => {}}
            className="lg:hidden p-2 md:p-3 lg:p-4 pl-0"
            aria-label="Open navigation panel from the left side."
          >
            <HiBars2 className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <Logo />
          <Nav flexDirection="row" />

          {/*  
          <CartCount openCart={cartDrawer.openDrawer} /> 
        */}
          <BiShoppingBag
            className="h-4 w-4 md:w-5 md:h-5 lg:w-6 lg:h-6 cursor-pointer"
            onClick={openCart}
          />
        </Container>
      </header>
    </>
  );
}

function SearchBar() {
  const params = useParams();
  return (
    <Form
      method="get"
      action={params.lang ? `/${params.lang}/search` : '/search'}
      className="flex items-center gap-2"
    >
      <input
        className={'focus:border-contrast/20 dark:focus:border-primary/20'}
        type="search"
        placeholder="Search"
        name="q"
      />
      <button
        type="submit"
        className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
      >
        <p>icon</p>
      </button>
    </Form>
  );
}

function useScroll() {
  const [scrollDirection, setScrollDirecion] = useState<'down' | 'up' | null>(
    null,
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const dir = scrollY > lastScrollY ? 'down' : 'up';
      if (dir !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirecion(dir);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
}
