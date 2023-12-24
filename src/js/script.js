"use strict"

const modal = document.getElementById('myModal');

window.onload = function () {
    modal.style.display = 'block';
};

function closeModal() {
    modal.style.display = 'none';
};

$(document).ready(function () {
    $('.carousel__inner').slick({
        dots: true,
        speed: 250,
        slidesToShow: 1,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrows/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrows/right.svg"></button>',
        responsive: [{
            breakpoint: 845,
            settings: {
                arrows: false,
                // fade: true
            }
        }]
    });

    $('ul.catalog__tab').on('click', 'li:not(.catalog__tab-item_active)', function () {
        $(this)
            .addClass('catalog__tab-item_active').siblings().removeClass('catalog__tab-item_active')
            .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            });
        });
    };

    toggleSlide('.catalog-item_link');
    toggleSlide('.catalog-item__back');

    $('.header__burger').click(function () {
        $('.header__burger').toggleClass('active');
        $('.header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });


    //Modal
    $('.modal__button').on('click', function () {
        $("body").removeClass('modal-open');
    });

    $('[data-modal=consultationModal]').on('click', function() {
        $('.overlay, #consultationModal').fadeIn();
        $("body").toggleClass('lock');
    });

    $(".button_mini").each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item_subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
            $("body").toggleClass('lock');
        });
    });

    $(".modal__close").on('click', function() {
        $('.overlay, #consultationModal, #order, #thanks').fadeOut();
        $("body").removeClass('lock');
    });

    $("input[name=phone]").mask("+7 (999) 999-99-99");

    // function emailTest(input) {
    //     return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    // };
    // emailTest($('#email'));

    function validateForms(item) {
        $(item).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
    
            messages: {
                name: {
                    required: "Введите свое имя",
                    minlength: jQuery.validator.format('Введите минимум {0} символа'),
    
                },
                phone: "Введите свой номер телефона",
                email: {
                    required: "Введите свой адрес почты", 
                    email: "Неправильно введена почта"
                }
            }
        });
    };

    validateForms('#consultation form');
    validateForms('#consultationModal form');
    validateForms('#order form');

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        } else {
            $('body').addClass('sending');
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('body').removeClass('sending');
            $('#consultationModal, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $("form").trigger("reset");
        });
        return false;

    });

    $(window).scroll(function () { 
        if($(window).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $('a[href^="#"').on('click', function() {

        let href = $(this).attr('href');
    
        $('html, body').animate({
            scrollTop: $(href).offset().top
        });
        return false;
    });
        
});