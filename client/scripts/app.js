const localhost = "http://localhost:3000";
$(document).ready(function() {
  var $buttonLogin = $("#buttonLogin");
  var $editForm = $("#editForm");
  var $register = $("#register");
  let $formbody = $("#formbody");

  //   if (!localStorage.getItem("token")) {
  //     $("#login").show();
  //     $("#showtableContainer").hide();
  //   } else {
  //     $($login).hide();
  //     showTodo();
  //   }

  var $template = `  <a class="card" href="#LINKkeMODAL"
                    style="--bg-img: url('https://images.unsplash.com/photo-1468234847176-28606331216a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')">
                    <div>
                    <h1>Musik DangDut</h1>
                    <p>Learn about some of the most common HTML tags…</p>
                    <div class="date">9 Oct 2017</div>
                    </div></a>`;

  $register.on("submit", function(e) {
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

  $buttonLogin.on("submit", function(e) {
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
      })
      .fail(err => {
        console.log(err, "nnnnnnn");
      });
  });

  var $template = `  <tr>
                      <td class = "id"></td>
                      <td class = "title"></td>
                      <td class = "description"></td>
                      <td class = "status"></td>
                      <td class = "due_date"></td>
                      <td class = "delete" ><a class="btn btn-primary" role="button" id="deleteButton">DELETE</a></td>
                      <td class = "edit" ><a class="btn btn-primary" role="button" id="editButton"    data-toggle="modal"
                      data-target="#updateModal">EDIT</a></td>
                    </tr>`;
  function showTodo() {
    $.ajax({
      method: "GET",
      url: `${localhost}/todo`,
      headers: {
        token: localStorage.token
      }
    }).done(data => {
      showAllTodo(data.result);
    });
  }

  function showAllTodo(data) {
    $formbody.empty();
    for (let i = 0; i < data.length; i++) {
      var $item = $($template);
      $item.find(".id").text(data[i].id);
      $item.find(".title").text(data[i].Title);
      $item.find(".description").text(data[i].Description);
      $item.find(".status").text(data[i].Status);
      $item.find(".due_date").text(formatDate(data[i].Due_date));
      $item
        .find("#deleteButton")
        .prop("href", `${localhost}/todo/${data[i].id}`);
      $item.find("#editButton").prop("href", `${localhost}/todo/${data[i].id}`);
      $formbody.append($item);
    }
  }

  var Todo = $("#addButton");
  Todo.on("submit", function(e) {
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
      showTodo();
      $("#addModal").modal("hide");
    });
  }

  $(this).click(function(e) {
    if (document.activeElement.id === "deleteButton") {
      e.preventDefault();
      deleteTodo(document.activeElement.href);
    } else if (document.activeElement.id === "editButton") {
      e.preventDefault();
      getDataForEditTodo(document.activeElement.href);
    }
  });

  function getDataForEditTodo(url) {
    $.ajax({
      method: "GET",
      url: url,
      headers: {
        token: localStorage.token
      }
    }).done(result => {
      $("#editId").val(result.data.id);
      $("#EditTitle").val(result.data.Title);
      $("#EditDescription").val(result.data.Description);
      $("#EditStatus").val(result.data.Status);
      $("#EditDue_date").val(formatDate(result.data.Due_date));
    });
  }

  $editForm.on("submit", function(e) {
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
      showTodo();
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
        showTodo();
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
  auth2.signOut().then(function() {
    console.log("User signed out.");
  });
}
