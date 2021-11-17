$(document).ready(function () {
//календарь
var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return " "; a = parseInt((a + "").charAt(1)); return 1 == a ? " " : 2 == a ? " " : 3 == a ? " " : " " }(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	months = new Array('Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
// var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
var today ="Сегодня, " + dayOfMonth + curMonth;
document.querySelector('.header__bottom-left-order-list').textContent = today;

//календарь


// //модалка
const modalBtns = document.querySelectorAll('[data-modal-button]');
const closeBtn = document.querySelectorAll('[data-modal-close]');

modalBtns.forEach((item)=>{
 item.addEventListener('click', () => {
    const modalId = this.querySelector(['[data-modal-button]']).getAttribute('data-modal-button');
 let modalWindow = document.querySelector('#' + modalId);
 let scrollPosition = window.scrollY;
modalWindow.style.top = scrollPosition + "px";
 modalWindow.classList.remove('hidden');
//  document.body.style.overflow = 'hidden';
 
 })
  });

  closeBtn.forEach((item)=>{
   item.addEventListener('click', () => {
      const modalId = this.querySelector(['[data-modal-button]']).getAttribute('data-modal-button');
   const modalWindow = document.querySelector('#' + modalId);
   modalWindow.classList.add('hidden');
  //  document.body.style.overflow = 'visible';
   
   })
   
   });
   

// // modalWindow.addEventListener('click', ()=>{
// //   modalWindow.classList.add('hidden');
  
// // });
// modalWindow.querySelector('.modal__main').addEventListener('click', (event)=>{
// event.stopPropagation();
// });
//модалка

//увеличение картинки
  $(function(){
    $('.minimized').click(function(event) {
      var i_path = $(this).attr('src');
      $('body').append('<div id="overlay"></div><div id="magnify"><img src="'+i_path+'"><div id="close-popup"><i></i></div></div>');
      $('#magnify').css({
       left: ($(document).width() - $('#magnify').outerWidth())/2,
       // top: ($(document).height() - $('#magnify').outerHeight())/2 upd: 24.10.2016
              top: ($(window).height() - $('#magnify').outerHeight())/2
     });
      $('#overlay, #magnify').fadeIn('fast');
    });
    
    $('body').on('click', '#close-popup, #overlay', function(event) {
      event.preventDefault();
  
      $('#overlay, #magnify').fadeOut('fast', function() {
        $('#close-popup, #magnify, #overlay').remove();
      });
    });
  });
//увеличение картинки

  //калькулятор начало
  //собираем форму
  let typeHolder = document.getElementById("blind_type");
  let squarefeet = document.getElementById("squarefeet");
  let total = document.getElementById("total");
  //собираем форму
  //считаем ползунки
  let height_range = document.getElementById("height_range");
  let height_value = document.getElementById("height_value");
  let width_range = document.getElementById("width_range");
  let width_value = document.getElementById("width_value");
  height_value.textContent = height_range.value + " м";
  width_value.textContent = width_range.value + " м";
  height_range.oninput = function () {
    height_value.textContent = this.value + " м";
  };
  width_range.oninput = function () {
    width_value.textContent = this.value + " м";
    return width_range.value;
  };
  // общий подсчет
  width_range.addEventListener("change", () => {
    squarefeet.textContent = `Общая площадь ${Math.round(
      width_range.value * height_range.value
    )}`;
    total.textContent = `${Math.round(
      width_range.value * height_range.value * currentValue
    )} ₽`;
  });
  // общий подсчет
  //считаем ползунки
  //слушаем радио кнопки и подставляем значения в форму
  const radioButtons = document.querySelectorAll('input[name="material"]');
  let currentValue = 0;
  radioButtons.forEach((item) => {
    item.addEventListener("change", () => {
      typeHolder.textContent = `${item.id} ${item.value} ₽/М2`;
      currentValue = item.value;
      width_range.value = 0;
      height_range.value = 0;
      squarefeet.textContent = `Общая площадь 0`;
      total.textContent = `0 ₽`;
      height_value.textContent = `0 м`;
      width_value.textContent = `0 м`;
      return currentValue;
    });
  });
  //слушаем радио кнопки
  //калькулятор конец

  // $(".works_set").simpleLoadMore({
  //   item: ".works_set_item",
  //   count: 4,
  //   itemsToLoad: 4,
  //   btnHTML:
  //     '<a href="#" class="load-more__btn">Загрузить еще <i class="fas fa-angle-down"></i></a>',
  // });

  ///AJAX отправка формы
  $("#submit").on("click", function() {
    console.log('click submit');
      var name = $("#name").val(); // Получаем имя
      var email = $("#email").val(); // Получаем e-mail
      var phone = $("#phone").val();
      var message = $("#message").val(); // Получаем сообщение

      $.ajax({

          url: "/mail.php", // Куда отправляем данные (обработчик)
          type: "post",

          data: {
              "name": name,
              "email": email,
              "phone": phone,
              "message": message
          },

          success: function(data) {
              var data = "Форма успешно отправлена";
              $(".result").html(data); // Выводим результат

          }

      });

  });
});

// Get the modal
// let modal = document.getElementById("myModal");

// // Get the button that opens the modal
// // const btn = document.querySelectorAll("#myBtn");

// const btn = document.querySelectorAll("#myBtn");
// if (btn.length !== 0) {
//   for (var i = 0; i < btn.length; i++) {
//     btn[i].addEventListener("click", function () {
//       modal.style.display = "block";
//     });
//   }
// }

// // Get the <span> element that closes the modal
// let span = document.getElementsByClassName("close")[0];

// // // When the user clicks the button, open the modal
// // btn.onclick = function() {
// //   modal.style.display = "block";
// // }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

