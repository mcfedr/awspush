document.addEventListener('DOMContentLoaded', function() {
    var PUSH_ID = 'web.co.fedr.awstest',
        WEB_SERVICE = 'https://fedr.co/push',
        status = document.querySelector('#status'),
        permsCheck = function(perms) {
            if(perms.permission == 'default') {
                status.textContent = 'Requesting permission';
                window.safari.pushNotification.requestPermission(WEB_SERVICE, PUSH_ID, {}, permsCheck);
            }
            else if(perms.permission == 'denied') {
                status.textContent = 'You disabled push';
            }
            else {
                status.textContent = 'Push is enabled, you device id is ' + perms.deviceToken;
            }
        };

    if ('safari' in window && 'pushNotification' in window.safari) {
        permsCheck(window.safari.pushNotification.permission(PUSH_ID));
    }
    else {
        status.textContent = 'This only works in safari';
    }
});
