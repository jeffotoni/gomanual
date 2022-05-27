
$(document).ready(function () {
    renderProgress(35);
});


const toggleColumnLeft = function (elButton) {

    const isOpen = (elButton.attr('data-open') == 'true');
    const column = elButton.attr('data-column');

    elButton.toggleClass('fa-chevron-left fa-chevron-right');

    if (!isOpen) {

        $('.column-text .column-content').show();
        $('.column-text .column-code-close').show();
        $('.column-text .column-text-close').show();
        $('.column-text').css('width', '50%');
        $('.column-code').css('width', '50%');

        elButton.attr('data-open', 'true');

    } else {

        $('.column-text .column-content').hide();
        $('.column-text .column-text-close').hide();
        $('.column-text .column-code-close').hide();
        // $('.column-code .column-text-close').hide();
        $('.column-text').css('width', '3%');
        $('.column-code').css('width', '97%');

        elButton.attr('data-open', 'false');

    }
};

const toggleColumnRight = function (elButton) {

    const isOpen = (elButton.attr('data-open') == 'true');
    const column = elButton.attr('data-column');

    elButton.toggleClass('fa-chevron-left fa-chevron-right');

    if (!isOpen) {

        $('.column-code .column-content').show();
        $('.column-code .column-code-close').show();
        $('.column-code').css('width', '50%');
        $('.column-text').css('width', '50%');

        elButton.attr('data-open', 'true');

    } else {

        $('.column-code .column-content').hide();
        $('.column-code .column-code-close').hide();
        // $('.column-code .column-code-close').hide();
        $('.column-code').css('width', '3%');
        $('.column-text').css('width', '97%');

        elButton.attr('data-open', 'false');

    }
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