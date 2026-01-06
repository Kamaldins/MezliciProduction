import React from 'react';
import { Hexagon } from 'phosphor-react';
import clsx from 'clsx';

interface KamaltekLogoProps {
  className?: string;
  classNameIcon?: string;
  classNameText?: string;
  classNameSub?: string;
}

const KamaltekLogo: React.FC<KamaltekLogoProps> = ({ 
  className,
  classNameIcon = "text-white group-hover:text-taupe-500",
  classNameText = "text-white",
  classNameSub = "text-taupe-500"
}) => {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <Hexagon 
        size={48} 
        weight="duotone" 
        className={clsx("mb-1 transition-colors duration-300", classNameIcon)} 
      />
      <span className={clsx("text-3xl font-sans font-black tracking-tighter leading-none transition-colors duration-300", classNameText)}>
        KAMALTEK
      </span>
      <span className={clsx("text-[10px] uppercase tracking-[0.4em] font-bold transition-colors duration-300", classNameSub)}>
        Digital Solutions
      </span>
    </div>
  );
};

export default KamaltekLogo;