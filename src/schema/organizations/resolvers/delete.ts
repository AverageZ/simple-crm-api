import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

interface IOrganizationWriteResult extends r.WriteResult {
  changes: Array<{ new_val: IOrganization, old_val: IOrganization }>;
}

export function deleteOrganization(_: any, args: IOrganization): Promise<IOrganization | string> {
  const Connector = new Ctr({ db: 'test', table: 'organizations' });

  return new Promise((resolve: (result: IOrganization) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .get(args.id)
          .delete({ returnChanges: true })
          .run(conn, (runError: Error, result: IOrganizationWriteResult) => {
            conn.close();

            if (runError) {
              throw runError;
            }

            resolve(result.changes[0].old_val);
          });
      }).catch(reject);
  });
}
