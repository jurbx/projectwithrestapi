import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie/es6";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import "./SignForm.scss";
import ToastAlert from "../ToastAlert";

export default function SignForm({formType}) {
  const
    [signInValidated, setSignInValidated] = useState(false),
    [signUpValidated, setSignUpValidated] = useState(false),
    [alertMsg, setAlertMsg] = useState({}),
    [toastVisible, setToastVisible] = useState(true),
    baseUrl = "https://projectwithrestapi.herokuapp.com",
    cookies = new Cookies();

  function validateForm(e, formType) {
    const form = e.target.nodeName === "FORM" ? e.target : e.target.form

    const
      testUsername = /^\w{3,40}$/,
      testPassword = /^\w{8,40}$/,
      testEmail = /^\w{3,40}\@\w{3,40}\.\w{2,8}$/
    
    let valid = true
    formType === "signIn" ? setSignInValidated(true) : setSignUpValidated(true)

    if(/^\s*$/.test(form.username.value)) {
      form.username.nextElementSibling.innerText = "This field is required"
      valid = false
    } else if(form.username.value.length < 3 || form.username.value.length > 40) {
      form.username.nextElementSibling.innerText = "The username is too short or too long"
      valid = false
    } else if (!testUsername.test(form.username.value)) {
      form.username.nextElementSibling.innerText = "The username must contin only latin characters, digits and _"
      valid = false
    }
    if(/^\s*$/.test(form.password.value)) {
      form.password.nextElementSibling.innerText = "This field is required"
      valid = false
    } else if(form.password.value.length < 8 || form.password.value.length > 40) {
      form.password.nextElementSibling.innerText = "The password is too short or too long"
      valid = false
    } else if(!testPassword.test(form.password.value)) {
      form.password.nextElementSibling.innerText = "The password must contin only latin characters, digits and _"
      valid = false
    }
    
    if(formType === "signUp") {
      if(/^\s*$/.test(form.email.value)) {
        form.email.nextElementSibling.innerText = "This field is required"
        valid = false
      } else if(form.email.value.length < 10 || form.email.value.length > 40) {
        form.email.nextElementSibling.innerText = "This email is too short or too long"
        valid = false
      } else if(!testEmail.test(form.email.value)) {
        form.email.nextElementSibling.innerText = "You must provide a valid email"
        valid = false
      }
      if(form.password2.value !== form.password.value) {
        form.password2.nextElementSibling.innerText = "Passwords does not match"
        valid = false
      }
    }
    return valid
  }

  function submitForm(e, formType) {
    e.preventDefault()
    if(!validateForm(e, formType)) {return}

    const form = e.target
    formType === "signIn" ? setSignInValidated(false) : setSignUpValidated(false)

    let token = cookies.get("token")
    let url = formType === "signIn" ? "/authentication/login/" : "/authentication/register/"
    let config = { headers: { "Content-Type": "application/json" } }

    let data = {
      username: form.username.value,
      password: form.password.value
    }
    if(formType === "signUp") {
      data.email = form.email.value
      data.password2 = form.password2.value
    }

    axios.post(baseUrl + url, JSON.stringify(data), config)
    .then(res => {

      if(formType === "signIn") {
        setAlertMsg({
          title: "That's good",
          msg: "You have successfully signed into your account. You'll be redirected in 5s",
          variant: "success"
        })
        setTimeout(() => {
          document.querySelector(".home").click()
        }, 5000)
      } else {
        setAlertMsg({
          title: "That's good",
          msg: "You have successfully created an account. Now you should to sing in. You'll be redirected in 5s",
          variant: "success"
        })
        setToastVisible(true)

        setTimeout(() => {
          document.querySelector(".sign-in").click()
        }, 5000)
      }

      console.log(res.data)
      let user = {
        username: res.data.username,
        password: res.data.password,
        id: res.data.user_id
      }

      if(formType === "signIn") {
        user.token = res.data.token
      }
      cookies.set("user", JSON.stringify(user))
       

    })
    .catch(err => {
      formType === "signIn"
        ? setAlertMsg({
          title: "Something went wrong",
          msg: "Probably, username or password are wrong",
          variant: "danger"
        })
        : setAlertMsg({
          title: "Something went wrong",
          msg: "Probably, this username is already taken",
          variant: "danger"
        })
      setToastVisible(true)
    })
  }

  return (
    <div id="formWrapper" className="text-white">
      <video src="./static/video/black-cubes.mp4" autoPlay muted loop />
      <main>
        {formType === "sign-in" ?
          <SignInForm submitForm={submitForm} validateForm={validateForm} validated={signInValidated} /> :
          <SignUpForm submitForm={submitForm} validateForm={validateForm} validated={signUpValidated} />}
      </main>
      {alertMsg.msg ? <ToastAlert alert={alertMsg} visible={toastVisible} setVisible={setToastVisible} /> : ""}
    </div>
  )
}
