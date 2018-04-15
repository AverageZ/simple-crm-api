import * as casual from 'casual';
import { findAddedNonNullDirectiveArgs } from 'graphql/utilities/findBreakingChanges';

function createClients(num: number) {
  const result = [];

  for (let i = 0; i < num; i++) {
    result.push({
      email: casual.email,
      firstName: casual.first_name,
      id: casual.uuid,
      lastName: casual.last_name,
      phone: casual.phone,
      status: casual.random_element(['stale', 'active', 'new']),
      updated: casual.date('YYYY-MM-DD hh:mm'),
    });
  }

  return result;
}

function createOrgs(num: number) {
  const result = [];

  for (let i = 0; i < num; i++) {
    result.push({
      email: casual.email,
      id: casual.uuid,
      name: casual.company_name,
      phone: casual.phone,
      updated: casual.date('YYYY-MM-DD hh:mm'),
    });
  }

  return result;
}

const mockData = {
  clients: createClients(5),
  organizations: createOrgs(3),
};

const resolvers = {
  Query: {
    client(/* root, args */) {
      return mockData.clients.find((c: IClient) => c.id === args.id);
    },
    clients() {
      return mockData.clients;
    },

    organization(/* root, args */) {
      return mockData.organizations.find((o: IOrganization) => o.id === args.id);
    },
    organizations() {
      return mockData.organizations;
    },
  },
};

export default resolvers;
