import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";

import { Layout } from "components/Layout";
import { useEvent } from "effector-react";
import { Routing } from "types/other";
import { getRoutings } from "utils/navigation";
import { findObject } from "utils/objects";

import { fetchAreasFx } from "BW_models/area";
import { fetchWheelsFx } from "BW_models/wheel";
import { Area, Wheel as WheelType } from "BW_types/stores";

import { fetchCoursesFx } from "MT_models/course";
import { fetchOptionsFx } from "MT_models/option";
import { Course as CourseType, Option } from "MT_types/stores";

import { fetchCheckedMedicationsFx } from "CR_models/medication";
import { CheckedMedications } from "CR_types/stores";

import "./App.scss";

const App: React.FC = () => {
  const fetchWheels = useEvent<WheelType[]>(fetchWheelsFx);
  const fetchAreas = useEvent<Area[]>(fetchAreasFx);
  const fetchOptions = useEvent<Option[]>(fetchOptionsFx);
  const fetchCourses = useEvent<CourseType[]>(fetchCoursesFx);
  const fetchCheckedMedications = useEvent<CheckedMedications[]>(
    fetchCheckedMedicationsFx,
  );

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
    fetchWheels();
    fetchAreas();
    fetchCourses();
    fetchOptions();
    fetchCheckedMedications();
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
