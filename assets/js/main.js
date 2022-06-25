/// <reference path="./../framworks/Jquary/jquery-3.6.0.min.js">
import './../framworks/Bootstrap/bootstrap_v5/js/bootstrap.bundle.min.js';
import './../framworks/Jquery/jquery-3.6.0.min.js';


$('.strip-toggel-menu').click(function(){

    // console.log($('#iconFA').attr('class'));

    if($('#iconFA').attr('class') == 'fa-solid fa-align-justify'){

        $('#iconFA').removeClass('fa-align-justify').addClass('fa-xmark');
        $(".navBody .item1").animate({ opacity: "1", paddingTop: "25px" }, 1000);
        $(".navBody .item2").animate({ opacity: "1", paddingTop: "25px" }, 1500);
        $(".navBody .item3").animate({ opacity: "1", paddingTop: "25px" }, 2000);
        $(".navBody .item4").animate({ opacity: "1", paddingTop: "25px" }, 2500);
        $(".navBody .item5").animate({ opacity: "1", paddingTop: "25px" }, 3000);
        $(".navBody .item6").animate({ opacity: "1", paddingTop: "25px" }, 3500);
    }else{
        $('#iconFA').removeClass('fa-xmark').addClass('fa-align-justify');
        $(".navBody .item1").animate({ opacity: "0", paddingTop: "500px" }, 1000);
        $(".navBody .item2").animate({ opacity: "0", paddingTop: "500px" }, 1500);
        $(".navBody .item3").animate({ opacity: "0", paddingTop: "500px" }, 2000);
        $(".navBody .item4").animate({ opacity: "0", paddingTop: "500px" }, 2500);
        $(".navBody .item5").animate({ opacity: "0", paddingTop: "500px" }, 3000);
        $(".navBody .item6").animate({ opacity: "0", paddingTop: "500px" }, 3500);
    }
    $('aside').toggleClass('showAside');

});


// --------------------------------------------- API ---------------------------------------------
//API obj
let api = {
    url:{
        nowPlaying  :"https://api.themoviedb.org/3/movie/now_playing?api_key=90cb39278979ed66254217668439759f",
        popular     :"https://api.themoviedb.org/3/movie/popular?api_key=90cb39278979ed66254217668439759f",
        topRated    :"https://api.themoviedb.org/3/movie/top_rated?api_key=90cb39278979ed66254217668439759f",
        trending    :"https://api.themoviedb.org/3/trending/all/day?api_key=90cb39278979ed66254217668439759f",
        upComing    :"https://api.themoviedb.org/3/movie/upcoming?api_key=90cb39278979ed66254217668439759f",
        latestURL   :"https://api.themoviedb.org/3/movie/latest?api_key=90cb39278979ed66254217668439759f",
    }
};

let arraysearch = [];

$(document).ready(function(){

    loadAPInavItem(api.url.nowPlaying);
    // Click on navItem
    $('.navItem').click(function(){
        // console.log($(this).attr('id'));
        if($(this).attr('id') == 'nowPlaying'){
            console.log($(this).val());
            loadAPInavItem(api.url.nowPlaying);
        }else if($(this).attr('id') == 'popular'){
            console.log(this.value == 'popular');
            loadAPInavItem(api.url.popular);
        }else if($(this).attr('id') == 'topRated'){
            console.log($(this).val());
            loadAPInavItem(api.url.topRated);
        }else if($(this).attr('id') == 'trending'){
            console.log($(this).val());
            loadAPInavItem(api.url.trending);
        }else if($(this).attr('id') == 'upComing'){
            console.log($(this).val());
            loadAPInavItem(api.url.upComing);
        }
        // else if($(this).attr('id') == 'contact'){
        //     let contact = $('#contactUs').offset().top;
        //     console.log(contact);
        //     $('body').animate({scrollTop:contact},10000);
        // }
    });
    // Search on API
    $('#searchOnAPI').keyup(function(){
        let search = `https://api.themoviedb.org/3/search/movie?query=${this.value}&api_key=90cb39278979ed66254217668439759f&language=en-US&include_adult=false`;
        loadAPInavItem(search);
    });
    // Search on movies
    $('#searchArray').keyup(function(){
        console.log(arraysearch);
        let arrayList = [];
        for(let i=0; i<arraysearch.length; i++){
            if(String(arraysearch[i].original_title).toLowerCase().includes(this.value)){
                arrayList.push(arraysearch[i]);
            }
        }
        //console.log(arrayList);
        filterMovies(arrayList);
        //$('#searchMovies').html(htmlTags);
    });
});


async function loadAPInavItem(url){
    let fetchAPI    = await fetch(url);
    let jsonAPI     = await fetchAPI.json();
    let arrayJson = Array.from(jsonAPI.results);
    console.log(arrayJson);
    // let arrayJson = jsonAPI.results;
    // console.log(arrayJson);
    displayMovies(arrayJson);
    arraysearch = arrayJson;
};

function displayMovies(parameter){
    let htmlTags = '';
    //console.log("from Display: "+ parameter);
    for (let i = 0; i < parameter.length; i++) {
        htmlTags += `
        <div class="col-lg-4 col-md-6">
        <figure class="position-relative rounded-1 overflow-hidden">
            <img class="w-100 rounded-1" src="https://image.tmdb.org/t/p/w500${parameter[i].poster_path}" alt="${parameter[i].title}">
            <div class="layer position-absolute rounded-1 w-100 h-100">
                <div class="info p-4 text-center m-0">

                    <h2>${parameter[i].original_title}</h2>
                    <p>${parameter[i].overview}</p>
                    <p>rate: ${parameter[i].vote_average}</p>
                    <p>${parameter[i].release_date}</p>
                    
                </div>
            </div>
        </figure>

    </div>
        `;
    }
    // console.log(htmlTags);
    $('#showMovies').html(htmlTags);
};

function filterMovies(parameter){
    let htmlTags = '';
    //console.log("from Display: "+ parameter);
    for (let i = 0; i < parameter.length; i++) {
        htmlTags += `
        <div class="col-lg-4 col-md-6">
        <figure class="position-relative rounded-1 overflow-hidden">
            <img class="w-100 rounded-1" src="https://image.tmdb.org/t/p/w500${parameter[i].poster_path}" alt="${parameter[i].title}">
            <div class="layer position-absolute rounded-1 w-100 h-100">
                <div class="info p-4 text-center m-0">

                    <h2>${parameter[i].original_title}</h2>
                    <p>${parameter[i].overview}</p>
                    <p>rate: ${parameter[i].vote_average}</p>
                    <p>${parameter[i].release_date}</p>
                    
                </div>
            </div>
        </figure>

    </div>
        `;
    }
    // console.log(htmlTags);
    $('#searchMovies').html(htmlTags);
};




// --------------------------------------------- contact us ---------------------------------------------
let name  = false;
let email = false;
let phone = false;
let age   = false;
let password = false;
let repassword = false;

$('#name').keyup(function(){
    let regexName =/^([A-Za-z]+){2,}$/gm;
    //console.log($(this).val());
    if(regexName.test($(this).val())){
        $(this).removeClass('is-invalid');
        $(this).addClass('is-valid');
        $('#namealert').removeClass('d-block').addClass('d-none');
        name = true;
    }else{
        $(this).removeClass('is-valid');
        $(this).addClass('is-invalid');
        // $('#namealert').fadeIn(1000);
        $('#namealert').removeClass('d-none').text('Your Name is not valid').addClass('d-block');
        name = false;
    }
});
$('#email').keyup(function(){
    let regexEmail=/^[a-zA-Z0-9._%+-]{2,}\@[a-zA-Z0-9._%+-]{2,}\.[a-zA-Z0-9._%+-]{2,}$/gm;
    if(regexEmail.test($(this).val())){
        $(this).removeClass('is-invalid');
        $(this).addClass('is-valid');
        $('#emailalert').removeClass('d-block').addClass('d-none');
        email = true;
    }else{
        $(this).removeClass('is-valid');
        $(this).addClass('is-invalid');
        $('#emailalert').removeClass('d-none').text('Your Email is not valid').addClass('d-block');
        email = false;
    }
});
$('#phone').keyup(function(){
    let regexPhone=/^(\+2|2)?01[0125][0-9]{8}$/gm;
    if(regexPhone.test($(this).val())){
        $(this).removeClass('is-invalid');
        $(this).addClass('is-valid');
        $('#phonealert').removeClass('d-block').addClass('d-none');
        phone = true;
    }else{
        $(this).removeClass('is-valid');
        $(this).addClass('is-invalid');
        $('#phonealert').removeClass('d-none').text('entry valid phone').addClass('d-block');
        phone = false;
    }
});
$('#age').keyup(function(){
    let regexAge=/^[1-9]{1}[0-9]{1,2}$/gm;
    if(regexAge.test($(this).val())){
        $(this).removeClass('is-invalid');
        $(this).addClass('is-valid');
        $('#agealert').removeClass('d-block').addClass('d-none');
        age   = true;
    }else{
        $(this).removeClass('is-valid');
        $(this).addClass('is-invalid');
        $('#agealert').removeClass('d-none').text('entry valid Age').addClass('d-block');
        age   = false;
    }
});
$('#password').keyup(function(){
    let regexPasswordStrong=/^[A-Z]{2,}[a-z]{2,}[0-9]{4,}$/gm;
    let regexPasswordNormal=/^[A-Za-z]{8,}[0-9]{1,}$/gm;
    if(regexPasswordStrong.test($(this).val()) || regexPasswordNormal.test($(this).val())){
        $(this).removeClass('is-invalid');
        $(this).addClass('is-valid');
        $('#passwordalert').removeClass('d-block').addClass('d-none');
        password = true;
    }else{
        $(this).removeClass('is-valid');
        $(this).addClass('is-invalid');
        $('#passwordalert').removeClass('d-none').text(`entry valid password *Minimum eight characters, at least one letter and one number:*,
        Or entry two or more uppercase characters then two or more lowercase characters then 4 or more digits`).addClass('d-block');
        password = false;
    }
});
$('#rePassword').keyup(function(){
    let password = $('#password').val();
    // console.log(password);
    if(password.length >= 8){
        if($(this).val() == $('#password').val()){
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
            $('#repasswordalert').removeClass('d-block').addClass('d-none');
            repassword = true;
        }else{
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            $('#repasswordalert').removeClass('d-none').text('your password not matched').addClass('d-block');
            repassword = false;
        }
    }else{
        $(this).removeClass('is-valid');
        $(this).addClass('is-invalid');
        $('#repasswordalert').removeClass('d-none').text('entry the first password').addClass('d-block');
    }

});
$('#submitBtn').click(function(){
    if(name == true && email == true && phone == ture && age == ture && password == ture && repassword == ture){
        alert("Your data was sent .. Thanks.");
    }else{
        alert("Plase complete the form");
    }
});





