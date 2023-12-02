"use strict"

const modal = document.getElementById('myModal');

window.onload = function () {
    modal.style.display = 'block';
};


function closeModal() {
    modal.style.display = 'none';
}


$(document).ready(function(){
    $('.carousel__inner').slick({
        dots: true,
        speed: 250,
        slidesToShow: 1,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrows/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrows/right.svg"></button>',
        responsive: [
            {
                breakpoint: 845,
                settings: {
                    arrows: false,
                    // fade: true
                }
            }
        ]
    });

    $('ul.catalog__tab').on('click', 'li:not(.catalog__tab-item_active)', function() {
        $(this)
          .addClass('catalog__tab-item_active').siblings().removeClass('catalog__tab-item_active')
          .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
      });

    function toggleSlide(item){
        $(item).each(function(i){
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            })
        });
    };

    toggleSlide('.catalog-item_link')
    toggleSlide('.catalog-item__back')

    $('.header__burger').click(function() {
        $('.header__burger').toggleClass('active');
        $('.header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    })


    $(document).ready(function () {
        $('.modal__ok-button').click(function (event) {
            $("body").removeClass('modal-open');
        });
    });
});
