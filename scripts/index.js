'use strict'

$(document).ready(function () {

    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    }
    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open')
        }
    });


    // При загрузке проверяем хранится ли что-то в localStorage
    if (!localStorage.getItem('cookieAccepted')) {
        $('.cookie').show();
    }

// При клике записываем данные в localStorage
    $('.cookie-accept').click(function () {
        $('.cookie').hide();
        localStorage.setItem('cookieAccepted', '1');
    })


//  объект в котором несколько нужных функций для работы с куками
    let cookie = {
        // функция устанавливает значение в куку
        set: (name, value, options) => {
            if (!name || !value) {
                return null; // это будет значить что кука не установлена
            }

            let string = name + ' = ' + value;
            if (options) {
                string += ';' + options;
            }

            document.cookie = string;
            return cookie;
        },

        // функция получает значение куки
        get: (name) => {
            const value = '; ' + document.cookie;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },

        //удалять куку
        delete: (name) => {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:001 GMT';
        }
    }


    $('.btn').eq(0).click(function () {
        $('.products')[0].scrollIntoView({behavior: "smooth"});
    });

    $('.btn-add-to-cart').click((e) => {
        inputProduct.val($(e.target).parents('.products__product').find('.product-title').text());
        $('.order__inp-valid')[0].scrollIntoView({behavior: "smooth"});

        let productTitle = $(e.target).parents('.products__product').find('.product-title').text();

        let cartArray = [];

        let cart = localStorage.getItem('cart'); // Достаем из хранилища все что есть (СТРОКУ) по ключу - cart

        // При клике проверяем: есть ли такой ключ в массиве localStorage
        if (cart) {
            cartArray = JSON.parse(cart); // Преобразование строки из cart в объект или массив JS
        }

        cartArray.push(productTitle); //Добавляем полученное значение productTitle в массив - cartArray = []
        localStorage.setItem('cart', JSON.stringify(cartArray)); //Преобразование массива обратно в строку и сохранение в хранилище - cart
        console.log(localStorage);
    });


    // 1. При нажатии на кнопку "Оформить заказ", проверяются все поля сразу. Все поля - обязательные.
    let btnOrder = $('#btnOrder');
    let inputProduct = $('input').eq(0);
    let inputName = $('input').eq(1);
    let inputNumber = $('input').eq(2);

    let hasError = false;
    let loader = $('#loader');
    let successFirst = $('.successFirst').hide();

    btnOrder.click(function () {
        let url = 'https://testologia.site/checkout';

        $('.inp-valid-err').hide(); // Перед началом валидации скрываем эл-т.
        $('input').css('border-color', 'rgb(130, 19, 40)');

        if (!inputProduct.val()) {
            inputProduct.next().show();
            inputProduct.css('border-color', 'red');
            hasError = true;
        }
        if (!inputName.val()) {
            inputName.next().show();
            inputName.css('border-color', 'red');
            hasError = true;
        }
        if (!inputNumber.val()) {
            inputNumber.next().show();
            inputNumber.css('border-color', 'red');
            hasError = true;
        }
        ;

        // 2. Если все элементы формы валидны - отправлять POST запрос
        if (!hasError) {
            loader.css('display', 'flex');

            $.ajax({
                method: "POST",
                url: url,
                data: {product: inputProduct.val(), name: inputName.val(), phone: inputNumber.val(),}
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        $('.successZero').hide();
                        $('.successFirst').show();
                    } else {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                    }
                });
        }
        ;


    });


});