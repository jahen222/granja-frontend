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
            Actividades {{ campoSelected ? campoSelected.nombre : "" }}
          </h2>
          <hr class="divider" />
        </div>
        <div class="col-lg-12 align-self-baseline">
          <b-button class="btn btn-success btn-xl" v-b-modal.addActivityModal
            >Agregar Actividad</b-button
          >
          <br />
          <br />
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
            <table class="table table-borderless table-hover tableStyle">
              <thead>
                <tr>
                  <th scope="col" class="tableHeaderGreen" style="width: 50px">ID</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">Actividad</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">Estado</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">Abril</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">Mayo</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">Junio</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">Julio</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">Agosto</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">Septiembre</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">Octubre</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">Noviembre</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">Diciembre</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">Enero</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">Febrero</th>
                  <th scope="col" class="tableHeaderGreen" style="width: 120px">Marzo</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(register, index) in registroActividads"
                  v-bind:key="index"
                >
                  <td
                    class="tableBodyGreen"
                    @click="handleShowAvtivity(register)"
                  >
                    {{ register.id }}
                  </td>
                  <td
                    class="tableBodyGreen"
                    @click="handleShowAvtivity(register)"
                  >
                    {{ register.actividad }}
                  </td>
                  <td
                    class="tableBodyGreen"
                    @click="handleShowAvtivity(register)"
                  >
                    {{ register.estado }}
                  </td>
                  <td @click="handleShowAvtivity(register)">
                    {{
                      getMonth(register.fechainicio) === 3
                        ? "I:" + getDate(register.fechainicio) + " "
                        : ""
                    }}
                    <font-awesome-icon
                      v-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 3 &&
                        moment > getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 3 &&
                        moment <= getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 3 &&
                        getMoment(register.fechainiciocliente) >
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 3 &&
                        getMoment(register.fechainiciocliente) <=
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    {{
                      getMonth(register.fechafin) === 3
                        ? "F:" + getDate(register.fechafin)
                        : ""
                    }}
                  </td>
                  <td @click="handleShowAvtivity(register)">
                    {{
                      getMonth(register.fechainicio) === 4
                        ? "I:" + getDate(register.fechainicio) + " "
                        : ""
                    }}
                    <font-awesome-icon
                      v-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 4 &&
                        moment > getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 4 &&
                        moment <= getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 4 &&
                        getMoment(register.fechainiciocliente) >
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 4 &&
                        getMoment(register.fechainiciocliente) <=
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    {{
                      getMonth(register.fechafin) === 4
                        ? "F:" + getDate(register.fechafin)
                        : ""
                    }}
                  </td>
                  <td @click="handleShowAvtivity(register)">
                    {{
                      getMonth(register.fechainicio) === 5
                        ? "I:" + getDate(register.fechainicio) + " "
                        : ""
                    }}
                    <font-awesome-icon
                      v-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 5 &&
                        moment > getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 5 &&
                        moment <= getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 5 &&
                        getMoment(register.fechainiciocliente) >
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 5 &&
                        getMoment(register.fechainiciocliente) <=
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    {{
                      getMonth(register.fechafin) === 5
                        ? "F:" + getDate(register.fechafin)
                        : ""
                    }}
                  </td>
                  <td @click="handleShowAvtivity(register)">
                    {{
                      getMonth(register.fechainicio) === 6
                        ? "I:" + getDate(register.fechainicio) + " "
                        : ""
                    }}
                    <font-awesome-icon
                      v-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 6 &&
                        moment > getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 6 &&
                        moment <= getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 6 &&
                        getMoment(register.fechainiciocliente) >
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 6 &&
                        getMoment(register.fechainiciocliente) <=
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    {{
                      getMonth(register.fechafin) === 6
                        ? "F:" + getDate(register.fechafin)
                        : ""
                    }}
                  </td>
                  <td @click="handleShowAvtivity(register)">
                    {{
                      getMonth(register.fechainicio) === 7
                        ? "I:" + getDate(register.fechainicio) + " "
                        : ""
                    }}
                    <font-awesome-icon
                      v-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 7 &&
                        moment > getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 7 &&
                        moment <= getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 7 &&
                        getMoment(register.fechainiciocliente) >
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 7 &&
                        getMoment(register.fechainiciocliente) <=
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    {{
                      getMonth(register.fechafin) === 7
                        ? "F:" + getDate(register.fechafin)
                        : ""
                    }}
                  </td>
                  <td @click="handleShowAvtivity(register)">
                    {{
                      getMonth(register.fechainicio) === 8
                        ? "I:" + getDate(register.fechainicio) + " "
                        : ""
                    }}
                    <font-awesome-icon
                      v-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 8 &&
                        moment > getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 8 &&
                        moment <= getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 8 &&
                        getMoment(register.fechainiciocliente) >
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 8 &&
                        getMoment(register.fechainiciocliente) <=
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    {{
                      getMonth(register.fechafin) === 8
                        ? "F:" + getDate(register.fechafin)
                        : ""
                    }}
                  </td>
                  <td @click="handleShowAvtivity(register)">
                    {{
                      getMonth(register.fechainicio) === 9
                        ? "I:" + getDate(register.fechainicio) + " "
                        : ""
                    }}
                    <font-awesome-icon
                      v-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 9 &&
                        moment > getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 9 &&
                        moment <= getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 9 &&
                        getMoment(register.fechainiciocliente) >
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 9 &&
                        getMoment(register.fechainiciocliente) <=
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    {{
                      getMonth(register.fechafin) === 9
                        ? "F:" + getDate(register.fechafin)
                        : ""
                    }}
                  </td>
                  <td @click="handleShowAvtivity(register)">
                    {{
                      getMonth(register.fechainicio) === 10
                        ? "I:" + getDate(register.fechainicio) + " "
                        : ""
                    }}
                    <font-awesome-icon
                      v-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 10 &&
                        moment > getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 10 &&
                        moment <= getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 10 &&
                        getMoment(register.fechainiciocliente) >
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 10 &&
                        getMoment(register.fechainiciocliente) <=
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    {{
                      getMonth(register.fechafin) === 10
                        ? "F:" + getDate(register.fechafin)
                        : ""
                    }}
                  </td>
                  <td @click="handleShowAvtivity(register)">
                    {{
                      getMonth(register.fechainicio) === 11
                        ? "I:" + getDate(register.fechainicio) + " "
                        : ""
                    }}
                    <font-awesome-icon
                      v-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 11 &&
                        moment > getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 11 &&
                        moment <= getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 11 &&
                        getMoment(register.fechainiciocliente) >
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 11 &&
                        getMoment(register.fechainiciocliente) <=
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    {{
                      getMonth(register.fechafin) === 11
                        ? "F:" + getDate(register.fechafin)
                        : ""
                    }}
                  </td>
                  <td @click="handleShowAvtivity(register)">
                    {{
                      getMonth(register.fechainicio) === 0
                        ? "I:" + getDate(register.fechainicio) + " "
                        : ""
                    }}
                    <font-awesome-icon
                      v-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 0 &&
                        moment > getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 0 &&
                        moment <= getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 0 &&
                        getMoment(register.fechainiciocliente) >
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 0 &&
                        getMoment(register.fechainiciocliente) <=
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    {{
                      getMonth(register.fechafin) === 0
                        ? "F:" + getDate(register.fechafin)
                        : ""
                    }}
                  </td>
                  <td @click="handleShowAvtivity(register)">
                    {{
                      getMonth(register.fechainicio) === 1
                        ? "I:" + getDate(register.fechainicio) + " "
                        : ""
                    }}
                    <font-awesome-icon
                      v-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 1 &&
                        moment > getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 1 &&
                        moment <= getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 1 &&
                        getMoment(register.fechainiciocliente) >
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 1 &&
                        getMoment(register.fechainiciocliente) <=
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    {{
                      getMonth(register.fechafin) === 1
                        ? "F:" + getDate(register.fechafin)
                        : ""
                    }}
                  </td>
                  <td @click="handleShowAvtivity(register)">
                    {{
                      getMonth(register.fechainicio) === 2
                        ? "I:" + getDate(register.fechainicio) + " "
                        : ""
                    }}
                    <font-awesome-icon
                      v-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 2 &&
                        moment > getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        !register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 2 &&
                        moment <= getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 2 &&
                        getMoment(register.fechainiciocliente) >
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: red"
                    />
                    <font-awesome-icon
                      v-else-if="
                        register.fechainiciocliente &&
                        getMonth(register.fechainicio) === 2 &&
                        getMoment(register.fechainiciocliente) <=
                          getMoment(register.fechainicio)
                      "
                      icon="circle"
                      style="color: green"
                    />
                    {{
                      getMonth(register.fechafin) === 2
                        ? "F:" + getDate(register.fechafin)
                        : ""
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="addActivityModal">
      <div slot="modal-title">
        <font-awesome-icon icon="bookmark" style="color: green" />
        Agregar Actividad
      </div>
      <form ref="activityForm" id="activityForm" @submit="handleAddActivity">
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
        <!-- proposito -->
        <b-form-group
          label="Propósito"
          label-for="proposito-input"
          invalid-feedback="El propósito es requerido"
          :state="propositoState"
        >
          <b-form-input
            id="proposito-input"
            type="text"
            placeholder="Ingrese el propósito de la actividad"
            v-model="propositoSelected"
            :state="propositoState"
          ></b-form-input>
        </b-form-group>
        <br />
        <!-- fecha inicio -->
        <b-form-group
          label="Fecha Inicio"
          label-for="start-input"
          invalid-feedback="La fecha inicial es requerida"
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
        <!-- fecha fin -->
        <b-form-group
          label="Fecha Fin"
          label-for="end-input"
          invalid-feedback="La fecha final es requerida"
          :state="endDateState"
        >
          <b-form-datepicker
            id="example2-datepicker"
            :state="endDateState"
            v-model="endDateSelected"
            class="mb-2"
          ></b-form-datepicker>
        </b-form-group>
        <br />
        <!-- dependencia -->
        <b-form-group
          label="Dependencia"
          label-for="dependencia-input"
          :state="dependenciaState"
        >
          <select
            class="form-control"
            v-model="dependenciaSelected"
            :disabled="startDateSelected ? false : true"
            :state="dependenciaState"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option
              v-for="(dependencia, index) in getDependencias"
              v-bind:key="index"
              :value="dependencia.id"
            >
              {{ dependencia.actividad }} - {{ dependencia.proposito }}
            </option>
          </select>
        </b-form-group>
        <br />
        <!-- tipo -->
        <b-form-group
          label="Tipo"
          label-for="tipo-input"
          invalid-feedback="El tipo es requerido"
          :state="typeState"
        >
          <select
            class="form-control"
            v-model="typeSelected"
            :state="typeState"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option
              v-for="(tipo, index) in tipos"
              v-bind:key="index"
              :value="tipo.value"
            >
              {{ tipo.value }}
            </option>
          </select>
        </b-form-group>
        <!-- cantidad -->
        <br v-if="typeSelected === 'Aplicación'" />
        <b-form-group
          v-if="typeSelected === 'Aplicación'"
          label="Cantidad"
          label-for="cantidad-input"
          invalid-feedback="El cantidad es requerida"
          :state="cantidadState"
        >
          <b-form-input
            id="cantidad-input"
            type="number"
            placeholder="Ingrese la cantidad"
            v-model="cantidadSelected"
            :state="cantidadState"
          ></b-form-input>
        </b-form-group>
        <!-- medida -->
        <br v-if="typeSelected === 'Aplicación'" />
        <b-form-group
          v-if="typeSelected === 'Aplicación'"
          label="Medida"
          label-for="medida-input"
          invalid-feedback="La medida es requerida"
          :state="medidaState"
        >
          <select
            class="form-control"
            v-model="medidaSelected"
            :state="medidaState"
          >
            <option disabled selected>Seleccione una opción:</option>
            <option
              v-for="(medida, index) in medidas"
              v-bind:key="index"
              :value="medida.value"
            >
              {{ medida.value }}
            </option>
          </select>
        </b-form-group>
        <br />
        <p v-if="error" class="errorMessage">{{ error }}</p>
        <br v-if="error" />
      </form>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            type="submit"
            form="activityForm"
            variant="success"
            size="sm"
            class="float-right"
          >
            Agregar
          </b-button>
        </div>
      </template>
    </b-modal>
    <b-modal id="showActivityModal">
      <div slot="modal-title">
        <font-awesome-icon icon="bookmark" style="color: green" />
        Mostrar Actividad
      </div>
      <form ref="activityForm" id="activityForm" onsubmit="return false;">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td>Actividad:</td>
                  <td COLSPAN="3">{{ this.showRegister.actividad }}</td>
                </tr>
                <tr>
                  <td>Inicio:</td>
                  <td>
                    {{
                      this.showRegister.fechainicio
                        ? this.showRegister.fechainicio.split("T")[0]
                        : ""
                    }}
                  </td>
                  <td>Fin:</td>
                  <td>
                    {{
                      this.showRegister.fechafin
                        ? this.showRegister.fechafin.split("T")[0]
                        : ""
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Tipo:</td>
                  <td>{{ this.showRegister.tipo }}</td>
                </tr>
                <tr v-if="this.showRegister.registro_actividad">
                  <td>Depende:</td>
                  <td>
                    {{ this.showRegister.registro_actividad.actividad }}
                  </td>
                  <td>Finaliza:</td>
                  <td>
                    {{
                      this.showRegister.registro_actividad.fechafin
                        ? this.showRegister.registro_actividad.fechafin.split(
                            "T"
                          )[0]
                        : ""
                    }}
                  </td>
                </tr>
                <tr v-if="this.showRegister.tipo === 'Aplicación'">
                  <td>Cantidad:</td>
                  <td>{{ this.showRegister.cantidad }}</td>
                  <td>Medida:</td>
                  <td>{{ this.showRegister.medida }}</td>
                </tr>
                <tr>
                  <td>Propósito:</td>
                  <td COLSPAN="3">
                    {{ this.showRegister.proposito }}
                  </td>
                </tr>
                <tr>
                  <td>Inicio:</td>
                  <td>
                    {{
                      this.showRegister.fechainiciocliente
                        ? this.showRegister.fechainiciocliente.split("T")[0]
                        : "---"
                    }}
                  </td>
                  <td>Fin:</td>
                  <td>
                    {{
                      this.showRegister.fechafincliente
                        ? this.showRegister.fechafincliente.split("T")[0]
                        : "---"
                    }}
                  </td>
                </tr>
                <tr v-if="!showRegister.recursos">
                  <td>Recursos:</td>
                  <td>
                    <input
                      class="form-control"
                      type="number"
                      v-model="recursos"
                      :state="recursosState"
                      required
                      style="width: 80px"
                      min="0"
                    />
                  </td>
                  <td>Estado:</td>
                  <td>{{ this.showRegister.estado }}</td>
                </tr>
                <tr v-else>
                  <td>Recursos:</td>
                  <td>
                    {{ showRegister.recursos }}
                  </td>
                  <td>Estado:</td>
                  <td>{{ this.showRegister.estado }}</td>
                </tr>
                <tr
                  v-if="
                    !showRegister.observacion &&
                    !showRegister.fechainiciocliente &&
                    moment > getMoment(showRegister.fechainicio)
                  "
                >
                  <td>Obs:</td>
                  <td COLSPAN="3">
                    <textarea
                      class="form-control"
                      v-model="observacion"
                      minlength="10"
                      :state="observacionState"
                      required
                    ></textarea>
                  </td>
                </tr>
                <tr
                  v-else-if="
                    showRegister.observacion &&
                    moment > getMoment(showRegister.fechainicio)
                  "
                >
                  <td>Obs:</td>
                  <td COLSPAN="3">
                    {{ showRegister.observacion }}
                  </td>
                </tr>
                <tr v-if="errorModal">
                  <td COLSPAN="4">
                    <p class="errorMessage">{{ errorModal }}</p>
                  </td>
                </tr>
                <tr>
                  <td COLSPAN="2" class="floatCenter">
                    <b-button
                      v-if="showRegister.registro_actividad"
                      type="button"
                      form="activityForm"
                      variant="success"
                      size="lg"
                      class="float-right"
                      @click="handleUpdateActivity"
                      :disabled="
                        showRegister.registro_actividad.estado == 'Finalizado'
                          ? showRegister.estado != 'Proyectado'
                            ? true
                            : false
                          : true
                      "
                    >
                      Iniciar
                    </b-button>
                    <b-button
                      v-else
                      type="button"
                      form="activityForm"
                      variant="success"
                      size="lg"
                      class="float-right"
                      @click="handleUpdateActivity"
                      :disabled="
                        showRegister.estado != 'Proyectado' ? true : false
                      "
                    >
                      Iniciar
                    </b-button>
                  </td>
                  <td COLSPAN="2" class="floatCenter">
                    <b-button
                      type="button"
                      form="activityForm"
                      variant="warning"
                      size="lg"
                      class="float-right"
                      @click="handleFinishActivity"
                      :disabled="
                        showRegister.estado == 'Iniciado' ? false : true
                      "
                    >
                      Finalizar
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            type="button"
            form="activityForm"
            variant="success"
            size="sm"
            class="float-right"
            @click="$bvModal.hide('showActivityModal')"
          >
            Cerrar
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {
  ACTIVITIES_GET_ACTIVIDADES,
  ACTIVITIES_GET_REGISTROS,
  ACTIVITIES_GET_DEPENDENCIAS
} from "./constants/querys";
import {
  ACTIVITIES_CREATE_REGISTER,
  ACTIVITIES_UPDATE_REGISTER,
  ACTIVITIES_UPDATE_FINISH_REGISTER
} from "./constants/mutations";
import moment from "moment";

export default {
  name: "Activities",
  props: ["user", "campoSelected"],
  data() {
    return {
      fields: [
        "Actividad",
        "Propósito",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
        "enero",
        "febrero",
        "marzo"
      ],
      items: [],
      error: "",
      errorModal: "",
      actividades: [],
      activitySelected: "",
      activityState: null,
      propositoSelected: "",
      propositoState: null,
      startDateSelected: "",
      startDateState: null,
      endDateSelected: "",
      endDateState: null,
      tipos: [
        { value: "Mantención", text: "Mantención" },
        { value: "Aplicación", text: "Aplicación" }
      ],
      typeSelected: "",
      typeState: null,
      cantidadSelected: "",
      cantidadState: null,
      medidas: [
        { value: "Litros", text: "Litros" },
        { value: "Kilos", text: "Kilos" }
      ],
      medidaSelected: "",
      medidaState: null,
      registroActividads: [],
      thisYear: new Date().getFullYear(),
      showRegister: "",
      dependenciaState: "",
      dependenciaSelected: null,
      moment: moment(),
      observacion: "",
      observacionState: null,
      recursos: null,
      recursosState: null,
      dismissCountDown: 0,
      typeNotification: "",
      messageNotification: ""
    };
  },
  apollo: {
    actividades: {
      query: ACTIVITIES_GET_ACTIVIDADES
    },
    registroActividads: {
      query: ACTIVITIES_GET_REGISTROS,
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
    async handleAddActivity(e) {
      e.preventDefault();
      let validate = true;
      const activity = this.activitySelected;
      const proposito = this.propositoSelected;
      const startDate = this.startDateSelected;
      const endDate = this.endDateSelected;
      const type = this.typeSelected;
      const cantidad = this.cantidadSelected;
      const medida = this.medidaSelected;
      this.activityState = true;
      this.propositoState = true;
      this.startDateState = true;
      this.endDateState = true;
      this.typeState = true;
      this.cantidadState = true;
      this.medidaState = true;
      this.error = "";
      const now = new Date();
      const campoId = this.campoSelected.id;
      const dependenciaId = this.dependenciaSelected;
      const estado = "Proyectado";

      if (!activity) {
        validate = false;
        this.activityState = false;
      }
      if (!proposito) {
        validate = false;
        this.propositoState = false;
      }
      if (!startDate) {
        validate = false;
        this.startDateState = false;
      }
      if (!endDate) {
        validate = false;
        this.endDateState = false;
      }
      if (!type) {
        validate = false;
        this.typeState = false;
      }
      if (type && type === "Aplicación") {
        if (!cantidad) {
          validate = false;
          this.cantidadState = false;
        }
        if (!medida) {
          validate = false;
          this.medidaState = false;
        }
      }
      if (startDate && startDate < now.toISOString().split("T")[0]) {
        validate = false;
        this.error = "La fecha inicial debe ser mayor o igual al dia actual";
      }
      if (startDate && endDate && endDate <= startDate) {
        validate = false;
        this.error = "La fecha final debe ser mayor a la fecha inicial";
      }

      if (validate) {
        if (confirm("¿Desea agregar la nueva actividad?")) {
          await this.$apollo
            .mutate({
              mutation: ACTIVITIES_CREATE_REGISTER,
              variables: {
                activity,
                proposito,
                startDate: moment(startDate),
                endDate: moment(endDate),
                type,
                cantidad,
                medida,
                campoId,
                dependenciaId,
                estado
              }
            })
            .then(data => {
              this.registroActividads.unshift(
                data.data.createRegistroActividad.registroActividad
              );
              this.activitySelected = "";
              this.propositoSelected = "";
              this.startDateSelected = "";
              this.endDateSelected = "";
              this.typeSelected = "";
              this.cantidadSelected = "";
              this.medidaSelected = "";
              this.dependenciaSelected = null;
              this.activityState = null;
              this.propositoState = null;
              this.startDateState = null;
              this.endDateState = null;
              this.typeState = null;
              this.cantidadState = null;
              this.medidaState = null;
              this.dependenciaSelected = null;
              this.error = "";
              this.$root.$emit("bv::hide::modal", "addActivityModal");
              this.showAlert("success", 5, "Actividad creada exitosamente.");
            })
            .catch(() => {
              this.showAlert("danger", 5, "La Actividad no pudo ser creada.");
            });
        }
      }
    },
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
    handleShowAvtivity(register) {
      this.showRegister = register;
      this.$root.$emit("bv::show::modal", "showActivityModal");
    },
    async handleUpdateActivity(e) {
      e.preventDefault;
      let validate = true;
      const observacion = this.observacion;
      const recursos = this.recursos;
      this.observacionState = true;
      this.recursosState = true;
      this.error = "";

      if (
        moment() > this.getMoment(this.showRegister.fechainicio) &&
        !observacion
      ) {
        validate = false;
        this.observacionState = false;
        this.errorModal = "Debes agregar una observación valida.";
      }
      if (!recursos) {
        validate = false;
        this.recursosState = false;
        this.errorModal = "Debes agregar los recursos.";
      }

      if (validate) {
        if (confirm("¿Desea iniciar la actividad?")) {
          await this.$apollo
            .mutate({
              mutation: ACTIVITIES_UPDATE_REGISTER,
              variables: {
                id: this.showRegister.id,
                estado: "Iniciado",
                recursos: Number(recursos),
                observacion,
                startDate: moment()
              },
              refetchQueries: [
                {
                  query: ACTIVITIES_GET_REGISTROS,
                  variables: {
                    campo: this.campoSelected.id,
                    startDate: this.thisYear + "-04-01",
                    endDate: this.thisYear + 1 + "-03-31"
                  }
                }
              ]
            })
            .then(data => {
              this.showRegister =
                data.data.updateRegistroActividad.registroActividad;
              this.observacion = "";
              this.recursos = null;
              this.recursosState = null;
              this.observacionState = null;
              this.error = "";
              this.errorModal = "";
              //this.$root.$emit("bv::hide::modal", "showActivityModal");
            })
            .catch(({ graphQLErrors }) => {
              this.observacion = "";
              this.recursos = null;
              this.recursosState = null;
              this.observacionState = null;
              this.error = "";
              this.errorModal = "";
              graphQLErrors.map(
                ({ extensions }) => console.log(extensions.exception)
                /* extensions.exception.data.message.map(({ messages }) =>
                  messages.map(({ message }) => (this.error = message))
                ) */
              );
            });
        }
      }
    },
    async handleFinishActivity(e) {
      e.preventDefault;
      let validate = true;
      const campoId = this.campoSelected.id;
      this.error = "";
      const id = this.showRegister.id;
      const endDate = moment();
      const estado = "Finalizado";

      if (validate) {
        if (confirm("¿Desea finalizar la actividad?")) {
          await this.$apollo
            .mutate({
              mutation: ACTIVITIES_UPDATE_FINISH_REGISTER,
              variables: {
                id,
                estado,
                endDate
              },
              refetchQueries: [
                {
                  query: ACTIVITIES_GET_REGISTROS,
                  variables: {
                    campo: campoId,
                    startDate: this.thisYear + "-04-01",
                    endDate: this.thisYear + 1 + "-03-31"
                  }
                }
              ]
            })
            .then(data => {
              this.showRegister =
                data.data.updateRegistroActividad.registroActividad;
              this.observacion = "";
              this.recursos = null;
              this.recursosState = null;
              this.observacionState = null;
              this.error = "";
              this.errorModal = "";
              //this.$root.$emit("bv::hide::modal", "showActivityModal");
            })
            .catch(({ graphQLErrors }) => {
              this.observacion = "";
              this.recursos = null;
              this.recursosState = null;
              this.observacionState = null;
              this.error = "";
              this.errorModal = "";
              graphQLErrors.map(
                ({ extensions }) => console.log(extensions.exception)
                /* extensions.exception.data.message.map(({ messages }) =>
                  messages.map(({ message }) => (this.error = message))
                ) */
              );
            });
        }
      }
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
  asyncComputed: {
    async getDependencias() {
      let dependencias = [];

      if (this.startDateSelected) {
        await this.$apollo
          .query({
            query: ACTIVITIES_GET_DEPENDENCIAS,
            variables: {
              campo: this.campoSelected.id,
              startDate: this.thisYear + "-04-01",
              endDate: moment(this.startDateSelected)
            }
          })
          .then(data => {
            dependencias = data.data.registroActividads;
          });
      }

      return dependencias;
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
