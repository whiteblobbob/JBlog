document.getElementById('share-button-copy').addEventListener('click', ev => {
    navigator.clipboard.writeText(window.location.href);

    const shareNotification = document.getElementById('share-notification');

    shareNotification.innerText = 'Link tersalin!'

    setTimeout(() => {
        shareNotification.innerText = '';
    }, 3 * 1000);
});