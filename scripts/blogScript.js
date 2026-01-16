function formatTime(timestamp) {
    const MONTHS = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    ];

    const time = new Date(timestamp);
    return `${time.getDate()} ${MONTHS[time.getMonth()]} ${time.getFullYear()}`;
}

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let postString = localStorage.getItem(`post_${id}`);

if (postString) {
    const post = JSON.parse(postString);

    document.getElementById('title').innerText = post.title;
    document.getElementById('author').innerText = `By ${post.author}, ${formatTime(post.timestamp)}`;
    document.getElementById('paragraph').innerHTML = post.content;

    document.getElementById('copy-share-button').addEventListener('click', ev => {
        navigator.clipboard.writeText(window.location.href);

        const shareNotification = document.getElementById('share-notification');

        shareNotification.innerText = 'Link tersalin!'

        setTimeout(() => {
            shareNotification.innerText = '';
        }, 3 * 1000);
    });
}