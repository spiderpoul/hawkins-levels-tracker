import { client, q } from './client';

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
            q.Create(q.Ref(q.Collection('users'), q.NextId()), {
                data: { ...req.body, id: q.NextId() },
            })
        );
        // ok
        res.status(200).json({
            userId: dbs?.data?.id,
            login: dbs?.data?.login,
        });
    } catch (e) {
        // something went wrong
        res.status(500).json({ error: e.message });
    }
};
