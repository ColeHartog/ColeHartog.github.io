$(document).ready(function(){
 
    var audios = function(){
        var i = Math.floor(Math.random() * (4 - 1)) + 1;
        if(i === 1){
            var audioc = $('#jazzy')[0];
        }
        else if(i === 2){
            var audioc = $('#country')[0];
        }
        else{
            var audioc = $('#funny')[0];
        }
        return audioc;
    }
    
    var audio = audios();
    
    audio.volume = .2;
    audio.loop = true;
    audio.play();
    var coinsound = $('#coinnoise')[0];
    coinsound.volume = 1;
    var breaksound = $('#break')[0];
    
    
    var mins = 0;
    var sec = 0;
    var score = 0;
    
    setInterval(function(){
        if(sec === 59){
            sec = 0;
            $('#seconds').text('0' + sec);
        }
        else{
            sec++;
            if(sec <= 9){
            $('#seconds').text('0' + sec);}
            else{
                $('#seconds').text(sec);}
        }
        
    }, 1000);
    
    setInterval(function(){
        mins++;
        if(mins <= 9){
            $('#minutes').text('0' + mins);
        }
        else $('#minutes').text(mins);
    }, 60000);
    
    function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2){ return false;}
      else
      {return true;}
    }
    
    var bgwidth = $('#bgimage').width();
    var bgwidth9 = bgwidth*.9;
    
    setTimeout(function(){
        $('#title').fadeOut('slow')}, 5000);
    
    $(document).keydown(function(e){
        if(!$('#char').is(':animated')){
            switch(e.keyCode){
                case 37:
                    if($('#char').position().left === 0){}
                    else{
                    $('#char').css({background: 'url(\'dwarf.gif\')', 'background-position': 'center','background-size': 'contain','transform': 'rotatey(0deg)'}).animate({left: ['-=10vw', 'linear']}, 'fast');
                    $('#addition').animate({left: ['-=10vw', 'linear']}, 'fast');}
                    break;
                case 38:
                    $('#char').animate({top: ['-=10vh']}, 250).animate({top: ['+=10vh', 'swing']}, 250);
                    $('#addition').animate({top: ['-=10vh']}, 250).animate({top: ['+=10vh', 'swing']}, 250);
                    break;
                case 39:
                    if($('#char').position().left >= bgwidth9){}
                    else{
                    $('#char').css({background: 'url(\'dwarf.gif\')','background-position': 'center','background-size': 'contain','transform': 'rotatey(180deg)'}).animate({left: ['+=10vw', 'linear']}, 'fast');
                    $('#addition').animate({left: ['+=10vw', 'linear']}, 'fast');}
                    break;
            }
        }
        return false;
    });
    
    $(document).keyup(function(e){
            switch(e.keyCode){
                case 37:
                    $('#char').css({background: 'url(\'stand%20still.png\')','background-position': 'center','background-size': 'contain'});
                    break;
                case 39:
                    $('#char').css({background: 'url(\'stand%20still.png\')','background-position': 'center','background-size': 'contain'})
                    break;
            }
        }
    );
    
    
    
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    var count = 0;
    function goldCoin(){
        count++;
        var rnd = (getRandomInt(1,9)*10) + 1;
        $('#coins').append('<div class="coin" id="coin' + count + ' "style="left: ' + rnd + 'vw"></div>');
        
          
        setInterval(function hchecker(){
            var toppos = $('.coin:first-child').position().top;
            var bgbot = $('#bgimage').height();
            if(toppos >= bgbot){
                $('.coin:first-child').remove();
                if(Number($('#scorediv').html()) >= 200){
                score = Number($('#scorediv').html()) - 200;
                $('#scorediv').text(score);}
                else if(Number($('#scorediv').html()) === 100){
                score = Number($('#scorediv').html()) - 100;
                $('#scorediv').text(score);}
                else{}
                breaksound.play();
            }
        }, 200);
        
        
        setInterval(function(){ if(collision($('#char'), $('.coin:first-child')) == true){
            if($('.coin:first-child').css('visibility') !== 'hidden'){
                $('.coin:first-child').css('visibility', 'hidden');
                setTimeout(coinsound.play(), 300);
                $('#addition').css({opacity: '1'}).animate({opacity: 0}, 500);
                score = Number($('#scorediv').html()) + 100;
                $('#scorediv').text(score);
                var leftpos = $('.coin:first-child').offset().left;
                var toppos = $('.coin:first-child').offset().top;
                $('.coin:first-child').remove();
                
                
                console.log(leftpos);
                console.log(toppos);
                $('#coins').append('<div class="coin2" id="collected" style="left: ' + leftpos + 'px; top: ' + toppos +'px" ></div>');
                $('#collected').queue(false);
                var lrpos = $('#scorediv').offset().left + 150;
                $('#collected').animate({top: ['50px', 'linear'], 'left': [lrpos, 'linear']}, 500);
                setTimeout(function(){$('#collected').remove()},505);
                
            }
        }}, 200);}
        
    var coinspawn = function(delay){
        var siID = setInterval(goldCoin, delay);
        var scorefuncheck = Number($('#scorediv').html());
        var clearfun = setInterval(function(){
        if(Number($('#scorediv').html()) >= 1500){
            clearInterval(siID);
            clearInterval(clearfun);
        }}, 200);
    };
    
    var coinspawn2 = function(delay){
        setInterval(goldCoin, delay);};
    
    var scorecount = 0;
    setInterval(function(){
        var scorecheck = (Number($('#scorediv').html()));
        if(scorecheck === 1500 && scorecount === 0){
            coinspawn2(1500);
            scorecount = 1;
        }
    }, 200);
    
    setTimeout(coinspawn(2250), 1000);
    
    setInterval(function(){
    $('.coin').animate({top: ['+=100px', 'linear']});
    }, 400);
    
    function flying(){
        var lorfly = getRandomInt(0,2);
        if(lorfly === 1){
        $('#bgimage').append('<div class="flyingray" style="left: 100vw"></div>');
        setTimeout(removefly, 17000);
        $('.flyingray').animate({left: ['-500px', 'linear']},16000);}
        else{
            $('#bgimage').append('<div class="flyingray" style="left: -500px"></div>');
        setTimeout(removefly, 17000);
        $('.flyingray').css({'transform': ['rotatey(180deg)', 'linear']});
        $('.flyingray').animate({left: bgwidth},16000);
        }
    }
    
    function removefly(){
        $('.flyingray').remove();
    }
    setTimeout(function(){
        flying();
        setInterval(flying, 22000);
    }, 15000)
    
    //setInterval(function(){ 
    //    if(collision($('.flyingray'), $('.coin:first-child')) == true){}
    
});