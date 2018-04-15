import * as express from 'express';
import * as r from 'rethinkdb';

import Ctr from 'controllers/connect';

export default function getOne(req: express.Request, res: express.Response) {
  const Connector = new Ctr({ db: 'test', table: 'clients' });

  Connector
    .makeConnection()
    .then((conn: r.Connection) => {
      Connector
        .accessTable()
        .filter(r.row('id').eq(req.params.id))
        // Needs to get orgs, notes, etc.
        .run(conn, (runError: Error, cursor: r.Cursor) => {
          if (runError) {
            throw runError;
          }

          cursor.toArray((dataError: Error, result: r.Row[]) => {
            if (dataError) {
              throw dataError;
            }

            res.json(result);
            conn.close();
          });
        });
    });
}
