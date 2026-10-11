// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import suhaniImg from '../assets/suhani.png';

const commentStorageKey = 'figmaPortfolioComments';

const Hero = () => {
  const [activeTool, setActiveTool] = useState('cursor');
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState(null);
  const [offsets, setOffsets] = useState({
    zCard: { x: 0, y: 0 },
    cmdCard: { x: 0, y: 0 },
    empathyNote: { x: 0, y: 0 },
    illustration: { x: 0, y: 0 },
    pillBadge: { x: 0, y: 0 },
    headline: { x: 0, y: 0 }
  });
  const [rotations, setRotations] = useState({
    zCard: 0,
    cmdCard: 0,
    empathyNote: -3,
    illustration: 0,
    pillBadge: 0,
    headline: 0
  });
  const [shapes, setShapes] = useState([]);
  const [textBlocks, setTextBlocks] = useState([]);
  const [penPaths, setPenPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [history, setHistory] = useState([]);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingShape, setDrawingShape] = useState(null);

  const getSnapshot = () => ({
    shapes,
    textBlocks,
    comments,
    penPaths,
    pan,
    offsets,
    rotations,
  });

  const restoreSnapshot = (snapshot) => {
    if (!snapshot) return;
    setShapes(snapshot.shapes || []);
    setTextBlocks(snapshot.textBlocks || []);
    setComments(snapshot.comments || []);
    setPenPaths(snapshot.penPaths || []);
    setPan(snapshot.pan || { x: 0, y: 0 });
    setOffsets(snapshot.offsets || {
      zCard: { x: 0, y: 0 },
      cmdCard: { x: 0, y: 0 },
      empathyNote: { x: 0, y: 0 },
      illustration: { x: 0, y: 0 },
      pillBadge: { x: 0, y: 0 },
      headline: { x: 0, y: 0 }
    });
    setRotations(snapshot.rotations || {
      zCard: 0,
      cmdCard: 0,
      empathyNote: -3,
      illustration: 0,
      pillBadge: 0,
      headline: 0
    });
    setSelectedId(null);
  };

  const pushHistory = () => {
    setHistory(prev => [...prev, getSnapshot()]);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedComments = JSON.parse(localStorage.getItem(commentStorageKey) || '[]');
      if (Array.isArray(savedComments)) {
        // keep storage behavior intentionally empty; comments are removed from the editor
      }
    } catch (error) {
      console.warn('Unable to read saved comments:', error);
    }
  }, []);

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

  const tools = [
    { id: 'cursor', name: 'Select / Move', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 3 10.07 19.97 12.58 12.58 19.97 10.07 3 3" />
      </svg>
    )},
    { id: 'rectangle', name: 'Rectangle', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      </svg>
    )},
    { id: 'text', name: 'Text', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    )},
    { id: 'pen', name: 'Pen', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    )},
    { id: 'frame', name: 'Frame', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    )}
  ];

  const startDrag = (e, elementId) => {
    if (activeTool !== 'cursor') return;
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const initX = offsets[elementId]?.x ?? 0;
    const initY = offsets[elementId]?.y ?? 0;

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

  const handleMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 'rectangle' || activeTool === 'frame') {
      setDrawingShape({
        type: activeTool,
        startX: x,
        startY: y,
        currentX: x,
        currentY: y,
      });
      return;
    }

    if (activeTool === 'pen') {
      setCurrentPath(prev => [...prev, { x, y }]);
      return;
    }

    if (activeTool === 'text') {
      const newTextBlock = {
        id: Date.now(),
        left: x,
        top: y,
        text: 'Type something...',
        dx: 0,
        dy: 0,
      };
      pushHistory();
      setTextBlocks(prev => [...prev, newTextBlock]);
      setSelectedId(newTextBlock.id);
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if ((activeTool === 'rectangle' || activeTool === 'frame') && drawingShape) {
      setDrawingShape(prev => ({ ...prev, currentX: x, currentY: y }));
    }
  };

  const handleMouseUp = () => {
    if ((activeTool === 'rectangle' || activeTool === 'frame') && drawingShape) {
      const { startX, startY, currentX, currentY, type } = drawingShape;
      const width = Math.abs(currentX - startX);
      const height = Math.abs(currentY - startY);
      const left = Math.min(startX, currentX);
      const top = Math.min(startY, currentY);

      if (width > 8 && height > 8) {
        const newShape = {
          id: Date.now(),
          left,
          top,
          width,
          height,
          color: type === 'frame' ? 'rgba(47, 128, 237, 0.04)' : 'rgba(0, 0, 0, 0.02)',
          borderColor: type === 'frame' ? '#2f80ed' : '#000000',
          dx: 0,
          dy: 0,
          type,
          label: type === 'frame' ? 'Frame' : 'Rectangle',
        };
        pushHistory();
        setShapes(prev => [...prev, newShape]);
      }

      setDrawingShape(null);
      return;
    }

    if (activeTool === 'pen' && currentPath.length > 1) {
      pushHistory();
      setPenPaths(prev => [...prev, currentPath]);
      setCurrentPath([]);
    }
  };

  const handleOverlayClick = (e) => {
    if (activeTool !== 'text') return;
    if (e.target !== e.currentTarget && !e.target.classList.contains('canvas-interactive-overlay')) return;
  };

  const handleUndo = () => {
    if (!history.length) return;
    const previous = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    restoreSnapshot(previous);
  };

  const handleResetCanvas = () => {
    pushHistory();
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
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    setSelectedId(null);
  };

  return (
    <section className={`hero-editorial tool-cursor-${activeTool}`} id="hero">
      <div
        className="canvas-interactive-overlay"
        style={{ pointerEvents: activeTool === 'cursor' ? 'none' : 'auto' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleOverlayClick}
      >
        <canvas
          ref={canvasRef}
          className="pencil-drawing-canvas"
          style={{ pointerEvents: activeTool === 'pen' ? 'auto' : 'none' }}
        />

        {drawingShape && (
          <div
            style={{
              position: 'absolute',
              left: Math.min(drawingShape.startX, drawingShape.currentX),
              top: Math.min(drawingShape.startY, drawingShape.currentY),
              width: Math.abs(drawingShape.currentX - drawingShape.startX),
              height: Math.abs(drawingShape.currentY - drawingShape.startY),
              border: drawingShape.type === 'frame' ? '1.5px dashed #2f80ed' : '1.5px dashed #000000',
              backgroundColor: drawingShape.type === 'frame' ? 'rgba(47, 128, 237, 0.04)' : 'rgba(0, 0, 0, 0.05)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
        )}

        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }}>
          {penPaths.map((path, idx) => (
            <polyline
              key={idx}
              points={path.map(point => `${point.x},${point.y}`).join(' ')}
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ))}
          {currentPath.length > 0 && (
            <polyline
              points={currentPath.map(point => `${point.x},${point.y}`).join(' ')}
              stroke="#2f80ed"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
            />
          )}
        </svg>

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
              zIndex: 4,
            }}
            onMouseDown={(event) => {
              if (activeTool !== 'cursor') return;
              event.stopPropagation();
              const startX = event.clientX;
              const startY = event.clientY;
              const initialDx = shape.dx;
              const initialDy = shape.dy;

              const handleShapeDrag = (moveEvent) => {
                const dx = moveEvent.clientX - startX;
                const dy = moveEvent.clientY - startY;
                setShapes(prev => prev.map(item => item.id === shape.id ? { ...item, dx: initialDx + dx, dy: initialDy + dy } : item));
              };

              const handleShapeDragEnd = () => {
                window.removeEventListener('mousemove', handleShapeDrag);
                window.removeEventListener('mouseup', handleShapeDragEnd);
              };

              window.addEventListener('mousemove', handleShapeDrag);
              window.addEventListener('mouseup', handleShapeDragEnd);
            }}
          >
            {shape.type === 'frame' && (
              <span style={{ position: 'absolute', top: -18, left: 0, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2f80ed', fontWeight: 700 }}>
                {shape.label}
              </span>
            )}
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
                    setShapes(prev => prev.filter(item => item.id !== shape.id));
                    setSelectedId(null);
                  }}
                >
                  ×
                </button>
              </>
            )}
          </div>
        ))}

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
              zIndex: 5,
            }}
            onMouseDown={(event) => {
              if (activeTool !== 'cursor') return;
              event.stopPropagation();
              const startX = event.clientX;
              const startY = event.clientY;
              const initialDx = block.dx;
              const initialDy = block.dy;

              const handleTextDrag = (moveEvent) => {
                const dx = moveEvent.clientX - startX;
                const dy = moveEvent.clientY - startY;
                setTextBlocks(prev => prev.map(item => item.id === block.id ? { ...item, dx: initialDx + dx, dy: initialDy + dy } : item));
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
              onBlur={(event) => {
                const nextText = event.target.innerText.trim();
                if (!nextText) {
                  setTextBlocks(prev => prev.filter(item => item.id !== block.id));
                } else {
                  setTextBlocks(prev => prev.map(item => item.id === block.id ? { ...item, text: nextText } : item));
                }
              }}
              style={{
                outline: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-main)',
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
                  setTextBlocks(prev => prev.filter(item => item.id !== block.id));
                  setSelectedId(null);
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}

      </div>

      <div
        className="container hero-container-grid hero-canvas-board"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px)`,
          transition: isDrawing || drawingShape ? 'none' : 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="hero-left-editorial">
          <div
            className="hero-pill-badge draggable-editor-element"
            onMouseDown={(event) => startDrag(event, 'pillBadge')}
            style={{
              transform: `translate(${offsets.pillBadge.x}px, ${offsets.pillBadge.y}px) rotate(${rotations.pillBadge}deg)`,
              cursor: activeTool === 'cursor' ? 'grab' : 'default',
            }}
          >
            <span contentEditable={activeTool === 'text'} suppressContentEditableWarning className="inline-editor-text">
              UI Design Portfolio
            </span>
            <span className="pill-star-badge">✦</span>
          </div>

          <div
            className="floating-element float-z-card draggable-editor-element"
            onMouseDown={(event) => startDrag(event, 'zCard')}
            style={{
              transform: `translate(${offsets.zCard.x}px, ${offsets.zCard.y}px) rotate(${rotations.zCard}deg)`,
              cursor: activeTool === 'cursor' ? 'grab' : 'default',
            }}
          >
            <div className="element-inner-z">Z</div>
          </div>

          <div
            className="floating-element float-cmd-card draggable-editor-element"
            onMouseDown={(event) => startDrag(event, 'cmdCard')}
            style={{
              transform: `translate(${offsets.cmdCard.x}px, ${offsets.cmdCard.y}px) rotate(${rotations.cmdCard}deg)`,
              cursor: activeTool === 'cursor' ? 'grab' : 'default',
            }}
          >
            <div className="element-inner-cmd">⌘</div>
          </div>

          <h1
            className="hero-headline-editorial draggable-editor-element"
            onMouseDown={(event) => startDrag(event, 'headline')}
            style={{
              transform: `translate(${offsets.headline.x}px, ${offsets.headline.y}px) rotate(${rotations.headline}deg)`,
              cursor: activeTool === 'cursor' ? 'grab' : 'default',
            }}
          >
            <span contentEditable={activeTool === 'text'} suppressContentEditableWarning className="inline-editor-text">
              All about stories, <br />
              people, books and <br />
              design.
            </span>
          </h1>

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

            <div className="editor-actions-row">
              <button type="button" className="toolbar-tool-btn undo-btn" onClick={handleUndo} title="Undo last change" aria-label="Undo last change">
                ↶
              </button>
              <button className="reset-editor-canvas-btn" onClick={handleResetCanvas} title="Reset all canvas edits to default">
                ↺ Reset Canvas
              </button>
            </div>
          </div>
        </div>

        <div className="hero-right-editorial">
          <div
            className="empathy-note-container draggable-editor-element"
            onMouseDown={(event) => startDrag(event, 'empathyNote')}
            style={{
              transform: `translate(${offsets.empathyNote.x}px, ${offsets.empathyNote.y}px) rotate(${rotations.empathyNote}deg)`,
              cursor: activeTool === 'cursor' ? 'grab' : 'default',
            }}
          >
            <p className="empathy-note-text">
              <span contentEditable={activeTool === 'text'} suppressContentEditableWarning className="inline-editor-text">
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

          <div
            className="illustration-wrapper-editorial draggable-editor-element"
            onMouseDown={(event) => startDrag(event, 'illustration')}
            style={{
              transform: `translate(${offsets.illustration.x}px, ${offsets.illustration.y}px) rotate(${rotations.illustration}deg)`,
              cursor: activeTool === 'cursor' ? 'grab' : 'default',
            }}
          >
            <img src={suhaniImg} alt="Suhani Mathur Illustration" className="hero-illustration-image" draggable="false" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;