import jwt from 'jsonwebtoken';
import { client, q } from './client';

module.exports = async (req, res) => {
    try {
        const dbs: any = await client.query(
            q.Get(q.Match(q.Index('find_user_by_login'), req?.body?.login))
        );

        if (dbs && dbs?.data?.password === req?.body?.password) {
            const user = {
                userId: dbs?.data?.id,
                login: dbs?.data?.login,
            };
            const token = jwt.sign({ user }, process.env.JWT_SECRET, {
                expiresIn: '14d',
            });
            res.status(200).json({ ...user, token });
        } else {
            res.status(401).json({ error: 'User not found' });
        }
    } catch (e) {
        // something went wrong
        res.status(500).json({ error: e.message });
    }
};
