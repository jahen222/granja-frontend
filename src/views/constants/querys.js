import gql from "graphql-tag";

export const LANDING_GET_ME = gql`
  query me {
    me {
      id
      username
      email
      role {
        id
        name
      }
    }
  }
`;

export const DASHBOARD_GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      username
      email
      role {
        id
        name
      }
      campo{
        id
        nombre
      }
    }
  }
`;

export const DASHBOARD_GET_CAMPOS = gql`
  query campos {
    campos {
      id
      nombre
    }
  }
`;
