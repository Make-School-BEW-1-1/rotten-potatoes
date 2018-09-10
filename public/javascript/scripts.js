document.getElementById("newComment").addEventListener("submit", e => {
    e.preventDefault();

    // let comment = document.querySelector("#newComment").serializeArray();
    var commentForm = new FormData(document.querySelector("#newComment"));

    axios.post('/reviews/comments', commentForm)
        .then(function (response) {
            document.getElementById("newComment").reset();
            $('#comments').prepend(
                `
                <div class="card">
                    <div class="card-block">
                        <h4 class="card-title">${response.title}</h4>
                        <p class="card-text">${response.content}</p>
                        <p>
                            <form method="POST" action="/reviews/comments/${response._id}?_method=DELETE">
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
