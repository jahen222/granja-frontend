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
            Listado de Honorarios
            {{ campoSelected ? campoSelected.nombre : "" }}
          </h2>
          <hr class="divider" />
        </div>
        <div class="col-lg-12 align-self-baseline">
          <b-button class="btn btn-success btn-xl" v-b-modal.addVentasModal
            >Agregar Honorario</b-button
          >
          <br />
          <br />
          <div class="table-responsive tableFixHead">
            <table class="table table-borderless table-hover tableStyle">
              <thead>
                <tr>
                  <th scope="col" class="tableHeaderGreen">ID</th>
                  <th scope="col" class="tableHeaderGreen">Profesional</th>
                  <th scope="col" class="tableHeaderGreen">Descripción</th>
                  <th scope="col" class="tableHeaderGreen">Boleta</th>
                  <th scope="col" class="tableHeaderGreen">Monto</th>
                  <th scope="col" class="tableHeaderGreen">Fecha</th>
                  <th scope="col" class="tableHeaderGreen">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(venta, index) in honorarios" v-bind:key="index">
                  <td class="tableBodyGreen">
                    {{ venta.id }}
                  </td>
                  <td class="tableBodyGreen">
                    {{ venta.profesionale.nombre }}
                  </td>
                  <td>
                    {{ venta.descripcion }}
                  </td>
                  <td>
                    {{ venta.boleta }}
                  </td>
                  <td>
                    {{ venta.monto.toLocaleString() }}
                  </td>
                  <td>
                    {{ venta.fecha ? venta.fecha.split("T")[0] : "" }}
                  </td>
                  <td>
                    <b-button
                      type="button"
                      variant="danger"
                      size="sm"
                      class="float-right"
                      @click="handleDeleteVenta(venta)"
                    >
                      <font-awesome-icon icon="trash" style="color: white" />
                    </b-button>
                  </td>
                </tr>
                <tr>
                  <td COLSPAN="4">Total:</td>
                  <td>{{ getTotal.toLocaleString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="addVentasModal">
      <div slot="modal-title">
        <font-awesome-icon icon="bookmark" style="color: green" />
        Agregar Honorarios
      </div>
      <form ref="ventasForm" id="ventasForm" @submit="handleAddVenta">
        <!-- Profesional -->
        <b-form-group
          label="Profesional"
          label-for="profesional-input"
          invalid-feedback="El profesional es requerido"
          :state="profesionalState"
        >
          <select
            class="form-control"
            v-model="profesionalSelected"
            :state="profesionalState"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option
              v-for="(profesional, index) in profesionales"
              v-bind:key="index"
              :value="profesional.id"
            >
              {{ profesional.nombre }}
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
        <!-- boleta -->
        <b-form-group
          label="Boleta"
          label-for="factura-input"
          invalid-feedback="El numero de boleta es requerido"
          :state="facturaState"
        >
          <b-form-input
            id="factura-input"
            type="number"
            placeholder="Ingrese el número de boleta"
            v-model="facturaSelected"
            :state="facturaState"
            min="0"
          ></b-form-input>
        </b-form-group>
        <br />
        <!-- monto -->
        <b-form-group
          label="Monto"
          label-for="monto-input"
          invalid-feedback="El monto es requerido"
          :state="montoState"
        >
          <b-form-input
            id="monto-input"
            type="text"
            placeholder="Ingrese el monto"
            :state="montoState"
            :formatter="montoFormat"
          ></b-form-input>
        </b-form-group>
        <br />
        <!-- fecha -->
        <b-form-group
          label="Fecha"
          label-for="start-input"
          invalid-feedback="La fecha es requerida"
          :state="startDateState"
        >
          <b-form-datepicker
            id="example1-datepicker"
            :state="startDateState"
            v-model="startDateSelected"
            class="mb-2"
          ></b-form-datepicker>
        </b-form-group>
        <br />
        <p v-if="error" class="errorMessage">{{ error }}</p>
        <br v-if="error" />
      </form>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            type="submit"
            form="ventasForm"
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
  HONORARIOS_GET_PROFESIONALES,
  HONORARIOS_GET_HONORARIOS
} from "./constants/querys";
import {
  HONORARIOS_CREATE_HONORARIOS,
  HONORARIOS_DELETE_HONORARIO
} from "./constants/mutations";
import moment from "moment";

export default {
  name: "Honorarios",
  props: ["user", "campoSelected"],
  data() {
    return {
      error: "",
      profesionales: [],
      profesionalSelected: "",
      profesionalState: null,
      montoSelected: "",
      montoState: null,
      descripcionSelected: "",
      descripcionState: null,
      facturaSelected: "",
      facturaState: null,
      startDateSelected: "",
      startDateState: null,
      honorarios: [],
      dismissCountDown: 0,
      typeNotification: "",
      messageNotification: ""
    };
  },
  apollo: {
    honorarios: {
      query: HONORARIOS_GET_HONORARIOS,
      variables() {
        return {
          campo: this.campoSelected ? this.campoSelected.id : null
        };
      },
      fetchPolicy: "no-cache"
    },
    profesionales: {
      query: HONORARIOS_GET_PROFESIONALES
    }
  },
  methods: {
    async handleAddVenta(e) {
      e.preventDefault();
      let validate = true;
      const profesional = this.profesionalSelected;
      const monto = this.montoSelected;
      const descripcion = this.descripcionSelected;
      const factura = this.facturaSelected;
      const startDate = this.startDateSelected;

      if (!profesional) {
        validate = false;
        this.profesionalSelected = false;
      }
      if (!monto) {
        validate = false;
        this.montoState = false;
      }
      if (!descripcion) {
        validate = false;
        this.descripcionState = false;
      }
      if (!startDate) {
        validate = false;
        this.startDateState = false;
      }
      if (!factura) {
        validate = false;
        this.facturaState = false;
      }

      if (validate) {
        if (confirm("¿Desea agregar el honorario?")) {
          await this.$apollo
            .mutate({
              mutation: HONORARIOS_CREATE_HONORARIOS,
              variables: {
                profesional: profesional,
                descripcion: descripcion,
                monto: Number(monto),
                startDate: moment(startDate),
                factura: factura,
                campo: this.campoSelected ? this.campoSelected.id : null
              }
            })
            .then(data => {
              this.honorarios.unshift(data.data.createHonorario.honorario);
              this.profesionalState = null;
              this.montoState = null;
              this.descripcionState = null;
              this.startDateState = null;
              this.facturaState = null;
              this.profesionalSelected = "";
              this.montoSelected = "";
              this.descripcionSelected = "";
              this.startDateSelected = "";
              this.facturaSelected = "";
              this.error = "";
              this.$root.$emit("bv::hide::modal", "addVentasModal");
              this.showAlert("success", 5, "Honorario creado exitosamente.");
            })
            .catch(() => {
              this.profesionalState = null;
              this.montoState = null;
              this.descripcionState = null;
              this.startDateState = null;
              this.facturaState = null;
              this.profesionalSelected = "";
              this.montoSelected = "";
              this.descripcionSelected = "";
              this.startDateSelected = "";
              this.facturaSelected = "";
              this.error = "";
              this.showAlert("danger", 5, "El honorario no pudo ser creado.");
            });
        }
      }
    },
    async handleDeleteVenta(venta) {
      if (confirm("¿Desea eliminar el honorario?")) {
        await this.$apollo
          .mutate({
            mutation: HONORARIOS_DELETE_HONORARIO,
            variables: {
              id: venta.id
            }
          })
          .then(data => {
            this.honorarios = this.honorarios.filter(function(venta) {
              return venta.id != data.data.deleteHonorario.honorario.id;
            });
            this.showAlert("success", 5, "honorario eliminado exitosamente.");
          })
          .catch(() => {
            this.showAlert("danger", 5, "El honorario no pudo ser eliminado.");
          });
      }
    },
    montoFormat(value) {
      this.montoSelected = Number(value.replace(/\D/g, ""));
      return value == "0" ? "" : this.montoSelected.toLocaleString();
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert(type, time, message) {
      this.typeNotification = type;
      this.dismissCountDown = time;
      this.messageNotification = message;
    }
  },
  computed: {
    getTotal() {
      let total = 0;

      if (this.honorarios) {
        this.honorarios.map(venta => {
          total = total + venta.monto;
        });
      }

      return total;
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
