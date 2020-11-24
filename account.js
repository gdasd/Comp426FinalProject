let handleChangeButtonPress = async function (event) {
    let newfield = $(`<div class="field password-field"><label class="label">Enter Previous Password</label>
                    <input class="input" type="password" placeholder="password" name="password" id="input-password">
                        <label class="label">Enter New Password</label>
                    <input class="input" type="password" placeholder="password" name="password" id="input-password-new"></input>
                    </div>`);
    $('.password-field').replaceWith(newfield);
    let newbuttons = $(`<div class="password-change">
    <button class="button-confirm-change">Confirm Change</button>
    <button class="button-cancel">Cancel Change</button> 
    <div class="message"></div>
</div>`);
    $('.password-change').replaceWith(newbuttons);
};

let handleCancelButtonPress = async function (event) {
    let newfield = $(`<div class="field password-field">
    <label class="label">Password</label>
    <input class="input" type="password" placeholder="password" value="password" name="password" id="input-password" disabled>
</div>`);
    $('.password-field').replaceWith(newfield);
    let newbuttons = $(`<div class="password-change">
    <button class="button-change">Change Password</button>
    <div class="message"></div>
</div>`);
    $('.password-change').replaceWith(newbuttons);
};

let handleTrueChangeButtonPress = async function (event) {
    let passwordnew = $('#input-password-new').val();
    let password = $('#input-password').val();
    let username = $('#input-username').val();
    console.log(username);
    console.log(password);
    if (passwordnew == null || password == null || passwordnew == "" || password == "") {
        $('.message').replaceWith($('<div class="message"><h3>Invalid field! Please fill out both fields</h3></div>'));
        return;
    }
    try {
    let result = await axios({
        method: 'put',
        url: `https://cryptic-hamlet-31330.herokuapp.com/userpass/${username}`,
        withCredentials: true,
        data: {
         currentPassword: password, 
         pass: passwordnew,
        },
      });
    handleCancelButtonPress(event);
    $('.message').replaceWith($('<div class="message"><h3>Congrats! Your password has been changed!</h3></div>'));
    } catch(err) {
        $('.message').replaceWith($('<div class="message"><h3>Error! Your password could not be changed at this time!</h3></div>'));
    }
};

let handleDeleteButtonPress = async function (event) {
    if (document.getElementById("delete").checked) {
        let username = $('#input-username').val();
        try {
            let s = await axios({
                method: 'delete',
                url: `https://cryptic-hamlet-31330.herokuapp.com/user/${username}`,
                withCredentials: true,
              });
            window.location.href = "/index.html";
            } catch(err) {
                $('.message').replaceWith($('<div class="message"><h3>Unable to be deleted</h3></div>'));
            }
    }
};

$(async function() {
    try {    
    let s = await axios({
        method: 'get',
        url: `https://cryptic-hamlet-31330.herokuapp.com/username`,
        withCredentials: true,
      });
      console.log(s);
    $('#input-username').val(s.data);
    $('.account').on('click', '.button-change', (e) => {
        handleChangeButtonPress(e);
    });
    $('.account').on('click', '.button-cancel', (e) => {
        handleCancelButtonPress(e);
    });
    $('.account').on('click', '.button-confirm-change', (e) => {
        handleTrueChangeButtonPress(e);
    });
    $('.button-delete').on('click', (e) => {
        handleDeleteButtonPress(e);
    });
    } catch(err) {
        $('.account').replaceWith("Unauthorized. Please <a href='gdasd.github.io'log in</a> to access");
    }
});