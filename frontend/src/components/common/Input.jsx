import { motion } from 'framer-motion';
import './Input.css';

const Input = ({ label, error, ...props }) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <motion.input
        className={`input-field ${error ? 'input-error' : ''}`}
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        {...props}
      />
      {error && (
        <motion.span
          className="input-error-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.span>
      )}
    </div>
  );
};

export default Input;

