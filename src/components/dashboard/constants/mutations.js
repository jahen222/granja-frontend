import gql from "graphql-tag";

export const ACTIVITIES_CREATE_REGISTER = gql`
  mutation createRegistroActividad(
    $activity: String!
    $proposito: String!
    $startDate: DateTime!
    $endDate: DateTime!
    $type: String!
    $cantidad: String
    $medida: String
    $campoId: ID!
    $dependenciaId: ID
    $estado: String!
  ) {
    createRegistroActividad(
      input: {
        data: {
          actividad: $activity
          proposito: $proposito
          fechainicio: $startDate
          fechafin: $endDate
          tipo: $type
          cantidad: $cantidad
          medida: $medida
          campo: $campoId
          registro_actividad: $dependenciaId
          estado: $estado
        }
      }
    ) {
      registroActividad {
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
  }
`;

export const ACTIVITIES_UPDATE_REGISTER = gql`
  mutation updateRegistroActividad(
    $id: ID!
    $estado: String!
    $recursos: Int!
    $observacion: String
    $startDate: DateTime!
  ) {
    updateRegistroActividad(
      input: {
        where: { id: $id }
        data: {
          observacion: $observacion
          recursos: $recursos
          estado: $estado
          fechainiciocliente: $startDate
        }
      }
    ) {
      registroActividad {
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
        estado
        fechainiciocliente
        fechafincliente
        observacion
        recursos
      }
    }
  }
`;

export const ACTIVITIES_UPDATE_FINISH_REGISTER = gql`
  mutation updateRegistroActividad(
    $id: ID!
    $estado: String!
    $endDate: DateTime!
  ) {
    updateRegistroActividad(
      input: {
        where: { id: $id }
        data: { estado: $estado, fechafincliente: $endDate }
      }
    ) {
      registroActividad {
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
        estado
        fechainiciocliente
        fechafincliente
        observacion
        recursos
      }
    }
  }
`;

export const CUIDADO_CREATE_ACTIVIDAD = gql`
  mutation createCuidadoArbole(
    $arbol: ID!
    $actividad: String!
    $descripcion: String!
    $estado: String!
  ) {
    createCuidadoArbole(
      input: {
        data: {
          arbol: $arbol
          descripcion: $descripcion
          actividad: $actividad
          estado: $estado
        }
      }
    ) {
      cuidadoArbole {
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
  }
`;

export const CUIDADO_UPDATE_ACTIVIDAD = gql`
  mutation updateCuidadoArbole(
    $id: ID!
    $estado: String!
  ) {
    updateCuidadoArbole(
      input: {
        where: { id: $id }
        data: {
          estado: $estado
        }
      }
    ) {
      cuidadoArbole {
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
  }
`;

export const CUIDADO_DELETE_ACTIVIDAD = gql`
  mutation deleteCuidadoArbole(
    $id: ID!
  ) {
    deleteCuidadoArbole(
      input: {
        where: { id: $id }
      }
    ) {
      cuidadoArbole {
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
  }
`;