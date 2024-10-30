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
      {menuItems.map((item, index) =>
        // if the item is selected, it's not a link
        selectedItem === item.link ? (
          <div className={styles.menuItemSelected} key={index}>
            {item.name}
          </div>
        ) : (
          <Link
            href={item.link}
            className={styles.menuItem}
            key={index}
            onClick={() => setSelectedItem(item.link)}
          >
            {item.name}
          </Link>
        )
      )}
    </div>
  );
}

export default MenuItems;
