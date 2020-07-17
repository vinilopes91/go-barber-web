import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { Container } from './styles';

import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
  data: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ data, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(data.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [data, removeToast]);

  return (
    <Container
      type={data.type}
      hasDescription={!!data.description}
      style={style}
    >
      {icons[data.type || 'info']}

      <div>
        <strong>{data.title}</strong>
        <p>{data.description}</p>

        <button type="button" onClick={() => removeToast(data.id)}>
          <FiXCircle size={18} />
        </button>
      </div>
    </Container>
  );
};

export default Toast;
