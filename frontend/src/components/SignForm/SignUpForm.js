import { Form, FloatingLabel, Button } from "react-bootstrap";

export default function SignUpForm({ submitForm, validateForm, validated }) {
  return (
    <Form
      id="signUpForm"
      onSubmit={e => submitForm(e, "signUp")}
      onKeyUp={e => validateForm(e, "signUp")}
      noValidate
      validated={validated}
    >
      <h2>Sign-up</h2>

      <FloatingLabel label="Username">
        <Form.Control
          type="text"
          placeholder="Username"
          name="username"
          required
          pattern="^\w{3,40}$"
        />
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel label="E-mail">
        <Form.Control
          type="email"
          placeholder="E-mail"
          name="email"
          required
          pattern="^\w{3,40}@\w{3,40}.\w{2,8}$"
        />
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel label="Password">
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          required
          pattern="^\w{8,40}$"
        />
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel label="Repeat password">
        <Form.Control
          type="password"
          placeholder="Repeat password"
          name="password2"
          required
          pattern="^\w{8,40}$"
        />
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </FloatingLabel>

      <Button variant="primary" type="submit">Continue</Button>

    </Form>
  )
}
