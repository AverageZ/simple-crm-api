import * as express from 'express';
import * as r from 'rethinkdb';
import validate from './validations';

export default function updateOne(req: express.Request, res: express.Response) {
  validate(req.body);

  r.connect({ host: 'localhost', port: 28015 }, (connError: r.ReqlDriverError, conn: r.Connection) => {
    if (connError) {
      throw connError;
    }

    r
      .db('test')
      .table('organizations')
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
