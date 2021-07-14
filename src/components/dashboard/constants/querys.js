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
      where: {
        arbol: { camellone: { zona: { campo: { id_contains: $campo } } } }
      }
    ) {
      id
      actividad
      estado
      descripcion
      arbol {
        id
        numero
        tipo
        camellone {
          id
          numero
          zona {
            id
            numero
            campo {
              id
            }
          }
        }
      }
    }
  }
`;

export const ARBOLES_GET_ZONAS = gql`
  query zonas($campo: ID) {
    zonas(
      sort: "numero:asc"
      where: { campo: { id_contains: $campo } }
    ) {
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
    camellones(
      sort: "numero:asc"
      where: { zona: { id_contains: $zona } }
    ) {
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
