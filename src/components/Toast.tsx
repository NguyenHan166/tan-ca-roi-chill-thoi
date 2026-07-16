import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ToastMessage } from '../types';
import { CheckCircle, Info, Heart, X, AlertCircle } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-24 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          // Determine icon
          let Icon = Info;
          let iconColor = 'text-cozy-wood';
          if (toast.type === 'success') {
            Icon = CheckCircle;
            iconColor = 'text-cozy-moss';
          } else if (toast.type === 'heart') {
            Icon = Heart;
            iconColor = 'text-red-500 fill-red-500';
          } else if (toast.type === 'error') {
            Icon = AlertCircle;
            iconColor = 'text-red-500';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="pointer-events-auto bg-cozy-ivory border border-cozy-wood/10 rounded-lg p-4 shadow-lg flex items-start gap-3 backdrop-blur-md"
              id={`toast-${toast.id}`}
            >
              <div className={`mt-0.5 ${iconColor}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-sans text-cozy-dark font-medium leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-cozy-dark/40 hover:text-cozy-dark transition-colors cursor-pointer"
                aria-label="Đóng thông báo"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// Hook-like helper inside App.tsx or managed array is best.
