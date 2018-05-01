import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

interface IContactWriteResult extends r.WriteResult {
  changes: Array<{ new_val: IContact, old_val: IContact }>;
}

export function createContact(_: any, args: IContact): Promise<IContact | string> {
  const Connector = new Ctr({ db: 'test', table: 'contacts' });

  return new Promise((resolve: (result: IContact) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .insert(args, { returnChanges: true })
          .run(conn, (runError: Error, result: IContactWriteResult) => {
            conn.close();

            if (runError) {
              throw runError;
            }

            resolve(result.changes[0].new_val);
          });
      }).catch(reject);
  });
}
