<template>
  <div class="landing">
    <nav
      class="navbar navbar-expand-lg navbar-light fixed-top py-3"
      id="mainNav"
      v-if="me"
    >
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="#"
          >Bienbenido {{ me.username }}</a
        >
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto my-2 my-lg-0">
            <li class="nav-item">
              <a class="nav-link" @click="handleLogout">Salir</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <header class="masthead">
      <div class="container px-4 px-lg-5 h-100">
        <div
          class="
            row
            gx-4 gx-lg-5
            h-100
            align-items-center
            justify-content-center
            text-center
          "
          v-if="!me"
        >
          <div class="col-lg-8 align-self-end">
            <h2 class="text-white font-weight-bold">
              SISTEMA DE CONTROL AGRÍCOLA
            </h2>
            <hr class="divider" />
          </div>
          <div class="col-lg-8 align-self-baseline">
            <p class="text-white-75 mb-5">Iniciar sesión</p>
            <b-row>
              <b-col>
                <b-button class="btn btn-success btn-xl" v-b-modal.loginModal
                  >Login</b-button
                >
              </b-col>
            </b-row>
          </div>
        </div>
        <div
          class="
            row
            gx-4 gx-lg-5
            h-100
            align-items-center
            justify-content-center
            text-center
          "
          v-else
        >
          <div class="col-lg-8 align-self-end">
            <h2 class="text-white font-weight-bold">
              SISTEMA DE CONTROL AGRÍCOLA
            </h2>
            <hr class="divider" />
          </div>
          <div class="col-lg-8 align-self-baseline">
            <p class="text-white-75 mb-5">Ir al dashboard</p>
            <router-link class="btn btn-success btn-xl" :to="'dashboard'"
              >Entrar</router-link
            >
          </div>
        </div>
      </div>
    </header>
    <b-modal id="loginModal" title="Iniciar Sesión">
      <form ref="form">
        <b-form-group
          label="Email"
          label-for="email-input"
          invalid-feedback="El nombre es requerido"
          :state="emailState"
        >
          <b-form-input
            id="email-input"
            type="email"
            v-model="email"
            :state="emailState"
            required
          ></b-form-input>
        </b-form-group>
        <br />
        <b-form-group
          label="Contraseña"
          label-for="password-input"
          invalid-feedback="La contraseña es requerida"
          :state="passwordState"
        >
          <b-form-input
            id="password-input"
            type="password"
            v-model="password"
            :state="passwordState"
            required
          ></b-form-input>
        </b-form-group>
        <br />
        <p v-if="error" class="errorMessage">{{ error }}</p>
      </form>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="success"
            size="sm"
            class="float-right"
            @click="handleLogin"
          >
            Entrar
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { LANDING_LOGIN } from "./constants/mutations";
import { LANDING_GET_ME } from "./constants/querys";

export default {
  name: "Landing",
  data() {
    return {
      email: "",
      password: "",
      emailState: null,
      passwordState: null,
      error: "",
      me: ""
    };
  },
  apollo: {
    me: {
      query: LANDING_GET_ME
    }
  },
  methods: {
    ...mapMutations({
      setUser: "setUser",
      logout: "logout"
    }),
    handleLogin() {
      let validate = true;
      const { email, password } = this.$data;
      this.emailState = true;
      this.passwordState = true;

      if (!email) {
        this.emailState = false;
        validate = false;
      }
      if (!password) {
        this.passwordState = false;
        validate = false;
      }
      if (validate) {
        this.$apollo
          .mutate({
            mutation: LANDING_LOGIN,
            variables: {
              email,
              password
            }
          })
          .then(data => {
            this.setUser(data.data.login);
            this.$router.push("dashboard");
          })
          .catch(({ graphQLErrors }) => {
            graphQLErrors.map(({ extensions }) =>
              extensions.exception.data.message.map(({ messages }) =>
                messages.map(({ message }) => (this.error = message))
              )
            );
          });
      }
    },
    handleLogout() {
      this.logout();
      this.$router.go();
    }
  }
};
</script>

<style scoped>
@import "../assets/granja/css/styles.css";

.errorMessage {
  color: red;
  text-align: center;
}
</style>