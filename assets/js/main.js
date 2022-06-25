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
//Select variables UI
let navItems        = $('.navItem');
let searchInputs    = $('.inputsSearch');
let searchURL       = "https://api.themoviedb.org/3/search/movie?query=mad&api_key=90cb39278979ed66254217668439759f&language=en-US&include_adult=false";
let searchArray     = [];

//Main arrays from API sideNav
let nowPlayingArray = [];
let popularArray    = [];
let topRatedArray   = [];
let trendingArray   = [];
let upComingArray   = [];
let latestArray     = [];

let api = {
    url:{
        nowPlaying  :"https://api.themoviedb.org/3/movie/now_playing?api_key=90cb39278979ed66254217668439759f",
        popular     :"https://api.themoviedb.org/3/movie/popular?api_key=90cb39278979ed66254217668439759f",
        topRated    :"https://api.themoviedb.org/3/movie/top_rated?api_key=90cb39278979ed66254217668439759f",
        trending    :"https://api.themoviedb.org/3/trending/all/day?api_key=90cb39278979ed66254217668439759f",
        upComing    :"https://api.themoviedb.org/3/movie/upcoming?api_key=90cb39278979ed66254217668439759f",
        latestURL   :"https://api.themoviedb.org/3/movie/latest?api_key=90cb39278979ed66254217668439759f",
    },

};


// window.addEventListener('ready',function(){



// });



async function loadAPInavItem(argument = api.url.nowPlaying){

    let nowPlayingAPI   = await fetch(argument);
    
    if(nowPlayingAPI.ok && nowPlayingAPI.status == 200){
        console.log('Now Playing API is ready');
        let nowPlayingJson  = await nowPlayingAPI.json();
        nowPlayingArray     = nowPlayingJson.results;
        console.log(nowPlayingArray);
    }else{
        console.log('Now Playing API is not ready');
    }

};

loadAPInavItem();



$('.navItem').click(function(){
        console.log($(this).attr('id'));
});


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





