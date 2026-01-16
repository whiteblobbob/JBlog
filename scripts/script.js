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

function init() {
    let idIncr = localStorage.getItem('id_increment');

    if (!idIncr) {
        return;
    }

    idIncr = Number(idIncr);

    if (isNaN(idIncr) || idIncr <= 0) {
        return;
    }

    let randId = Math.round(Math.random() * (idIncr - 1));
    const blog = JSON.parse(localStorage.getItem(`post_${randId}`));

    document.getElementById('blog-availability').style.display = 'none';
    document.getElementById('blog-title').innerText = blog.title;
    document.getElementById('blog-author').innerText = `Oleh ${blog.author}, ${formatTime(blog.timestamp)}`;

    const blogElement = document.getElementById('blog');

    blogElement.onclick = ev => {
        window.location.href = `/blog.html?id=${randId}`;
    };

    blogElement.style.display = 'block';
}

init();