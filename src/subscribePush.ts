import Axios from 'axios';

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export const subscribePush = async (token) => {
    // Get the `registration` from service worker and create a new
    // subscription using `registration.pushManager.subscribe`. Then
    // register received new subscription by sending a POST request with
    // the subscription to the server.
    await requestPermissionsNotifications();
    const registration = await navigator.serviceWorker.getRegistration();
    // Get the server's public key
    const response = await Axios.post('/api/vapidPublicKey', { token });
    const vapidPublicKey = await response.data?.key;
    // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
    // urlBase64ToUint8Array() is defined in /tools.js
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    // Subscribe the user
    const subscription = await registration?.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
    });
    console.log(registration, subscription);
    await Axios.post('/api/subscribePush', {
        subscription,
        token,
    });
};

export const unsubscribePush = async (token) => {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager.getSubscription();

    if (subscription) {
        subscription.unsubscribe();
        await Axios.post('/api/unsubscribePush', {
            subscription,
            token,
        });
    }
};

export const isUserSubscribed = async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager.getSubscription();
    return Boolean(subscription);
};

export const requestPermissionsNotifications = async () => {
    let { state } = await navigator.permissions.query({
        name: 'notifications',
    });
    if (state === 'prompt') {
        await Notification.requestPermission();
    }
    state = (await navigator.permissions.query({ name: 'notifications' }))
        .state;
    if (state !== 'granted') {
        return alert(
            'You need to grant notifications permission for this demo to work.'
        );
    }
};

export const requestToSendPush = async (token) => {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager.getSubscription();

    await Axios.post('/api/sendNotification', {
        subscription,
        token,
    });
};
