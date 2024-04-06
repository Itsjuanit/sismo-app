import PropTypes from "prop-types";

function ErrorMessage({ children, className = "", style = {} }) {
  return (
    <div
      className={`text-center my-4 bg-red-600 text-white font-bold p-3 uppercase ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ErrorMessage;
