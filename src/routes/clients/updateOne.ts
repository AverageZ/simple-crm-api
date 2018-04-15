import * as express from 'express';
import * as r from 'rethinkdb';

import Ctr from 'controllers/connect';
import validate from './validations';

export default function updateOne(req: express.Request, res: express.Response) {
  validate(req.body);

  const Connector = new Ctr({ db: 'test', table: 'clients' });

  Connector
    .makeConnection()
    .then((conn: r.Connection) => {
      Connector
        .accessTable()
        .filter(r.row('id').eq(req.params.id))
        .update(req.body)
        .run(conn, (runError: Error, result: r.WriteResult) => {
          if (runError) {
            throw runError;
          }

          // Send back the id of the generated client
          res.json(result);
          conn.close();
        });
    });
}
