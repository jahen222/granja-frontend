import gql from "graphql-tag";

export const ACTIVITIES_GET_ACTIVIDADES = gql`
  query actividades {
    actividades {
      id
      nombre
    }
  }
`;

export const ACTIVITIES_GET_REGISTROS = gql`
  query registroActividads($campo: ID, $startDate: Date!, $endDate: Date!) {
    registroActividads(
      sort: "id:desc"
      where: {
        campo: { id_contains: $campo }
        fechainicio_gte: $startDate
        fechafin_lte: $endDate
      }
    ) {
      id
      actividad
      fechainicio
      fechafin
      proposito
      tipo
      cantidad
      medida
      campo {
        id
        nombre
      }
      registro_actividad {
        id
        actividad
        proposito
        fechafin
        estado
      }
      estado
      fechainiciocliente
      fechafincliente
      observacion
      recursos
      observacionfinal
    }
  }
`;

export const ACTIVITIES_GET_DEPENDENCIAS = gql`
  query registroActividads(
    $campo: ID!
    $startDate: Date!
    $endDate: DateTime!
  ) {
    registroActividads(
      sort: "id:desc"
      where: {
        campo: { id_contains: $campo }
        fechainicio_gte: $startDate
        fechafin_lte: $endDate
      }
    ) {
      id
      actividad
      fechainicio
      fechafin
      proposito
      tipo
      cantidad
      medida
      campo {
        id
        nombre
      }
      registro_actividad {
        id
        actividad
        proposito
        fechafin
      }
    }
  }
`;

export const ACTIVITIES_GET_REGISTROS_CLIENTE = gql`
  query registroActividads($campo: ID, $startDate: Date!, $endDate: Date!) {
    registroActividads(
      sort: "id:desc"
      where: {
        campo: { id_contains: $campo }
        fechainicio_gte: $startDate
        fechafin_lte: $endDate
      }
    ) {
      id
      actividad
      fechainicio
      fechafin
      proposito
      tipo
      cantidad
      medida
      campo {
        id
        nombre
      }
      registro_actividad {
        id
        actividad
        proposito
        fechafin
        estado
      }
      estado
      fechainiciocliente
      fechafincliente
      observacion
      recursos
    }
  }
`;

export const ARBOLES_GET_CUIDADO = gql`
  query cuidadoArboles($campo: ID) {
    cuidadoArboles(
      sort: "id:desc"
      where: { zona: { campo: { id_contains: $campo } } }
    ) {
      id
      actividad
      estado
      descripcion
      zona {
        id
        numero
        campo {
          id
        }
      }
      camellone
      arbol
    }
  }
`;

export const ARBOLES_GET_ZONAS = gql`
  query zonas($campo: ID) {
    zonas(sort: "numero:asc", where: { campo: { id_contains: $campo } }) {
      id
      numero
      campo {
        id
      }
    }
  }
`;

export const ARBOLES_GET_CAMELLONES = gql`
  query camellones($zona: ID) {
    camellones(sort: "numero:asc", where: { zona: { id_contains: $zona } }) {
      id
      numero
      zona {
        id
      }
    }
  }
`;

export const ARBOLES_GET_ARBOLS = gql`
  query arbols($camellone: ID) {
    arbols(
      sort: "numero:asc"
      where: { camellone: { id_contains: $camellone } }
    ) {
      id
      numero
      camellone {
        id
      }
    }
  }
`;

export const VENTAS_GET_VENTAS = gql`
  query ventas($campo: ID) {
    ventas(sort: "id:desc", where: { campo: { id_contains: $campo } }) {
      id
      producto {
        id
        nombre
      }
      calidad
      cantidad
      valorkilo
      total
      factura
      forma_pago {
        id
        nombre
      }
      cheque
      campo {
        id
      }
      cliente {
        id
        nombre
      }
    }
  }
`;

export const VENTAS_GET_PRODUCTOS = gql`
  query productos {
    productos(sort: "id:asc") {
      id
      nombre
    }
  }
`;

export const VENTAS_GET_FORMAPAGOS = gql`
  query formaPagos {
    formaPagos(sort: "id:asc") {
      id
      nombre
    }
  }
`;

export const VENTAS_GET_CLIENTES = gql`
  query clientes {
    clientes(sort: "id:asc") {
      id
      nombre
    }
  }
`;

export const COMPRAS_GET_COMPRAS = gql`
  query compras($campo: ID) {
    compras(sort: "id:desc", where: { campo: { id_contains: $campo } }) {
      id
      producto {
        id
        nombre
      }
      centro_costo {
        id
        nombre
      }
      cantidad
      unidad
      valorunitario
      total
      guia
      factura
      forma_pago {
        id
        nombre
      }
      cheque
      campo {
        id
      }
      proveedore {
        id
        nombre
      }
    }
  }
`;

export const VENTAS_GET_CENTRO_COSTOS = gql`
  query centroCostos {
    centroCostos(sort: "id:asc") {
      id
      nombre
    }
  }
`;

export const COSECHA_GET_PRODUCTOS_COSECHAS = gql`
  query productoCosechas {
    productoCosechas(sort: "id:asc") {
      id
      nombre
    }
  }
`;

export const COSECHA_GET_ZONAS_COSECHAS = gql`
  query zonaCosechas($productoId: ID) {
    zonaCosechas(
      sort: "nombre:asc"
      where: { producto_cosecha: { id_contains: $productoId } }
    ) {
      id
      nombre
    }
  }
`;

export const COSECHA_GET_COSECHA = gql`
  query cosechas($campo: ID) {
    cosechas(sort: "id:desc", where: { campo: { id_contains: $campo } }) {
      id
      producto_cosecha {
        id
        nombre
      }
      zona_cosecha {
        id
        nombre
      }
      cantidad
      unidad
      arboles
      ha
      kilosxarbol
      kilosxhectarea
      vin
      campo {
        id
      }
    }
  }
`;

export const HONORARIOS_GET_PROFESIONALES = gql`
  query profesionales {
    profesionales(sort: "id:asc") {
      id
      nombre
    }
  }
`;

export const HONORARIOS_GET_HONORARIOS = gql`
  query honorarios($campo: ID) {
    honorarios(sort: "id:desc", where: { campo: { id_contains: $campo } }) {
      id
      profesionale {
        id
        nombre
      }
      descripcion
      boleta
      monto
      fecha
      campo {
        id
      }
      tipo
    }
  }
`;

export const GASTOS_GET_PROVEEDORES = gql`
  query proveedores {
    proveedores(sort: "id:asc") {
      id
      nombre
    }
  }
`;

export const GASTOS_GET_GASTOS = gql`
  query gastosGenerales($campo: ID) {
    gastosGenerales(
      sort: "id:desc"
      where: { campo: { id_contains: $campo } }
    ) {
      id
      proveedore {
        id
        nombre
      }
      descripcion
      cantidad
      total
      fecha
      unidad
      precio
      documento
      tipo_documento
      campo {
        id
      }
    }
  }
`;

export const GASTOS_GET_UNIDADES = gql`
  query unidadesGastos {
    unidadesGastos(sort: "id:asc") {
      id
      nombre
    }
  }
`;
