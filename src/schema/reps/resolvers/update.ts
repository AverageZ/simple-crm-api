import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

interface IRepWriteResult extends r.WriteResult {
  changes: Array<{ new_val: IRep, old_val: IRep }>;
}

export function updateRep(_: any, args: IRep): Promise<IRep | string> {
  const Connector = new Ctr({ db: 'test', table: 'organizations' });
  const { id, ...updates } = args;

  return new Promise((resolve: (result: IRep) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .get(id)
          .update(updates, { returnChanges: true })
          .run(conn, (runError: Error, result: IRepWriteResult) => {
            conn.close();

            if (runError) {
              throw runError;
            }

            resolve(result.changes[0].new_val);
          });
      }).catch(reject);
  });
}
