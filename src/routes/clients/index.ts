import * as express from 'express';

import createClient from './create';
import deleteClient from './delete';
import getAll from './get';
import getOne from './getOne';
import updateOne from './updateOne';

const router = express.Router();

export default router
  /**
   * Get all clients
   */
  // @ts-ignore
  .get('/', getAll)

  /**
   * Get a client by id
   */
  .get('/:id', getOne)

  /**
   * Update a client
   */
  .put('/:id', updateOne)

  /**
   * Delete a client by id
   */
  .delete('/:id', deleteClient)

  /**
   * Create a new client
   */
  .post('', createClient);
