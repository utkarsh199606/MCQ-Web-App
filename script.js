//  Display the countdown timer in an element

function countdown(hr, mm, ss) {
  var interval = setInterval(function () {
    ss--;
    if (ss == 0) {
      ss = 59;
      mm--;
      if (mm == 0) {
        mm = 59;
        hr--;
      }
    }

    if (hr.toString().length < 2) hr = "0" + hr;
    if (mm.toString().length < 2) mm = "0" + mm;
    if (ss.toString().length < 2) ss = "0" + ss;

    $("#remaining_time").html(hr + " : " + mm + " : " + ss);

    if (mm <= -1) {
      clearInterval(interval);
      $("#remaining_time").html("\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "Time's Up");
      document.getElementById("remaining_time").style.color = "#133382";
      shake();
    }
  }, 1000);
}
countdown(00, 07, 59);

//Questions and Options array

var questionArray = [];

fetch("questions.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    questionArray = loadedQuestions;
    loadQuestion();
  });

let index = 0;
let total = 0;

let question1 = document.getElementById("question1");
let questionMarks = document.getElementById("questionMarks");
let btn_option = document.querySelectorAll(".btn_option");
let radio_option = document.querySelectorAll(".options");
let questionNo = document.getElementById("questionNo");

let opt_button1 = document.querySelector('div[id="pickup-1"]');
let opt_button2 = document.querySelector('div[id="pickup-2"]');
let opt_button3 = document.querySelector('div[id="pickup-3"]');
let opt_button4 = document.querySelector('div[id="pickup-4"]');

let previous = document.getElementById("button1");
let review = document.getElementById("button2");
let clear = document.getElementById("button3");
let next = document.getElementById("button4");

const loadQuestion = () => {
  reset();
  var data = questionArray[index];
  total = questionArray.length;

  // question display
  question1.innerText = data.question;

  // option display
  btn_option[0].innerHTML = data.a;
  btn_option[1].innerText = data.b;
  btn_option[2].innerText = data.c;
  btn_option[3].innerText = data.d;

  // marks display
  questionMarks.innerText = `${"Correct Marks : "} ${data.marks}`;

  // question no. display
  questionNo.innerText = `${"Question No."} ${data.id}`;

  //question and option animation;
  question_anim();
  option_anim();
};

// save and next button
review.addEventListener("click", Orange); // Orange function is at bottom most part at legend color
next.addEventListener("click", submitQuiz);
review.addEventListener("click", submitQuiz);

function submitQuiz() {
  index++;
  loadQuestion();
  reset_options();
  checkAndColorOption();
  const logo_timeout = setTimeout(rotate, 20); // tree logo animation
  remove_logo();
}

//save and previous button

previous.addEventListener("click", previousQuiz);

function previousQuiz() {
  index--;
  loadQuestion();
  checkAndColorOption();
  const logo_timeout = setTimeout(counter_rotate, 20);
  remove_logo();
}

// clear response of radio button

const reset = () => {
  radio_option.forEach((input) => {
    input.checked = false;
  });
  reset_options();
};

clear.addEventListener("click", reset_button);

function reset_button() {
  radio_option.forEach((input) => {
    input.checked = false;
  });
  reset_options();
  Remove_Color();
  questionArray[index].answercheck = "";
}

// clear response of option button

const reset_options = () => {
  // console.log("No option selected");
  opt_button1.classList.remove("btn_option1");
  opt_button2.classList.remove("btn_option1");
  opt_button3.classList.remove("btn_option1");
  opt_button4.classList.remove("btn_option1");
};

// loadQuestion();

const radioButtons = document.querySelectorAll("input[type=radio]");

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("click", saveOption);
});

function saveOption() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  const data = questionArray[index];

  if (selectedOption) {
    data.answercheck = selectedOption.value;
    console.log("Selected option:", data.answercheck);
    SetCSS(data.answercheck);
  }
}

const checkAndColorOption = () => {
  const data = questionArray[index];
  if (data.answercheck == "") {
    reset_options();
  } else {
    SetCSS(data.answercheck);
  }
};

function SetCSS(_ans) {
  switch (_ans) {
    case "a":
      opt_button1.classList.add("btn_option1");
      opt_button2.classList.remove("btn_option1");
      opt_button3.classList.remove("btn_option1");
      opt_button4.classList.remove("btn_option1");
      document.getElementById("option1").checked = true;
      break;

    case "b":
      opt_button1.classList.remove("btn_option1");
      opt_button2.classList.add("btn_option1");
      opt_button3.classList.remove("btn_option1");
      opt_button4.classList.remove("btn_option1");
      document.getElementById("option2").checked = true;
      break;

    case "c":
      opt_button1.classList.remove("btn_option1");
      opt_button2.classList.remove("btn_option1");
      opt_button3.classList.add("btn_option1");
      opt_button4.classList.remove("btn_option1");
      document.getElementById("option3").checked = true;
      break;

    case "d":
      opt_button1.classList.remove("btn_option1");
      opt_button2.classList.remove("btn_option1");
      opt_button3.classList.remove("btn_option1");
      opt_button4.classList.add("btn_option1");
      document.getElementById("option4").checked = true;
      break;
  }
}

const myTimeOut = setTimeout(LoadAllQuestions, 1000);

// create questions legends
function LoadAllQuestions() {
  for (var i = 0; i < total; i++) {
    function CreateHtml() {
      var div = document.createElement("div");
      div.setAttribute("class", "col col-sm-1 col-md-2 col-lg-2 notVisited");

      var span = document.createElement("span");
      var textNode = document.createTextNode([i + 1]);
      span.appendChild(textNode);
      span.setAttribute("id", [i + 1]);
      span.setAttribute("class", "span");
      span.setAttribute("onclick", "OnQuestionNoClick('" + [i + 1] + "')");

      div.appendChild(span);

      var parent_div = document.getElementById("section");

      parent_div.appendChild(div);
    }
    CreateHtml();
  }
}

// Question display when click on question legend

function OnQuestionNoClick(id) {
  index = id - 1;
  loadQuestion();
  reset_options();
  checkAndColorOption();
}

//giving color to question legends

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("click", Green);
});

function Green() {
  radio_option.forEach((input) => {
    var ids = $(".notVisited");
    for (var i = 0; i < $(".notVisited").length; i++) {
      if (i == index) {
        if (input.checked == true) {
          $(ids[i]).find("span").addClass("green");
        }
      }
    }
  });
}

next.addEventListener("click", Red);

function Red() {
  radio_option.forEach((input) => {
    var ids = $(".notVisited");

    for (var i = 0; i < $(".notVisited").length; i++) {
      if (i == index) {
        if (input.checked == false) {
          $(ids[i - 1])
            .find("span")
            .addClass("red");
        }
      }
    }
  });
}

function Orange() {
  var ids = $(".notVisited");
  var flag = 0;
  var selected_flag = 0;
  radio_option.forEach((input) => {
    if (input.checked == false) {
      flag = 0;
    } else {
      selected_flag = 1;
    }
  });
  if (flag == 0) {
    $(ids[index]).find("span").addClass("orange");
  }
  if (selected_flag == 1) {
    $(ids[index]).find("span").removeClass("green");
    $(ids[index]).find("span").addClass("blue");
  }
}

function Remove_Color() {
  var ids = $(".notVisited");
  for (var i = 0; i < $(".notVisited").length; i++) {
    if (i == index) {
      $(ids[i]).find("span").removeClass("green");
      $(ids[i]).find("span").removeClass("red");
      $(ids[i]).find("span").removeClass("orange");
      $(ids[i]).find("span").removeClass("blue");
    }
  }
}

// Applying Animation

function rotate() {
  document.querySelector(".tree-logo").style.animation = "rotate 1s linear";
}

function counter_rotate() {
  document.querySelector(".tree-logo").style.animation =
    "counter_rotate 1s linear";
}

function shake() {
  document.querySelector("span #remaining_time").style.animation =
    "skew-y-shake 1.3s infinite";
}

function question_anim() {
  $("div.questionsDetails .question").fadeTo(10, 0);
  $("div.questionsDetails .question").fadeTo(1000, 1.0);
}
function option_anim() {
  $("#pickup-1").fadeTo(10, 0);
  $("#pickup-1").fadeTo(1000, 1.0);
  $("#pickup-2").fadeTo(10, 0);
  $("#pickup-2").fadeTo(1000, 1.0);
  $("#pickup-3").fadeTo(10, 0);
  $("#pickup-3").fadeTo(1000, 1.0);
  $("#pickup-4").fadeTo(10, 0);
  $("#pickup-4").fadeTo(1000, 1.0);
}

function remove_logo() {
  document.querySelector(".tree-logo").style.animation = null;
}
