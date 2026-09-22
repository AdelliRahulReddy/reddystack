import { StaticImageData } from "next/image";

type MenuLink = string | { path: string; hash?: string };

interface DataType {
  id: number;
  title: string;
  link: string;
  img_dropdown?: boolean;
  has_dropdown?: boolean;
  sub_menus?: {
    link: string;
    title: string;
    btn_title?: string;
    one_page_link?: MenuLink;
    one_page_title?: string;
    demo_img?: StaticImageData;
    mobile_menu?: boolean;
  }[];
}

const menu_data: DataType[] = [
  {
    id: 1,
    title: "Home",
    link: "/",
    has_dropdown: false,
  },
  {
    id: 2,
    title: "Method",
    link: "/#method",
    has_dropdown: false,
  },
  {
    id: 3,
    title: "Capabilities",
    link: "/service",
    has_dropdown: false,
  },
  {
    id: 4,
    title: "Work",
    link: "/portfolio",
    has_dropdown: false,
  },
  {
    id: 5,
    title: "About",
    link: "/about",
    has_dropdown: false,
  },
  {
    id: 6,
    title: "Insights",
    link: "/blog",
    has_dropdown: false,
  },
  {
    id: 7,
    title: "Start a Project",
    link: "/contact",
    has_dropdown: false,
  },
];

export default menu_data;
