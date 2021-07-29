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
            Listado de Gastos {{ campoSelected ? campoSelected.nombre : "" }}
          </h2>
          <hr class="divider" />
        </div>
        <div class="col-lg-12 align-self-baseline">
          <b-button class="btn btn-success btn-xl" v-b-modal.addVentasModal
            >Agregar Gasto</b-button
          >
          <br />
          <br />
          <div class="table-responsive tableFixHead">
            <table class="table table-borderless table-hover tableStyle">
              <thead>
                <tr>
                  <th scope="col" class="tableHeaderGreen">ID</th>
                  <th scope="col" class="tableHeaderGreen">Proveedor</th>
                  <th scope="col" class="tableHeaderGreen">Descripción</th>
                  <th scope="col" class="tableHeaderGreen">Cantidad</th>
                  <th scope="col" class="tableHeaderGreen">Unidad</th>
                  <th scope="col" class="tableHeaderGreen">P/U</th>
                  <th scope="col" class="tableHeaderGreen">Total</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 100px;">Fecha</th>
                  <th scope="col" class="tableHeaderGreen">Documento</th>
                  <th scope="col" class="tableHeaderGreen">Tipo</th>
                  <th scope="col" class="tableHeaderGreen">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(venta, index) in gastosGenerales"
                  v-bind:key="index"
                >
                  <td class="tableBodyGreen">
                    {{ venta.id }}
                  </td>
                  <td class="tableBodyGreen">
                    {{ venta.proveedore.nombre }}
                  </td>
                  <td>
                    {{ venta.descripcion }}
                  </td>
                  <td>
                    {{ venta.cantidad }}
                  </td>
                  <td>
                    {{ venta.unidad }}
                  </td>
                  <td>
                    {{ venta.precio.toLocaleString() }}
                  </td>
                  <td>
                    {{ venta.total.toLocaleString() }}
                  </td>
                  <td>
                    {{ venta.fecha ? venta.fecha.split("T")[0] : "" }}
                  </td>
                  <td>
                    {{ venta.documento }}
                  </td>
                  <td>
                    {{ venta.tipo_documento }}
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
                  <td COLSPAN="6">Total:</td>
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
        Agregar Gasto
      </div>
      <form ref="ventasForm" id="ventasForm" @submit="handleAddVenta">
        <!-- Proveedores -->
        <b-form-group
          label="Proveedor"
          label-for="proveedores-input"
          invalid-feedback="El proveedor es requerido"
          :state="proveedoresState"
        >
          <select
            class="form-control"
            v-model="proveedoresSelected"
            :state="proveedoresState"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option
              v-for="(proveedor, index) in proveedores"
              v-bind:key="index"
              :value="proveedor.id"
            >
              {{ proveedor.nombre }}
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
        <!-- Cantidad -->
        <b-form-group
          label="Cantidad"
          label-for="cantidad-input"
          invalid-feedback="La cantidad es requerida"
          :state="cantidadState"
        >
          <b-form-input
            id="cantidad-input"
            type="number"
            placeholder="Ingrese la cantidad"
            v-model="cantidadSelected"
            :state="cantidadState"
            min="0"
          ></b-form-input>
        </b-form-group>
        <br />
        <!-- Unidad -->
        <b-form-group
          label="Unidad"
          label-for="unidad-input"
          invalid-feedback="La unidad es requerida"
          :state="unidadState"
        >
          <select
            class="form-control"
            v-model="unidadSelected"
            :state="unidadState"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option
              v-for="(unidadesGasto, index) in unidadesGastos"
              v-bind:key="index"
              :value="unidadesGasto.id"
            >
              {{ unidadesGasto.nombre }}
            </option>
          </select>
        </b-form-group>
        <br />
        <!-- Precio unitario -->
        <b-form-group
          label="Precio Unitario"
          label-for="precioUnitario-input"
          invalid-feedback="El precio es requerido"
          :state="precioState"
        >
          <b-form-input
            id="precioUnitario-input"
            type="text"
            placeholder="Ingrese el precio unitario"
            :state="precioState"
            :formatter="precioFormat"
          ></b-form-input>
        </b-form-group>
        <br />
        <!-- total -->
        <b-form-group label="Total" label-for="total-input" :state="totalState">
          <b-form-input
            id="total-input"
            type="text"
            v-model="totalSelected"
            :state="totalState"
            :disabled="true"
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
        <!-- Tipo documento -->
        <b-form-group
          label="Tipo Documento"
          label-for="tipoDocumento-input"
          invalid-feedback="El tipo de documento es requerido"
          :state="tipoDocumentoState"
        >
          <!-- <b-form-input
            id="tipoDocumento-input"
            type="text"
            placeholder="Ingrese el tipo de documento"
            v-model="tipoDocumentoSelected"
            :state="tipoDocumentoState"
          ></b-form-input> -->
          <select
            class="form-control"
            v-model="tipoDocumentoSelected"
            :state="tipoDocumentoState"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option value="Factura">Factura</option>
            <option value="Boleta">Boleta</option>
          </select>
        </b-form-group>
        <br />
        <!-- documento -->
        <b-form-group
          label="Numero Documento"
          label-for="documento-input"
          invalid-feedback="El numero de documento es requerido"
          :state="documentoState"
        >
          <b-form-input
            id="documento-input"
            type="number"
            placeholder="Ingrese el número de documento"
            v-model="documentoSelected"
            :state="documentoState"
            min="0"
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
  GASTOS_GET_GASTOS,
  GASTOS_GET_PROVEEDORES,
  GASTOS_GET_UNIDADES
} from "./constants/querys";
import { GASTO_CREATE_GASTO, GASTO_DELETE_GASTO } from "./constants/mutations";
import moment from "moment";

export default {
  name: "GastosGenerales",
  props: ["user", "campoSelected"],
  data() {
    return {
      error: "",
      proveedores: [],
      proveedoresSelected: "",
      proveedoresState: null,
      descripcionSelected: "",
      descripcionState: null,
      cantidadSelected: "",
      cantidadState: null,
      precioSelected: "",
      precioState: null,
      totalState: null,
      unidadSelected: "",
      unidadState: null,
      startDateSelected: "",
      startDateState: null,
      documentoSelected: "",
      documentoState: null,
      tipoDocumentoSelected: "",
      tipoDocumentoState: null,
      gastosGenerales: [],
      dismissCountDown: 0,
      typeNotification: "",
      messageNotification: "",
      unidadesGastos: []
    };
  },
  apollo: {
    gastosGenerales: {
      query: GASTOS_GET_GASTOS,
      variables() {
        return {
          campo: this.campoSelected ? this.campoSelected.id : null
        };
      },
      fetchPolicy: "no-cache"
    },
    proveedores: {
      query: GASTOS_GET_PROVEEDORES
    },
    unidadesGastos: {
      query: GASTOS_GET_UNIDADES
    }
  },
  methods: {
    async handleAddVenta(e) {
      e.preventDefault();
      let validate = true;
      const proveedor = this.proveedoresSelected;
      const descripcion = this.descripcionSelected;
      const cantidad = this.cantidadSelected;
      const precio = this.precioSelected;
      const unidad = this.unidadSelected;
      const startDate = this.startDateSelected;
      const documento = this.documentoSelected;
      const tipoDocumento = this.tipoDocumentoSelected;
      const total = precio * cantidad;

      if (!proveedor) {
        validate = false;
        this.proveedoresState = false;
      }
      if (!descripcion) {
        validate = false;
        this.descripcionState = false;
      }
      if (!cantidad) {
        validate = false;
        this.cantidadState = false;
      }
      if (!precio) {
        validate = false;
        this.precioState = false;
      }
      if (!unidad) {
        validate = false;
        this.unidadState = false;
      }
      if (!startDate) {
        validate = false;
        this.startDateState = false;
      }
      if (!documento) {
        validate = false;
        this.documentoState = false;
      }
      if (!tipoDocumento) {
        validate = false;
        this.tipoDocumentoState = false;
      }

      if (validate) {
        if (confirm("¿Desea agregar el gasto?")) {
          await this.$apollo
            .mutate({
              mutation: GASTO_CREATE_GASTO,
              variables: {
                proveedor: proveedor,
                descripcion: descripcion,
                cantidad: Number(cantidad),
                precio: Number(precio),
                unidad: unidad,
                total: Number(total),
                startDate: moment(startDate),
                documento: documento,
                tipoDocumento: tipoDocumento,
                campo: this.campoSelected ? this.campoSelected.id : null
              }
            })
            .then(data => {
              this.gastosGenerales.unshift(
                data.data.createGastosGenerale.gastosGenerale
              );
              this.proveedoresState = null;
              this.descripcionState = null;
              this.cantidadState = null;
              this.precioState = null;
              this.unidadState = null;
              this.startDateState = null;
              this.documentoState = null;
              this.tipoDocumentoState = null;
              this.proveedoresSelected = "";
              this.descripcionSelected = "";
              this.cantidadSelected = "";
              this.precioSelected = "";
              this.unidadSelected = "";
              this.startDateSelected = "";
              this.documentoSelected = "";
              this.tipoDocumentoSelected = "";
              this.error = "";
              this.$root.$emit("bv::hide::modal", "addVentasModal");
              this.showAlert("success", 5, "Gasto creado exitosamente.");
            })
            .catch(() => {
              this.proveedoresState = null;
              this.descripcionState = null;
              this.cantidadState = null;
              this.precioState = null;
              this.unidadState = null;
              this.startDateState = null;
              this.documentoState = null;
              this.tipoDocumentoState = null;
              this.proveedoresSelected = "";
              this.descripcionSelected = "";
              this.cantidadSelected = "";
              this.precioSelected = "";
              this.unidadSelected = "";
              this.startDateSelected = "";
              this.documentoSelected = "";
              this.tipoDocumentoSelected = "";
              this.error = "";
              this.showAlert("danger", 5, "El gasto no pudo ser creado.");
            });
        }
      }
    },
    async handleDeleteVenta(venta) {
      if (confirm("¿Desea eliminar el gasto?")) {
        await this.$apollo
          .mutate({
            mutation: GASTO_DELETE_GASTO,
            variables: {
              id: venta.id
            }
          })
          .then(data => {
            this.gastosGenerales = this.gastosGenerales.filter(function(venta) {
              return (
                venta.id != data.data.deleteGastosGenerale.gastosGenerale.id
              );
            });
            this.showAlert("success", 5, "Gasto eliminado exitosamente.");
          })
          .catch(() => {
            this.showAlert("danger", 5, "El gasto no pudo ser eliminado.");
          });
      }
    },
    precioFormat(value) {
      this.precioSelected = Number(value.replace(/\D/g, ""));
      return value == "0" ? "" : this.precioSelected.toLocaleString();
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
    totalSelected() {
      return (this.cantidadSelected * this.precioSelected).toLocaleString();
    },
    getTotal() {
      let total = 0;

      if (this.gastosGenerales) {
        this.gastosGenerales.map(venta => {
          total = total + venta.total;
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
  width: 1224px;
}
th,
td {
  padding: 8px 16px;
}
th {
  background: #eee;
}
</style>
