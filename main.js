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
    coinsound.volume = .1;
    var breaksound = $('#break')[0];
    breaksound.volume = .2;
    
    $('#mutebutt').click(function(){
        if(audio.volume === .2){
            audio.volume = 0;
            breaksound.volume = 0;
            coinsound.volume = 0;
            return audio, breaksound, coinsound;
        }
        else
            audio.volume = .2;
            coinsound.volume = .2;
            breaksound.volume = .2;
        return audio, coinsound, breaksound;
    });
    
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
        $('#title').animate({'opacity': 0}, 500)}, 5000);
    
    $(document).keydown(function(e){
        if(!$('#char').is(':animated')){
            switch(e.keyCode){
                case 37:
                    if($('#char').position().left === 0){}
                    else{
                    
                        $('#char').css({background: 'url(\'dwarf.gif\')', 'background-position': 'center','background-size': 'contain','transform': 'rotatey(0deg)'}).animate({left: ['-=10vw', 'linear']}, 200);
                    $('#addition').css({'transform': 'rotatey(0deg)'});
                    }
                    break;
                case 38:
                    $('#char').animate({top: ['-=10vh']}, 250).animate({top: ['+=10vh', 'swing']}, 250);
                    break;
                case 39:
                    if($('#char').position().left >= bgwidth9){}
                    else{
                    $('#char').css({background: 'url(\'dwarf.gif\')','background-position': 'center','background-size': 'contain','transform': 'rotatey(180deg)'}).animate({left: ['+=10vw', 'linear']}, 200);
                    $('#addition').css({'transform': 'rotatey(180deg)'});
                    }
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
    
    
    var combonumber = -5;
        function combo(par1){
            if(par1 === 0){
                combonumber = -5;
            }
            else{
                combonumber = combonumber + 5;
            }
            return combonumber;
        };
    
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    
    
    var count = 0;
    function goldCoin(){
        count++;
        var rnd = (getRandomInt(2,8)*10) + 1;
        $('#coins').append('<div class="coin" id="coin' + count + ' "style="left: ' + rnd + 'vw"></div>');
        
        
        setInterval(function hchecker(){
            $('.coin').each(function(){
                var toppos = $(this).position().top;
                var bgbot = $('#bgimage').height();
                if(toppos >= bgbot){
                $(this).remove();
                combo(0);
                if(Number($('#scorediv').html()) >= 200){
                score = Number($('#scorediv').html()) - 200;
                $('#scorediv').text(score);}
                else if(Number($('#scorediv').html()) === 100){
                score = Number($('#scorediv').html()) - 100;
                $('#scorediv').text(score);}
                else{}
                breaksound.play();
            }
            })}, 200);
        
        
        setInterval(function(){ 
            $('.coin').each(function(){
            if(collision($('#char'), $(this)) == true){
            if($(this).css('visibility') !== 'hidden'){
                $(this).css('visibility', 'hidden');
                coinsound.play();
                var increase = combo(1);
                score = Number($('#scorediv').html()) + 100 + increase;
                $('#scorediv').text(score);
                var add = '+' + (100+increase).toString();
                $('#addition').text(add);
                $('#addition').css({opacity: '1'}).animate({opacity: 0}, 500);
                var leftpos = $(this).offset().left;
                var toppos = $(this).offset().top;
                $(this).remove();
                
                
                $('#coins').append('<div class="coin2" id="collected" style="left: ' + leftpos + 'px; top: ' + toppos +'px" ></div>');
                $('#collected').queue(false);
                var lrpos = $('#scorediv').offset().left + 150;
                $('#collected').animate({top: ['50px', 'linear'], 'left': [lrpos, 'linear']}, 500);
                setTimeout(function(){$('#collected').remove()},505);
                
            }
        }})}, 200);}
        
    var coinspawn = function(delay){
        var siID = setInterval(goldCoin, delay);
        var scorefuncheck = Number($('#scorediv').html());
        var clearfun = setInterval(function(){
        if(Number($('#scorediv').html()) >= 2500){
            clearInterval(siID);
            clearInterval(clearfun);
        }}, 200);
    };
    
    var coinspawn2 = function(delay){
        var siID = setInterval(goldCoin, delay);
        var scorefuncheck = Number($('#scorediv').html());
        var clearfun = setInterval(function(){
        if(Number($('#scorediv').html()) >= 5000){
            clearInterval(siID);
            clearInterval(clearfun);
        }}, 200);
    };
    
    var coinspawn3 = function(delay){
        var siID = setInterval(goldCoin, delay);
        var scorefuncheck = Number($('#scorediv').html());
        var clearfun = setInterval(function(){
        if(Number($('#scorediv').html()) >= 100000){
            clearInterval(siID);
            clearInterval(clearfun);
            endGame();
        }}, 200);
    };
    
    var scorecount = 0;
    setInterval(function(){
        var scorecheck = (Number($('#scorediv').html()));
        if(scorecheck >= 5000 && scorecount === 1){
            coinspawn3(1200);
            scorecount = 2;
        }
        else if(scorecheck >= 2500 && scorecount === 0){
            coinspawn2(1800);
            scorecount = 1;
        }
    }, 200);
    
    setTimeout(coinspawn(2600), 1000);
    var cfID = null;
    
    var coinfall = function(par1){
        if(par1 === 'start'){
        cfID = setInterval(function(){
    $('.coin').animate({top: ['+=100px', 'linear']});
    $('.pinkcoin').animate({top: ['+=100px', 'linear']});
    }, 400);}
        else
            clearInterval(cfID);}
    
    coinfall('start');
    
    var speedcoinfall = function(){return setInterval(function(){
    $('.coin').animate({top: ['+=50px', 'linear']});
        $('.pinkcoin').animate({top: ['+=50px', 'linear']});
    }, 400);};
    
    setInterval(function(){
        $('.coin').each(function(){
            if(collision($('.flyingray'), $(this)) == true){
            if($(this).css('visibility') !== 'hidden'){
                $(this).css('visibility', 'hidden');
                coinsound.play();
                $(this).remove();
                pinkCoin();
        }}})
    },200);
    
    function speedcoinfallfun(){
        coinfall('no');
        console.log('stoped?')
        var spcid = speedcoinfall();
        setTimeout(function(){
            console.log('what');
            clearInterval(spcid);
            coinfall('start');
            }
            , 7000);
    }
    
    function flying(){
        var lorfly = getRandomInt(0,2);
        if(lorfly === 1){
        $('#bgimage').append('<div class="flyingray" style="left: 100vw"></div>');
        setTimeout(removefly, 17000);
        $('.flyingray').animate({left: ['-500px', 'linear']},16000);}
        else{
            $('#bgimage').append('<div class="flyingray" style="left: -500px"></div>');
        setTimeout(removefly, 17000);
        $('.flyingray').css({'transform': 'rotatey(180deg)'});
        $('.flyingray').animate({left: [bgwidth, 'linear']}, 16000);
        $('.flyingray').animate({left: [bgwidth, 'linear']}, 16000);
        }
    }
    
    function removefly(){
        $('.flyingray').remove();
    }
    setTimeout(function(){
        flying();
        setInterval(flying, 27000);
    }, 15000)
    
    function endGame(){
        $('#title').text('Congratulations!');
        $('#title').animate({'opacity': 1}, 500);
        $('#trophy').animate({'opacity': 1}, 500);
    };
    
    
    function pinkCoin(){
        count++;
        var rnd = (getRandomInt(1,9)*10) + 1;
        $('#coins').append('<div class="pinkcoin" id="pinkcoin" style="left: ' + rnd + 'vw"></div>');
        $('.pinkcoin').css({'background': 'url(\'pinkcoin.gif\')', 'background-position': 'center'});
        
        setInterval(function hchecker(){
            $('.pinkcoin').each(function(){
                var toppos = $(this).position().top;
                var bgbot = $('#bgimage').height();
                if(toppos >= bgbot){
                $(this).remove();}
                else{}
                breaksound.play();
            }
            )}, 200);
        
        
        setInterval(function(){ 
            $('.pinkcoin').each(function(){
            if(collision($('#char'), $(this)) == true){
            if($(this).css('visibility') !== 'hidden'){
                $(this).css('visibility', 'hidden');
                coinsound.play();
                
                var leftpos = $(this).offset().left;
                var toppos = $(this).offset().top;
                $(this).remove();
                
                $('#coins').append('<div class="coin2 pinkcollected" id="" style="left: ' + leftpos + 'px; top: ' + toppos +'px" ></div>');
                $('.pinkcollected').css({'background': 'url(\'pinkcoin.gif\')', 'background-position': 'center'});
                $('.pinkcollected').queue(false);
                var lrpos = $('#scorediv').offset().left + 150;
                $('.pinkcollected').animate({top: ['50px', 'linear'], 'left': [lrpos, 'linear']}, 500);
                setTimeout(function(){$('.pinkcollected').remove()},505);
                
                speedcoinfallfun();
                
            }
        }})}, 200);}
    
});