import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

interface IClientWriteResult extends r.WriteResult {
  changes: Array<{ new_val: IClient, old_val: IClient }>;
}

export function updateClient(_: any, args: IClient): Promise<IClient | string> {
  const Connector = new Ctr({ db: 'test', table: 'clients' });
  const { id, ...updates } = args;

  return new Promise((resolve: (result: IClient) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .get(id)
          .update(updates, { returnChanges: true })
          .run(conn, (runError: Error, result: IClientWriteResult) => {
            conn.close();

            if (runError) {
              throw runError;
            }

            resolve(result.changes[0].new_val);
          });
      }).catch(reject);
  });
}
