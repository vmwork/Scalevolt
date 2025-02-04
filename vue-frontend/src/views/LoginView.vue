<template>
  <div id="app">
    <header class="header">
      <h1>App Name</h1>
    </header>
    <main class="login-view">
      <h1>Welcome Back</h1>
      <p>Please sign in to continue.</p>
      <div class="login-buttons">
        <!-- Google Sign-In Button -->
        <button @click="signInWithGoogle" class="login-button google" aria-label="Sign in with Google">
          <img src="/images/Login/google-login-icon.svg" alt="Google Icon" />
          Continue with Google
        </button>

        <!-- Apple Sign-In Button -->
        <button @click="signInWithApple" class="login-button apple" aria-label="Sign in with Apple">
          <img src="/images/Login/apple-login-icon.svg" alt="Apple Icon" />
          Continue with Apple
        </button>

        <!-- Divider -->
        <div class="divider">or</div>

        <!-- Email Sign-In Form -->
        <form @submit.prevent="signInWithEmail">
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Password" required />
          <button type="submit" class="login-button email">Sign In with Email</button>
        </form>

        <!-- Sign-Up Link -->
        <p class="signup-link">
          Don't have an account? <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>
      <p class="terms">
        By continuing, you agree to our
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </p>
    </main>
  </div>
</template>

<script>
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, OAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { useUserStore } from '@/stores/user';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const { user } = useUserStore();
          user.value = result.user;
          alert(`Welcome ${user.displayName}`);
          this.$router.push('/');
        })
        .catch((error) => {
          console.error('Google Sign-In Error:', error);
          alert('Failed to sign in with Google');
        });
    },
    signInWithApple() {
      const provider = new OAuthProvider('apple.com');
      signInWithPopup(auth, provider)
        .then((result) => {
          const { user } = useUserStore();
          user.value = result.user;
          alert(`Welcome ${user.displayName || user.email}`);
          this.$router.push('/');
        })
        .catch((error) => {
          console.error('Apple Sign-In Error:', error);
          alert('Failed to sign in with Apple');
        });
    },
    signInWithEmail() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((result) => {
          const { user } = useUserStore();
          user.value = result.user;
          alert(`Welcome ${user.email}`);
          this.$router.push('/');
        })
        .catch((error) => {
          console.error('Email Sign-In Error:', error);
          alert('Failed to sign in with email');
        });
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  font-family: Arial, sans-serif;
  background-color: #f9fafb;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px; /* Height of the header */
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

header h1 {
  font-size: 1.5rem;
  color: #333333;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 170px 20px 20px; /* Match padding-top to the header height */
}

.login-view {
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.login-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.google {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #e5e7eb;
}

.apple {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #e5e7eb;
}

.email {
  background-color: #007bff;
  color: #ffffff;
}

.login-button:hover {
  opacity: 0.9;
}

.divider {
  text-align: center;
  margin: 20px 0;
  font-size: 0.9em;
  color: #6b7280;
}

form input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  margin-bottom: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
}

form button {
  width: 100%;
}

.signup-link {
  margin-top: 10px;
  font-size: 0.9em;
}

.signup-link a {
  color: #007bff;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}

.terms {
  margin-top: 20px;
  font-size: 0.9em;
  color: #6b7280;
}

.terms a {
  color: #1d4ed8;
  text-decoration: none;
}

.terms a:hover {
  text-decoration: underline;
}

.footer {
  text-align: center;
  padding: 10px;
  background-color: #f1f5f9;
  color: #6b7280;
  font-size: 0.8em;
}
</style>
