$(function () {
  let isAnimating = false;

  $('.header-inner nav > ul > li > a').click(function (e) {
    e.preventDefault();
    if (isAnimating) return;

    const $clickedMenu = $(this);
    const $clickedLi = $clickedMenu.parent();
    const $submenu = $clickedLi.find('.gg');
    const $otherSubmenus = $('.gg').not($submenu);
    const isAnyOpen = $('.gg:visible').length > 0;

    if ($submenu.is(':visible')) {
      // 닫기 애니메이션: top 70px -> 0, opacity 1 -> 0, height 슬라이드 업 효과
      isAnimating = true;
      $submenu.css({ top: '70px', opacity: 1, height: $submenu.outerHeight() + 'px', display: 'block' })
        .animate(
          { top: '0px', opacity: 0, height: '0px' },
          300,
          function () {
            $submenu.css({ display: 'none', top: '70px', opacity: 1, height: '' });
            isAnimating = false;
          }
        );
      $clickedMenu.removeClass('active');
      $('#header').removeClass('header-black');
      $('.search input').css('border-color', '#fff');
    } else {
      if (isAnyOpen) {
        // 열려있던 다른 메뉴는 바로 닫고, 새 메뉴는 바로 보이기 (애니메이션 없음)
        $otherSubmenus.hide().css({ top: '70px', opacity: 1, height: '', display: 'none' });
        $('.header-inner nav > ul > li > a').removeClass('active');

        $submenu.show().css({ top: '70px', opacity: 1, height: '', display: 'block' });
        $clickedMenu.addClass('active');
        $('#header').addClass('header-black');
        $('.search input').css('border-color', '#000');
      } else {
        // 열려있는 메뉴 없으면 슬라이드다운 (기본 top 70px 유지)
        isAnimating = true;
        $submenu.css({ top: '70px', opacity: 1, height: '0px', display: 'block' }).animate(
          { height: $submenu.get(0).scrollHeight + 'px' },
          300,
          function () {
            $submenu.css({ height: '' });
            isAnimating = false;
          }
        );
        $clickedMenu.addClass('active');
        $('#header').addClass('header-black');
        $('.search input').css('border-color', '#000');
      }
    }
  });

  // 바깥 클릭 시 닫기
  $(document).click(function (e) {
    if (!$(e.target).closest('#header').length) {
      $('.gg').filter(':visible').each(function () {
        const $submenu = $(this);
        $submenu.css({ top: '70px', opacity: 1, height: $submenu.outerHeight() + 'px', display: 'block' })
          .animate(
            { top: '0px', opacity: 0, height: '0px' },
            300,
            function () {
              $submenu.css({ display: 'none', top: '70px', opacity: 1, height: '' });
            }
          );
      });
      $('.header-inner nav > ul > li > a').removeClass('active');
      $('#header').removeClass('header-black');
      $('.search input').css('border-color', '#fff');
    }
  });
});

$(function () {
  // 장바구니 열기
  $('a[aria-label="장바구니"]').click(function (e) {
    e.preventDefault();
    $('#cart-sidebar').addClass('active');
    $('#cart-overlay').addClass('active');
  });

  // 닫기 버튼 또는 오버레이 클릭 시 닫기
  $('#close-cart, #cart-overlay').click(function () {
    $('#cart-sidebar').removeClass('active');
    $('#cart-overlay').removeClass('active');
  });
});