import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BalanceWheel } from "./apps/balanceWheel";
import "./App.scss";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="balance-wheel" element={<BalanceWheel />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const menu = [
  { icon: "material-symbols:home-outline", link: "/" },
  { icon: "carbon:chart-radar", link: "/balance-wheel" },
  { icon: "mdi:wardrobe-outline", link: "/virtual-wardrobe" },
  { icon: "material-symbols:calendar-month-outline-sharp", link: "/calendar" },
  { icon: "material-symbols:check-box-outline-sharp", link: "/check-lists" },
  { icon: "game-icons:medicines", link: "/medication-taking" },
  { icon: "uil:food", link: "/recipes-book" },
  {
    icon: "carbon:event-schedule",
    link: "/daily-schedule",
  },
  { icon: "cil:dog", link: "/dog-training" },
  { icon: "charm:gift", link: "/wishlist" },
  { icon: "ri:psychotherapy-line", link: "/cbt-tracking" },
  { icon: "icon-park-outline:passport", link: "/documents-store" },
  { icon: "iconoir:hammer", link: "/repair-costs" },
];

function Layout() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  return (
    <div className="layout">
      <div className="layout-content">
        {/* Outlet is a placeholder for the child routes */}
        <Outlet />
        <ToastContainer autoClose={2000} limit={2} />
      </div>
      <nav>
        <ul>
          {menu.map((item, i) => {
            const itemCn = currentPage === item.link ? "selected" : "";
            return (
              <li
                key={i}
                onClick={() => setCurrentPage(item.link)}
                className={itemCn}
              >
                <Link to={item.link}>
                  <Icon icon={item.icon} width={30} height={30} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function Home() {
  return (
    <div>
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
      Домашняя страница
      <br />
    </div>
  );
}

function NotFound() {
  return (
    <div>
      Такой страницы нет. <Link to="/">Вернуться на главную</Link>
    </div>
  );
}
