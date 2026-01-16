document.getElementById('form').addEventListener('submit', ev => {
    ev.preventDefault();

    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const content = document.getElementById('content');

    let id = localStorage.getItem('id_increment');

    if (!id) {
        id = '0';
        localStorage.setItem('id_increment', '1');
    }

    id = Number(id);

    localStorage.setItem(`post_${id}`, JSON.stringify({
        title: title.value,
        author: author.value,
        content: content.value,
        timestamp: Date.now()
    }));

    localStorage.setItem('id_increment', id + 1);

    window.location.href = `/blog.html?id=${id}`
});