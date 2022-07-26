import { SyntheticEvent, useState } from 'react';
import {ResizableBox} from 'react-resizable';

import 'react-resizable/css/styles.css';
import './styles.css'

export function ReactResizable() {
  const [taskTimes, setTaskTimes] = useState([
    {
      id: "1",
      nome: "teste 1",
      horas: "00:30",
      lastPositionY: 0
    },
    {
      id: "2",
      nome: "teste 2",
      horas: "00:30",
      lastPositionY: 0
    },
    {
      id: "3",
      nome: "teste 3",
      horas: "00:30",
      lastPositionY: 0
    }
  ]); 

  const timeToAdd = 30;
  const taskDivSizeX = 200;
  const taskDivSizeY = 100;

  const handleStartResize = (e: any, index: number) => {
    const tempTasksTimes = [...taskTimes];
    const currentTask = taskTimes[index];
    tempTasksTimes[index] = {
      ...currentTask,
      lastPositionY: e.clientY
    }

    setTaskTimes([...tempTasksTimes]);
  }

  const handleOnResize = (e: any, index: number) => {
    const tempTasksTimes = [...taskTimes];
    const currentTask = tempTasksTimes[index];    
    const splitedTime = currentTask.horas.split(":");
    const operation = currentTask.lastPositionY <= e.y ? 1 : -1;
    let hours = parseInt(splitedTime[0]);
    let minutes = parseInt(splitedTime[1]); 
    let sumedMinutes = minutes + (timeToAdd * operation);

    if(sumedMinutes < 0) {
      minutes = 60 - timeToAdd;
      hours -= 1;
    } else if(sumedMinutes >= 60) {
      minutes = 0;
      hours += 1;
    } else {
      minutes = sumedMinutes;
    }

    let formatedHours = `${hours.toString().length > 1 ? hours : "0" + hours}:${minutes.toString().length > 1 ? minutes : "0" + minutes}`

    tempTasksTimes[index] = {
      ...tempTasksTimes[index],
      horas: formatedHours,
      lastPositionY: e.clientY,
    }

    setTaskTimes([...tempTasksTimes]);
  }

  console.log(taskTimes);

  return (
    <div className="App" style={{display: "flex", flexDirection: "column", gap: "8px"}}>
      {taskTimes.map((item, index) => {
        return (
          <ResizableBox 
            key={item.id}
            className="box task" 
            width={taskDivSizeX} 
            height={taskDivSizeY} 
            draggableOpts={{grid: [25, 25]}}
            minConstraints={[taskDivSizeX, taskDivSizeY]}
            maxConstraints={[taskDivSizeX, 500]}
            axis={"y"}
            onResize={e => handleOnResize(e, index)}
            onResizeStart={e => handleStartResize(e, index)}
            
          >
            <span className="text">{item.nome} - {item.horas}</span>
          </ResizableBox>
        )
      })}
    </div>
  )
}