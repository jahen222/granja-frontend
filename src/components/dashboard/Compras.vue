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
          <div class="table-responsive">
            <table class="table table-borderless table-hover tableStyle">
              <thead>
                <tr>
                  <th scope="col" class="tableHeaderGreen">Productos</th>
                  <th scope="col" class="tableHeaderGreen">Centro Costo</th>
                  <th scope="col" class="tableHeaderGreen">Cantidad</th>
                  <th scope="col" class="tableHeaderGreen">Precio Unitario</th>
                  <th scope="col" class="tableHeaderGreen">Unidad</th>
                  <th scope="col" class="tableHeaderGreen">Total</th>
                  <th scope="col" class="tableHeaderGreen">Guia</th>
                  <th scope="col" class="tableHeaderGreen">Factura</th>
                  <th scope="col" class="tableHeaderGreen">Forma Pago</th>
                  <th scope="col" class="tableHeaderGreen">Nro. Cheque</th>
                  <th scope="col" class="tableHeaderGreen">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(venta, index) in compras" v-bind:key="index">
                  <td class="tableBodyGreen">
                    {{ venta.producto.nombre }}
                  </td>
                  <td>
                    {{ venta.centrocosto.nombre }}
                  </td>
                  <td>
                    {{ venta.cantidad }}
                  </td>
                  <td>
                    {{ venta.valorunitario }}
                  </td>
                  <td>
                    {{ venta.unidad }}
                  </td>
                  <td>
                    {{ venta.total }}
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
                      type="button"
                      variant="danger"
                      size="sm"
                      class="float-right"
                      @click="handleDeleteVenta(venta)"
                    >
                      Borrar
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="addVentasModal" title="Agregar Venta">
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
            <option
              v-for="(producto, index) in productos"
              v-bind:key="index"
              :value="producto.id"
            >
              {{ producto.nombre }}
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
            <option
              v-for="(producto, index) in productos"
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
            v-model="cantidadSelected"
            :state="cantidadState"
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
            <option value="Baja">Kilos</option>
            <option value="Media">Litros</option>
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
            type="number"
            v-model="valorUnitarioSelected"
            :state="valorUnitarioState"
          ></b-form-input>
        </b-form-group>
        <br />
        <!-- total -->
        <b-form-group label="Total" label-for="total-input" :state="totalState">
          <b-form-input
            id="total-input"
            type="number"
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
            type="text"
            v-model="guiaSelected"
            :state="guiaState"
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
            type="text"
            v-model="facturaSelected"
            :state="facturaState"
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
  COMPRAS_GET_COMPRAS,
  VENTAS_GET_PRODUCTOS,
  VENTAS_GET_FORMAPAGOS
} from "./constants/querys";
import {
  COMPRAS_CREATE_COMPRAS,
  COMPRAS_DELETE_COMPRAS
} from "./constants/mutations";

export default {
  name: "Compras",
  props: ["user", "campoSelected"],
  data() {
    return {
      error: "",
      productos: [],
      productoSelected: "",
      productoState: null,
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
      guiaState: null
    };
  },
  apollo: {
    compras: {
      query: COMPRAS_GET_COMPRAS,
      variables() {
        return {
          campo: this.campoSelected ? this.campoSelected.id : null
        };
      }
    },
    productos: {
      query: VENTAS_GET_PRODUCTOS
    },
    formaPagos: {
      query: VENTAS_GET_FORMAPAGOS
    }
  },
  methods: {
    async handleAddVenta(e) {
      e.preventDefault();
      let validate = true;
      const producto = this.productoSelected;
      const centrocosto = this.centroCostoSelected;
      const valorunitario = this.valorUnitarioSelected;
      const cantidad = this.cantidadSelected;
      const total = this.totalSelected;
      const guia = this.guiaSelected;
      const factura = this.facturaSelected;
      const formaPago = this.formaPagosSelected;
      const cheque = this.chequeSelected;
      const unidad = this.unidadSelected;

      if (!producto) {
        validate = false;
        this.productoState = false;
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
      if (!factura) {
        validate = false;
        this.facturaState = false;
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
              this.totalSelected = "";
              this.guiaSelected = "";
              this.facturaSelected = "";
              this.formaPagosSelected = "";
              this.chequeSelected = "";
              this.unidadSelected = "";
              this.error = "";
              this.$root.$emit("bv::hide::modal", "addVentasModal");
            })
            .catch(({ graphQLErrors }) => {
              graphQLErrors.map(({ extensions }) =>
                extensions.exception.data.message.map(({ messages }) =>
                  messages.map(({ message }) => (this.error = message))
                )
              );
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
            },
            refetchQueries: [
              {
                query: COMPRAS_GET_COMPRAS,
                variables: {
                  campo: this.campoSelected ? this.campoSelected.id : null
                }
              }
            ]
          })
          .then(data => {
            this.compras.filter(function(venta) {
              return venta.id != data.data.deleteCompra.compra.id;
            });
          })
          .catch(({ graphQLErrors }) => {
            graphQLErrors.map(({ extensions }) =>
              extensions.exception.data.message.map(({ messages }) =>
                messages.map(({ message }) => (this.error = message))
              )
            );
          });
      }
    }
  },
  computed: {
    totalSelected() {
      return this.cantidadSelected * this.valorUnitarioSelected;
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
/* .table > thead:first-child > tr:first-child > th:first-child {
  position: absolute;
  display: inline-block;
}
.table > tbody > tr > td:first-child {
  position: absolute;
  display: inline-block;
}
.table > thead:first-child > tr:first-child > th:nth-child(2) {
  padding-left: 100px;
}
.table > tbody > tr > td:nth-child(2) {
  padding-left: 100px !important;
} */
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
</style>
