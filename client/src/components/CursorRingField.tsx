import React, { useEffect, useRef } from "react";

export const CursorRingField: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Hide custom cursor reticle on touchscreen devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    // Smooth physics lerp
    const render = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove);
    render();

    // ── Starfield Particle Canvas ──
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speedX: number;
      speedY: number;
    }> = [];

    const count = 45;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
      });
    }

    let canvasAnimId: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.fill();
      });
      canvasAnimId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      cancelAnimationFrame(canvasAnimId);
    };
  }, []);

  return (
    <div style={{ pointerEvents: "none" }}>
      {/* Ambient Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.65,
        }}
      />

      {/* Trailing Gold Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: -18,
          left: -18,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(245, 158, 11, 0.65)",
          pointerEvents: "none",
          zIndex: 9999,
          boxShadow: "0 0 15px rgba(245, 158, 11, 0.3)",
          willChange: "transform",
        }}
      />

      {/* Center Precise Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: -3,
          left: -3,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#FDE047",
          boxShadow: "0 0 8px #D4AF37",
          pointerEvents: "none",
          zIndex: 10000,
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default CursorRingField;