import { motion } from 'framer-motion';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { useRef, useCallback } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'outline-dark';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  magnetic?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  magnetic = false,
  className = '',
  ...props
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!magnetic || !btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btnRef.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    },
    [magnetic]
  );

  const handleMouseLeave = useCallback(() => {
    if (!magnetic || !btnRef.current) return;
    btnRef.current.style.transform = 'translate(0, 0)';
  }, [magnetic]);

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tejas-red cursor-pointer select-none magnetic-btn';

  const variants: Record<string, string> = {
    primary:
      'bg-tejas-red text-white hover:bg-tejas-red-dark hover:shadow-lg hover:shadow-tejas-red/20 active:scale-[0.97]',
    secondary:
      'border border-ink-200 text-ink-800 hover:border-tejas-red hover:text-tejas-red active:scale-[0.97] bg-transparent',
    ghost:
      'text-ink-500 hover:text-tejas-red hover:bg-tejas-red/5 active:scale-[0.97]',
    dark:
      'bg-white text-ink-900 hover:bg-ink-50 hover:shadow-lg active:scale-[0.97]',
    'outline-dark':
      'border border-ink-600 text-white hover:border-tejas-red hover:text-tejas-red active:scale-[0.97] bg-transparent',
  };

  const sizes: Record<string, string> = {
    sm: 'px-5 py-2.5 text-xs tracking-wide',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-sm tracking-wide',
  };

  return (
    <motion.button
      ref={btnRef}
      whileHover={{ scale: magnetic ? 1 : 1.02 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove as any}
      onMouseLeave={handleMouseLeave as any}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(props as any)}
    >
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </motion.button>
  );
}
