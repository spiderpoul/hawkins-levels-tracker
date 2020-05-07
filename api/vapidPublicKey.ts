import { verifyToken } from './client';
import webPush from 'web-push';

webPush.setVapidDetails(
    'https://hawkins-levels-tracker.now.sh/',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

module.exports = async (req, res) => {
    try {
        verifyToken(req.body?.token);
        res.status(200).json({ key: process.env.VAPID_PUBLIC_KEY });
    } catch (e) {
        // something went wrong
        res.status(500).json({ error: e.message });
    }
};
