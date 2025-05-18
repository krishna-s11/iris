import React, { memo, CSSProperties } from "react";
import { cn } from "../../lib/utils";

export const Ripple = memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none",
        className
      )}
      style={{
        zIndex: 1,
        transform: "translateX(20%)",
        aspectRatio: "1/1",
        position: "relative",
        ...props.style
      }}
      {...props}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {Array.from({ length: numCircles }, (_, i) => {
          const size = mainCircleSize + i * 70;
          const opacity = mainCircleOpacity - i * 0.02;
          const animationDelay = `${i * 0.2}s`;
          const borderStyle = "solid";

          return (
            <div
              key={i}
              className={`absolute animate-ripple rounded-full border`}
              style={
                {
                  "--i": i,
                  "--duration": "3.5s",
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                  animationDelay,
                  borderStyle,
                  borderWidth: "2px",
                  borderColor: `rgba(138, 43, 226, 0.7)`,
                  backgroundColor: `rgba(138, 43, 226, 0.08)`,
                  boxShadow: "0 0 30px rgba(138, 43, 226, 0.4)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  position: "absolute",
                  borderRadius: "50%",
                  margin: "auto"
                }
              }
            />
          );
        })}
      </div>
    </div>
  );
});

Ripple.displayName = "Ripple"; 