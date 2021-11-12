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
            Listado de Compras {{ campoSelected ? campoSelected.nombre : "" }}
          </h2>
          <hr class="divider" />
        </div>
        <div class="col-lg-12 align-self-baseline">
          <b-button class="btn btn-success btn-xl" v-b-modal.addVentasModal
            >Agregar Compra</b-button
          >
          <br />
          <br />
          <div class="table-responsive tableFixHead">
            <table class="table table-borderless table-hover tableStyle">
              <thead>
                <tr>
                  <th scope="col" class="tableHeaderGreen" style="width: 50px">
                    ID
                  </th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">
                    Fecha
                  </th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">
                    Producto
                  </th>
                  <th scope="col" class="tableHeaderGreen" style="width: 150px">
                    Proveedor
                  </th>
                  <th scope="col" class="tableHeaderGreen" style="width: 140px">
                    Centro Costo
                  </th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">
                    Cantidad
                  </th>
                  <th scope="col" class="tableHeaderGreen" style="width: 150px">
                    Precio Unitario
                  </th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">
                    Unidad
                  </th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">
                    Total
                  </th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">
                    Guia
                  </th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">
                    Factura
                  </th>
                  <th scope="col" class="tableHeaderGreen" style="width: 130px">
                    Forma Pago
                  </th>
                  <th scope="col" class="tableHeaderGreen" style="width: 130px">
                    Nro. Cheque
                  </th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(venta, index) in compras" v-bind:key="index">
                  <td class="tableBodyGreen">
                    {{ venta.id }}
                  </td>
                  <td class="tableBodyGreen">
                    {{ getMoment(venta.created_at).format("D/MMM/YY") }}
                  </td>
                  <td class="tableBodyGreen">
                    {{ venta.producto.nombre }}
                  </td>
                  <td class="tableBodyGreen">
                    {{ venta.proveedore.nombre }}
                  </td>
                  <td>
                    {{ venta.centro_costo.nombre }}
                  </td>
                  <td>
                    {{ venta.cantidad.toLocaleString("de-DE") }}
                  </td>
                  <td>
                    {{ venta.valorunitario.toLocaleString("de-DE") }}
                  </td>
                  <td>
                    {{ venta.unidad }}
                  </td>
                  <td>
                    {{ Math.floor(venta.total).toLocaleString("de-DE") }}
                  </td>
                  <td>
                    {{ venta.guia }}
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
                      v-if="!venta.factura"
                      type="button"
                      variant="success"
                      size="sm"
                      class="float-right"
                      style="margin-right: 10px"
                      @click="selectCompra(venta.id)"
                    >
                      Factura
                    </b-button>
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
                  <td COLSPAN="8">Total:</td>
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
        Agregar Compra
      </div>
      <form ref="ventasForm" id="ventasForm" @submit="handleAddVenta">
        <!-- Producto -->
        <div class="row">
          <div class="col-10">
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
                  :value="producto.id"
                >
                  {{ producto.nombre }}
                </option>
              </select>
            </b-form-group>
          </div>
          <div class="col-2">
            <b-form-group label="Agregar">
              <a href="#" v-b-modal.addProductoModal
                ><font-awesome-icon icon="plus" style="color: green"
              /></a>
            </b-form-group>
          </div>
        </div>
        <br />
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
        <!-- Centro Costo -->
        <b-form-group
          label="Centro Costo"
          label-for="centroCosto-input"
          invalid-feedback="El Centro Costo es requerido"
          :state="centroCostoState"
        >
          <select
            class="form-control"
            v-model="centroCostoSelected"
            :state="centroCostoState"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option
              v-for="(producto, index) in centroCostos"
              v-bind:key="index"
              :value="producto.id"
            >
              {{ producto.nombre }}
            </option>
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
            <option value="Kilos">Kilos</option>
            <option value="Litros">Litros</option>
          </select>
        </b-form-group>
        <br />
        <!-- valor unitario -->
        <b-form-group
          label="Valor Unitario"
          label-for="valorUnitario-input"
          invalid-feedback="El valor es requerido"
          :state="valorUnitarioState"
        >
          <b-form-input
            id="valorUnitario-input"
            type="text"
            placeholder="Ingrese el valor unitario"
            :state="valorUnitarioState"
            :formatter="valorUnitarioFormat"
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
        <!-- guia -->
        <b-form-group
          label="Guia"
          label-for="guia-input"
          invalid-feedback="El numero de guia es requerido"
          :state="guiaState"
        >
          <b-form-input
            id="guia-input"
            type="number"
            placeholder="Ingrese el número de guía"
            v-model="guiaSelected"
            :state="guiaState"
            min="0"
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
    <b-modal id="addFacturaModal">
      <div slot="modal-title">
        <font-awesome-icon icon="bookmark" style="color: green" />
        Agregar Número de factura
      </div>
      <form ref="facturaForm" id="facturaForm" @submit="handleAddFacturao">
        <!-- factura -->
        <b-form-group
          label="Número factura"
          label-for="factura-input"
          invalid-feedback="El número de factura es requerido"
          :state="facturaaddState"
        >
          <b-form-input
            id="factura-input"
            type="number"
            placeholder="Ingrese el número de factura"
            v-model="facturaaddSelected"
            min="0"
            :state="facturaaddState"
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
            form="facturaForm"
            variant="success"
            size="sm"
            class="float-right"
          >
            Agregar
          </b-button>
        </div>
      </template>
    </b-modal>
    <b-modal id="addProductoModal">
      <div slot="modal-title">
        <font-awesome-icon icon="bookmark" style="color: green" />
        Agregar Producto
      </div>
      <form ref="productoForm" id="productoForm" @submit="handleAddProducto">
        <!-- producto -->
        <b-form-group
          label="Nombre producto"
          label-for="producto-input"
          invalid-feedback="El nombre del producto es requerido"
          :state="productoaddState"
        >
          <b-form-input
            id="producto-input"
            type="text"
            placeholder="Ingrese el nombre del nuevo producto"
            v-model="productoaddSelected"
            :state="productoaddState"
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
            form="productoForm"
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
  COMPRAS_GET_COMPRAS,
  COMPRAS_GET_PRODUCTOS,
  VENTAS_GET_FORMAPAGOS,
  VENTAS_GET_CENTRO_COSTOS,
  GASTOS_GET_PROVEEDORES
} from "./constants/querys";
import {
  COMPRAS_CREATE_COMPRAS,
  COMPRAS_DELETE_COMPRAS,
  COMPRAS_CREATE_PRODUCTO,
  COMPRAS_UPDATE_FACTURA
} from "./constants/mutations";
import moment from "moment";

export default {
  name: "Compras",
  props: ["user", "campoSelected"],
  data() {
    return {
      error: "",
      productos: [],
      productoSelected: "",
      productoState: null,
      proveedores: [],
      proveedoresSelected: "",
      proveedoresState: null,
      unidadSelected: "",
      unidadState: null,
      cantidadSelected: "",
      cantidadState: null,
      precioSelected: "",
      precioState: null,
      valorUnitarioSelected: "",
      valorUnitarioState: null,
      totalState: null,
      facturaSelected: "",
      facturaState: null,
      formaPagos: [],
      formaPagosSelected: "",
      formaPagosState: null,
      chequeSelected: "",
      chequeState: null,
      centroCostoSelected: "",
      centroCostoState: null,
      guiaSelected: "",
      guiaState: null,
      productoaddSelected: "",
      productoaddState: null,
      dismissCountDown: 0,
      typeNotification: "",
      messageNotification: "",
      centroCostos: [],
      facturaaddSelected: "",
      facturaaddState: null,
      compraIdAux: ""
    };
  },
  apollo: {
    compras: {
      query: COMPRAS_GET_COMPRAS,
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
    centroCostos: {
      query: VENTAS_GET_CENTRO_COSTOS
    },
    proveedores: {
      query: GASTOS_GET_PROVEEDORES
    }
  },
  methods: {
    async handleAddVenta(e) {
      e.preventDefault();
      let validate = true;
      const proveedor = this.proveedoresSelected;
      const producto = this.productoSelected;
      const centrocosto = this.centroCostoSelected;
      const valorunitario = this.valorUnitarioSelected;
      const cantidad = this.cantidadSelected;
      const total = this.cantidadSelected * this.valorUnitarioSelected;
      const guia = this.guiaSelected;
      const factura = this.facturaSelected;
      const formaPago = this.formaPagosSelected;
      const cheque = this.chequeSelected;
      const unidad = this.unidadSelected;

      if (!producto) {
        validate = false;
        this.productoState = false;
      }
      if (!proveedor) {
        validate = false;
        this.proveedoresState = false;
      }
      if (!centrocosto) {
        validate = false;
        this.centroCostoState = false;
      }
      if (!guia) {
        validate = false;
        this.guiaState = false;
      }
      if (!cantidad) {
        validate = false;
        this.cantidadState = false;
      }
      if (!valorunitario) {
        validate = false;
        this.valorUnitarioState = false;
      }
      if (!formaPago) {
        validate = false;
        this.formaPagoState = false;
      }
      if (!unidad) {
        validate = false;
        this.unidadState = false;
      }

      if (validate) {
        if (confirm("¿Desea agregar la compra?")) {
          await this.$apollo
            .mutate({
              mutation: COMPRAS_CREATE_COMPRAS,
              variables: {
                producto: producto,
                proveedor: proveedor,
                centrocosto: centrocosto,
                cantidad: Number(cantidad),
                valorunitario: Number(valorunitario),
                total: Number(total),
                guia: guia,
                factura: factura,
                formaPago: formaPago,
                cheque: cheque,
                unidad: unidad,
                campo: this.campoSelected ? this.campoSelected.id : null
              }
            })
            .then(data => {
              this.compras.unshift(data.data.createCompra.compra);
              this.productoState = null;
              this.cantidadState = null;
              this.facturaState = null;
              this.formaPagoState = null;
              this.chequeState = null;
              this.centroCostoState = null;
              this.guiaState = null;
              this.unidadState = null;
              this.valorunitario = null;
              this.productoSelected = "";
              this.centroCostoSelected = "";
              this.valorUnitarioSelected = "";
              this.cantidadSelected = "";
              this.guiaSelected = "";
              this.facturaSelected = "";
              this.formaPagosSelected = "";
              this.chequeSelected = "";
              this.unidadSelected = "";
              this.error = "";
              this.proveedoresState = null;
              this.proveedoresSelected = "";
              this.$root.$emit("bv::hide::modal", "addVentasModal");
              this.showAlert("success", 5, "Compra creada exitosamente.");
            })
            .catch(() => {
              this.productoState = null;
              this.cantidadState = null;
              this.facturaState = null;
              this.formaPagoState = null;
              this.chequeState = null;
              this.centroCostoState = null;
              this.guiaState = null;
              this.unidadState = null;
              this.valorunitario = null;
              this.productoSelected = "";
              this.centroCostoSelected = "";
              this.valorUnitarioSelected = "";
              this.cantidadSelected = "";
              this.guiaSelected = "";
              this.facturaSelected = "";
              this.formaPagosSelected = "";
              this.chequeSelected = "";
              this.unidadSelected = "";
              this.error = "";
              this.proveedoresState = null;
              this.proveedoresSelected = "";
              this.$root.$emit("bv::hide::modal", "addVentasModal");
              this.showAlert("danger", 5, "La compra no pudo ser creada.");
            });
        }
      }
    },
    async handleDeleteVenta(venta) {
      if (confirm("¿Desea eliminar la compra?")) {
        await this.$apollo
          .mutate({
            mutation: COMPRAS_DELETE_COMPRAS,
            variables: {
              id: venta.id
            }
          })
          .then(data => {
            this.compras = this.compras.filter(function(venta) {
              return venta.id != data.data.deleteCompra.compra.id;
            });
            this.showAlert("success", 5, "Compra eliminada exitosamente.");
          })
          .catch(() => {
            this.showAlert("danger", 5, "La compra no pudo ser eliminada.");
          });
      }
    },
    async handleAddProducto(e) {
      e.preventDefault();
      let validate = true;
      const producto = this.productoaddSelected;

      if (!producto) {
        validate = false;
        this.productoaddState = false;
      }

      if (validate) {
        if (confirm("¿Desea agregar el producto?")) {
          await this.$apollo
            .mutate({
              mutation: COMPRAS_CREATE_PRODUCTO,
              variables: {
                nombre: producto
              },
              refetchQueries: [
                {
                  query: COMPRAS_GET_PRODUCTOS
                }
              ],
              fetchPolicy: "no-cache"
            })
            .then(() => {
              this.productoaddState = null;
              this.productoaddSelected = "";
              this.error = "";
              this.$root.$emit("bv::hide::modal", "addProductoModal");
              this.showAlert("success", 5, "Producto creado exitosamente.");
            })
            .catch(() => {
              this.showAlert("danger", 5, "El producto no pudo ser creado.");
            });
        }
      }
    },
    valorUnitarioFormat(value) {
      this.valorUnitarioSelected = Number(value.replace(/\D/g, ""));
      return value == "0"
        ? ""
        : this.valorUnitarioSelected.toLocaleString("de-DE");
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
    selectCompra(compraId) {
      this.compraIdAux = compraId;
      this.$root.$emit("bv::show::modal", "addFacturaModal");
    },
    async handleAddFacturao(e) {
      e.preventDefault();
      let validate = true;
      const factura = this.facturaaddSelected;
      const compraId = this.compraIdAux;

      if (!factura) {
        validate = false;
        this.facturaaddState = false;
      }

      if (validate) {
        if (confirm("¿Desea agregar el número de la factura?")) {
          await this.$apollo
            .mutate({
              mutation: COMPRAS_UPDATE_FACTURA,
              variables: {
                id: compraId,
                factura: factura
              },
              refetchQueries: [
                {
                  query: COMPRAS_GET_COMPRAS,
                  variables() {
                    return {
                      campo: this.campoSelected ? this.campoSelected.id : null
                    };
                  }
                }
              ]
            })
            .then(() => {
              this.facturaaddState = null;
              this.facturaaddSelected = "";
              this.error = "";
              this.$root.$emit("bv::hide::modal", "addFacturaModal");
              this.showAlert(
                "success",
                5,
                "El número fue agregado exitosamente."
              );
            })
            .catch(() => {
              this.showAlert("danger", 5, "El número no pudo ser agregado.");
            });
        }
      }
    },
    getMoment(date) {
      return moment(date);
    }
  },
  computed: {
    totalSelected() {
      var val = 0;
      if (this.cantidadSelected && this.valorUnitarioSelected) {
        val = (
          this.cantidadSelected * this.valorUnitarioSelected
        ).toLocaleString("de-DE");
      }
      return val;
    },
    getTotal() {
      let total = 0;

      if (this.compras) {
        this.compras.map(compra => {
          total = total + compra.total;
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
</style>
