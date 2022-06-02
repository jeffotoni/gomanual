
let ARTICLE_DETAILS;

$(function() {
        
    $('.list-group-item-parent').on('click', function (event) {
        event.preventDefault();
    });

    $('.list-group-item').on('click', function () {

        $(this).children('span').children('.list-icon-chevron')
            .toggleClass('fa-chevron-up')
            .toggleClass('fa-chevron-down');

        $($(this).attr('href'))
            .toggleClass('show');
    });

});

$(document).ready(function () {

    // Sets current progress (header)
    renderProgress(35);


    // Sets event for review popup stars
    let currentStarStatusses = [];

    starElements = $('.star-icon');

    starElements.each(function (i, elem) {
        currentStarStatusses.push($(elem).hasClass('fa-star-o'));
    });
    
    starElements.mouseenter(changeRatingStars);
    starElements.mouseleave(resetRatingStars);


    // Configuração das mensagens de alerta no topo
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3500",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };


    // SocialShare.createShareBox(_elements, _link = null, _socials =  null, _showIcon = true, _showContent = true, _clearContainer = true);
    // SocialShare.createShareBox("#newShareBox", "https://gobootcamp.jeffotoni.com/", "email, whatsapp, facebook, twitter", true, false, true);
});

const AxiosApiPostJson = function(path, params, objHeaders, callback) {

    if (path && params && objHeaders) {

        axios({
            timeout: 60000,
            url: path,
            headers: objHeaders, 
            data: params,
            responseType: "json",
            method: "POST"
        })
        .then(function (response) {

            if (response && callback) {
                callback(response.data, response.status);
            }
        })
        .catch(function (error) {

            if (error.response.data.msg == "token-invalid") {
                shutdowLogin();
                return;
            }

            if (error.code === 'ECONNABORTED' && callback) {

                // E CONN ABORTED -> Timeout
                // Tratar o timeout em cada chamada 
                // Esconder loader, destravar botão...
                callback(error.code, error.response.status);

            } else if (error.response) {

              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx

              console.log(error.response.status);

            } else if (error.request) {

              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js

              console.log("Request error: ", error.request);

            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }

            console.log("Error config: ", error.config);
            console.log("Error response: ", error.response);
            console.log("Error response: ", error.response.data.message);

            if (callback && error.response.data) {
                callback(error.response.data, error.response.status);
            }
        });
        
    }
};

// LocalStorage and localstorage keys
// SET | GET | REMOVE
const LocalStorage = {

    KEY_FAVORITE_ARTICLES: 'gomanual.fav.articles',
    KEY_SEEN_ARTICLES: 'gomanual.seen.articles',

    set: (keyName, objValue) => {
        if (keyName && objValue) {

            if (!window.localStorage) {
                return null;
            }

            localStorage.setItem(keyName, JSON.stringify(objValue));
        }
    },

    get: (keyName) => {
        if (keyName) {

            if (!window.localStorage) {
                return null;
            }

            return JSON.parse(localStorage.getItem(keyName));
        }
        return null;
    },
    
    remove: (keyName) => {
        if (keyName) {

            if (!window.localStorage) {
                return null;
            }

            localStorage.removeItem(keyName);
        }
        return null;
    }

};


$(document).on('mouseenter', '.column-header .column-star-button.fa-star-o', function () {
    $(this).addClass('fa-star');
    $(this).removeClass('fa-star-o');
});

$(document).on('mouseleave', '.column-header .column-star-button:not(.column-star-button-active)', function () {
    $(this).removeClass('fa-star');
    $(this).addClass('fa-star-o');
});

$(document).on('click', '.column-header .column-star-button:not(.column-star-button-active)', function () {
    $(this).removeClass('fa-star-o');
    $(this).addClass('column-star-button-active');

    addToFavorites();
    // openPopupAddFavoritos();
});

$(document).on('click', '.column-header .column-star-button.column-star-button-active', function () {
    $(this).addClass('fa-star-o');
    $(this).removeClass('column-star-button-active');

    removeFromFavorites(null, false);
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
        $('.column-code .column-code-button').show();
        $('.column-text').removeClass('column-text-hide');
        $('.column-text').removeClass('column-text-expand');
        $('.column-code').removeClass('column-code-hide');
        $('.column-code').removeClass('column-code-expand');

        elButton.attr('data-open', 'true');

    } else {

        console.log('isOpen ', 2);

        $('.column-text .column-content').hide();
        $('.column-text .column-text-close').hide();
        $('.column-text .column-code-close').hide();
        $('.column-code .column-code-button').hide();
        $('.column-text').removeClass('column-text-expand');
        $('.column-text').addClass('column-text-hide');
        $('.column-code').removeClass('column-code-hide');
        $('.column-code').addClass('column-code-expand');

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
        $('.column-text .column-text-button').show();
        $('.column-text').removeClass('column-text-hide');
        $('.column-text').removeClass('column-text-expand');
        $('.column-code').removeClass('column-code-hide');
        $('.column-code').removeClass('column-code-expand');

        elButton.attr('data-open', 'true');

    } else {
        
        console.log('isOpen ', 4);

        $('.column-code .column-content').hide();
        $('.column-code .column-code-close').hide();
        $('.column-text .column-text-button').hide();
        $('.column-code').removeClass('column-code-expand');
        $('.column-code').addClass('column-code-hide');
        $('.column-text').removeClass('column-text-hide');
        $('.column-text').addClass('column-text-expand');

        elButton.attr('data-open', 'false');

    }
};


const toggleColumnTextMobile = function (elButton) {
    elButton.toggleClass('fa-chevron-down fa-chevron-up');
    $('.column-text .column-content').slideToggle();
    $('.column-text .column-content .pages-menu').slideToggle();
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
};


const openPopupContentOverview = function () {
    $('.shadow-overlay').show();
    $('.shadow-overlay').attr('data-popup', 'content-overview');
    $('.content-overview').show();
};

const closeShadowOverlay = function () {
    const elShadow = $('#shadowOverlay');
    const popupClose = elShadow.attr('data-popup');

    if (popupClose == 'content-overview') {

        $('.content-overview').hide();

    } else if (popupClose == 'dropdown-languages') {

        $('.dropdown-languages').hide();

    } else if (popupClose == 'dropdown-dots-menu') {

        $('.dropdown-dots-menu').hide();

    } else if (popupClose == 'share-manual') {

        $('.popup-share-manual').hide();

    } else if (popupClose == 'dropdown-progress') {

        $('.dropdown-progress').hide();

    } else if (popupClose == 'course-overview') {

        $('.course-overview').hide();

    } else if (popupClose == 'sidebar-login') {

        $('.sidebar-login').hide();

    } else if (popupClose == 'manual-review') {

        $('.popup-manual-review').hide();
        $('#rate_msg').val('');
        $('#rate').removeAttr('checked');
        ratingReview = null;


    } else if (popupClose == 'add-favoritos') {

        $('.popup-add-favoritos').hide();

    }

    elShadow.removeAttr('data-popup');
    elShadow.hide();
};

const toggleLanguageDropdown = function () {
    $('.shadow-overlay').show();
    $('.shadow-overlay').attr('data-popup', 'dropdown-languages');
    $('.dropdown-languages').show();
};

const toggleDotsMenuDropdown = function () {
    $('.shadow-overlay').show();
    $('.shadow-overlay').attr('data-popup', 'dropdown-dots-menu');
    $('.dropdown-dots-menu').show();
};

const toggleProgressDropdown = function () {
    $('.shadow-overlay').show();
    $('.shadow-overlay').attr('data-popup', 'dropdown-progress');
    $('.dropdown-progress').show();
};

const openPopupShareManual = function () {
    $('.shadow-overlay').show();
    $('.shadow-overlay').attr('data-popup', 'share-manual');
    $('.dropdown-dots-menu').hide();
    $('.popup-share-manual').show();
    $('.popup-share-manual .btn-copiar').html('Copiar');
};


const copyShareManualClipboard = function (elButton) {
    /* Get the text field */
    var copyText = document.getElementById("shareManualLink");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    elButton.html('Copiado!');
};


const openPopupCourseOverview = function () {
    $('.shadow-overlay').show();
    $('.shadow-overlay').attr('data-popup', 'course-overview');
    $('.dropdown-progress').hide();
    $('.course-overview').show();
};

const openSidebarLogin = function () {
    $('.shadow-overlay').show();
    $('.shadow-overlay').attr('data-popup', 'sidebar-login');
    $('.dropdown-progress').hide();
    $('.sidebar-login').show();
};

const openPopupReviewManual = function () {
    $('.shadow-overlay').show();
    $('.shadow-overlay').attr('data-popup', 'manual-review');
    $('.popup-manual-review').show();
    $('.dropdown-dots-menu').hide();
};

/**
 * Changes the rating star colors when hovering over it.
 */
const changeRatingStars = function () {
    // Current star hovered
    const star = $(this);

    // Removes all colors first from all stars
    $('.star-icon').removeClass('fa-star').addClass('fa-star-o');

    // Makes the current hovered star yellow
    star.removeClass('fa-star-o').addClass('fa-star');

    // Makes the previous stars yellow and the next stars gray
    star.parent().prevAll().children('.star-icon').addClass('fa-star');
    star.parent().nextAll().children('.star-icon').addClass('fa-star-o');
};

/**
 * Resets the rating star colors when not hovered anymore.
 */
const resetRatingStars = function () {
    starElements.each(function (i, elem) {
        $(elem).removeClass('fa-star').removeClass('fa-star-o').addClass(currentStarStatusses[i] ? 'fa-star' : 'fa-star-o');
    });
};



const changeTheme = function () {
    $('.CodeMirror').toggleClass('cm-s-juejin cm-s-dracula');
};

const openPopupAddFavoritos = function () {
    $('.shadow-overlay').show();
    $('.shadow-overlay').attr('data-popup', 'add-favoritos');
    $('.popup-add-favoritos').show();
};


const addToFavorites = function () {
    let favArticles = LocalStorage.get(LocalStorage.KEY_FAVORITE_ARTICLES);
    if (favArticles === null) {
        favArticles = [];
    }
    
    favArticles.push(ARTICLE_DETAILS);

    LocalStorage.set(LocalStorage.KEY_FAVORITE_ARTICLES, favArticles);
};

const removeFromFavorites = function (idArticle, reload) {
    let favArticles = LocalStorage.get(LocalStorage.KEY_FAVORITE_ARTICLES);
    if (favArticles === null) {
        return;
    }

    if (idArticle === null) {
        idArticle = ARTICLE_DETAILS.id
    }
    
    favArticles = favArticles.filter(function (obj, index) {
        if (obj.id !== null && obj.id !== undefined && obj.id != idArticle) {
            return obj;
        }
    });

    LocalStorage.set(LocalStorage.KEY_FAVORITE_ARTICLES, favArticles);

    if (reload) {
        loadFavoriteArticles();
    }
};

const checkFavoriteArticle = function () {
    let favArticles = LocalStorage.get(LocalStorage.KEY_FAVORITE_ARTICLES);
    if (favArticles === null) {
        return;
    }
    
    let isFavorite = false;
    favArticles.map(function (obj, index) {
        if (obj.id !== null && obj.id !== undefined && obj.id == ARTICLE_DETAILS.id) {
            isFavorite = true;
        }
    });

    if (isFavorite) {
        $('.column-header .column-star-button').removeClass('fa-star-o');
        $('.column-header .column-star-button').addClass('fa-star');
        $('.column-header .column-star-button').addClass('column-star-button-active');
    }
};

const loadFavoriteArticles = function () {
    let pageElement = $('#rowFavArticles');

    let favArticles = LocalStorage.get(LocalStorage.KEY_FAVORITE_ARTICLES);
    if (favArticles === null || (favArticles !== null && favArticles.length == 0)) {
        pageElement.html(`
            <div class="fav-articles-container">
                <div class="fav-articles-title">Ah, n&atilde;o! Parece que voc&ecirc; ainda n&atilde;o adicionou nenhum artigo aos favoritos.</div>
                <img class="fav-articles-img" src="../../img/gopher-adventure.png" alt="" />
                <div class="fav-articles-text">Que tal dar uma olhada no conte&uacute;do do nosso manual?</div>
                <div class="fav-articles-button">
                    <a href="/index.html" class="btn btn-lg btn-review-enviar">Explorar Manual Go Bootcamp</a>
                </div>
            </div>
        `);

        return;
    }
    
    let htmlFav = `
        <div class="container-fluid">
            <h1 class="page-title">Artigos Favoritos</h1>

            <div class="row row-favs">
    `;

    favArticles.map(function (obj, index) {
        
        htmlFav += `
            <div class="col-xxl-3 col-lg-4 col-md-6 col-12">

                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <a href="${obj.link}" target="_blank">
                            <h3 class="text-truncate">${obj.title}</h3>
                        </a>
                        <i class="fa fa-star btn-icon-remove-fav" onclick="removeFromFavorites('${obj.id}', true);" title="Remover dos favoritos"></i>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${obj.description}</p>
                    </div>
                    <div class="card-footer">

                        <div class="share-manual-social">
                            <a class="btn btn-lg" href="#" role="button">
                                <i class="fa fa-link"></i>
                            </a>
                            <a class="btn btn-lg" href="#" role="button">
                                <i class="fa fa-envelope"></i>
                            </a>
                            <a class="btn btn-lg" href="#" role="button">
                                <i class="fa fa-whatsapp"></i>
                            </a>
                            <a class="btn btn-lg" href="#" role="button">
                                <i class="fa fa-facebook"></i>
                            </a>
                            <a class="btn btn-lg" href="#" role="button">
                                <i class="fa fa-twitter"></i>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        `;

    });

    htmlFav += `
        </div>
    </div>
    `;

    if (htmlFav) {
        pageElement.html(htmlFav);
    }
};

const markAsRead = function () {
    let favArticles = LocalStorage.get(LocalStorage.KEY_SEEN_ARTICLES);
    if (favArticles === null) {
        favArticles = [];
    }
    
    let isSeen = false;
    favArticles.map(function (obj, index) {
        if (obj.id !== null && obj.id !== undefined && obj.id == ARTICLE_DETAILS.id) {
            isSeen = true;
        }
    });

    if (!isSeen) {
        favArticles.push(ARTICLE_DETAILS);
        LocalStorage.set(LocalStorage.KEY_SEEN_ARTICLES, favArticles);
    }
};

let ratingReview;
const setStarReview = function (valor) {
    ratingReview = valor;
};

const sendReview = function () {
    if (ratingReview) {

        const url = 'http://localhost:8080/review';

        let params = {
            rating: ratingReview,
            message: $('#rate_msg').val().trim()
        }

        const objHeader = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        };

        AxiosApiPostJson(url, params, objHeader, function (data, status) {
            console.log('status ', status);
            console.log('data ', data);

            showAlertEmDesenvolvimento();
            closeShadowOverlay();
        });

    } else {
        toastr.error('Por favor, selecione a classifica&ccedil;&atilde;o para avaliar.');
    }
};

const showAlertEmDesenvolvimento = function () {
    toastr.info('Em desenvolvimento...');
};