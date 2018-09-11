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
        console.log(v);
        data[v[0]] = v[1];
    }

    // console.log("Constructed data: " + JSON.stringify(data));

    axios.post('/reviews/:reviewId/comments', data)
        .then(function (response) {
            // console.log("Response: " + JSON.stringify(response));

            document.getElementById("newComment").reset();

            console.log("reviewId: " + response.data.comment.reviewId);

            $('#comments').prepend(
                `
                <div class="card">
                    <div class="card-block">
                        <h4 class="card-title">${response.data.comment.title}</h4>
                        <p class="card-text">${response.data.comment.content}</p>
                        <p>
                            <form method="POST" action="/reviews/${response.data.comment.reviewId}/comments/${response.data.comment._id}?_method=DELETE">
                                <button class="btn btn-link" type="submit">Delete</button>
                            </form>
                        </p>
                    </div>
                </div>
                `
            )
        })
        .catch(function (error) {
            console.log(error);
            alert('There was a problem saving your comment. Please try again.')
        });
    })

    // console.log(comment.get('title'));
    // axios.post('/reviews/comments', comment)
    // .then(function (response) {
    //     document.getElementById("newComment").reset();
    //     $('#comments').prepend(
    //         `
    //         <div class="card">
    //             <div class="card-block">
    //                 <h4 class="card-title">${response.title}</h4>
    //                 <p class="card-text">${response.content}</p>
    //                 <p>
    //                     <form method="POST" action="/reviews/comments/${response._id}?_method=DELETE">
    //                         <button class="btn btn-link" type="submit">Delete</button>
    //                     </form>
    //                 </p>
    //             </div>
    //         </div>
    //         `
    //     );
    //     // $('#comments').prepend("<h1>Test</h1>");
    //
    // })
    // .catch(function (error) {
    //     console.log(error);
    //     alert('There was a problem saving your comment. Please try again.')
    // });


            // $('#comments').prepend("<h1>Test</h1>");
