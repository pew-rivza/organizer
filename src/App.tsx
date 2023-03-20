import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { useEvent } from "effector-react";

import { Layout } from "components/Layout";
import { Routing } from "types/other";
import { getRoutings } from "utils/navigation";
import { findObject } from "utils/objects";

import { fetchCoursesFx } from "MT_models/course";
import { fetchOptionsFx } from "MT_models/option";
import { Course, Option } from "MT_types/stores";

import { fetchCategoriesFx } from "VW_models/category";
import { fetchClothesFx } from "VW_models/clothes";
import { fetchLooksFx } from "VW_models/look";
import { Category, Clothes, Look } from "VW_types/stores";

import { fetchLooksFx as fetchCalendarLooksFx } from "CR_models/look";
import { fetchCheckedMedicationsFx } from "CR_models/medication";
import { CalendarLook, CheckedMedications } from "CR_types/stores";

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

  useEffect(() => {
    fetchCourses();
    fetchOptions();
    fetchCheckedMedications();
    fetchCategories();
    fetchClothes();
    fetchLooks();
    fetchCalendarLooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
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
