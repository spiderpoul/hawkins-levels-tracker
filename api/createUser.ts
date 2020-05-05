import { client, q } from './client';
import jwt from 'jsonwebtoken';

module.exports = async (req, res) => {
    try {
        // let res;
        // try {
        //     res = await client.query(
        //         q.Get(q.Match(q.Index('find_user_by_login'), req?.body?.login))
        //     );
        // } catch (e) {}

        // if (res?.data) {
        //     throw new Error('User already exist');
        // }

        const dbs: any = await client.query(
            q.Create(q.Ref(q.Collection('users'), q.NewId()), {
                data: { ...req.body, id: q.NewId() },
            })
        );
        // ok
        const user = {
            userId: dbs?.data?.id,
            login: dbs?.data?.login,
            name: dbs?.data?.name,
        };
        const token = jwt.sign({ user }, process.env.jwt_secret);
        res.status(200).json({ ...user, token });
    } catch (e) {
        // something went wrong
        res.status(500).json({ error: e.message });
    }
};
