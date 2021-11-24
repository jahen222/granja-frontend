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
            Reportes {{ campoSelected ? campoSelected.nombre : "" }}
          </h2>
          <hr class="divider" />
        </div>
        <div class="col-lg-12 align-self-baseline">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  @click="handleMinusYear"
                  style="color: black"
                  >Previo</a
                >
              </li>
              <li class="page-item active">
                <a
                  class="page-link"
                  href="#"
                  style="background-color: #198754; border-color: #198754"
                  >{{ thisYear }} - {{ thisYear + 1 }}</a
                >
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  @click="handlePlusYear"
                  style="color: black"
                  >Siguiente</a
                >
              </li>
            </ul>
          </nav>
          <br />
          <div class="table-responsive tableFixHead">
            <form ref="reportesForm" id="reportesForm">
              <table class="table table-borderless table-hover tableStyle">
                <thead>
                  <tr>
                    <th scope="col" class="tableHeaderGreen"></th>
                    <th scope="col" class="tableHeaderGreen"></th>
                    <th scope="col" class="tableHeaderGreen"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="tableBodyGreen">Cantidad Proyectada</td>
                    <td class="tableBodyGreen">Valor Proyectado</td>
                    <td class="tableBodyGreen">Total Proyectada</td>
                  </tr>
                  <tr>
                    <td>
                      <b-form-group
                        invalid-feedback="La cantidad es requerida"
                        :state="cantProyState"
                      >
                        <b-form-input
                          id="cantpro-input"
                          type="text"
                          placeholder="Ingrese la cantidad"
                          :state="cantProyState"
                          :formatter="cantProyFormat"
                          min="0"
                        ></b-form-input>
                      </b-form-group>
                    </td>
                    <td>
                      <b-form-group
                        invalid-feedback="El valor es requerido"
                        :state="valProyState"
                      >
                        <b-form-input
                          id="valorpro-input"
                          type="text"
                          placeholder="Ingrese el valor"
                          :state="valProyState"
                          :formatter="valProyFormat"
                          min="0"
                        ></b-form-input>
                      </b-form-group>
                    </td>

                    <td>
                      <b-form-group>
                        <b-form-input
                          id="totalpro-input"
                          type="text"
                          v-model="totalProyFormat"
                          min="0"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </td>
                  </tr>
                  <tr>
                    <td class="tableBodyGreen"></td>
                    <td class="tableBodyGreen">Venta Proyectada</td>
                    <td class="tableBodyGreen"></td>
                  </tr>
                  <tr>
                    <td COLSPAN="2">Compras</td>
                    <td>{{ totalCompras }}</td>
                  </tr>
                  <tr>
                    <td COLSPAN="2">RRHH</td>
                    <td>{{ totalHonorarios }}</td>
                  </tr>
                  <tr>
                    <td COLSPAN="2">Gastos Generales</td>
                    <td>{{ totalGastos }}</td>
                  </tr>
                  <tr>
                    <td COLSPAN="2">Total Ejercicio</td>
                    <td>
                      {{ totalEjercicio }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  REPORTES_GET_COMPRAS,
  REPORTES_GET_HONORARIOS,
  REPORTES_GET_GASTOS
} from "./constants/querys";
import moment from "moment";

export default {
  name: "Reportes",
  props: ["user", "campoSelected"],
  data() {
    return {
      items: [],
      error: "",
      thisYear: new Date().getFullYear(),
      moment: moment(),
      dismissCountDown: 0,
      typeNotification: "",
      messageNotification: "",
      cantProySelected: 0,
      cantProyState: null,
      valProySelected: 0,
      valProyState: null,
      totalProySelected: 0,
      compras: [],
      honorarios: [],
      gastosGenerales: []
    };
  },
  apollo: {
    compras: {
      query: REPORTES_GET_COMPRAS,
      variables() {
        return {
          campo: this.campoSelected ? this.campoSelected.id : null,
          startDate: this.thisYear + "-04-01",
          endDate: this.thisYear + 1 + "-03-31"
        };
      },
      fetchPolicy: "no-cache"
    },
    honorarios: {
      query: REPORTES_GET_HONORARIOS,
      variables() {
        return {
          campo: this.campoSelected ? this.campoSelected.id : null,
          startDate: this.thisYear + "-04-01",
          endDate: this.thisYear + 1 + "-03-31"
        };
      },
      fetchPolicy: "no-cache"
    },
    gastosGenerales: {
      query: REPORTES_GET_GASTOS,
      variables() {
        return {
          campo: this.campoSelected ? this.campoSelected.id : null,
          startDate: this.thisYear + "-04-01",
          endDate: this.thisYear + 1 + "-03-31"
        };
      },
      fetchPolicy: "no-cache"
    }
  },
  methods: {
    handleMinusYear(e) {
      e.preventDefault;
      this.thisYear = this.thisYear - 1;
    },
    handlePlusYear(e) {
      e.preventDefault;
      this.thisYear = this.thisYear + 1;
    },
    getMonth(date) {
      return new Date(date).getMonth();
    },
    getDate(date) {
      return new Date(date).getDate();
    },
    getMoment(date) {
      return moment(date);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert(type, time, message) {
      this.typeNotification = type;
      this.dismissCountDown = time;
      this.messageNotification = message;
    },
    cantProyFormat(value) {
      this.cantProySelected = Number(value.replace(/\D/g, ""));
      return value == "0" ? "" : this.cantProySelected.toLocaleString("de-DE");
    },
    valProyFormat(value) {
      this.valProySelected = Number(value.replace(/\D/g, ""));
      return value == "0" ? "" : this.valProySelected.toLocaleString("de-DE");
    }
  },
  computed: {
    totalProyFormat() {
      var val = 0;
      if (this.cantProySelected && this.valProySelected) {
        val = (this.cantProySelected * this.valProySelected).toLocaleString(
          "de-DE"
        );
      }
      return val;
    },
    totalCompras() {
      var val = 0;
      this.compras.map(compra => {
        if (compra.total && compra.total > 0) {
          val = val + compra.total;
        }
      });

      return val.toLocaleString("de-DE");
    },
    totalHonorarios() {
      var val = 0;

      this.honorarios.map(compra => {
        if (compra.monto && compra.monto > 0) {
          val = val + compra.monto;
        }
      });

      return val.toLocaleString("de-DE");
    },
    totalGastos() {
      var val = 0;

      this.gastosGenerales.map(compra => {
        if (compra.total && compra.total > 0) {
          val = val + compra.total;
        }
      });

      return val.toLocaleString("de-DE");
    },
    totalEjercicio() {
      var val = 0;
      var result = 0;

      this.gastosGenerales.map(compra => {
        if (compra.total && compra.total > 0) {
          val = val + compra.total;
        }
      });
      this.compras.map(compra => {
        if (compra.total && compra.total > 0) {
          val = val + compra.total;
        }
      });
      this.honorarios.map(compra => {
        if (compra.monto && compra.monto > 0) {
          val = val + compra.monto;
        }
      });

      if (this.cantProySelected && this.valProySelected) {
        result = this.cantProySelected * this.valProySelected - val;
      }

      return result.toLocaleString("de-DE");
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
  table-layout: fixed;
  width: 100%;
}
th,
td {
  padding: 8px 16px;
}
th {
  background: #eee;
}
.blakita {
  font-weight: bold;
}
</style>
