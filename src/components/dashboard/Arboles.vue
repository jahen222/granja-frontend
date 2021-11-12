<template>
  <div class="dashboardActivities">
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
          <b-alert
            :show="dismissCountDown"
            fade
            :variant="typeNotification"
            @dismissed="dismissCountDown = 0"
            @dismiss-count-down="countDownChanged"
          >
            <p>
              {{ messageNotification }}
            </p>
            <b-progress
              :variant="typeNotification"
              max="5"
              :value="dismissCountDown"
              height="4px"
            ></b-progress>
          </b-alert>
          <h2 class="text-white font-weight-bold">
            Cuidado Árboles {{ campoSelected ? campoSelected.nombre : "" }}
          </h2>
          <hr class="divider" />
        </div>
        <div class="col-lg-12 align-self-baseline">
          <b-button class="btn btn-success btn-xl" v-b-modal.addCuidadoModal
            >Agregar Cuidado Árbol</b-button
          >
          <br />
          <br />
          <div class="table-responsive tableFixHead">
            <table class="table table-borderless table-hover tableStyle">
              <thead>
                <tr>
                  <th scope="col" class="tableHeaderGreen">ID</th>
                  <th scope="col" class="tableHeaderGreen">Fecha</th>
                  <th scope="col" class="tableHeaderGreen">Actividad</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">
                    Tipo Árbol
                  </th>
                  <th scope="col" class="tableHeaderGreen">Zona</th>
                  <th scope="col" class="tableHeaderGreen">Camellón</th>
                  <th scope="col" class="tableHeaderGreen">Árbol</th>
                  <th scope="col" class="tableHeaderGreen">Aplicación</th>
                  <th scope="col" class="tableHeaderGreen">Descripción</th>
                  <th scope="col" class="tableHeaderGreen">Estado</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 150px">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(cuidadoArbol, index) in cuidadoArboles"
                  v-bind:key="index"
                >
                  <td class="tableBodyGreen">
                    {{ cuidadoArbol.id }}
                  </td>
                  <td class="tableBodyGreen">
                    {{ getMoment(cuidadoArbol.created_at).format("D/MMM/YY") }}
                  </td>
                  <td class="tableBodyGreen">
                    {{ cuidadoArbol.actividad }}
                  </td>
                  <td>Nogal</td>
                  <td>
                    {{ cuidadoArbol.zona.numero }}
                  </td>
                  <td>
                    {{
                      cuidadoArbol.camellone
                        ? cuidadoArbol.camellone.numero
                        : "Todos"
                    }}
                  </td>
                  <td>
                    {{
                      cuidadoArbol.arbole ? cuidadoArbol.arbole.numero : "Todos"
                    }}
                  </td>
                  <td>
                    {{ cuidadoArbol.actividad }}
                  </td>
                  <td>
                    {{ cuidadoArbol.descripcion }}
                  </td>
                  <td>
                    {{ cuidadoArbol.estado }}
                  </td>
                  <td>
                    <b-button
                      type="button"
                      variant="success"
                      size="sm"
                      class="float-right"
                      @click="handleUpdateState(cuidadoArbol)"
                      style="margin-right: 10px"
                      :disabled="
                        cuidadoArbol.estado == 'Pendiente' ? false : true
                      "
                    >
                      Finalizar
                    </b-button>
                    <b-button
                      v-if="cuidadoArbol.estado != 'Finalizado'"
                      type="button"
                      variant="danger"
                      size="sm"
                      class="float-right"
                      @click="handleDeleteCuidado(cuidadoArbol)"
                    >
                      <font-awesome-icon icon="trash" style="color: white" />
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="addCuidadoModal">
      <div slot="modal-title">
        <font-awesome-icon icon="bookmark" style="color: green" />
        Agregar Cuidado Árbol
      </div>
      <form ref="cuidadoForm" id="cuidadoForm" @submit="handleAddCuidado">
        <!-- zona -->
        <b-form-group
          label="Zona"
          label-for="zona-input"
          invalid-feedback="La zona es requerida"
          :state="zonaState"
        >
          <select
            class="form-control"
            v-model="zonaSelected"
            :state="zonaState"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option
              v-for="(zona, index) in zonas"
              v-bind:key="index"
              :value="zona.id"
            >
              {{ zona.numero }}
            </option>
          </select>
        </b-form-group>
        <br />
        <!-- camellon -->
        <b-form-group
          label="Camellón"
          label-for="camellon-input"
          invalid-feedback="El camellón es requerido"
          :state="camellonState"
        >
          <select
            class="form-control"
            v-model="camellonSelected"
            :state="camellonState"
            :disabled="camellones ? false : true"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option
              v-for="(camellon, index) in camellones"
              v-bind:key="index"
              :value="camellon.id"
            >
              {{ camellon.numero }}
            </option>
          </select>
        </b-form-group>
        <br />
        <!-- arbol -->
        <b-form-group
          label="Árbol"
          label-for="arbol-input"
          invalid-feedback="El árbol es requerido"
          :state="arbolState"
        >
          <select
            class="form-control"
            v-model="arbolSelected"
            :state="arbolState"
            :disabled="arboles ? false : true"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option
              v-for="(arbol, index) in arboles"
              v-bind:key="index"
              :value="arbol.id"
            >
              {{ arbol.numero }}
            </option>
          </select>
        </b-form-group>
        <br />
        <!-- acticvidad -->
        <b-form-group
          label="Actividad"
          label-for="actividad-input"
          invalid-feedback="La actividad es requerida"
          :state="activityState"
        >
          <select
            class="form-control"
            v-model="activitySelected"
            :state="activityState"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option
              v-for="(actividad, index) in actividades"
              v-bind:key="index"
              :value="actividad.nombre"
            >
              {{ actividad.nombre }}
            </option>
          </select>
        </b-form-group>
        <br />
        <!-- descripcion -->
        <b-form-group
          label="Descripción"
          label-for="descripcion-input"
          invalid-feedback="La descripción es requerida"
          :state="descripcionState"
        >
          <b-form-input
            id="descripcion-input"
            type="text"
            placeholder="Ingrese una descripción"
            v-model="descripcionSelected"
            :state="descripcionState"
          ></b-form-input>
        </b-form-group>
        <br />
        <p v-if="error" class="errorMessage">{{ error }}</p>
        <br v-if="error" />
      </form>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            type="submit"
            form="cuidadoForm"
            variant="success"
            size="sm"
            class="float-right"
          >
            Agregar
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {
  ACTIVITIES_GET_ACTIVIDADES,
  ARBOLES_GET_CUIDADO,
  ARBOLES_GET_ZONAS,
  ARBOLES_GET_CAMELLONES,
  ARBOLES_GET_ARBOLS
} from "./constants/querys";
import {
  CUIDADO_CREATE_ACTIVIDAD,
  CUIDADO_UPDATE_ACTIVIDAD,
  CUIDADO_DELETE_ACTIVIDAD,
  CUIDADO_CREATE_ACTIVIDAD_CAMELLONE,
  CUIDADO_CREATE_ACTIVIDAD_ZONA
} from "./constants/mutations";
import moment from "moment";

export default {
  name: "Arboles",
  props: ["user", "campoSelected"],
  data() {
    return {
      error: "",
      actividades: [],
      activitySelected: "",
      activityState: null,
      zonas: [],
      zonaSelected: "",
      zonaState: null,
      camellonSelected: "",
      camellonState: null,
      arbolSelected: "",
      arbolState: null,
      descripcionSelected: "",
      descripcionState: null,
      dismissCountDown: 0,
      typeNotification: "",
      messageNotification: ""
    };
  },
  apollo: {
    actividades: {
      query: ACTIVITIES_GET_ACTIVIDADES
    },
    cuidadoArboles: {
      query: ARBOLES_GET_CUIDADO,
      variables() {
        return {
          campo: this.campoSelected ? this.campoSelected.id : null
        };
      },
      fetchPolicy: "no-cache"
    },
    zonas: {
      query: ARBOLES_GET_ZONAS,
      variables() {
        return {
          campo: this.campoSelected ? this.campoSelected.id : null
        };
      }
    }
  },
  methods: {
    async handleAddCuidado(e) {
      e.preventDefault();
      let validate = true;
      const activity = this.activitySelected;
      const zonaSelected = this.zonaSelected;
      const camellonSelected = this.camellonSelected;
      const arbolSelected = this.arbolSelected;
      const descripcionSelected = this.descripcionSelected;

      if (!zonaSelected) {
        validate = false;
        this.zonaState = false;
      }
      if (!descripcionSelected) {
        validate = false;
        this.descripcionState = false;
      }
      if (!activity) {
        validate = false;
        this.activityState = false;
      }

      if (validate) {
        if (confirm("¿Desea agregar la nueva actividad?")) {
          if (!arbolSelected && !camellonSelected) {
            await this.$apollo
              .mutate({
                mutation: CUIDADO_CREATE_ACTIVIDAD_ZONA,
                variables: {
                  actividad: activity,
                  zona: zonaSelected,
                  descripcion: descripcionSelected,
                  estado: "Pendiente"
                }
              })
              .then(data => {
                this.cuidadoArboles.unshift(
                  data.data.createCuidadoArbole.cuidadoArbole
                );
                this.zonaState = null;
                this.camellonState = null;
                this.arbolState = null;
                this.descripcionState = null;
                this.activityState = null;
                this.activitySelected = "";
                this.zonaSelected = "";
                this.camellonSelected = "";
                this.arbolSelected = "";
                this.descripcionSelected = "";
                this.error = "";
                this.$root.$emit("bv::hide::modal", "addCuidadoModal");
                this.showAlert(
                  "success",
                  5,
                  "Cuidado de arbol creado exitosamente."
                );
              })
              .catch(() => {
                this.zonaState = null;
                this.camellonState = null;
                this.arbolState = null;
                this.descripcionState = null;
                this.activityState = null;
                this.activitySelected = "";
                this.zonaSelected = "";
                this.camellonSelected = "";
                this.arbolSelected = "";
                this.descripcionSelected = "";
                this.error = "";
                this.showAlert(
                  "danger",
                  5,
                  "El cuidado de árbol no pudo ser creado."
                );
              });
          } else if (!arbolSelected && camellonSelected) {
            console.log("aqui perro");
            await this.$apollo
              .mutate({
                mutation: CUIDADO_CREATE_ACTIVIDAD_CAMELLONE,
                variables: {
                  actividad: activity,
                  zona: zonaSelected,
                  camellone: camellonSelected,
                  descripcion: descripcionSelected,
                  estado: "Pendiente"
                }
              })
              .then(data => {
                this.cuidadoArboles.unshift(
                  data.data.createCuidadoArbole.cuidadoArbole
                );
                this.zonaState = null;
                this.camellonState = null;
                this.arbolState = null;
                this.descripcionState = null;
                this.activityState = null;
                this.activitySelected = "";
                this.zonaSelected = "";
                this.camellonSelected = "";
                this.arbolSelected = "";
                this.descripcionSelected = "";
                this.error = "";
                this.$root.$emit("bv::hide::modal", "addCuidadoModal");
                this.showAlert(
                  "success",
                  5,
                  "Cuidado de arbol creado exitosamente."
                );
              })
              .catch(() => {
                this.zonaState = null;
                this.camellonState = null;
                this.arbolState = null;
                this.descripcionState = null;
                this.activityState = null;
                this.activitySelected = "";
                this.zonaSelected = "";
                this.camellonSelected = "";
                this.arbolSelected = "";
                this.descripcionSelected = "";
                this.error = "";
                this.showAlert(
                  "danger",
                  5,
                  "El cuidado de árbol no pudo ser creado."
                );
              });
          } else if (arbolSelected && camellonSelected) {
            await this.$apollo
              .mutate({
                mutation: CUIDADO_CREATE_ACTIVIDAD,
                variables: {
                  actividad: activity,
                  zona: zonaSelected,
                  camellone: camellonSelected,
                  arbol: arbolSelected,
                  descripcion: descripcionSelected,
                  estado: "Pendiente"
                }
              })
              .then(data => {
                this.cuidadoArboles.unshift(
                  data.data.createCuidadoArbole.cuidadoArbole
                );
                this.zonaState = null;
                this.camellonState = null;
                this.arbolState = null;
                this.descripcionState = null;
                this.activityState = null;
                this.activitySelected = "";
                this.zonaSelected = "";
                this.camellonSelected = "";
                this.arbolSelected = "";
                this.descripcionSelected = "";
                this.error = "";
                this.$root.$emit("bv::hide::modal", "addCuidadoModal");
                this.showAlert(
                  "success",
                  5,
                  "Cuidado de arbol creado exitosamente."
                );
              })
              .catch(() => {
                this.zonaState = null;
                this.camellonState = null;
                this.arbolState = null;
                this.descripcionState = null;
                this.activityState = null;
                this.activitySelected = "";
                this.zonaSelected = "";
                this.camellonSelected = "";
                this.arbolSelected = "";
                this.descripcionSelected = "";
                this.error = "";
                this.showAlert(
                  "danger",
                  5,
                  "El cuidado de árbol no pudo ser creado."
                );
              });
          }
        }
      }
    },
    async handleUpdateState(cuidadoArbol) {
      if (confirm("¿Desea finalizar la actividad?")) {
        await this.$apollo
          .mutate({
            mutation: CUIDADO_UPDATE_ACTIVIDAD,
            variables: {
              id: cuidadoArbol.id,
              estado: "Finalizado"
            }
          })
          .then(data => {
            this.cuidadoArboles = this.cuidadoArboles.map(function(
              cuidadoArbol
            ) {
              if (
                cuidadoArbol.id ===
                data.data.updateCuidadoArbole.cuidadoArbole.id
              ) {
                return data.data.updateCuidadoArbole.cuidadoArbole;
              } else return cuidadoArbol;
            });

            this.showAlert(
              "success",
              5,
              "Cuidado de árbol finalizo exitosamente."
            );
          })
          .catch(() => {
            this.showAlert(
              "danger",
              5,
              "El cuidado de árbol no pudo ser finalizado."
            );
          });
      }
    },
    async handleDeleteCuidado(cuidadoArbol) {
      if (confirm("¿Desea eliminar la actividad?")) {
        await this.$apollo
          .mutate({
            mutation: CUIDADO_DELETE_ACTIVIDAD,
            variables: {
              id: cuidadoArbol.id
            }
          })
          .then(data => {
            this.cuidadoArboles = this.cuidadoArboles.filter(function(
              cuidadoArbol
            ) {
              return (
                cuidadoArbol.id !==
                data.data.deleteCuidadoArbole.cuidadoArbole.id
              );
            });
            this.showAlert(
              "success",
              5,
              "Cuidado de árbol eliminado exitosamente."
            );
          })
          .catch(() => {
            this.showAlert(
              "danger",
              5,
              "El cuidado de árbol no pudo ser eliminado."
            );
          });
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert(type, time, message) {
      this.typeNotification = type;
      this.dismissCountDown = time;
      this.messageNotification = message;
    },
    getMoment(date) {
      return moment(date);
    }
  },
  asyncComputed: {
    async camellones() {
      let camellones = [];

      if (this.zonaSelected) {
        await this.$apollo
          .query({
            query: ARBOLES_GET_CAMELLONES,
            variables: {
              zona: this.zonaSelected
            }
          })
          .then(data => {
            camellones = data.data.camellones;
          })
          .catch(({ graphQLErrors }) => {
            graphQLErrors.map(({ extensions }) =>
              console.log(extensions.exception)
            );
          });
      }

      return camellones;
    },
    async arboles() {
      let arboles = [];

      if (this.camellonSelected) {
        await this.$apollo
          .query({
            query: ARBOLES_GET_ARBOLS,
            variables: {
              camellone: this.camellonSelected
            }
          })
          .then(data => {
            arboles = data.data.arbols;
          })
          .catch(({ graphQLErrors }) => {
            graphQLErrors.map(({ extensions }) =>
              console.log(extensions.exception)
            );
          });
      }

      return arboles;
    }
  }
};
</script>

<style scoped>
.tableStyle {
  background-color: white;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
.tableHeaderGreen {
  background-color: #198754;
  color: white;
}
.tableBodyGreen {
  background-color: rgb(216, 252, 216);
}
.table-responsive {
  width: 100%;
  overflow: auto;
  max-height: 350px;
}
.floatRight {
  text-align: right;
}
.floatCenter {
  text-align: center;
}
.tableFixHead {
  overflow: auto;
  height: 80%;
}
.tableFixHead thead th {
  position: sticky;
  top: 0;
  z-index: 1;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 8px 16px;
}
th {
  background: #eee;
}
</style>
