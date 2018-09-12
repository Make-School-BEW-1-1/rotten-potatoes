function start(){
    deleteCommentListener();
    deleteReviewListener();
    // console.log("START");
}
window.onload = start();



document.getElementById("newComment").addEventListener("submit", e => {
    e.preventDefault();

    // let comment = document.querySelector("#newComment").serializeArray();
    let commentForm = new FormData(document.querySelector("#newComment"));

    // console.log(JSON.stringify(commentForm))

    // fetch('someurl').then().catch()
    // console.log('submit comment form');
    // console.log(commentForm.get('title'));

    let data = {};
    for (let v of commentForm) {
        data[v[0]] = v[1];
    }

    // console.log("Constructed data: " + JSON.stringify(data));

    axios.post('/reviews/:reviewId/comments', data)
        .then(function(response) {
            document.getElementById("newComment").reset();
            // console.log("Create comment response: " + JSON.stringify(response));

            $('#comments').prepend(
                `
                <div class="card" id="${response.data.comment._id}">
                    <div class="card-block">
                        <h4 class="card-title">${response.data.comment.title}</h4>
                        <p class="card-text">${response.data.comment.content}</p>
                        <p>
                            <button class="btn btn-link deleteComment" data-review-id="${response.data.comment.reviewId}" data-comment-id="${response.data.comment._id}">Delete</button>
                        </p>
                    </div>
                </div>
                `
            )

            deleteCommentListener();
        })
        .catch(function(error) {
            console.log(error);
            alert('There was a problem saving your comment. Please try again.')
        });
})



function deleteCommentListener() {
    const delBtn = document.querySelectorAll('.deleteComment');
    delBtn.forEach(elem => {
        console.log('adding listener')
            elem.addEventListener('click', (e) => {
            console.log("click!");
            let commentId = elem.getAttribute('data-comment-id');
            let reviewId = elem.getAttribute('data-review-id');
            axios.delete(`/reviews/${reviewId}/comments/${commentId}`)
            .then(response => {
                // console.log("delete comment response: " + JSON.stringify(response));
                let comment = document.getElementById(commentId);
                comment.style.display = 'none';
            })
            .catch(error => {
                console.log(error);
                alert('There was an error deleting this comment.')
            });
        })
    });
}

function deleteReviewListener() {
    const button = document.querySelectorAll('.delete-review');
    // console.log("button: " + button);
    button.forEach(elem => {
        console.log(elem);
            elem.addEventListener('click', (e) => {
            let reviewId = elem.getAttribute('data-review-id');

            axios.delete(`/admin/reviews/${reviewId}`)
            .then(response => {
                // console.log("reviewId: " + reviewId);
                let review = document.getElementById(reviewId);
                // console.log("review: " + review)
                review.parentNode.removeChild(review);
            })
            .catch(error => {
                console.log(error);
                alert('There was an error deleting this comment.')
            });
        })
    });
}
