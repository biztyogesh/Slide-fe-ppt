import React, { useState, useRef, useEffect } from 'react';

const ImageSelection = (props: any) => {
  const [selection, setSelection] = useState({ x: 50, y: 50, width: 100, height: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string>(undefined!);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const selectionRef = useRef(null);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx: any = canvas.getContext('2d');
    const image: any = imageRef.current;

    // Load your image here or set the image source dynamically
    // Example: image.src = 'your-image-url.jpg';

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      drawSelection(selection);
    };
  }, []);

  const drawSelection = (selection: any) => {
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the image
    ctx.drawImage(imageRef.current, 0, 0);

    // Draw the selection rectangle
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(selection.x, selection.y, selection.width, selection.height);

    // Draw resize handles (corner circles)
    const handleSize = 8;
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(selection.x, selection.y, handleSize, 0, 2 * Math.PI);
    ctx.arc(selection.x + selection.width, selection.y, handleSize, 0, 2 * Math.PI);
    ctx.arc(selection.x + selection.width, selection.y + selection.height, handleSize, 0, 2 * Math.PI);
    ctx.arc(selection.x, selection.y + selection.height, handleSize, 0, 2 * Math.PI);
    ctx.fill();
  };

  const handleMouseDown = (e: any) => {
    const canvas: any = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if the mouse is within the selection rectangle
    if (
      mouseX >= selection.x &&
      mouseX <= selection.x + selection.width &&
      mouseY >= selection.y &&
      mouseY <= selection.y + selection.height
    ) {
      setIsDragging(true);
    }

    // Check if the mouse is within a resize handle
    if (
      mouseX >= selection.x - 4 && mouseX <= selection.x + 4 &&
      mouseY >= selection.y - 4 && mouseY <= selection.y + 4
    ) {
      setIsResizing(true);
      setResizeHandle('top-left');
    } else if (
      mouseX >= selection.x + selection.width - 4 && mouseX <= selection.x + selection.width + 4 &&
      mouseY >= selection.y - 4 && mouseY <= selection.y + 4
    ) {
      setIsResizing(true);
      setResizeHandle('top-right');
    } else if (
      mouseX >= selection.x - 4 && mouseX <= selection.x + 4 &&
      mouseY >= selection.y + selection.height - 4 && mouseY <= selection.y + selection.height + 4
    ) {
      setIsResizing(true);
      setResizeHandle('bottom-left');
    } else if (
      mouseX >= selection.x + selection.width - 4 && mouseX <= selection.x + selection.width + 4 &&
      mouseY >= selection.y + selection.height - 4 && mouseY <= selection.y + selection.height + 4
    ) {
      setIsResizing(true);
      setResizeHandle('bottom-right');
    }
  };

  const handleMouseMove = (e: any) => {
    if (isDragging) {
      const canvas: any = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const newX = mouseX - selection.width / 2;
      const newY = mouseY - selection.height / 2;

      // Check if the new position is within the canvas boundaries
      if (newX >= 0 && newY >= 0 && newX + selection.width <= canvas.width && newY + selection.height <= canvas.height) {
        setSelection({
          x: newX,
          y: newY,
          width: selection.width,
          height: selection.height,
        });

        drawSelection({
          x: newX,
          y: newY,
          width: selection.width,
          height: selection.height,
        });
      }
    }

    if (isResizing) {
      const canvas: any = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let newWidth = selection.width;
      let newHeight = selection.height;
      let newX = selection.x;
      let newY = selection.y;

      if (resizeHandle === 'top-left') {
        newWidth = selection.width + (selection.x - mouseX);
        newHeight = selection.height + (selection.y - mouseY);
        newX = mouseX;
        newY = mouseY;
      } else if (resizeHandle === 'top-right') {
        newWidth = mouseX - selection.x;
        newHeight = selection.height + (selection.y - mouseY);
        newY = mouseY;
      } else if (resizeHandle === 'bottom-left') {
        newWidth = selection.width + (selection.x - mouseX);
        newHeight = mouseY - selection.y;
        newX = mouseX;
      } else if (resizeHandle === 'bottom-right') {
        newWidth = mouseX - selection.x;
        newHeight = mouseY - selection.y;
      }

      // Check if the new size and position are within the canvas boundaries
      if (newX >= 0 && newY >= 0 && newX + newWidth <= canvas.width && newY + newHeight <= canvas.height) {
        setSelection({
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        });

        drawSelection({
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(undefined!);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isResizing ? 'se-resize' : isDragging ? 'move' : 'auto' }}
      />
      <img
        ref={imageRef}
        alt="Your Image"
        src="https://images.unsplash.com/photo-1559116315-702b0b4774ce?q=80&w=383&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image URL
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageSelection;