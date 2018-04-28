import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

interface IOrganizationWriteResult extends r.WriteResult {
  changes: Array<{ new_val: IOrganization, old_val: IOrganization }>;
}

export function createOrganization(_: any, args: IOrganization): Promise<IOrganization | string> {
  const Connector = new Ctr({ db: 'test', table: 'organizations' });

  return new Promise((resolve: (result: IOrganization) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .insert(args, { returnChanges: true })
          .run(conn, (runError: Error, result: IOrganizationWriteResult) => {
            conn.close();

            if (runError) {
              throw runError;
            }

            resolve(result.changes[0].new_val);
          });
      }).catch(reject);
  });
}
