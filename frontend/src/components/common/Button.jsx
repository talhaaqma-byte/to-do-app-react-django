import { motion } from 'framer-motion';
import './Button.css';

const Button = ({ children, variant = 'primary', size = 'medium', onClick, disabled, type = 'button', className = '', ...props }) => {
  return (
    <motion.button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;

