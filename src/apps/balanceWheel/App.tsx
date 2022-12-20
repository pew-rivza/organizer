import React, {useEffect, useState} from 'react';
import {useStore,useEvent} from 'effector-react';
import {$wheels, fetchWheelsFx} from "BW_models/wheel";
import {fetchAreaValuesFx} from "BW_models/areaValue";
import {fetchAreasFx} from "BW_models/area";
import { Date } from "BW_components/Date";
import { Icon } from '@iconify/react';
import './App.scss';
import {useHttp} from "../../hooks/http.hook";
import {findObject, joinArrayOfObjects} from "utils/objects";
// TODO: мб алиас сделать для хуков и утилсов?

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import {Area, AreaValue, Wheel} from "./types";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
);

export function App() {
  const { loading, request } = useHttp();
  const wheels = useStore($wheels);
  const pending = useStore(fetchWheelsFx.pending);
  const fetchWheels = useEvent(fetchWheelsFx);
  const fetchAreas = useEvent(fetchAreasFx);
  const fetchAreaValues = useEvent(fetchAreaValuesFx);
  const [areas, setAreas] = useState<Area[]>([]);
  const [currentWheel, setCurrentWheel] = useState<Wheel>({} as Wheel);
  const [currentAreaValues, setCurrentAreaValues] = useState<AreaValue[]>();

  useEffect( () => {
    fetchWheels()
      .then(async wheels => {
        setCurrentWheel(wheels[wheels.length-1]);
        fetchAreas();
        const areas = await request("/api/balancewheel/area/");
        setAreas(areas);
        // @ts-ignore
        fetchAreaValues(wheels[wheels.length-1].id);
        const areaValues: React.SetStateAction<AreaValue[] | undefined> = [];
        setCurrentAreaValues(areaValues);
      });
    // TODO: а мб отсюда можно зависимости убрать все таки?
  }, [fetchWheels, fetchAreaValues, fetchAreas, request]);


  const currentWheelIndex = wheels.indexOf(currentWheel);

  const areasWithValues = joinArrayOfObjects({
    arr: areas,
    field: "id",
    include: [{name: "name", default: ""}]
  }, {
    // @ts-ignore
    arr: currentAreaValues,
    field: "BWAreaId",
    include: [{name: "value", default: 0}],
  });

  const data = {
    // @ts-ignore
    labels: areasWithValues.map(area => area.name),
    datasets: [
      {
        // @ts-ignore
        data: areasWithValues.map(area => area.value),
        backgroundColor: 'rgba(99,182,255,0.2)',
        borderColor: 'rgb(99,154,255)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="balance-wheel">
      <Date/>
      <div style={{height:'400px',width:'400px'}}>
        <Radar data={data} options={{
          scales: {
            r: {
              min: 0,
              max: 10
            }
          }
        }} />
      </div>

      <div className="areas">
        {
          !loading ? (
            areas.map(area => {
              const areaValue = findObject((currentAreaValues as AreaValue[]), "BWAreaId", area.id);
              return (
                <div key={area.id}>
                  <Icon icon={area.icon}/> {area.name}: {areaValue?.value || 0}
                </div>
              )
            })
          ) : <span>...</span>
        }
      </div>
    </div>
  )
}

