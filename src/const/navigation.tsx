import React from "react";
import { Link } from "react-router-dom";

import { Types } from "organizer-ui";

import { BalanceWheel } from "apps/balanceWheel";
import { Calendar } from "apps/calendar";
import { CheckLists } from "apps/checkLists";
import { MedicationTaking } from "apps/medicationTaking";
import { VirtualWardrobe } from "apps/virtualWardrobe";

import { Day } from "CR_subpages/Day";

import { CourseForm } from "MT_subpages/CourseForm";

import { ClothesForm } from "VW_subpages/ClothesForm";
import { LookForm } from "VW_subpages/LookForm";

export const navigation: Types.Navigation = [
  {
    icon: Types.IconName.Calendar,
    link: "/calendar",
    element: <Calendar />,
    title: "Календарь",
    inMenu: true,
    subpages: [
      {
        link: "/calendar/:timestamp",
        element: <Day />,
        title: "Календарь: карточка дня",
        inMenu: false,
      },
    ],
  },
  {
    icon: Types.IconName.ClipboardCheck,
    link: "/check-lists",
    element: <CheckLists />,
    title: "Чек-листы",
    inMenu: true,
  },
  {
    icon: Types.IconName.Wheel,
    link: "/balance-wheel",
    element: <BalanceWheel />,
    title: "Колесо баланса",
    inMenu: true,
  },
  {
    icon: Types.IconName.Medical,
    link: "/medication-taking",
    element: <MedicationTaking />,
    title: "Прием лекарств",
    inMenu: true,
    subpages: [
      {
        link: "/medication-taking/add",
        element: <CourseForm />,
        title: "Прием лекарств: добавление курса",
        inMenu: false,
      },
      {
        link: "/medication-taking/edit/:id",
        element: <CourseForm />,
        title: "Прием лекарств: редактирование курса",
        inMenu: false,
      },
    ],
  },
  {
    icon: Types.IconName.Bag,
    link: "/virtual-wardrobe/clothes",
    element: <VirtualWardrobe page="clothes" />,
    title: "Виртуальный гардероб",
    inMenu: true,
    subpages: [
      {
        link: "/virtual-wardrobe/clothes/add",
        element: <ClothesForm />,
        title: "Виртуальный гардероб: добавление одежды",
        inMenu: false,
      },
      {
        link: "/virtual-wardrobe/clothes/edit/:id",
        element: <ClothesForm />,
        title: "Виртуальный гардероб: редактирование одежды",
        inMenu: false,
      },
      {
        link: "/virtual-wardrobe/looks",
        element: <VirtualWardrobe page="looks" />,
        title: "Виртуальный гардероб",
        inMenu: false,
      },
      {
        link: "/virtual-wardrobe/looks/add",
        element: <LookForm />,
        title: "Виртуальный гардероб: добавление образа",
        inMenu: false,
      },
      {
        link: "/virtual-wardrobe/looks/edit/:id",
        element: <LookForm />,
        title: "Виртуальный гардероб: редактирование образа",
        inMenu: false,
      },
    ],
  },
  // { icon: "uil:food", link: "/recipes-book", inMenu: false },
  // {
  //   icon: "carbon:event-schedule",
  //   link: "/daily-schedule",
  //   inMenu: false,
  // },
  // { icon: "cil:dog", link: "/dog-training", inMenu: false },
  // { icon: "charm:gift", link: "/wishlist", inMenu: false },
  // { icon: "ri:psychotherapy-line", link: "/cbt-tracking", inMenu: false },
  // {
  //   icon: "icon-park-outline:passport",
  //   link: "/documents-store",
  //   inMenu: false,
  // },
  // { icon: "iconoir:hammer", link: "/repair-costs", inMenu: false },
  // { icon: "ph:flower-lotus", link: "/period-tracker", inMenu: false },
  // { icon: "emojione-monotone:tomato", link: "/pomodoro-timer", inMenu: false },
  // { icon: "pixelarticons:notes", link: "/notes", inMenu: false },
  // { icon: "icon-park-outline:fingernail", link: "/nails-feed", inMenu: false },
  {
    link: "/*",
    element: <NotFound />,
    title: "Страница не найдена",
    inMenu: false,
  },
];

function NotFound() {
  return (
    <div>
      Такой страницы нет. <Link to="/">Вернуться на главную</Link>
    </div>
  );
}
