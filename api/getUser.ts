import { client, q, verifyToken } from './client';

module.exports = async (req, res) => {
    try {
        const {
            user: { userId },
        } = verifyToken(req.body?.token);
        const dbs: any = await client.query(
            q.Get(q.Match(q.Index('find_user_by_id'), userId))
        );

        res.status(200).json({
            userId: dbs?.data?.id,
            login: dbs?.data?.login,
            name: dbs?.data?.name,
        });
    } catch (e) {
        // something went wrong
        res.status(500).json({ error: e.message });
    }
};
