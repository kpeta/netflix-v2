"use client";

import ResponsiveMenuIcon from "./icons/ResponsiveMenuIcon";
import styles from "../../styles/Header.module.css";
import { menuItems } from "@/constants";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const responsiveMenuContainer: React.CSSProperties = {
  position: "relative",
};

const responsiveDropdownMenuStyle: React.CSSProperties = {
  position: "absolute",
  left: "5px",
  width: "150px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "black",
  boxShadow: "0px 1px 2px rgb(163, 164, 167)",
  borderRadius: "8px",
  zIndex: 1,
  padding: "10px",
  gap: "8px",
};

const responsiveMenuTextStyle = {
  fontWeight: 900,
  fontSize: "15px",
};

function ResponsiveMenu() {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      //check if buttonRef & menuRef.current is defined and the click event did not originate from within the button or menu element
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node) &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      //click outside detected, hide menu
      setDropdownMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDropdownMenuOpen(false);
    setSelectedItem(pathname);
  }, [pathname]);

  return (
    <div style={responsiveMenuContainer}>
      <button
        ref={buttonRef}
        className={styles.menuButtonContainer}
        onClick={() => setDropdownMenuOpen((prevState) => !prevState)}
      >
        <ResponsiveMenuIcon />
        <div style={responsiveMenuTextStyle}>Menu</div>
      </button>
      {dropdownMenuOpen && (
        <div
          ref={menuRef}
          style={responsiveDropdownMenuStyle}
          className={styles.responsiveDropdownMenuHidden}
        >
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {item.icon}
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResponsiveMenu;
