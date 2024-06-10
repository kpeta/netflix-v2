"use client";
import Link from "next/link";
import styles from "../../styles/Header.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type MenuItem = {
  name: string;
  link: string;
};

const menuItems: MenuItem[] = [
  { name: "Home", link: "/" },
  { name: "TV Shows", link: "/tv-shows" },
  { name: "Movies", link: "/movies" },
  { name: "New & Popular", link: "/new-and-popular" },
  { name: "My List", link: "/my-list" },
];

function MenuItems() {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    setSelectedItem(pathname);
  }, [pathname]);

  return (
    <div className={styles.menuItemsContainer}>
      {menuItems.map((item, index) => (
        <Link
          href={item.link}
          className={
            selectedItem === item.link
              ? styles.menuItemSelected
              : styles.menuItem
          }
          key={index}
          onClick={() => setSelectedItem(item.name)}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default MenuItems;
