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
            Cosecha {{ campoSelected ? campoSelected.nombre : "" }}
          </h2>
          <hr class="divider" />
        </div>
        <div class="col-lg-12 align-self-baseline">
          <b-button class="btn btn-success btn-xl" v-b-modal.addVentasModal
            >Agregar Cosecha</b-button
          >
          <br />
          <br />
          <div class="table-responsive tableFixHead">
            <table class="table table-borderless table-hover tableStyle">
              <thead>
                <tr>
                  <th scope="col" class="tableHeaderGreen">ID</th>
                  <th scope="col" class="tableHeaderGreen">Producto</th>
                  <th scope="col" class="tableHeaderGreen">Zona</th>
                  <th scope="col" class="tableHeaderGreen">Cantidad</th>
                  <th scope="col" class="tableHeaderGreen">Unidad</th>
                  <th scope="col" class="tableHeaderGreen">Ha</th>
                  <th scope="col" class="tableHeaderGreen">Árboles</th>
                  <th scope="col" class="tableHeaderGreen">Kilos x Árbol</th>
                  <th scope="col" class="tableHeaderGreen">Kilos x Ha</th>
                  <th scope="col" class="tableHeaderGreen">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(venta, index) in cosechas" v-bind:key="index">
                  <td class="tableBodyGreen">
                    {{ venta.id }}
                  </td>
                  <td class="tableBodyGreen">
                    {{ venta.producto_cosecha.nombre }}
                  </td>
                  <td>
                    {{ venta.zona_cosecha.nombre }}
                  </td>
                  <td>
                    {{ venta.cantidad.toLocaleString("de-DE") }}
                  </td>
                  <td>
                    {{ venta.unidad }}
                  </td>
                  <td>
                    {{ venta.ha.toLocaleString("de-DE") }}
                  </td>
                  <td>
                    {{ venta.arboles.toLocaleString("de-DE") }}
                  </td>
                  <td class="tableBodyGrey">
                    {{ Math.floor(venta.kilosxarbol).toLocaleString("de-DE") }}
                  </td>
                  <td class="tableBodyGrey">
                    {{ Math.floor(venta.kilosxhectarea).toLocaleString("de-DE") }}
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
                <!-- <tr>
                  <td COLSPAN="4">Total:</td>
                  <td>{{ getTotal.toLocaleString("de-DE") }}</td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="addVentasModal">
      <div slot="modal-title">
        <font-awesome-icon icon="bookmark" style="color: green" />
        Agregar Cosecha
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
              v-for="(producto, index) in productoCosechas"
              v-bind:key="index"
              :value="producto.id"
            >
              {{ producto.nombre }}
            </option>
          </select>
        </b-form-group>
        <br />
        <!-- Zona -->
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
              v-for="(zona, index) in zonaCosechas"
              v-bind:key="index"
              :value="zona.id"
            >
              {{ zona.nombre }}
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
            :formatter="cantidadFormat"
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
            <option value="Kilos">Kilos</option>
            <option value="Litros">Litros</option>
          </select>
        </b-form-group>
        <br />
        <!-- hectáreas -->
        <b-form-group
          label="Hectáreas"
          label-for="ha-input"
          invalid-feedback="Las hectárias son requeridas"
          :state="haState"
        >
          <b-form-input
            id="ha-input"
            type="number"
            placeholder="Ingrese las hectáreas"
            v-model="haSelected"
            :state="haState"
            min="0"
          ></b-form-input>
        </b-form-group>
        <br />
        <!-- arboles -->
        <b-form-group
          label="Árboles"
          label-for="arboles-input"
          invalid-feedback="Las arboles son requeridos"
          :state="arbolesState"
        >
          <b-form-input
            id="arboles-input"
            type="number"
            placeholder="Ingrese los árboles"
            v-model="arbolesSelected"
            :state="arbolesState"
            min="0"
          ></b-form-input>
        </b-form-group>
        <br />
        <!-- kxa -->
        <b-form-group
          label="Kilos x Árbol"
          label-for="kxa-input"
          invalid-feedback="Es requerido"
          :state="kxaState"
        >
          <b-form-input
            id="kxa-input"
            type="number"
            v-model="kxaSelected"
            :state="kxaState"
            :disabled="true"
          ></b-form-input>
        </b-form-group>
        <br />
        <!-- kxh -->
        <b-form-group
          label="Kilos x Hectárea"
          label-for="kxh-input"
          invalid-feedback="Es requerido"
          :state="kxhState"
        >
          <b-form-input
            id="kxh-input"
            type="number"
            v-model="kxhSelected"
            :state="kxhState"
            :disabled="true"
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
  COSECHA_GET_COSECHA,
  COSECHA_GET_PRODUCTOS_COSECHAS,
  COSECHA_GET_ZONAS_COSECHAS
} from "./constants/querys";
import {
  COSECHA_CREATE_COSECHA,
  COSECHA_DELETE_COSECHA
} from "./constants/mutations";

export default {
  name: "Cosecha",
  props: ["user", "campoSelected"],
  data() {
    return {
      error: "",
      cosechas: [],
      productoCosechas: [],
      zonas: [],
      productoSelected: "",
      productoState: null,
      cantidadSelected: "",
      cantidadState: null,
      zonaSelected: "",
      zonaState: null,
      unidadSelected: "",
      unidadState: null,
      haSelected: "",
      haState: null,
      arbolesSelected: "",
      arbolesState: null,
      kxaState: null,
      kxhState: null,
      dismissCountDown: 0,
      typeNotification: "",
      messageNotification: ""
    };
  },
  apollo: {
    cosechas: {
      query: COSECHA_GET_COSECHA,
      variables() {
        return {
          campo: this.campoSelected ? this.campoSelected.id : null
        };
      },
      fetchPolicy: "no-cache"
    },
    productoCosechas: {
      query: COSECHA_GET_PRODUCTOS_COSECHAS
    }
  },
  methods: {
    handleAddVenta(e) {
      e.preventDefault();
      let validate = true;
      const producto = this.productoSelected;
      const zona = this.zonaSelected;
      const cantidad = this.cantidadSelected;
      const arboles = this.arbolesSelected;
      const unidad = this.unidadSelected;
      const ha = this.haSelected;
      const kxa = this.kxaSelected;
      const kxh = this.kxhSelected;

      if (!producto) {
        validate = false;
        this.productoState = false;
      }
      if (!zona) {
        validate = false;
        this.zonaState = false;
      }
      if (!cantidad) {
        validate = false;
        this.cantidadState = false;
      }
      if (!arboles) {
        validate = false;
        this.arbolesState = false;
      }
      if (!unidad) {
        validate = false;
        this.unidadState = false;
      }
      if (!ha) {
        validate = false;
        this.haState = false;
      }
      if (!kxh) {
        validate = false;
        this.kxhState = false;
      }
      if (!kxa) {
        validate = false;
        this.kxaState = false;
      }

      if (validate) {
        if (confirm("¿Desea agregar la cosecha?")) {
          this.$apollo
            .mutate({
              mutation: COSECHA_CREATE_COSECHA,
              variables: {
                producto: producto,
                zona: zona,
                unidad: unidad,
                cantidad: Number(cantidad),
                arboles: Number(arboles),
                ha: Number(ha),
                kilosxhectarea: Number(kxh),
                kilosxarbol: Number(kxa),
                campo: this.campoSelected ? this.campoSelected.id : null
              }
            })
            .then(data => {
              this.cosechas.unshift(data.data.createCosecha.cosecha);
              this.error = "";
              this.productoSelected = "";
              this.zonaSelected = "";
              this.cantidadSelected = "";
              this.arbolesSelected = "";
              this.unidadSelected = "";
              this.haSelected = "";
              this.productoState = null;
              this.zonaState = null;
              this.cantidadState = null;
              this.arbolesState = null;
              this.unidadState = null;
              this.haState = null;
              this.kxaState = null;
              this.kxhState = null;
              this.$root.$emit("bv::hide::modal", "addVentasModal");
              this.showAlert("success", 5, "Cosecha creada exitosamente.");
            })
            .catch(() => {
              this.error = "";
              this.productoSelected = "";
              this.zonaSelected = "";
              this.cantidadSelected = "";
              this.arbolesSelected = "";
              this.unidadSelected = "";
              this.haSelected = "";
              this.productoState = null;
              this.zonaState = null;
              this.cantidadState = null;
              this.arbolesState = null;
              this.unidadState = null;
              this.haState = null;
              this.kxaState = null;
              this.kxhState = null;
              this.showAlert("danger", 5, "La cosecha no pudo ser creada.");
            });
        }
      }
    },
    handleDeleteVenta(venta) {
      if (confirm("¿Desea eliminar la cosecha?")) {
        this.$apollo
          .mutate({
            mutation: COSECHA_DELETE_COSECHA,
            variables: {
              id: venta.id
            }
          })
          .then(data => {
            this.cosechas = this.cosechas.filter(function(cosecha) {
              return cosecha.id != data.data.deleteCosecha.cosecha.id;
            });
            this.showAlert("success", 5, "Cosecha eliminada exitosamente.");
          })
          .catch(() => {
            this.showAlert("danger", 5, "La cosecha no pudo ser eliminada.");
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
    cantidadFormat(value) {
      this.cantidadSelected = Number(value.replace(/\D/g, ""));
      return value == "0" ? "" : this.cantidadSelected.toLocaleString("de-DE");
    },
  },
  computed: {
    kxaSelected() {
      if (this.cantidadSelected && this.arbolesSelected) {
        return (this.cantidadSelected / this.arbolesSelected)
          .toFixed(3)
          .toLocaleString("de-DE");
      } else return 0;
    },
    kxhSelected() {
      if (this.cantidadSelected && this.haSelected) {
        return (this.cantidadSelected / this.haSelected)
          .toFixed(3)
          .toLocaleString("de-DE");
      } else return 0;
    }
  },
  asyncComputed: {
    async zonaCosechas() {
      let zonas = [];

      if (this.productoSelected) {
        await this.$apollo
          .query({
            query: COSECHA_GET_ZONAS_COSECHAS,
            variables: {
              productoId: this.productoSelected
            }
          })
          .then(data => {
            zonas = data.data.zonaCosechas;
          })
          .catch(({ graphQLErrors }) => {
            graphQLErrors.map(({ extensions }) =>
              console.log(extensions.exception)
            );
          });
      }

      return zonas;
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
.tableBodyGrey {
  background-color: lightgrey;
}
</style>
