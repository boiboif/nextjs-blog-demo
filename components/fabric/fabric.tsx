import React, {
  FC,
  useEffect,
  useRef,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from 'react';
import { fabric } from 'fabric';
import { useDrop } from 'ahooks';

interface FabricProps {
  width: number;
  height: number;
  imgUrl?: string;
  canvasId?: string;
  children?: ReactNode;
}

const Fabric: ForwardRefRenderFunction<HTMLDivElement, FabricProps> = (
  props,
  ref,
) => {
  const { width, height, imgUrl, canvasId = 'fabric', children } = props;

  const [canvasIns, setCanvasIns] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasId);
    if (imgUrl) {
      fabric.Image.fromURL(imgUrl, (img) => {
        const h = img.getScaledHeight();
        const w = img.getScaledWidth();

        canvas.add(
          img.set({
            selectable: false,
            hasControls: false,
            // scaleX: width / w,
            // scaleY: height / h,
          } as fabric.Image),
          // .scale(0.4)
          // .scaleToHeight(height)
          // .scaleToWidth(width),
        );
        setCanvasIns(canvas);
      });
    } else {
      setCanvasIns(canvas);
    }
  }, [canvasId, height, imgUrl, width]);

  return (
    <div ref={ref} style={{ width, height }}>
      <canvas id={canvasId} width={width} height={height}>
        {canvasIns &&
          React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                canvasIns,
              });
            }
          })}
      </canvas>
    </div>
  );
};

export default forwardRef(Fabric);
