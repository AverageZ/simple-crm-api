import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

interface IContactWriteResult extends r.WriteResult {
  changes: Array<{ new_val: IContact, old_val: IContact }>;
}

export function updateContact(_: any, args: IContact): Promise<IContact | string> {
  const Connector = new Ctr({ db: 'test', table: 'contacts' });
  const { id, ...updates } = args;

  return new Promise((resolve: (result: IContact) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .get(id)
          .update(updates, { returnChanges: true })
          .run(conn, (runError: Error, result: IContactWriteResult) => {
            conn.close();

            if (runError) {
              throw runError;
            }

            if (result.changes.length) {
              resolve(result.changes[0].new_val);
            }

            resolve(null);
          });
      }).catch(reject);
  });
}
