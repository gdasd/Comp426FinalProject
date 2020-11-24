let handleLogInButtonPress = async function (event) {
    let username = $('#input-username').val();
    let password = $('#input-password').val();
    console.log(username);
    console.log(password);
    try {
    let s = await axios({
        method: 'post',
        url: 'https://cryptic-hamlet-31330.herokuapp.com/login',
        withCredentials: true,
        data: {
            username: username, 
            password: password,
        },
      });
    console.log(s.data);
    //window.location.href = "/tetris.html";
    } catch(err) {
        $('.message').replaceWith($('<div class="message"><h3>Incorrect Username or Password</h3></div>'));
    }
};

let handleCreateButtonPress = async function (event) {
    let username = $('#input-username').val();
    let password = $('#input-password').val();
    console.log(username);
    console.log(password);
    if (username == null || password == null || username == "" || password == "") {
        $('.message').replaceWith($('<div class="message"><h3>Empty field! Please fill out both fields</h3></div>'));
        return;
    }
    try {
    let s = await axios({
        method: 'post',
        url: 'https://cryptic-hamlet-31330.herokuapp.com/user',
        withCredentials: true,
        data: {
            username: username, 
            password: password,
        },
      });
    $('.message').replaceWith($('<div class="message"><h3>Success! User Created! Now Log In to proceed to the Game</h3></div>'));
    } catch(err) {
        $('.message').replaceWith($('<div class="message"><h3>Invalid Username (Already Taken)</h3></div>'));
    }
};

$(async function() {    
    $('.button-login').on('click', (e) => {
        handleLogInButtonPress(e);
    });
    $('.button-create').on('click', (e) => {
        handleCreateButtonPress(e);
    });
});