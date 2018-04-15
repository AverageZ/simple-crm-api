import * as express from 'express';
import * as r from 'rethinkdb';

import Ctr from 'controllers/connect';

export default function deleteClient(req: express.Request, res: express.Response) {
  const Connector = new Ctr({ db: 'test', table: 'clients' });

  Connector
    .makeConnection()
    .then((conn: r.Connection) => {
      Connector
        .accessTable()
        .filter(r.row('id').eq(req.params.id))
        .delete()
        .run(conn, (runError: Error, result: r.WriteResult) => {
          if (runError) {
            throw runError;
          }

          res.json(result);
          conn.close();
        });
    });
}
