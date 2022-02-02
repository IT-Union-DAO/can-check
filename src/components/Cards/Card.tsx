import React, { useEffect, useState } from "react";

interface CardProps {
  logo?: string;
  children: React.ReactNode;
}

export default function Card({ logo, children }: CardProps) {
  const invisibleStyle = "opacity-0 transition duration-1000 ease-in";
  const visibleStyle = "opacity-100 transition duration-1000 ease-out";
  const [style, setStyle] = useState(invisibleStyle);

  useEffect(() => {
    setInterval(() => {
      setStyle(visibleStyle);
    }, 100);
    return () => {
      setStyle(invisibleStyle);
    };
  }, []);

  return (
    <div className={`justify-items-start p-3 flex justify-center ${style}`}>
      <div className="rounded-lg shadow-lg p-2 bg-orange-100 max-w-xs">
        <img className="max-w-md h-12 p-2" src={logo} />
        {children}
      </div>
    </div>
  );
}
