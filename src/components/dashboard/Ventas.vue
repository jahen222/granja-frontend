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
            Listado de Ventas {{ campoSelected ? campoSelected.nombre : "" }}
          </h2>
          <hr class="divider" />
        </div>
        <div class="col-lg-12 align-self-baseline">
          <b-button class="btn btn-success btn-xl" v-b-modal.addVentasModal
            >Agregar Venta</b-button
          >
          <br />
          <br />
          <div class="table-responsive tableFixHead">
            <table class="table table-borderless table-hover tableStyle">
              <thead>
                <tr>
                  <th scope="col" class="tableHeaderGreen">ID</th>
                  <th scope="col" class="tableHeaderGreen">Fecha</th>
                  <th scope="col" class="tableHeaderGreen">Producto</th>
                  <th scope="col" class="tableHeaderGreen">Cliente</th>
                  <th scope="col" class="tableHeaderGreen">Calidad</th>
                  <th scope="col" class="tableHeaderGreen">Cantidad</th>
                  <th scope="col" class="tableHeaderGreen">Precio Kilo</th>
                  <th scope="col" class="tableHeaderGreen">Total</th>
                  <th scope="col" class="tableHeaderGreen">Factura</th>
                  <th scope="col" class="tableHeaderGreen">Forma Pago</th>
                  <th scope="col" class="tableHeaderGreen">Nro. Cheque</th>
                  <th scope="col" class="tableHeaderGreen">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(venta, index) in ventas" v-bind:key="index">
                  <td class="tableBodyGreen">
                    {{ venta.id }}
                  </td>
                  <td class="tableBodyGreen">
                    {{ getMoment(venta.created_at).format("D/MMM/YY") }}
                  </td>
                  <td class="tableBodyGreen">
                    {{ venta.producto }}
                  </td>
                  <td class="tableBodyGreen">
                    {{ venta.cliente.nombre }}
                  </td>
                  <td>
                    {{ venta.calidad }}
                  </td>
                  <td>
                    {{ venta.cantidad.toLocaleString("de-DE") }}
                  </td>
                  <td>
                    {{ venta.valorkilo.toLocaleString("de-DE") }}
                  </td>
                  <td>
                    {{ Math.floor(venta.total).toLocaleString("de-DE") }}
                  </td>
                  <td>
                    {{ venta.factura }}
                  </td>
                  <td>
                    {{ venta.forma_pago.nombre }}
                  </td>
                  <td>
                    {{ venta.cheque }}
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
                  <td COLSPAN="7">Total:</td>
                  <td>{{ Math.floor(getTotal).toLocaleString("de-DE") }}</td>
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
        Agregar Venta
      </div>
      <form ref="ventasForm" id="ventasForm" @submit="handleAddVenta">
        <!-- Producto -->
        <b-form-group
          label="Producto"
          label-for="producto-input"
          invalid-feedback="La producto es requerida"
          :state="productoState"
        >
          <select
            class="form-control"
            v-model="productoSelected"
            :state="productoState"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option
              v-for="(producto, index) in productos"
              v-bind:key="index"
              :value="producto.nombre"
            >
              {{ producto.nombre }}
            </option>
          </select>
        </b-form-group>
        <br />
        <!-- Proveedores -->
        <b-form-group
          label="Cliente"
          label-for="proveedores-input"
          invalid-feedback="El Cliente es requerido"
          :state="proveedoresState"
        >
          <select
            class="form-control"
            v-model="proveedoresSelected"
            :state="proveedoresState"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option
              v-for="(proveedor, index) in clientes"
              v-bind:key="index"
              :value="proveedor.id"
            >
              {{ proveedor.nombre }}
            </option>
          </select>
        </b-form-group>
        <br />
        <!-- calidad -->
        <b-form-group
          label="Calidad"
          label-for="calidad-input"
          invalid-feedback="La calidad es requerida"
          :state="calidadState"
        >
          <select
            class="form-control"
            v-model="calidadSelected"
            :state="calidadState"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </b-form-group>
        <br />
        <!-- cantidad -->
        <b-form-group
          label="Cantidad"
          label-for="cantidad-input"
          invalid-feedback="La cantidad es requerida"
          :state="cantidadState"
        >
          <b-form-input
            id="cantidad-input"
            type="text"
            placeholder="Ingrese la cantidad"
            :state="cantidadState"
            :formatter="cantidadFormat"
            min="0"
          ></b-form-input>
        </b-form-group>
        <br />
        <!-- valor kilo -->
        <b-form-group
          label="Valor Kilo"
          label-for="valorKilo-input"
          invalid-feedback="El valor es requerido"
          :state="valorKiloState"
        >
          <b-form-input
            id="valorKilo-input"
            type="text"
            placeholder="Ingrese el valor del kilo"
            :state="valorKiloState"
            :formatter="valorKiloFormat"
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
        <!-- factura -->
        <b-form-group
          label="Factura"
          label-for="factura-input"
          invalid-feedback="El numero de factura es requerido"
          :state="facturaState"
        >
          <b-form-input
            id="factura-input"
            type="number"
            placeholder="Ingrese el número de factura"
            v-model="facturaSelected"
            :state="facturaState"
            min="0"
          ></b-form-input>
        </b-form-group>
        <br />
        <!-- formaPagos -->
        <b-form-group
          label="Forma Pagos"
          label-for="formaPagos-input"
          invalid-feedback="La Forma de pago es requerida"
          :state="formaPagosState"
        >
          <select
            class="form-control"
            v-model="formaPagosSelected"
            :state="formaPagosState"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option
              v-for="(formaPago, index) in formaPagos"
              v-bind:key="index"
              :value="formaPago.id"
            >
              {{ formaPago.nombre }}
            </option>
          </select>
        </b-form-group>
        <br />
        <!-- nro cheque -->
        <b-form-group
          v-if="formaPagosSelected == 3"
          label="Nro Cheque"
          label-for="cheque-input"
          invalid-feedback="El numero de cheque es requerido"
          :state="chequeState"
        >
          <b-form-input
            id="cheque-input"
            type="text"
            placeholder="Ingrese el número de cheque"
            v-model="chequeSelected"
            :state="chequeState"
          ></b-form-input>
        </b-form-group>
        <br v-if="formaPagosSelected == 3" />
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
  VENTAS_GET_VENTAS,
  COMPRAS_GET_PRODUCTOS,
  VENTAS_GET_FORMAPAGOS,
  VENTAS_GET_CLIENTES
} from "./constants/querys";
import {
  VENTA_CREATE_VENTA,
  VENTAS_DELETE_VENTAS
} from "./constants/mutations";
import moment from "moment";

export default {
  name: "Ventas",
  props: ["user", "campoSelected"],
  data() {
    return {
      error: "",
      productos: [],
      productoSelected: "",
      productoState: null,
      calidadSelected: "",
      calidadState: null,
      cantidadSelected: "",
      cantidadState: null,
      precioSelected: "",
      precioState: null,
      valorKiloSelected: "",
      valorKiloState: null,
      totalState: null,
      facturaSelected: "",
      facturaState: null,
      formaPagos: [],
      formaPagosSelected: "",
      formaPagosState: null,
      chequeSelected: "",
      chequeState: null,
      dismissCountDown: 0,
      typeNotification: "",
      messageNotification: "",
      clientes: [],
      proveedoresSelected: "",
      proveedoresState: null
    };
  },
  apollo: {
    ventas: {
      query: VENTAS_GET_VENTAS,
      variables() {
        return {
          campo: this.campoSelected ? this.campoSelected.id : null
        };
      },
      fetchPolicy: "no-cache"
    },
    productos: {
      query: COMPRAS_GET_PRODUCTOS
    },
    formaPagos: {
      query: VENTAS_GET_FORMAPAGOS
    },
    clientes: {
      query: VENTAS_GET_CLIENTES
    }
  },
  methods: {
    async handleAddVenta(e) {
      e.preventDefault();
      let validate = true;
      const producto = this.productoSelected;
      const proveedor = this.proveedoresSelected;
      const calidad = this.calidadSelected;
      const cantidad = this.cantidadSelected;
      const total = this.cantidadSelected * this.valorKiloSelected;
      const valorKilo = this.valorKiloSelected;
      const factura = this.facturaSelected;
      const formaPago = this.formaPagosSelected;
      const cheque = this.chequeSelected;

      if (!producto) {
        validate = false;
        this.productoState = false;
      }
      if (!proveedor) {
        validate = false;
        this.proveedoresState = false;
      }
      if (!calidad) {
        validate = false;
        this.calidadState = false;
      }
      if (!cantidad) {
        validate = false;
        this.cantidadState = false;
      }
      if (!valorKilo) {
        validate = false;
        this.valorKiloState = false;
      }
      if (!factura) {
        validate = false;
        this.facturaState = false;
      }
      if (!formaPago) {
        validate = false;
        this.formaPagoState = false;
      }

      if (validate) {
        if (confirm("¿Desea agregar la venta?")) {
          await this.$apollo
            .mutate({
              mutation: VENTA_CREATE_VENTA,
              variables: {
                producto: producto,
                proveedor: proveedor,
                calidad: calidad,
                cantidad: Number(cantidad),
                valorKilo: Number(valorKilo),
                total: Number(total),
                factura: factura,
                formaPago: formaPago,
                cheque: cheque,
                campo: this.campoSelected ? this.campoSelected.id : null
              },
              refetchQueries: [
                {
                  query: VENTAS_GET_VENTAS,
                  variables() {
                    return {
                      campo: this.campoSelected ? this.campoSelected.id : null
                    };
                  },
                  fetchPolicy: "no-cache"
                }
              ],
              fetchPolicy: "no-cache"
            })
            .then(data => {
              this.ventas.unshift(data.data.createVenta.venta);
              this.productoState = null;
              this.calidadState = null;
              this.cantidadState = null;
              this.valorKiloState = null;
              this.facturaState = null;
              this.formaPagoState = null;
              this.chequeState = null;
              this.productoSelected = "";
              this.calidadSelected = "";
              this.cantidadSelected = "";
              this.valorKiloSelected = "";
              this.facturaSelected = "";
              this.formaPagosSelected = "";
              this.chequeSelected = "";
              this.error = "";
              this.proveedoresState = null;
              this.proveedoresSelected = "";
              this.$root.$emit("bv::hide::modal", "addVentasModal");
              this.showAlert("success", 5, "Venta creada exitosamente.");
            })
            .catch(() => {
              this.productoState = null;
              this.calidadState = null;
              this.cantidadState = null;
              this.valorKiloState = null;
              this.facturaState = null;
              this.formaPagoState = null;
              this.chequeState = null;
              this.productoSelected = "";
              this.calidadSelected = "";
              this.cantidadSelected = "";
              this.valorKiloSelected = "";
              this.facturaSelected = "";
              this.formaPagosSelected = "";
              this.chequeSelected = "";
              this.error = "";
              this.proveedoresState = null;
              this.proveedoresSelected = "";
              this.showAlert("danger", 5, "La venta no pudo ser creada.");
            });
        }
      }
    },
    async handleDeleteVenta(venta) {
      if (confirm("¿Desea eliminar la venta?")) {
        await this.$apollo
          .mutate({
            mutation: VENTAS_DELETE_VENTAS,
            variables: {
              id: venta.id
            }
          })
          .then(data => {
            this.ventas = this.ventas.filter(function(venta) {
              return venta.id != data.data.deleteVenta.venta.id;
            });
            this.showAlert("success", 5, "Venta eliminada exitosamente.");
          })
          .catch(() => {
            this.showAlert("danger", 5, "La venta no pudo ser eliminada.");
          });
      }
    },
    valorKiloFormat(value) {
      this.valorKiloSelected = Number(value.replace(/\D/g, ""));
      return value == "0" ? "" : this.valorKiloSelected.toLocaleString("de-DE");
    },
    cantidadFormat(value) {
      this.cantidadSelected = Number(value.replace(/\D/g, ""));
      return value == "0" ? "" : this.cantidadSelected.toLocaleString("de-DE");
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
  computed: {
    totalSelected() {
      var val = 0;
      if (this.cantidadSelected && this.valorKiloSelected) {
        val = (this.cantidadSelected * this.valorKiloSelected).toLocaleString(
          "de-DE"
        );
      }
      return val;
    },
    getTotal() {
      let total = 0;

      if (this.ventas) {
        this.ventas.map(venta => {
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
