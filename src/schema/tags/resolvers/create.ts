import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

interface ITagWriteResult extends r.WriteResult {
  changes: Array<{ new_val: ITag, old_val: ITag }>;
}

export function createTag(_: any, args: ITag): Promise<ITag | string> {
  const Connector = new Ctr({ db: 'test', table: 'tags' });

  return new Promise((resolve: (result: ITag) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .insert(args, { returnChanges: true })
          .run(conn, (runError: Error, result: ITagWriteResult) => {
            conn.close();

            if (runError) {
              throw runError;
            }

            resolve(result.changes[0].new_val);
          });
      }).catch(reject);
  });
}
