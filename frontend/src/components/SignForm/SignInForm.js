import { Form, FloatingLabel, Button } from "react-bootstrap";

export default function SignInForm({ submitForm, validateForm, validated }) {
  return (
    <Form
      id="signInForm"
      onSubmit={e => submitForm(e, "signIn")}
      onKeyUp={e => validateForm(e, "signIn")}
      noValidate
      validated={validated}
    >
      <h2>Sign-in</h2>

      <FloatingLabel label="Username">
        <Form.Control
          type="text"
          placeholder="Username"
          name="username"
          required
          pattern="^\w{3,40}$"
        />
        <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel label="Password">
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          required
          pattern="^\w{8,40}$"
        />
        <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
      </FloatingLabel>

      <Button variant="primary" type="submit">Continue</Button>

    </Form>
  )
}
