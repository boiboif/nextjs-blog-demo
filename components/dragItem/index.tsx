import React, { useRef, useState } from 'react';
import { useDrop, useDrag } from 'ahooks';

const DragItem = ({ data }: { data: any }) => {
  const dragRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);

  useDrag(data, dragRef, {
    onDragStart: () => {
      setDragging(true);
    },
    onDragEnd: () => {
      setDragging(false);
    },
  });

  return (
    <div
      ref={dragRef}
      style={{
        border: '1px solid #e8e8e8',
        padding: 16,
        width: 80,
        textAlign: 'center',
        marginRight: 16,
      }}
    >
      {dragging ? 'dragging' : `box-${data.id}`}
    </div>
  );
};

export default DragItem