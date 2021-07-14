<template>
  <div class="dashboard" v-if="user ? user.role.name === 'Admin' : false">
    <nav
      class="navbar navbar-expand-lg navbar-light fixed-top py-3"
      id="mainNav"
    >
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="#"
          >Bienbenido {{ user ? user.username : "" }}</a
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
            <li class="nav-item">
              <a class="nav-link" v-b-toggle.sidebar-right v-if="campoSelected"
                >Menú</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <b-sidebar id="sidebar-right" no-header right shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item href="#" @click="changeOption('index')"
                >Campo</b-nav-item
              >
              <b-nav-item href="#" @click="changeOption('activities')"
                >Actividades</b-nav-item
              >
              <b-nav-item href="#" @click="changeOption('arboles')"
                >Árboles</b-nav-item
              >
            </b-nav>
          </nav>
          <b-button variant="success" block @click="hide">Cerrar</b-button>
        </div>
      </template>
    </b-sidebar>
    <header class="masthead" v-if="menuOption == 'index'">
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
        >
          <div class="col-lg-8 align-self-end">
            <h2 class="text-white font-weight-bold">
              Campo seleccionado:
              {{ campoSelected ? campoSelected.nombre : "" }}
            </h2>
            <hr class="divider" />
          </div>
          <div class="col-lg-8 align-self-baseline">
            <b-row>
              <b-col v-for="(campo, index) in campos" v-bind:key="index">
                <b-button
                  class="btn btn-success btn-xl"
                  @click="handleSetCampo(campo)"
                  >{{ campo.nombre }}</b-button
                >
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </header>
    <header class="masthead" v-if="menuOption == 'activities'">
      <Activities :user="user" :campoSelected="campoSelected" />
    </header>
    <header class="masthead" v-if="menuOption == 'arboles'">
      <Arboles :user="user" :campoSelected="campoSelected" />
    </header>
  </div>
  <div class="dashboard" v-else>
    <nav
      class="navbar navbar-expand-lg navbar-light fixed-top py-3"
      id="mainNav"
    >
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="#"
          >Bienbenido {{ user ? user.username : "" }}</a
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
            <li class="nav-item">
              <a class="nav-link" v-b-toggle.sidebar-right v-if="campoSelected"
                >Menú</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <b-sidebar id="sidebar-right" no-header right shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item href="#" @click="changeOption('activities')"
                >Actividades</b-nav-item
              >
            </b-nav>
          </nav>
          <b-button variant="success" block @click="hide">Cerrar</b-button>
        </div>
      </template>
    </b-sidebar>
    <header class="masthead" v-if="menuOption == 'index'">
      <ActivitiesClient
        :user="user"
        :campoSelected="user ? user.campo : null"
      />
    </header>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { mapMutations } from "vuex";
import { DASHBOARD_GET_USER, DASHBOARD_GET_CAMPOS } from "./constants/querys";
import Activities from "../components/dashboard/Activities.vue";
import ActivitiesClient from "../components/dashboard/ActivitiesClient.vue";
import Arboles from "../components/dashboard/Arboles.vue";

export default {
  name: "Dashboard",
  components: { Activities, ActivitiesClient, Arboles },
  data() {
    return {
      user: "",
      menuOption: "index",
      campos: [],
      campoSelected: ""
    };
  },
  apollo: {
    user: {
      query: DASHBOARD_GET_USER,
      variables() {
        return {
          id: Cookies.get("user") ? JSON.parse(Cookies.get("user")).id : null
        };
      }
    },
    campos: {
      query: DASHBOARD_GET_CAMPOS
    }
  },
  methods: {
    ...mapMutations({
      setUser: "setUser",
      logout: "logout"
    }),
    handleLogout() {
      this.logout();
      this.$router.go();
    },
    changeOption(option) {
      this.menuOption = option;
    },
    handleSetCampo(campo) {
      this.campoSelected = campo;
      this.menuOption = "activities";
    }
  }
};
</script>

<style>
@import "../assets/granja/css/styles.css";

.errorMessage {
  color: red;
  text-align: center;
}
</style>
