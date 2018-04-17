import * as casual from 'casual';

function createClientFields(): IClient {
  return {
    email: casual.email,
    firstName: casual.first_name,
    id: casual.uuid,
    lastName: casual.last_name,
    phone: casual.phone,
    status: casual.random_element(['stale', 'active', 'new']),
    updated: casual.date('YYYY-MM-DD hh:mm'),
  };
}

function createOrgFields(): IOrganization {
  return {
    email: casual.email,
    id: casual.uuid,
    name: casual.company_name,
    phone: casual.phone,
    updated: casual.date('YYYY-MM-DD hh:mm'),
  };
}

function createClients(num: number): IClient[] {
  const result = [];

  for (let i = 0; i < num; i++) {
    result.push(createClientFields());
  }

  return result;
}

function createOrgs(num: number): IOrganization[] {
  const result = [];

  for (let i = 0; i < num; i++) {
    result.push(createOrgFields());
  }

  return result;
}

const mockData = {
  clients: createClients(5),
  organizations: createOrgs(3),
};

const resolvers = {
  Query: {
    client(_: any, args: IClient) {
      return mockData.clients.find((c: IClient) => c.id === args.id);
    },
    clients() {
      return mockData.clients;
    },

    organization(_: any, args: IOrganization) {
      return mockData.organizations.find((o: IOrganization) => o.id === args.id);
    },
    organizations() {
      return mockData.organizations;
    },
  },

  Mutation: {
    addClient(_: any, args: IClient): IClient {
      const newClient = {
        ...createClientFields(),
        ...args,
      };

      mockData.clients.push(newClient);

      return newClient;
    },
    updateClient(_: any, args: IClient): IClient {
      const client = {
        ...mockData.clients.find((c: IClient) => c.id === args.id),
        ...args,
        updated: casual.date('YYYY-MM-DD hh:mm'),
      };

      mockData.clients = mockData.clients.map((c: IClient) => {
        if (c.id === args.id) {
          return client;
        }

        return c;
      });

      return client;
    },
    deleteClient(_: any, args: IClient): IClient {
      const clientToDelete = mockData.clients.find((c: IClient) => c.id === args.id);

      mockData.clients = mockData.clients.filter((c: IClient) => c.id !== args.id);

      return clientToDelete;
    },

    /**
     * Organizations
     */
    addOrganization(_: any, args: IOrganization): IOrganization {
      const newOrg = {
        ...createOrgFields(),
        ...args,
      };

      mockData.organizations.push(newOrg);

      return newOrg;
    },
    updateOrganization(_: any, args: IOrganization): IOrganization {
      const org = {
        ...mockData.organizations.find((o: IOrganization) => o.id === args.id),
        ...args,
        updated: casual.date('YYYY-MM-DD hh:mm'),
      };

      mockData.organizations = mockData.organizations.map((o: IOrganization) => {
        if (o.id === args.id) {
          return org;
        }

        return o;
      });

      return org;
    },
    deleteOrganization(_: any, args: IOrganization): IOrganization {
      const orgToDelete = mockData.organizations.find((o: IOrganization) => o.id === args.id);

      mockData.organizations = mockData.organizations.filter((o: IOrganization) => o.id !== args.id);

      return orgToDelete;
    },
  },
};

export default resolvers;
