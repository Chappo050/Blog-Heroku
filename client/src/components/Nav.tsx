import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type Props = {
  title: string;
  options: string[];
  links: string[];
};

const Nav = () => {
  return (
    <nav className="sticky top-0 w-screen bg-custom-black text-custom-green-blue pl-28 border-b-2 border-custom-silver">
      <div className=" grid grid-flow-col-dense space-x-32 text-xl text-custom-blue  font-semibold">
        <i className="logoplaceholder" />

        <DropdownMenu
        title={'User'}
          options={["Login", "Register", "Sign Out"]}
          links={["/user/login", "/user/register", "/user/logout"]}
        />
        <DropdownMenu
         title={'Blog'}
          options={["Overview", "Post"]}
          links={["/blog/overview", "/blog/post"]}
        />
        <DropdownMenu
         title={'About'}
          options={["About"]}
          links={["/about"]}
        />
        <i />
      </div>
    </nav>
  );
};

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

const DropdownMenu: React.FC<Props> = ({ options, links, title }) => {
  return (
    <Menu as="div" className="relative inline-block text-left py-4 text-custom-green-blue">
      <div>
        <Menu.Button className="inline-flex w-2/3 justify-center rounded-md  bg-custom-black px-4 py-2  hover:bg-custom-dark-blue focus:outline-none focus:ring-1 focus:ring-custom-silver">
          {title}

          <ChevronDownIcon className="-mr-1 ml-2 h-8 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
 
        <Menu.Items className="absolute z-10 mt-2 w-56 right-20 origin-top-right rounded-md bg-custom-dark-blue shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
         
          <div className="py-1 ">
            <>
          {options.map(function (option, i) {return DropdownMenuItem(option, links[i])})}       
            </>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};


//Iterates over each item for the menu and adds links as href
const DropdownMenuItem = (option: string, itemLink: string) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href={itemLink}
          className={classNames(
            active ? "bg-gray-900 text-white" : "text-custom-green-blue",
            "block px-4 py-2 text-sm"
          )}
        >
          {option}
        </a>
      )}
    </Menu.Item>
  );
};

export default Nav;

