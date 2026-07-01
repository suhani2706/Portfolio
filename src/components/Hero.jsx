// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import suhaniImg from '../assets/suhani.png';

const Hero = () => {
  const [activeTool, setActiveTool] = useState('cursor');
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState(null);

  // Editable translations (dx, dy)
  const [offsets, setOffsets] = useState({
    zCard: { x: 0, y: 0 },
    cmdCard: { x: 0, y: 0 },
    empathyNote: { x: 0, y: 0 },
    illustration: { x: 0, y: 0 },
    pillBadge: { x: 0, y: 0 },
    headline: { x: 0, y: 0 }
  });

  // Editable rotations
  const [rotations, setRotations] = useState({
    zCard: 0,
    cmdCard: 0,
    empathyNote: -3,
    illustration: 0,
    pillBadge: 0,
    headline: 0
  });

  // Drawn elements
  const [shapes, setShapes] = useState([]);
  const [textBlocks, setTextBlocks] = useState([]);
  const [penPaths, setPenPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);

  // Canvas drawing states (Pencil)
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingShape, setDrawingShape] = useState(null);

  // Handle canvas dimensions on resize or tool activation
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const rect = canvas.parentNode.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTool]);

  // Tools configuration
  const tools = [
    { id: 'cursor', name: 'Select / Move', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 3 10.07 19.97 12.58 12.58 19.97 10.07 3 3" />
      </svg>
    )},
    { id: 'hand', name: 'Hand (Pan Canvas)', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
        <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4.5" />
        <path d="M6 10V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v9a7 7 0 0 0 7 7h3a7 7 0 0 0 7-7v-3" />
      </svg>
    )},
    { id: 'pencil', name: 'Pencil (Draw)', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    )},
    { id: 'shapes', name: 'Rectangle Tool', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      </svg>
    )},
    { id: 'rotate', name: 'Rotate (Click to Turn)', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </svg>
    )},
    { id: 'pen', name: 'Pen (Vector Line)', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )},
    { id: 'text', name: 'Text Tool (Inline/Add)', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    )}
  ];

  // Drag-and-drop mechanics for pre-existing elements
  const startDrag = (e, elementId) => {
    if (activeTool !== 'cursor' && activeTool !== 'rotate') return;
    e.stopPropagation();
    e.preventDefault();

    if (activeTool === 'rotate') {
      setRotations(prev => ({
        ...prev,
        [elementId]: (prev[elementId] + 15) % 360
      }));
      return;
    }

    const startX = e.clientX;
    const startY = e.clientY;
    const initX = offsets[elementId].x;
    const initY = offsets[elementId].y;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      setOffsets(prev => ({
        ...prev,
        [elementId]: { x: initX + dx, y: initY + dy }
      }));
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Global mouse handlers on drawing overlay
  const handleMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 'hand') {
      const startX = e.clientX;
      const startY = e.clientY;
      const initPanX = pan.x;
      const initPanY = pan.y;

      const handlePan = (moveEv) => {
        setPan({
          x: initPanX + (moveEv.clientX - startX),
          y: initPanY + (moveEv.clientY - startY)
        });
      };
      const handlePanUp = () => {
        window.removeEventListener('mousemove', handlePan);
        window.removeEventListener('mouseup', handlePanUp);
      };
      window.addEventListener('mousemove', handlePan);
      window.addEventListener('mouseup', handlePanUp);
      return;
    }

    if (activeTool === 'shapes') {
      setDrawingShape({ startX: x, startY: y, currentX: x, currentY: y });
      return;
    }

    if (activeTool === 'pencil') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      setIsDrawing(true);
      return;
    }

    if (activeTool === 'pen') {
      setCurrentPath(prev => [...prev, { x, y }]);
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 'shapes' && drawingShape) {
      setDrawingShape(prev => ({ ...prev, currentX: x, currentY: y }));
    }

    if (activeTool === 'pencil' && isDrawing) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleMouseUp = (e) => {
    if (activeTool === 'shapes' && drawingShape) {
      const { startX, startY, currentX, currentY } = drawingShape;
      const width = Math.abs(currentX - startX);
      const height = Math.abs(currentY - startY);
      const left = Math.min(startX, currentX);
      const top = Math.min(startY, currentY);

      if (width > 5 && height > 5) {
        setShapes(prev => [
          ...prev,
          {
            id: Date.now(),
            left,
            top,
            width,
            height,
            color: 'rgba(0, 0, 0, 0.02)',
            borderColor: '#000000',
            dx: 0,
            dy: 0
          }
        ]);
      }
      setDrawingShape(null);
    }

    if (activeTool === 'pencil') {
      setIsDrawing(false);
    }
  };

  // Create text blocks on click (Text Tool)
  const handleOverlayClick = (e) => {
    if (activeTool !== 'text') return;
    if (e.target !== e.currentTarget && !e.target.classList.contains('canvas-interactive-overlay')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTextBlocks(prev => [
      ...prev,
      {
        id: Date.now(),
        left: x,
        top: y,
        text: 'Type something...',
        dx: 0,
        dy: 0
      }
    ]);
  };

  // Finalize vector pen paths on double click
  const handleOverlayDoubleClick = () => {
    if (activeTool === 'pen' && currentPath.length > 1) {
      setPenPaths(prev => [...prev, currentPath]);
      setCurrentPath([]);
    }
  };

  // Reset entire editor canvas
  const handleResetCanvas = () => {
    setOffsets({
      zCard: { x: 0, y: 0 },
      cmdCard: { x: 0, y: 0 },
      empathyNote: { x: 0, y: 0 },
      illustration: { x: 0, y: 0 },
      pillBadge: { x: 0, y: 0 },
      headline: { x: 0, y: 0 }
    });
    setRotations({
      zCard: 0,
      cmdCard: 0,
      empathyNote: -3,
      illustration: 0,
      pillBadge: 0,
      headline: 0
    });
    setShapes([]);
    setTextBlocks([]);
    setPenPaths([]);
    setCurrentPath([]);
    setPan({ x: 0, y: 0 });
    
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setSelectedId(null);
  };

  return (
    <section className={`hero-editorial tool-cursor-${activeTool}`} id="hero">
      
      {/* Drawing Canvas & Overlay Layers */}
      <div 
        className="canvas-interactive-overlay"
        style={{ pointerEvents: activeTool === 'cursor' ? 'none' : 'auto' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleOverlayClick}
        onDoubleClick={handleOverlayDoubleClick}
      >
        {/* Sketch Canvas Overlay (Pencil Mode) */}
        <canvas 
          ref={canvasRef} 
          className="pencil-drawing-canvas"
          style={{ pointerEvents: activeTool === 'pencil' ? 'auto' : 'none' }}
        />

        {/* Dynamic shapes drawing preview */}
        {drawingShape && (
          <div 
            style={{
              position: 'absolute',
              left: Math.min(drawingShape.startX, drawingShape.currentX),
              top: Math.min(drawingShape.startY, drawingShape.currentY),
              width: Math.abs(drawingShape.currentX - drawingShape.startX),
              height: Math.abs(drawingShape.currentY - drawingShape.startY),
              border: '1.5px dashed #000000',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Render Vector Paths (Pen Tool) */}
        <svg 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none',
            zIndex: 3
          }}
        >
          {penPaths.map((path, idx) => (
            <polyline
              key={idx}
              points={path.map(p => `${p.x},${p.y}`).join(' ')}
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ))}
          {currentPath.length > 0 && (
            <polyline
              points={currentPath.map(p => `${p.x},${p.y}`).join(' ')}
              stroke="#2f80ed"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            />
          )}
        </svg>

        {/* Render Custom Rectangles (Shapes) */}
        {shapes.map((shape) => (
          <div
            key={shape.id}
            onClick={(e) => { e.stopPropagation(); setSelectedId(shape.id); }}
            style={{
              position: 'absolute',
              left: shape.left,
              top: shape.top,
              width: shape.width,
              height: shape.height,
              backgroundColor: shape.color,
              border: selectedId === shape.id ? '2px solid #2f80ed' : `1.5px solid ${shape.borderColor}`,
              transform: `translate(${shape.dx}px, ${shape.dy}px)`,
              cursor: activeTool === 'cursor' ? 'move' : 'default',
              zIndex: 4
            }}
            onMouseDown={(e) => {
              if (activeTool !== 'cursor') return;
              e.stopPropagation();
              const startX = e.clientX;
              const startY = e.clientY;
              const initDx = shape.dx;
              const initDy = shape.dy;

              const handleShapeDrag = (moveEv) => {
                const dx = moveEv.clientX - startX;
                const dy = moveEv.clientY - startY;
                setShapes(prev => prev.map(s => s.id === shape.id ? { ...s, dx: initDx + dx, dy: initDy + dy } : s));
              };
              const handleShapeDragEnd = () => {
                window.removeEventListener('mousemove', handleShapeDrag);
                window.removeEventListener('mouseup', handleShapeDragEnd);
              };
              window.addEventListener('mousemove', handleShapeDrag);
              window.addEventListener('mouseup', handleShapeDragEnd);
            }}
          >
            {selectedId === shape.id && activeTool === 'cursor' && (
              <>
                <div className="shape-selection-handle tl" />
                <div className="shape-selection-handle tr" />
                <div className="shape-selection-handle bl" />
                <div className="shape-selection-handle br" />
                <button
                  className="element-delete-btn"
                  title="Delete element"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShapes(prev => prev.filter(s => s.id !== shape.id));
                    setSelectedId(null);
                  }}
                >
                  ×
                </button>
              </>
            )}
          </div>
        ))}

        {/* Render Custom text boxes */}
        {textBlocks.map((block) => (
          <div
            key={block.id}
            onClick={(e) => { e.stopPropagation(); setSelectedId(block.id); }}
            style={{
              position: 'absolute',
              left: block.left,
              top: block.top,
              transform: `translate(${block.dx}px, ${block.dy}px)`,
              border: selectedId === block.id ? '2px solid #2f80ed' : '1px dashed transparent',
              padding: '4px 8px',
              cursor: activeTool === 'cursor' ? 'move' : 'text',
              zIndex: 5
            }}
            onMouseDown={(e) => {
              if (activeTool !== 'cursor') return;
              e.stopPropagation();
              const startX = e.clientX;
              const startY = e.clientY;
              const initDx = block.dx;
              const initDy = block.dy;

              const handleTextDrag = (moveEv) => {
                const dx = moveEv.clientX - startX;
                const dy = moveEv.clientY - startY;
                setTextBlocks(prev => prev.map(t => t.id === block.id ? { ...t, dx: initDx + dx, dy: initDy + dy } : t));
              };
              const handleTextDragEnd = () => {
                window.removeEventListener('mousemove', handleTextDrag);
                window.removeEventListener('mouseup', handleTextDragEnd);
              };
              window.addEventListener('mousemove', handleTextDrag);
              window.addEventListener('mouseup', handleTextDragEnd);
            }}
          >
            <div
              contentEditable={activeTool === 'text'}
              suppressContentEditableWarning
              onBlur={(e) => {
                const newText = e.target.innerText.trim();
                if (!newText) {
                  setTextBlocks(prev => prev.filter(t => t.id !== block.id));
                } else {
                  setTextBlocks(prev => prev.map(t => t.id === block.id ? { ...t, text: newText } : t));
                }
              }}
              style={{
                outline: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-main)'
              }}
            >
              {block.text}
            </div>

            {selectedId === block.id && activeTool === 'cursor' && (
              <button
                className="element-delete-btn"
                title="Delete text block"
                onClick={(e) => {
                  e.stopPropagation();
                  setTextBlocks(prev => prev.filter(t => t.id !== block.id));
                  setSelectedId(null);
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Editor Canvas Board */}
      <div 
        className="container hero-container-grid hero-canvas-board"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px)`,
          transition: isDrawing || drawingShape ? 'none' : 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Left Column */}
        <div className="hero-left-editorial">
          {/* Draggable Tagline Pill */}
          <div 
            className={`hero-pill-badge draggable-editor-element ${activeTool === 'rotate' ? 'rotatable' : ''}`}
            onMouseDown={(e) => startDrag(e, 'pillBadge')}
            style={{
              transform: `translate(${offsets.pillBadge.x}px, ${offsets.pillBadge.y}px) rotate(${rotations.pillBadge}deg)`,
              cursor: activeTool === 'cursor' ? 'grab' : activeTool === 'rotate' ? 'pointer' : 'default'
            }}
          >
            <span 
              contentEditable={activeTool === 'text'} 
              suppressContentEditableWarning
              className="inline-editor-text"
            >
              UI Design Portfolio
            </span>
            <span className="pill-star-badge">✦</span>
          </div>

          {/* Floating Figma elements */}
          <div 
            className={`floating-element float-z-card draggable-editor-element ${activeTool === 'rotate' ? 'rotatable' : ''}`}
            onMouseDown={(e) => startDrag(e, 'zCard')}
            style={{
              transform: `translate(${offsets.zCard.x}px, ${offsets.zCard.y}px) rotate(${rotations.zCard}deg)`,
              cursor: activeTool === 'cursor' ? 'grab' : activeTool === 'rotate' ? 'pointer' : 'default'
            }}
          >
            <div className="element-inner-z">Z</div>
          </div>
          <div 
            className={`floating-element float-cmd-card draggable-editor-element ${activeTool === 'rotate' ? 'rotatable' : ''}`}
            onMouseDown={(e) => startDrag(e, 'cmdCard')}
            style={{
              transform: `translate(${offsets.cmdCard.x}px, ${offsets.cmdCard.y}px) rotate(${rotations.cmdCard}deg)`,
              cursor: activeTool === 'cursor' ? 'grab' : activeTool === 'rotate' ? 'pointer' : 'default'
            }}
          >
            <div className="element-inner-cmd">⌘</div>
          </div>

          {/* Editable Headline */}
          <h1 
            className={`hero-headline-editorial draggable-editor-element ${activeTool === 'rotate' ? 'rotatable' : ''}`}
            onMouseDown={(e) => startDrag(e, 'headline')}
            style={{
              transform: `translate(${offsets.headline.x}px, ${offsets.headline.y}px) rotate(${rotations.headline}deg)`,
              cursor: activeTool === 'cursor' ? 'grab' : activeTool === 'rotate' ? 'pointer' : 'default'
            }}
          >
            <span 
              contentEditable={activeTool === 'text'}
              suppressContentEditableWarning
              className="inline-editor-text"
            >
              All about stories, <br />
              people, books and <br />
              design.
            </span>
          </h1>

          {/* Figma Floating Toolbar & Reset Controls */}
          <div className="design-toolbar-container">
            <div className="floating-design-toolbar">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  className={`toolbar-tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                  onClick={() => { setActiveTool(tool.id); setSelectedId(null); }}
                  title={tool.name}
                  aria-label={tool.name}
                >
                  {tool.icon}
                </button>
              ))}
            </div>

            {/* Reset Canvas Button */}
            <button 
              className="reset-editor-canvas-btn" 
              onClick={handleResetCanvas}
              title="Reset all canvas edits to default"
            >
              ↺ Reset Canvas
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="hero-right-editorial">
          {/* Empathy pointer handwritten note */}
          <div 
            className={`empathy-note-container draggable-editor-element ${activeTool === 'rotate' ? 'rotatable' : ''}`}
            onMouseDown={(e) => startDrag(e, 'empathyNote')}
            style={{
              transform: `translate(${offsets.empathyNote.x}px, ${offsets.empathyNote.y}px) rotate(${rotations.empathyNote}deg)`,
              cursor: activeTool === 'cursor' ? 'grab' : activeTool === 'rotate' ? 'pointer' : 'default'
            }}
          >
            <p className="empathy-note-text">
              <span 
                contentEditable={activeTool === 'text'}
                suppressContentEditableWarning
                className="inline-editor-text"
              >
                designing with empathy and clarity
              </span>
            </p>
            <div className="empathy-arrow-svg">
              <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 5 C 25 15, 35 12, 45 35" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 3" />
                <path d="M41 28 L45 35 L38 33" stroke="black" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Transparent Avatar */}
          <div 
            className={`illustration-wrapper-editorial draggable-editor-element ${activeTool === 'rotate' ? 'rotatable' : ''}`}
            onMouseDown={(e) => startDrag(e, 'illustration')}
            style={{
              transform: `translate(${offsets.illustration.x}px, ${offsets.illustration.y}px) rotate(${rotations.illustration}deg)`,
              cursor: activeTool === 'cursor' ? 'grab' : activeTool === 'rotate' ? 'pointer' : 'default'
            }}
          >
            <img 
              src={suhaniImg} 
              alt="Suhani Mathur Illustration" 
              className="hero-illustration-image"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;