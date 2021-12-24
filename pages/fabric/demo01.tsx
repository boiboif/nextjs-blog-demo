import React, { useRef, useState } from 'react';
import { Fabric, Rect } from '@/components/fabric';
import { Button } from 'antd';
import { useDrop, useUpdate } from 'ahooks';
import DragItem from '@/components/dragItem';

const Demo01 = () => {
  const update = useUpdate();
  const [rects, setRects] = useState<
    (fabric.IRectOptions & { id?: string; uid: number })[]
  >([
    {
      left: 100,
      top: 100,
      fill: 'red',
      width: 50,
      height: 50,
      id: '1',
      uid: 0,
    },
  ]);
  const uidRef = useRef(0);
  const dropRef = useRef<HTMLDivElement>(null);

  useDrop(dropRef, {
    onText: (text, e) => {
      console.log(e);
      alert(`'text: ${text}' dropped`);
    },
    onFiles: (files, e) => {
      console.log(e, files);
      alert(`${files.length} file dropped`);
    },
    onUri: (uri, e) => {
      console.log(e);
      alert(`uri: ${uri} dropped`);
    },
    onDom: (content: string, e: any) => {
      console.log(content, e);
      uidRef.current += 1;
      setRects([
        ...rects,
        {
          left: e.offsetX,
          top: e.offsetY,
          id: String(Math.random()),
          width: 50,
          height: 50,
          fill: 'blue',
          originX: 'center',
          originY: 'center',
          uid: uidRef.current,
        },
      ]);
    },
    // onDragEnter: () => setIsHovering(true),
    // onDragLeave: () => setIsHovering(false),
  });

  return (
    <div className="bg-white h-screen">
      <Button
        onClick={() => {
          update();
        }}
      >
        按钮
      </Button>
      <Fabric
        ref={dropRef}
        width={600}
        height={500}
        imgUrl="http://172.20.186.14:48000/sr-saas-config/v1/file/download/1471035778166427650"
      >
        {rects.map((item, i) => {
          return (
            <Rect
              {...item}
              key={item.uid}
              onDelete={(param) => {
                const target = param.target;
                if (target.data) {
                  setRects(rects.filter((v) => v.uid !== target.data.uid));
                } else {
                  const uids: number[] = (target as any)._objects.map(
                    (item: any) => item.data.uid,
                  );

                  setRects(rects.filter((v) => !uids.includes(v.uid)));
                }
              }}
            ></Rect>
          );
        })}
      </Fabric>
      <DragItem
        data={{
          type: 'rect',
          id: '1',
        }}
      ></DragItem>
      <DragItem
        data={{
          type: 'rect',
          id: '2',
        }}
      ></DragItem>
    </div>
  );
};

export default Demo01;
