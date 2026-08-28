import { useEffect, useRef, useState, useCallback } from 'react';

type Axis = 'horizontal' | 'vertical';

interface UseResizableOptions {
  axis: Axis;
  min: number;
  max: number;
  cursor: string;
  // Given the resizable element's bounding rect and the current mouse
  // event, compute the new size — differs by which edge is being dragged
  // (e.g. Explorer measures from its left edge, Terminal from its bottom).
  measure: (rect: DOMRect, e: MouseEvent) => number;
}

export function useResizable({ min, max, cursor, measure }: UseResizableOptions) {
  const [size, setSize] = useState<number | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      document.body.style.cursor = cursor;
      document.body.style.userSelect = 'none';
    },
    [cursor]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      setSize(Math.min(max, Math.max(min, measure(rect, e))));
    };

    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [min, max, measure]);

  return { size, elementRef, handleDragStart };
}
