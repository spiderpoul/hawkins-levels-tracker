import faunadb from 'faunadb';
import jwt from 'jsonwebtoken';

// your secret hash
const secret = process.env.FAUNADB_SECRET_KEY as string;
export const q = faunadb.query;

export const client = new faunadb.Client({ secret });

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
