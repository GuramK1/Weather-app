import React from "react";

interface BackgroundAnimationProps {
  theme: string;
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ theme }) => {
  const hour = new Date().getHours();
  const isDaytime = hour >= 6 && hour < 19;
  const showSun = theme === "light";
  const showMoon = theme === "dark";

  const getTimeBasedPosition = () => {
    if (isDaytime) {
      const sunProgress = (hour - 6) / 13;
      const x = 10 + sunProgress * 80;
      const y = 20 + Math.sin(sunProgress * Math.PI) * -10;
      return { x: `${x}%`, y: `${y}%` };
    } else {
      const nightHour = hour > 19 ? hour - 19 : hour + 5;
      const moonProgress = nightHour / 11;
      const x = 15 + moonProgress * 70;
      const y = 15 + Math.sin(moonProgress * Math.PI) * -5;
      return { x: `${x}%`, y: `${y}%` };
    }
  };

  const position = getTimeBasedPosition();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          theme === "light"
            ? "bg-gradient-to-b from-sky-300 via-sky-100 to-orange-100"
            : "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
        }`}
      />

      {showMoon && (
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {showSun && (
        <div
          className="absolute transition-all duration-1000 ease-in-out"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative">
            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: "20s" }}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-8 bg-yellow-300 rounded-full opacity-60"
                  style={{
                    left: "50%",
                    top: "-16px",
                    transformOrigin: "50% 24px",
                    transform: `translateX(-50%) rotate(${i * 45}deg)`,
                  }}
                />
              ))}
            </div>

            <div className="w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-400 rounded-full shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-transparent rounded-full opacity-60" />
            </div>
          </div>
        </div>
      )}

      {showMoon && (
        <div
          className="absolute transition-all duration-1000 ease-in-out"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 w-20 h-20 bg-slate-200 rounded-full opacity-20 blur-md -translate-x-2 -translate-y-2" />

            <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-300 rounded-full shadow-lg relative overflow-hidden">
              <div className="absolute top-2 left-3 w-2 h-2 bg-slate-400 rounded-full opacity-40" />
              <div className="absolute top-6 right-2 w-1.5 h-1.5 bg-slate-400 rounded-full opacity-30" />
              <div className="absolute bottom-3 left-2 w-1 h-1 bg-slate-400 rounded-full opacity-30" />

              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full opacity-30" />
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-4xl opacity-30 animate-float ${
              theme === "dark" ? "opacity-10" : "opacity-30"
            }`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: "6s",
            }}
          >
            ☁️
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundAnimation;
