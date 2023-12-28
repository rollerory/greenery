$(function(){
    
    wow = new WOW(
        {
            boxClass: 'wow',      // default
            animateClass: 'animate__animated', // default
            offset: 0,          // default
            mobile: true,       // default
            live: true        // default
        }
    )
    wow.init();

    $('.slider__inner').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000
    });

    $('.products-tabs__top-item').on('click', function() {
        $(this).toggleClass('products-tabs__top-item--active', 1000)
    })

    $('.products-tabs__link').on('click', function() {
        $(this).toggleClass('products-tabs__link--active', 1000)
    })

    $('.products-tabs__star').rateYo({
        starWidth: '23px',
        readOnly: true,
        normalFill: "#fff",
        ratedFill: '#F3B705',
        starSvg: '<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.58354 4.4386L6.5 1.61803L7.41646 4.4386C7.52356 4.76822 7.83072 4.99139 8.1773 4.99139H11.143L8.74371 6.7346C8.46331 6.93831 8.34599 7.29941 8.45309 7.62902L9.36955 10.4496L6.97023 8.70639C6.68984 8.50267 6.31016 8.50267 6.02977 8.70639L3.63045 10.4496L4.54691 7.62902C4.65401 7.29941 4.53668 6.93831 4.25629 6.7346L1.85697 4.99139H4.8227C5.16928 4.99139 5.47644 4.76822 5.58354 4.4386Z" stroke="#F3B705"/></svg>'
    })

    $('.products-tabs__top-item').on('click', function (e) {
        e.preventDefault();
        $('.products-tabs__top-item').removeClass('products-tabs__top-item--active');
        $(this).addClass('products-tabs__top-item--active');

        $('.products-tabs__content').removeClass('products-tabs__content--active');
        $($(this).attr('href')).addClass('products-tabs__content--active');

    });

});