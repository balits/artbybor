import clsx from "clsx";
import React from "react"
import {IconBaseProps} from "react-icons"
import { BiShoppingBag } from "react-icons/bi";
import { HiSearch } from "react-icons/hi";
import { HiBars2, HiBars3BottomLeft } from "react-icons/hi2";

type IconProps = IconBaseProps & {
  className?: string,
  as?: React.ElementType
}

type WrapperProps = {
  children: React.ReactNode
}

export function IconWrapper({
  className,
  children,
  as = "span",
}: IconProps & WrapperProps) {
  return React.createElement(as,{className: clsx(" h-4 w-4 md:w-5 md:h-5 xl:w-6 xl:h-6 cursor-pointer focus:ring-custom-signature-green " , className)}, children);
}

export function SearchIcon(props: IconProps) {
  return <IconWrapper {...props}>
    <HiSearch />
  </IconWrapper>
}

export function ShoppingBag(props: IconProps) {
  return <IconWrapper {...props}>
    <BiShoppingBag />
  </IconWrapper>
}

export function Bars(props:IconProps) {
  return <IconWrapper {...props}>
    <HiBars2 />
  </IconWrapper>
}

export function FilterDropDown(props: IconProps) {
  return <IconWrapper {...props}>
    <HiBars3BottomLeft />
  </IconWrapper>
}