"use client";
import * as React from "react";
import Logo from "../custom/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import MegaMenu from "./MegaMenu";

import { SmoothScrollContext } from "@/components/custom/gsap/SmoothScrolling";
import useIsomorphicLayoutEffect from "@/components/custom/gsap/useIsomorphicLayoutEffect";

interface SubLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  description: string;
}

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  subLinks: SubLink[];
}

interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

interface NavbarProps {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
  children: React.ReactNode; // children prop 추가
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={url}
        className={`flex items-center mx-4 -mb-1 border-b-2 dark:border-transparent ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  return (
    <a className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-900 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </a>
  );
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
  children, // children prop 사용
}: NavbarProps) {
  const { scroll } = useContext(SmoothScrollContext);
  const [prevScrollpos, setPrevScrollpos] = useState(0);
  const [top, setTop] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -25 },
  };

  const headerStyle = {
    top: `${top}px`,
    backdropFilter: "saturate(180%) blur(20px)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  };

  useIsomorphicLayoutEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = scroll?.scroll;
      if (typeof currentScrollPos !== "undefined") {
        if (prevScrollpos > currentScrollPos) {
          setTop(0); // Show navbar
        } else {
          setTop(-64); // Hide navbar
        }
        setPrevScrollpos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollpos, scroll]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="dark:bg-black dark:text-gray-100">
      <header className="fixed w-full z-[40] drop-shadow-sm" style={headerStyle}>
        <motion.nav
          variants={variants}
          animate={top !== 0 ? "hidden" : "visible"}
          transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
          className="w-full"
        >
          <div className="container flex justify-between h-16 px-0 mx-auto sm:px-6">
            <Logo src={logoUrl}>
              {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
            </Logo>

            <div className="items-center flex-shrink-0 hidden lg:flex space-x-4">
              <MegaMenu links={links} />
              {children} {/* children으로 받은 LanguageSwitcher를 렌더링 */}
            </div>

            <Dialog
              as="div"
              className="lg:hidden"
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
            >
              <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75" />
              <Dialog.Panel className="fixed inset-y-0 z-50 w-full px-6 py-6 overflow-y-auto bg-gray-800 rtl:left-0 ltr:right-0 sm:max-w-sm sm:ring-1 sm:ring-inset sm:ring-white/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Strapi</span>
                    {logoUrl && (
                      <img className="w-auto h-8" src={logoUrl} alt="Logo" />
                    )}
                  </a>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="flow-root mt-6">
                  <div className="-my-6 divide-y divide-gray-700">
                    <div className="py-6 space-y-2">
                      {links.map((item) => (
                        <MobileNavLink
                          key={item.id}
                          closeMenu={closeMenu}
                          {...item}
                        />
                      ))}
                      {/* 모바일 메뉴에서 children을 통해 전달된 LanguageSwitcher 표시 */}
                      <div className="py-4">{children}</div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
            <button
              className="p-4 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="text-gray-100 h-7 w-7" aria-hidden="true" />
            </button>
          </div>
        </motion.nav>
      </header>
    </div>
  );
}
