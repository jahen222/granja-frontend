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
  query registroActividads($campo: ID!, $startDate: Date!, $endDate: DateTime!) {
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
