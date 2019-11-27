$(function() {
	
	//ニュースティッカー
	var INTERVAL_TIME = 5000;
	var NEWS_LIST_ELM = '.news ul';
	var NEWS_ITEM_ELM = '.news ul li';

	var newsElements = [];
	var newsCurrentIndex = 0;
	var newsMaxNum = 0;
	var newsInterval = null;
	var isSliding = false;

	initNewsSlider();

	function initNewsSlider(){
		$(NEWS_ITEM_ELM).each(function(){
			newsElements.push(this);
		});
		newsMaxNum = $(NEWS_ITEM_ELM).size();
		$(NEWS_ITEM_ELM).remove();

		$('.news-pager-prev').on('click', function(e){
			e.preventDefault();
			setIntervalNewsSlide();
			showNews(newsCurrentIndex-1, null, true, true);
		});
		$('.news-pager-next').on('click', function(e){
			e.preventDefault();
			setIntervalNewsSlide();
			showNews(newsCurrentIndex+1, null, true);
		});

		setIntervalNewsSlide();
		showNews(0);
	}

	function setIntervalNewsSlide() {
		if(newsInterval){
			clearInterval(newsInterval);
		}
		newsInterval = setInterval(function(){
			intervalNewsSlide();
		}, INTERVAL_TIME);
	}

	function intervalNewsSlide() {
		showNews(newsCurrentIndex+1);
	}

	function showNews(index, cbFunc, isBtnPushed, isBack){
		if(isSliding) return false;
		if(index >= newsMaxNum){
			index = 0;
		}
		if(index < 0){
			index = newsMaxNum - 1;
		}
		if(newsElements[index]){
			isSliding = true;
			newsCurrentIndex = index;
			$('.news-pager-number').html((index+1) + '／' + newsMaxNum);
			hideCurrentNews(function(){
				$(newsElements[index])
					.css(isBack ? {marginLeft:-20, opacity:0, display:'block'} : {marginLeft:20, opacity:0, display:'block'})
					.appendTo(NEWS_LIST_ELM)
					.transit({marginLeft:0, opacity:1}, isBtnPushed ? 500 : 1000, isBtnPushed ? 'easeOutQuad' : 'easeOutQuint', function(){
						if(cbFunc){
							cbFunc();
						}
						isSliding = false;
					});
			}, isBtnPushed, isBack);
		}
	}

	function hideCurrentNews(cbFunc, isBtnPushed, isBack){
		var $elm = $(NEWS_ITEM_ELM).eq(0);
		if($(NEWS_ITEM_ELM).size() > 0 && $elm){
			$elm.transit(isBack ? {marginLeft:20, opacity:0} : {marginLeft:-20, opacity:0}, isBtnPushed ? 500 : 1000,  isBtnPushed ? 'easeOutQuad' : 'easeInQuint', function(){
				$(this).remove();
				if(cbFunc){
					cbFunc();
				}
			});
		}else{
			if(cbFunc){
				cbFunc();
			}
		}
	}


	
	
	//研究メンバー：高さ調整
	$('.member .groupBox ul li').autoHeight();
	
	//研究業績：開閉
	
	/*$('.result .btnArea a.btn').on('click', function() {
	  $('.result table.dataFmt td ul li').toggle();
	});
	*/
		
	//活動履歴：開閉
	
	/*$('.history .btnArea a.btn').on('click', function() {
	  $('.history table.dataFmt tr:nth-child(n + 4)').toggle();
	});*/
	
});

function toggleYear(year){
	$('.history .'+ year + ' table.dataFmt tr:nth-child(n + 2)').toggle();
}

function toggleYearPublication(year){
	$('.result .'+year+' table.dataFmt td ul li:nth-child(n + 2)').toggle();
}

$('.tab').click(function(){
	$('.is-active').removeClass('is-active');
	$(this).addClass('is-active');
	$('.is-show').removeClass('is-show');
	const index = $(this).index();
	$('.tab-panel').eq(index).addClass('is-show');
});