import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { useEvent } from "effector-react";

import { Layout } from "components/Layout";
import { Routing } from "types/other";
import { getCookie, setCookie } from "utils/cookies";
import { getRoutings } from "utils/navigation";
import { findObject } from "utils/objects";

import { fetchLooksFx as fetchCalendarLooksFx } from "CR_models/look";
import { fetchCheckedMedicationsFx } from "CR_models/medication";
import { CalendarLook, CheckedMedications } from "CR_types/stores";

import { fetchCheckListsFx } from "CL_models/checkList";
import { CheckList } from "CL_types/stores";

import { fetchCoursesFx } from "MT_models/course";
import { fetchOptionsFx } from "MT_models/option";
import { Course, Option } from "MT_types/stores";

import { fetchCategoriesFx } from "VW_models/category";
import { fetchClothesFx } from "VW_models/clothes";
import { fetchLooksFx } from "VW_models/look";
import { Category, Clothes, Look } from "VW_types/stores";

import { API_AUTHENTICATE } from "./api/auth";

import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";

import "./App.scss";

const App: React.FC = () => {
  const fetchOptions = useEvent<Option[]>(fetchOptionsFx);
  const fetchCourses = useEvent<Course[]>(fetchCoursesFx);
  const fetchCheckedMedications = useEvent<CheckedMedications[]>(
    fetchCheckedMedicationsFx,
  );
  const fetchCategories = useEvent<Category[]>(fetchCategoriesFx);
  const fetchClothes = useEvent<Clothes[]>(fetchClothesFx);
  const fetchLooks = useEvent<Look[]>(fetchLooksFx);
  const fetchCalendarLooks = useEvent<CalendarLook[]>(fetchCalendarLooksFx);
  const fetchCheckLists = useEvent<CheckList[]>(fetchCheckListsFx);

  const location = useLocation();
  const routings: Routing[] = getRoutings();

  const currentRouting = findObject<string, Routing>(
    routings,
    "path",
    location.pathname.slice(1),
  );

  useEffect((): void => {
    document.title = `Organizer - ${
      currentRouting?.title || "Страница не найдена"
    }`;
  }, [currentRouting]);

  const requestPassword = async (): Promise<void> => {
    if (!window._organizer.auth) {
      window._organizer.auth = {
        authenticated: false,
      };
      const password = window.prompt(
        "Для доступа к органайзеру введите пароль:",
      );
      if (password) {
        const expireDate = new Date();
        expireDate.setFullYear(expireDate.getFullYear() + 5);

        const authentication = await API_AUTHENTICATE(password);
        if (authentication.authenticated) {
          setCookie("org_auth", "true", { expires: expireDate });
          window._organizer.auth = authentication;
        }
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    const authCookie = getCookie("org_auth");
    if (authCookie) {
      fetchCourses();
      fetchOptions();
      fetchCheckedMedications();
      fetchCategories();
      fetchClothes();
      fetchLooks();
      fetchCalendarLooks();
      fetchCheckLists();
    } else {
      requestPassword();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/calendar" />} />
        {routings.map((routing) => (
          <Route
            key={routing.path}
            index={routing.index}
            element={routing.element}
            path={routing.path}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default App;

// TODO: Привести аргументы API_ функций к виду API_...(data) => {}
// TODO: Избавиться от пары Entity + ChangedEntity
// TODO: Вынести компоненты в кит
// TODO: Избавиться от повторных запросов после добавления/удаления/редактирования сущности
// TODO: Привести апи к единообразию по названию API_ функций, аргументов и возвращаемых значений
