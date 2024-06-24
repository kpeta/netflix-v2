"use client";
import Link from "next/link";
import styles from "../../styles/Header.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { menuItems } from "@/constants";

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
