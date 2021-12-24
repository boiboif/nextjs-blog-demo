import { fabric } from 'fabric';
import { Transform } from 'fabric/fabric-impl';
import { FC, useEffect, useRef } from 'react';
import { FabricComponent } from './types';

interface RectProps extends fabric.IRectOptions {
  onDelete: (param: Transform) => void;
}

function renderIcon(icon: CanvasImageSource) {
  return function renderIcon(
    this: any,
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    styleOverride: any,
    fabricObject: fabric.Object,
  ) {
    const sizeX = this.sizeX;
    const sizeY = this.sizeY;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
    ctx.drawImage(icon, -sizeX / 2, -sizeY / 2, sizeX, sizeY);
    ctx.restore();
  };
}

const deleteObject =
  (onDelete: (arg: Transform) => void) =>
  (eventData: MouseEvent, transform: Transform, x: number, y: number) => {
    const target = transform.target;
    const canvas = target.canvas;

    onDelete(transform);
    // canvas?.remove(target);
    // canvas?.requestRenderAll();

    return true;
  };

const Rect: FC<RectProps> = (props) => {
  const { onDelete, ...rest } = props;
  const rectRef = useRef<fabric.Rect | null>(null);

  const { canvasIns } = props as RectProps & FabricComponent;

  useEffect(() => {
    const deleteIcon =
      "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

    const deleteImg = document.createElement('img');
    deleteImg.src = deleteIcon;

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject(onDelete),
      render: renderIcon(deleteImg),
      sizeX: 24,
      sizeY: 24,
    });
  }, [onDelete, rest]);

  /** 首次渲染 */
  useEffect(() => {
    if (!rectRef.current) {
      rectRef.current = new fabric.Rect({
        ...rest,
        data: rest,
      });

      canvasIns.add(rectRef.current);
    }

    return () => {
      if (rectRef.current) {
        canvasIns.remove(rectRef.current);
        rectRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasIns]);

  /** 更新 */
  useEffect(() => {
    if (rectRef.current) {
      rectRef.current.set(rest);
      canvasIns.renderAll();
    }
  }, [canvasIns, rest]);

  return null;
};

export default Rect;
