import { useEvent, useStore } from "effector-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { $coursesFullInfo, fetchCoursesFx } from "MT_models/course";
import { Course, CourseFullInfo } from "MT_types/stores";

import "./App.scss";

export const App: React.FC = () => {
  const fetchCourses = useEvent<Course[]>(fetchCoursesFx);
  const coursesFullInfo = useStore<CourseFullInfo[]>($coursesFullInfo);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div data-testid="medication-taking" className="mt">
      {coursesFullInfo.map((course) => (
        <div key={course.id}>
          <b>{course.diagnosis}:</b>
          {
            //TODO: нужно потом добавить скелетонов
          }
          {(course?.medications || []).map((medication) => (
            <div key={medication.id}>{medication.name}</div>
          ))}
          <br />
          <br />
        </div>
      ))}
      <Link to="add">Добавить курс</Link>
    </div>
  );
};

// TODO: сделать медикейшаны адаптивными
// TODO: реализовать вывод списка курсов с медикейшанами
// TODO: реализовать редактирование курса
// TODO: нужно для каждого курса подгрузить его медикейшаны, как бы сделать это пооптимизированее? подгрузка двух сущностей, а потом их группировка на фронте мб?
// TODO: заюзать в CourseForm хук useParams от react-router
// TODO: завести роут edit
// TODO: реализовать удаление курса

// TODO: при выборе варианта сразу фокусироваться на первом поле варианта
// TODO: когда выбираю период через календарь, то если дата окончания в периоде в следующем месяце, а не в том же, что и начало, то в следующем месяце число, равное началу периода, становится белым полностью
// TODO: вот бы выбирать вариант не целясь в радиобаттон, а жмаканием на все поле
// TODO: хотелось бы возможность копировать карточку медикейшана и вставлять в другой медикейшан
// TODO: кстати, кнопку назад бы на форме сделать
