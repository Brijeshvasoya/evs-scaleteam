import React from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

const Spinner = ({
  size = 50,
  color = '#007bff',
  loading = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`spinner-container ${className}`}>
      <ClipLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
        {...props}
      />
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  loading: PropTypes.bool,
  className: PropTypes.string
};

export default Spinner;