import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function ToastAlert({alert, visible, setVisible}) {

  return (
    <ToastContainer position="bottom-end">
      <Toast
        show={visible}
        onClose={() => setVisible(false)}
        delay={10000}
        autohide
        bg={alert.variant}
      >
        <Toast.Header>
          <h4>{alert.title}</h4>
        </Toast.Header>
        <Toast.Body>{alert.msg}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
