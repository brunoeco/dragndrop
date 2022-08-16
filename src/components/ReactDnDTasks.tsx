import { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';

export function ReactDnD() {
  const [tasksColumnId, setTasksColumnId] = useState(uuid());

  const items = [
    {id: uuid(), content: 'Tarefa 1'},
    {id: uuid(), content: 'Tarefa 2'},
  ];

  const initialColumns = {
    [tasksColumnId]: {
      name: 'Tasks',
      items: items
    },
    [uuid()]: {
      name: 'Segunda',
      items: []
    },
    [uuid()]: {
      name: 'terca',
      items: []
    },
  };

  const [columns, setColumns] = useState(initialColumns);

  const handleOnDragEnd = (result: DropResult) => {
    if(!result.destination) return;

    const { source, destination } = result;
    
    if(source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      
      if(source.droppableId === tasksColumnId) {
        destItems.splice(destination.index, 0, {
            id: uuid(),
            content: removed.content
        });

        setColumns({
            ...columns,
            [destination.droppableId]: {
              ...destColumn,
              items: destItems
            }
          })
      } else if(result.destination.droppableId === tasksColumnId){
        setColumns({
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems
            }
          })
      } else {
        destItems.splice(destination.index, 0, removed);

        setColumns({
            ...columns,
            [destination.droppableId]: {
              ...destColumn,
              items: destItems
            },
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems
            }
          })
      }
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      })
    }
  } 

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      height: '100%'
    }}>
      <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div style={{margin: 8}}key={id} >
              <h3>{column.name}</h3>
              <Droppable droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <div 
                        {...provided.droppableProps} 
                        ref={provided.innerRef} 
                        style={{
                          backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'lightgray',
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      > 
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index} >
                              {(provided, snapshot) => {
                                return (
                                  <div 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: 'none',
                                      padding: 16,
                                      margin: '0 0 8px 0',
                                      minHeight: '50px',
                                      backgroundColor: snapshot.isDragging ? '#263b4a' : '#456c86',
                                      color: 'white',
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                )
                              }}
                            </Draggable>
                          )
                        })}  
                        {provided.placeholder}
                      </div>
                    )
                  }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  )
}
