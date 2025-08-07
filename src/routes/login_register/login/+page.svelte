<script>
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { goto } from "$app/navigation";

  import { auth } from "../../../firebase";
  import PageHeader from "../../../components/PageHeader.svelte";

  const ERROR_MAP = {
    "auth/email-already-in-use": "Email already in use",
    "auth/invalid-credential": "Invalid credentials",
    "auth/weak-password": "Password should be at least 6 characters",
    "auth/user-not-found": "User not found",
    "auth/missing-password": "Password cannot be empty",
  };

  const loginImg = "../src/assets/log_in.svg";

  let errorMessage = "";

  const login = (e) => {
    const formData = new FormData(e.target);
    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        goto("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(`errorCode: ${errorCode} - errorMessage: ${errorMessage}`);
        errorMessage = ERROR_MAP[errorCode];
      });
  };
</script>

<div class="login-page">
  <PageHeader title="Login" dashboard={false} other={{}} />
  <img src={loginImg} alt="login" class="page-image" />

  <form action="submit" class="login-form" on:submit|preventDefault={login}>
    <h1>Login</h1>
    <label for="email" class="form-label">Email</label>
    <input type="email" id="email" name="email" class="form-input" />
    <label for="password" class="form-label">Password</label>
    <input type="password" id="password" name="password" class="form-input" />
    <input type="submit" value="Login" class="submit-btn" />
    <p>
      Don't have an account? <a href="/login_register/register">Register</a>
    </p>
    <p class="error-message">{errorMessage}</p>
  </form>
</div>

<style>
  .login-page {
    text-align: center;
  }

  .login-form {
    width: 50%;
    margin: 2rem auto;
    background-color: var(--section-background);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 10px var(--box-shadow);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-label {
    font-size: 1.2rem;
    color: var(--text-color);
  }

  .form-input {
    font-size: 1.2rem;
    margin: 1rem auto;
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 5px var(--box-shadow);
    width: 50%;
  }

  .submit-btn {
    background-color: var(--btn-color);
    color: var(--text-color);
    font-size: 1.2rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 5px var(--box-shadow);
    min-width: fit-content;
    width: 25%;
    margin: 1rem auto;
  }

  .error-message {
    color: var(--error-color);
  }

  @media (max-width: 600px) {
    .login-form {
      width: 80%;
    }

    .form-input {
      width: 80%;
    }
  }
</style>
