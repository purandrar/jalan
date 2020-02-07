var localhost = "http://localhost:3000";
$(document).ready(function () {
  var $buttonLogin = $("#buttonLogin");
  var $editForm = $("#editForm");
  var $register = $("#RegisterForm");
  var $formbody = $("#formbody");
  var $formCard = $('.cards-wrapper')

  //   if (!localStorage.getItem("token")) {
  //     $("#login").show();
  //     $("#showtableContainer").hide();
  //   } else {
  //     $($login).hide();
  //     showTodo();
  //   }

  showEvent()

  var $template = `  <a class="card" href="#LINKkeMODAL"
                    style="--bg-img: url('https://images.unsplash.com/photo-1468234847176-28606331216a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')">
                    <div>
                    <h1>Musik DangDut</h1>
                    <p>Learn about some of the most common HTML tags…</p>
                    <div class="date">9 Oct 2017</div>
                    </div></a>`;

  $register.on("submit", function (e) {
    e.preventDefault();
    console.log($("#passwordRegis").val());
    $.ajax({
      method: "POST",
      url: `${localhost}/user/register`,
      data: {
        email: $("#emailRegis").val(),
        age: $("#ageRegis").val(),
        name: $("#nameRegis").val(),
        password: $("#passwordRegis").val()
      }
    })
      .done(result => {
        console.log(123);
        //$("#registerModal").modal("hide");
      })
      .fail(err => {
        console.log(123);
        //console.log(err, "nnnnnnn");
      });
  });

  $buttonLogin.on("submit", function (e) {
    e.preventDefault();
    var $email = $("#emailLogin").val();
    var $password = $("#passwordLogin").val();
    console.log($password);
    console.log($email);
    $.ajax({
      method: "POST",
      url: `${localhost}/user/login`,
      data: {
        email: $email,
        password: $password
      }
    })
      .done(result => {
        localStorage.setItem("token", result);
        showEvent(result);
      })
      .fail(err => {
        console.log(err, "nnnnnnn");
      });
  });


  function showEvent() {
    $.ajax({
      type: "GET",
      url: `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=DE&apikey=nFzGDrEAznGkdhLQthGKpzPvnsoPfYOY`,
      dataType: "json",
      success: function (json) {
        console.log(json);
        // Parse the response.
        // Do other things.
        showAllTodo(json._embedded.events)
      },
      error: function (xhr, status, err) {
        // This time, we do not end up here!
        console.log(err)
      }
    });
  }


  function showAllTodo(data) {
    // $formCard.empty();
    let template = ``
    for (let i = 0; i < 6; i++) {
      template = `<div class="card-grid-space">
      <a class="card" data-toggle="modal" data-target ="#updateModal" href="https://app.ticketmaster.com/discovery/v2/events/${data[i].id}.json?apikey=nFzGDrEAznGkdhLQthGKpzPvnsoPfYOY"
        style="--bg-img: url('${data[i].images[1].url}')">
      <div>
          <h1 id ="title">${data[i].name}</h1>
          <div class="date">${data[i].dates.start.localDate}</div>
      </div>
      </a>
    </div>`

      $formCard.append(template);
    }
  }

  var Todo = $("#addButton");
  Todo.on("submit", function (e) {
    e.preventDefault();
    let title = $("#AddTitle").val();
    let description = $("#AddDescription").val();
    let status = $("#AddStatus").val();
    let due_date = $("#AddDue_date").val();
    addTodo({ title, description, status, due_date });
  });

  function addTodo(alldata) {
    $.ajax({
      method: "POST",
      url: `${localhost}/todo`,
      headers: {
        token: localStorage.token
      },
      data: alldata
    }).done(data => {
      clearForm("#AddTitle");
      showEvent();
      $("#addModal").modal("hide");
    });
  }

  $(this).click(function (e) {
    if (document.activeElement.id === "deleteButton") {
      e.preventDefault();
      deleteTodo(document.activeElement.href);
    } else if (document.activeElement.id === "gambar") {
      e.preventDefault();
      gedDetailEvent(document.activeElement.href);
    }
  });

  function gedDetailEvent(url) {
    $.ajax({
      method: "GET",
      url: url,
      headers: {
        token: localStorage.token
      }
    }).done(result => {
      // isi modal
    });
  }

  $editForm.on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "PUT",
      url: `${localhost}/todo/${$("#editId").val()}`,
      headers: {
        token: localStorage.token
      },
      data: {
        title: $("#EditTitle").val(),
        description: $("#EditDescription").val(),
        due_date: $("#EditDue_date").val(),
        status: $("#EditStatus").val()
      }
    }).done(() => {
      $("#updateModal").modal("hide");
      showEvent();
    });
  });

  function deleteTodo(url) {
    return $.ajax({
      method: "DELETE",
      url: url,
      headers: {
        token: localStorage.token
      }
    })
      .done(data => {
        showEvent();
      })
      .fail(data => {
        console.log(data);
      });
  }

  function formatDate(date) {
    if (date === null) {
      return date;
    } else {
      let d = new Date(date);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      let year = d.getFullYear();
      if (month.length < 2) {
        month = "0" + month;
      }
      if (day.length < 2) {
        day = "0" + day;
      }

      return [year, month, day].join("-");
    }
  }
});

function clearForm(form) {
  $(form)
    .find("input")
    .val("");
  $(form)
    .find("option:selected")
    .prop("selected", false);
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: `${localhost}/user/googleLogin`,
    data: {
      token: id_token
    }
  })
    .done(data => {
      localStorage.setItem("token", data);
    })
    .fail(err => {
      console.log(err);
    });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}
