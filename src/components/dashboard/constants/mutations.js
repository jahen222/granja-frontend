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
  mutation updateCuidadoArbole($id: ID!, $estado: String!) {
    updateCuidadoArbole(
      input: { where: { id: $id }, data: { estado: $estado } }
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
  mutation deleteCuidadoArbole($id: ID!) {
    deleteCuidadoArbole(input: { where: { id: $id } }) {
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

export const VENTA_CREATE_VENTA = gql`
  mutation createVenta(
    $producto: ID!
    $calidad: String!
    $cantidad: Int!
    $valorKilo: Float!
    $total: Float!
    $factura: String!
    $formaPago: ID!
    $cheque: String
    $campo: ID!
  ) {
    createVenta(
      input: {
        data: {
          producto: $producto
          calidad: $calidad
          cantidad: $cantidad
          valorkilo: $valorKilo
          total: $total
          factura: $factura
          forma_pago: $formaPago
          cheque: $cheque
          campo: $campo
        }
      }
    ) {
      venta {
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
      }
    }
  }
`;

export const VENTAS_DELETE_VENTAS = gql`
  mutation deleteVenta($id: ID!) {
    deleteVenta(input: { where: { id: $id } }) {
      venta {
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
      }
    }
  }
`;

export const COMPRAS_CREATE_COMPRAS = gql`
  mutation createCompra(
    $producto: ID!
    $centrocosto: ID!
    $cantidad: Int!
    $valorunitario: Float!
    $total: Float!
    $factura: String!
    $formaPago: ID!
    $cheque: String
    $campo: ID!
    $guia: String!
    $unidad: String!
  ) {
    createCompra(
      input: {
        data: {
          producto: $producto
          cantidad: $cantidad
          centrocosto: $centrocosto
          valorunitario: $valorunitario
          total: $total
          factura: $factura
          forma_pago: $formaPago
          cheque: $cheque
          campo: $campo
          guia: $guia
          unidad: $unidad
        }
      }
    ) {
      compra {
        id
        producto {
          id
          nombre
        }
        centrocosto {
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
      }
    }
  }
`;

export const COMPRAS_DELETE_COMPRAS = gql`
  mutation deleteCompra($id: ID!) {
    deleteCompra(input: { where: { id: $id } }) {
      compra {
        id
        producto {
          id
          nombre
        }
        centrocosto {
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
      }
    }
  }
`;
