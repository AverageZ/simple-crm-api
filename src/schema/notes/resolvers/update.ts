import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

interface INoteWriteResult extends r.WriteResult {
  changes: Array<{ new_val: INote, old_val: INote }>;
}

export function updateNote(_: any, args: INote): Promise<INote | string> {
  const Connector = new Ctr({ db: 'test', table: 'notes' });
  const { id, ...updates } = args;

  return new Promise((resolve: (result: INote) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .get(id)
          .update(updates, { returnChanges: true })
          .run(conn, (runError: Error, result: INoteWriteResult) => {
            conn.close();

            if (runError) {
              throw runError;
            }

            resolve(result.changes[0].new_val);
          });
      }).catch(reject);
  });
}
