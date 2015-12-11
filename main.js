$(document).ready(function(){
 /*   
    $('#box').each(function(){
        $(this).click(function(){
            $(this).animate({top: '+=20'});
        });
    });*/
    
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
    
    var mins = 0;
    var sec = 0;
    var score = 0;
    
    setInterval(function(){
        if(sec === 59){
            sec = 0;
            $('#seconds').text(sec);
        }
        else{
            sec++;
            if(sec <= 9){
            $('#seconds').text('0' + sec);}
            else
                $('#seconds').text(sec);
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
    
    
    
    setTimeout(function(){
        $('#title').fadeOut('slow')}, 5000);
    
    $(document).keydown(function(e){
        if(!$('#char').is(':animated')){
            switch(e.keyCode){
                case 37:
                    $('#char').css({background: 'url(\'dwarf.gif\')', 'background-position': 'center','background-size': 'contain','transform': 'rotatey(0deg)'}).animate({left: ['-=100px', 'linear']}, 'fast');
                    break;
                case 38:
                    $('#char').animate({top: ['-=100px']}, 250).animate({top: ['+=100px', 'swing']}, 250);
                    break;
                case 39:
                    $('#char').css({background: 'url(\'dwarf.gif\')','background-position': 'center','background-size': 'contain','transform': 'rotatey(180deg)'}).animate({left: ['+=100px', 'linear']}, 'fast');
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
        var rnd = getRandomInt(1,9)*10;
        $('#coins').append('<div class="coin" id="coin' + count + ' "style="left: ' + rnd + 'vw"></div>');
        
        
        setTimeout(function(){
        $('.coin:first-child').remove();}, 5000);
        
        
        setInterval(function(){ if(collision($('#char'), $('.coin:first-child')) == true){
            if($('.coin:first-child').css('visibility') !== 'hidden'){
                $('.coin:first-child').css('visibility', 'hidden');
                setTimeout(coinsound.play(), 300);
                $('#addition').css({opacity: '1'}).animate({opacity: 0}, 500);
                score = score + 100;
                $('#scorediv').text(score);
            }
        }   
    }, 200);
        
        
        
    };
    function coinspawn(){setInterval(goldCoin, 2250);};
    
    
    
    setTimeout(coinspawn, 1000);
    setInterval(function(){
    $('.coin').animate({top: ['+=100px', 'linear']});
    }, 400);
    
    
    
    
    
});