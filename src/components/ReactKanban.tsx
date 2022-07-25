import { useState } from 'react';
//import Board from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'

const board = {
  columns: [
    {
      id: 1,
      title: 'Backlog',
      cards: [
        {
          id: 1,
          title: 'Add card',
          description: 'Add capability to add a card in a column'
        },
      ]
    },
    {
      id: 2,
      title: 'Doing',
      cards: [
        {
          id: 2,
          title: 'Drag-n-drop support',
          description: 'Move a card between the columns'
        },
      ]
    }
  ]
}

export function ReactKanban() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      height: '100%'
    }}>
      {//<Board initialBoard={board} />
}
    </div>
  )
}
