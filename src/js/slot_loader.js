$(function(){
    var loading=true;
    var nSymbols = 18;
    for(var reelI=1; reelI<=3; reelI++){
        for(var n=0; n<nSymbols; n++){
            $('#reel'+reelI).append('<div class="symbol"><div class="'+['triangle','circle','square', 'diamond'][Math.floor(Math.random() * 4)]+'"></div></div>');
        }
    }

    $('.reel .symbol').each(function(i, div){
        $(div).css('top', i*20-40);
        $(div).css('top', (i*20)%(20*nSymbols) - 40);
    });
    var t = 0;
    var endT=120;
    var startDiff = 7;
    var v = 12;
    var v2 = 6;
    var symbolHeight=20;
    var waveT1 = 20;
    var waveT2 = 40;
    var haltT1 = endT-21;
    var haltT2 = endT-10;
    var haltT3 = endT-2;

    var symbolOffsets = [[],[],[]];

    function update(){
        for(var reelI=1; reelI<=3; reelI++){
            updateReel(t-reelI*startDiff, reelI);
        }

        if(t<endT+startDiff*3+1){
            // t+=0.5;
            t+=1;
            window.requestAnimationFrame(update);
        } else {
            t = 0;
            if(loading){
                setTimeout(function(){
                    symbolOffsets=[[],[],[]];
                    window.requestAnimationFrame(update);
                }, 1000);
            }
        }

    }

    function moveSymbol(div, y){
        var n = $(div).css('top')+y;
        if(n>(nSymbols-2)*symbolHeight){
            n=-2*symbolHeight;
        }
        $(div).css('top', n);
    }
    function updateReel(t, reelI){
        if(t<0 || t>endT){
            return;
        }
        $('#reel'+reelI+' .symbol').each(function(symbolI, div){
            if(t==0){
                symbolOffsets[reelI-1][symbolI] = parseFloat($(div).css('top'),10);
            }
            var c = (symbolOffsets[reelI-1][symbolI] + 2*symbolHeight - 20.0*Math.sin(waveT2/waveT2 * Math.PI))%(symbolHeight*nSymbols) - 2*symbolHeight;
            var c2 = (c + 2*symbolHeight +  (haltT1-waveT2)*v)%(symbolHeight*nSymbols) - 2*symbolHeight;
            var c3 = (c2 + 2*symbolHeight + (haltT2-haltT1)*8)%(symbolHeight*nSymbols) - 2*symbolHeight;
            var c4 = (c3+ 2*symbolHeight - (haltT3-haltT2)*4)%(symbolHeight*nSymbols) - 2*symbolHeight;
            if(t<=waveT2){
                $(div).css('top', (symbolOffsets[reelI-1][symbolI] + 2*symbolHeight - 20.0*Math.sin(t/waveT2 * Math.PI))%(symbolHeight*nSymbols) - 2*symbolHeight);
            } else if (t>=waveT2 && t<haltT1){
                var tPast = t-waveT2;
                $(div).css('top', (c + 2*symbolHeight+ tPast*v)%(symbolHeight*nSymbols) - (2)*symbolHeight);
            } else if(t>=haltT1 && t<=haltT2){
                var tPast = t-haltT1;
                $(div).css('top', (c2 + 2*symbolHeight+ tPast*8)%(symbolHeight*nSymbols) - 2*symbolHeight);
            } else if(t>=haltT2 && t<=haltT3){
                var tPast = t-haltT2;
                $(div).css('top', (c3+ 2*symbolHeight - tPast*4)%(symbolHeight*nSymbols) - 2*symbolHeight);
            } else if(t>=haltT3 && t<=endT){
                var tPast = t-haltT3;
                $(div).css('top', (c4 + 2*symbolHeight + tPast*8)%(symbolHeight*nSymbols) - 2*symbolHeight);
            }

            if(t<haltT1+15 && t>waveT2)
                $(div).addClass('blur');
            else
                $(div).removeClass('blur');
        });
    }
    jQuery.fn.visible = function() {
        return this.css('visibility', 'visible');
    };

    jQuery.fn.invisible = function() {
        return this.css('visibility', 'hidden');
    };
    var loadingI=3;
    $('.loading-text span').each(function(i, div){
        $(div).invisible();
    });
    function incLoading(){
        $('.loading-text span').each(function(i, div){
            if(i<=loadingI && loadingI!=3) $(div).visible();
            else $(div).invisible();
        });
        loadingI = (loadingI + 1)%4;
        if(loading){
            setTimeout(incLoading, 1000);
        }
    }
    setTimeout(incLoading, 1000);
    setTimeout(function(){
        if(loading){
            $('#slot_loader .reels').fadeIn();
            $('#slot_loader .loading-text').fadeIn();
            window.requestAnimationFrame(update);
        }
    }, 500);

});

// $(document).ready(function(){
//     $('.reels').fadeOut();
//     $('.loading-text').fadeOut();
//     $('.loader').delay(350).fadeOut('slow');
//     loading=false;
// });
$(window).on("load", function() {
    if(typeof debugLoader === 'undefined'){
        $('.reels').fadeOut();
        $('.loading-text').fadeOut();
        $('.loader').delay(350).fadeOut('slow');
        loading=false;
    }
});
