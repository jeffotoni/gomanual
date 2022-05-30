
$(document).ready(function () {
    renderProgress(35);
});


const toggleColumnLeft = function (elButton) {

    const isOpen = (elButton.attr('data-open') == 'true');
    const column = elButton.attr('data-column');

    elButton.toggleClass('fa-chevron-left fa-chevron-right');

    if (!isOpen) {

        console.log('isOpen ', 1);

        $('.column-text .column-content').show();
        $('.column-text .column-code-close').show();
        $('.column-text .column-text-close').show();
        $('.column-text').removeClass('column-text-hide');
        $('.column-text').removeClass('column-text-expand');
        $('.column-code').removeClass('column-code-hide');
        $('.column-code').removeClass('column-code-expand');

        elButton.attr('data-open', 'true');

    } else {

        console.log('isOpen ', 2);

        if ($('.column-text').hasClass('column-text-expand')) {

            $('.column-text .column-content').hide();
            $('.column-text .column-text-close').hide();
            $('.column-code .column-content').show();
            $('.column-code .column-code-close').show();
            $('.column-code').addClass('column-code-expand');
            $('.column-code').removeClass('column-code-hide');
            $('.column-text').addClass('column-text-hide');
            $('.column-text').removeClass('column-text-expand');

        } else {

            $('.column-text .column-content').hide();
            $('.column-text .column-text-close').hide();
            $('.column-text .column-code-close').hide();
            // $('.column-code .column-text-close').hide();
            $('.column-text').removeClass('column-text-expand');
            $('.column-text').addClass('column-text-hide');
            $('.column-code').removeClass('column-code-hide');
            $('.column-code').addClass('column-code-expand');

        }

        elButton.attr('data-open', 'false');

    }
};

const toggleColumnRight = function (elButton) {

    const isOpen = (elButton.attr('data-open') == 'true');
    const column = elButton.attr('data-column');

    elButton.toggleClass('fa-chevron-left fa-chevron-right');

    if (!isOpen) {
        
        console.log('isOpen ', 3);

        $('.column-code .column-content').show();
        $('.column-code .column-code-close').show();
        $('.column-text').removeClass('column-text-hide');
        $('.column-text').removeClass('column-text-expand');
        $('.column-code').removeClass('column-code-hide');
        $('.column-code').removeClass('column-code-expand');

        elButton.attr('data-open', 'true');

    } else {
        
        console.log('isOpen ', 4);

        if ($('.column-code').hasClass('column-code-expand')) {

            $('.column-text .column-content').show();
            $('.column-code .column-content').hide();
            $('.column-code .column-code-close').hide();
            $('.column-code').removeClass('column-code-expand');
            $('.column-code').addClass('column-code-hide');
            $('.column-text').removeClass('column-text-hide');
            $('.column-text').addClass('column-text-expand');

        } else {

            $('.column-code .column-content').hide();
            $('.column-code .column-code-close').hide();
            // $('.column-code .column-code-close').hide();
            $('.column-code').removeClass('column-code-expand');
            $('.column-code').addClass('column-code-hide');
            $('.column-text').removeClass('column-text-hide');
            $('.column-text').addClass('column-text-expand');

        }

        elButton.attr('data-open', 'false');

    }
};


const toggleColumnTextMobile = function (elButton) {
    elButton.toggleClass('fa-chevron-down fa-chevron-up');
    $('.column-text .column-content').slideToggle();
};


const toggleColumnCodeMobile = function (elButton) {
    elButton.toggleClass('fa-chevron-down fa-chevron-up');
    $('.column-code .column-content').slideToggle();
};


const toggleNavbarMobile = function (elButton) {
    // elButton.children('.fa').toggleClass('fa-bars fa-times');
};


const renderProgress = function (progress) {
    progress = Math.floor(progress);

    if (progress < 25) {
        
        let angle = -90 + (progress / 100) * 360;
        
        $('.animate-0-25-b').css('transform', 'rotate(' + angle + 'deg)');

    } else if (progress >= 25 && progress < 50) {
        
        let angle = -90 + ((progress - 25) / 100) * 360;
        
        $('.animate-0-25-b').css('transform', 'rotate(0deg)');
        $('.animate-25-50-b').css('transform', 'rotate(' + angle + 'deg)');

    } else if (progress >= 50 && progress < 75) {

        let angle = -90 + ((progress - 50) / 100) * 360;
        
        $('.animate-25-50-b, .animate-0-25-b').css('transform','rotate(0deg)');
        $('.animate-50-75-b').css('transform', 'rotate(' + angle + 'deg)');

    } else if (progress >= 75 && progress <= 100) {
        
        let angle = -90 + ((progress - 75) / 100) * 360;
        
        $('.animate-50-75-b, .animate-25-50-b, .animate-0-25-b').css('transform','rotate(0deg)');
        $('.animate-75-100-b').css('transform', 'rotate(' + angle + 'deg)');

    }

    $('.text').html(progress + '%');
}