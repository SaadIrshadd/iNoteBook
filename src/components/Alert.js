import React from 'react';

function Alert(props) {
  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
          style={{
            position: "fixed",
            top: "0",
            width: "100%",
            borderRadius: "0"
          }}
        >
          <strong>{props.alert.msg}</strong>
        </div>
      )}
    </div>
  );
}

export default Alert;
