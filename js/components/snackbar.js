const origin = {
    'top': '90px',
    'right': '1rem',
    'width': '20rem',
    'height': '4rem',
    'margin-right': '-21rem',
    'opacity': 1
};

const showSnackbar = (message) => {

    $("#snackbar")
        .finish()
        .css(origin)
        .html(message)

    //aparece
    .animate({
        'margin-right': '1rem'
    })

    //espera
    .delay(1000)

    //se va
    .animate({
        'top': '20vh',
        'opacity': 0
    });


}