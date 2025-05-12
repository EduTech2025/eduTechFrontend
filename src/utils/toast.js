import { motion } from 'framer-motion';
import { CheckCircle, X, AlertCircle } from 'lucide-react';

export default function Toast({ type, message, onClose }) {
  const bgClass =
    type === 'success'
      ? 'bg-gradient-to-r from-green-500 to-green-700'
      : 'bg-gradient-to-r from-red-500 to-red-700';

  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-6 right-6 z-50 min-w-[280px] max-w-sm rounded-xl text-white shadow-xl backdrop-blur-md p-4 flex items-start gap-4 ${bgClass}`}
    >
      <Icon className="w-6 h-6 mt-1 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-semibold">{type === 'success' ? 'Success' : 'Error'}</p>
        <p className="text-sm">{message}</p>
      </div>
      <button onClick={onClose} className="hover:opacity-80">
        <X className="w-4 h-4 mt-1" />
      </button>
    </motion.div>
  );
}
