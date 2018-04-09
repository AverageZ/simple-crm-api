import * as Joi from 'joi';

interface IClient {
  id: number;
  first_name: string;
  last_name: string;
  updated: string;
  status: any; // should be pipeline stage
  email: string;
  phone: string;
  reps: string[]; // ids of the assiged rep
  notes: number[];
  // tags: ITag[];
  organizations: number[]; // id of the org
}

const schema = {
  email: Joi.string().email(),
  first_name: Joi.string().min(1),
  last_name: Joi.string().min(1),
  notes: Joi.array().items(Joi.string()),
  organizations: Joi.array().items(Joi.string()),
  phone: Joi.string(),
  reps: Joi.array().items(Joi.string()),
  status: Joi.string(),
  updated: Joi.string(),
};

export default function validateClient(client: IClient) {
  Joi.validate(client, schema, (err: Joi.ValidationError, value: any) => {
    if (err) {
      throw err;
    }

    return value;
  });
}
