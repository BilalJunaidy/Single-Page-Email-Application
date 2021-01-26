// Start of new JavaScript expression
document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#compose-form').onsubmit = function() {
    send_email();
    return false;
  }
  // document.querySelector(".card-title").onclick = function() {
  //   console.log('clicked button');

  //   // console.log(`The id is -- ${this.data.id}`);
  // }


  // 2. Add a new Event listener here for when the form with id "compose-form" has been submitted. 
  // Upon submission of this form, the following should happen:
  // a. A POST request is sent to the "/emails/" url using the fetch api 
  // b. The body of the should include the fields in each of the 3 input fields in JSON.stringify format. 
  // c. Depending on the status code of the response object, update the DOM accordingly. 
  // d. Once all of this is done, the page should be "re-directed" to the users mailbox (i.e the inbox)




  // By default, load the inbox
  load_mailbox('inbox');
});

// Start of new JavaScript expression
function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

// Start of new JavaScript expression
function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  //The following code handles the fetch request
  url = `/emails/${mailbox}`
  fetch(url, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(function(data) {
    data.forEach(display_emails);
  })
}

function display_emails(email) {

  const emailElem = document.createElement('article');
  emailElem.classList.add('card-title');
  emailElem.innerHTML = 'sender '+ email.sender + ' subject ' + email.subject + ' timestamp ' + email.timestamp;
  emailElem.dataset.id = `${email.id}`;
  if(email.read != false) {
    emailElem.classList.add('unread');
  }
  else {
    emailElem.classList.remove('unread');
  }
  const display = document.getElementById('emails-view').append(emailElem);
}

//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     console.log(data);
//   })
// }

// function handleErrors(response) {
//   if (!response.ok) {
//       document.getElementById('form-recipients-error').innerHTML = `${response.error}`;
//       console.log('error')
//       // throw Error(response.statusText);
//   }
//   return response.json();
// }

// function handleErrors(err) {
//   .then(function(err) {

//   })
//   var error = err;
//   console.log(`error is ${err}`)
// }

function send_email() {
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: document.getElementById("compose-recipients").value,
        subject: document.getElementById("compose-subject").value,
        body: document.getElementById("compose-body").value,
    })
  })
  // .then(function(response) {
  //   if (! response.ok) {
  //     err = response.json();
  //     return handleErrors(err);
  //     // console.log(err);
  //     // console.log("Error");
  //   }
  //   else {
  //     console.log('no error')
  //     return response.json();
      
  //   }
  // })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    if (data.error != undefined) {
      var err = data.error;
      document.getElementById('form-recipients-error').innerHTML = err;
    }
    else {
      console.log(data);
      window.location.href = "http://localhost:8000/";
    }
    
  })
  
  // .then(handleErrors)
  // .then(result => console.log(result))

  // .catch(error => console.log(error));
}