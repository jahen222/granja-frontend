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
        observacionfinal
        created_at
      }
    }
  }
`;

export const ACTIVITIES_UPDATE_REGISTER = gql`
  mutation updateRegistroActividad(
    $id: ID!
    $estado: String!
    $observacion: String
    $startDate: DateTime!
  ) {
    updateRegistroActividad(
      input: {
        where: { id: $id }
        data: {
          observacion: $observacion
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
        observacionfinal
        created_at
      }
    }
  }
`;

export const ACTIVITIES_UPDATE_FINISH_REGISTER = gql`
  mutation updateRegistroActividad(
    $id: ID!
    $estado: String!
    $endDate: DateTime!
    $recursos: Int!
    $observacionfinal: String
  ) {
    updateRegistroActividad(
      input: {
        where: { id: $id }
        data: {
          estado: $estado
          observacionfinal: $observacionfinal
          fechafincliente: $endDate
          recursos: $recursos
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
        observacionfinal
        created_at
      }
    }
  }
`;

export const CUIDADO_CREATE_ACTIVIDAD = gql`
  mutation createCuidadoArbole(
    $arbol: String
    $camellone: String
    $zona: ID!
    $actividad: String!
    $descripcion: String!
    $estado: String!
  ) {
    createCuidadoArbole(
      input: {
        data: {
          zona: $zona
          camellone: $camellone
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
        zona {
          id
          numero
          campo {
            id
          }
        }
        camellone
        arbol
        created_at
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
        zona {
          id
          numero
          campo {
            id
          }
        }
        camellone
        arbol
        created_at
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
        zona {
          id
          numero
          campo {
            id
          }
        }
        camellone
        arbol
        created_at
      }
    }
  }
`;

export const VENTA_CREATE_VENTA = gql`
  mutation createVenta(
    $producto: ID!
    $proveedor: ID!
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
          producto_cosecha: $producto
          cliente: $proveedor
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
        producto_cosecha {
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
        created_at
      }
    }
  }
`;

export const VENTAS_DELETE_VENTAS = gql`
  mutation deleteVenta($id: ID!) {
    deleteVenta(input: { where: { id: $id } }) {
      venta {
        id
        producto_cosecha {
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
        created_at
      }
    }
  }
`;

export const COMPRAS_CREATE_COMPRAS = gql`
  mutation createCompra(
    $producto: ID!
    $proveedor: ID!
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
          proveedore: $proveedor
          cantidad: $cantidad
          centro_costo: $centrocosto
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
        created_at
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
        created_at
      }
    }
  }
`;

export const COMPRAS_CREATE_PRODUCTO = gql`
  mutation createProducto($nombre: String!) {
    createProducto(input: { data: { nombre: $nombre } }) {
      producto {
        id
        nombre
      }
    }
  }
`;

export const COMPRAS_UPDATE_FACTURA = gql`
  mutation updateCompra($factura: String!, $id: ID!) {
    updateCompra(input: { where: { id: $id }, data: { factura: $factura } }) {
      compra {
        id
      }
    }
  }
`;

export const COSECHA_CREATE_COSECHA = gql`
  mutation createCosecha(
    $producto: ID!
    $zona: ID!
    $unidad: String!
    $cantidad: Int!
    $arboles: Int!
    $ha: Float!
    $kilosxhectarea: Float!
    $kilosxarbol: Float!
    $campo: ID!
    $vin: Float
  ) {
    createCosecha(
      input: {
        data: {
          producto_cosecha: $producto
          zona_cosecha: $zona
          unidad: $unidad
          cantidad: $cantidad
          arboles: $arboles
          ha: $ha
          kilosxhectarea: $kilosxhectarea
          kilosxarbol: $kilosxarbol
          campo: $campo
          vin: $vin
        }
      }
    ) {
      cosecha {
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
        campo {
          id
        }
        vin
        created_at
      }
    }
  }
`;

export const COSECHA_DELETE_COSECHA = gql`
  mutation deleteCosecha($id: ID!) {
    deleteCosecha(input: { where: { id: $id } }) {
      cosecha {
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
        campo {
          id
        }
        vin
        created_at
      }
    }
  }
`;

export const HONORARIOS_CREATE_HONORARIOS = gql`
  mutation createHonorario(
    $profesional: ID!
    $descripcion: String!
    $monto: Float!
    $startDate: DateTime!
    $factura: String
    $campo: ID!
    $tipo: String!
  ) {
    createHonorario(
      input: {
        data: {
          profesionale: $profesional
          descripcion: $descripcion
          boleta: $factura
          monto: $monto
          fecha: $startDate
          campo: $campo
          tipo: $tipo
        }
      }
    ) {
      honorario {
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
        created_at
      }
    }
  }
`;

export const HONORARIOS_DELETE_HONORARIO = gql`
  mutation deleteHonorario($id: ID!) {
    deleteHonorario(input: { where: { id: $id } }) {
      honorario {
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
        created_at
      }
    }
  }
`;

export const GASTO_CREATE_GASTO = gql`
  mutation createGastosGenerale(
    $proveedor: ID!
    $descripcion: String!
    $cantidad: Int!
    $startDate: DateTime!
    $unidad: String!
    $precio: Float!
    $documento: String!
    $tipoDocumento: String!
    $total: Float!
    $campo: ID!
  ) {
    createGastosGenerale(
      input: {
        data: {
          proveedore: $proveedor
          descripcion: $descripcion
          cantidad: $cantidad
          total: $total
          fecha: $startDate
          unidad: $unidad
          precio: $precio
          documento: $documento
          tipo_documento: $tipoDocumento
          campo: $campo
        }
      }
    ) {
      gastosGenerale {
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
        created_at
      }
    }
  }
`;

export const GASTO_DELETE_GASTO = gql`
  mutation deleteGastosGenerale($id: ID!) {
    deleteGastosGenerale(input: { where: { id: $id } }) {
      gastosGenerale {
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
        created_at
      }
    }
  }
`;
