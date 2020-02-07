var localhost = "http://localhost:3000";
$(document).ready(function () {
  var $buttonLogin = $("#buttonLogin");
  var $editForm = $("#editForm");
  var $registerForm = $("#register");
  let $formCard = $(".cards-wrapper");
  let $addToFav;
  let $deleteToFav;
  // if (!localStorage.getItem("token")) {
  //   $("#login").show();
  //   $("#showtableContainer").hide();
  // } else {
  //   $($login).hide();
  //   showEvent();
  // }

  showEvent();
  // $deleteFromFav.on("submit", function (e) {
  //   return $.ajax({
  //     method: "DELETE",
  //     url: url,
  //     headers: {
  //       token: localStorage.token
  //     }
  //   })
  //     .done(data => { })
  //     .fail(data => {
  //       console.log(data);
  //     });
  // });
  $registerForm.on("submit", function (e) {
    e.preventDefault();
    console.log(123);
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
        //$("#registerModal").modal("hide");
        console.log(123);
      })
      .fail(err => {
        //console.log(err, "nnnnnnn");
      });
  });

  $buttonLogin.on("submit", function (e) {
    e.preventDefault();
    var $email = $("#emailLogin").val();
    var $password = $("#passwordLogin").val();

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
        console.log($email);
        showEvent(result);
        $('home').hide()
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
        showEventList(json._embedded.events)
      },
      error: function (xhr, status, err) {
        // This time, we do not end up here!
        console.log(err)
      }
    });
  }

  function showEventList(data) {
    // $formCard.empty();
    let template = ``;
    for (let i = 0; i < 6; i++) {
      console.log(data[i].id)
      template = `
    <div class="card-grid-space"  >
      <a class="card" href ="https://app.ticketmaster.com/discovery/v2/events/${data[i].id}.json?apikey=nFzGDrEAznGkdhLQthGKpzPvnsoPfYOY" 
        style="--bg-img: url('${data[i].images[1].url}')">
        <div>
          <h1 id ="title">${data[i].name}</h1>
          <div class="date">${data[i].dates.start.localDate}</div>
        </div>
      </a>
    </div>`

      $formCard.append(template);
    }
    $('.card').click( function(e) {
      console.log('masuk')
      e.preventDefault();
      // $("#eventDetail").modal();
      // alert('hahaha')
      $.ajax({
        method: "GET",
        url: $(this).attr("href"),
      }).done(result => {
        const content = `
        <div class="wrapper" > 
        <button id="addtoFavorite" class ="btn btn-primary btn-primary" role="button">add</button>
        <div class="product-img">
             <img src="${result.images[1].url}" height="420" width="300">
        </div>
        <div class="product-info">
             <div class="product-text">
             <p hidden id="idEvent"> ${result.id}</p>
             <p hidden id="description">${result.description}</p>
             <p hidden id="location">${result._embedded.venues[0].city.name}</p>
             <p hidden id='dateEvent'>${result.dates.start.localDate}</p>
                  <h1 id="eventName">${result.name}</h1>
             </div>
  
        </div>
   </div>
   <table class="table">
   <thead>
        <tr>
             <th scope="col">Name</th>
             <th scope="col">Date</th>
        </tr>
</thead>     
<tbody id='holidayTable'>
  
</tbody>
        
        `
        
        $(".modal-content").html(content);
        $("#eventDetail").modal();
        $('#addtoFavorite').on("click",function(e){
          e.preventDefault();
          console.log($('#eventName').val())
          $.ajax({
            method:'POST',
            url:`${localhost}/event/`,
            headers:{
              token:localStorage.token
          },
            data:{
              name:"masuk",
              date:'02/20/2020',
              description:'masuk ni',
              location:'jakarta',
              EventId:'123213',
            }
          })
        })  
      })
      
      getDate()
    })
    
  }

 
  
 function getDate(){
  $.ajax({
    method: "GET",
    url: `https://calendarific.com/api/v2/holidays?&api_key=2e2fe265c8df3ab6bd26426cb40c0741f5859a5a&country=ID&year=2020`
   })
   .done(function(data){
     showDate(data.response.holidays)
   })
   .fail(function(err){
    console.log(err)
  })
 }

 function showDate(data){
  //  $('#holidayTable').empty()
  for(var i = 0; i < data.length; i++){
    console.log('masuk')
    let template = `
    <tr>
    <td id="name">${data[i].name}</td>
    <td id="iso">${data[i].date.iso}</td>
    </tr>`
    $('#holidayTable').append(template)
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
    url: `${localhost}/googleLogin`,
    data: {
      token: id_token
    }
  })
    .done(data => {
      localStorage.setItem("token", data);
    })
    .fail(err => {
      console.log(12);
      console.log(err);
    });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}
