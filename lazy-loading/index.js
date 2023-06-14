
const imgs = document.querySelectorAll("img");
lazyLoad1(imgs)

// 懒加载 （方式1）
function lazyLoad1(imgDoms) {
  function throttle(cb, timeout) {
    let timerId = null;
    return (...args) => {
      if (timerId) return;
      cb?.(...args);
      timerId = setTimeout(() => timerId = null, timeout)
    }
  }

  function scroll () {
    imgDoms.forEach(img => {
      const imgRect = img.getBoundingClientRect();
      if (imgRect.top < window.innerHeight && imgRect.bottom > 0) {
        img.setAttribute('src', img.getAttribute('data-src'));
      }
    })
  }

  const throttleScroll = throttle(scroll);
  throttleScroll();
  window.addEventListener('scroll', throttleScroll)
}

// 懒加载 （方式2）
function lazyLoad2(imgDoms) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const img = entry?.target;
      if (entry?.isIntersecting) {
        img.setAttribute('src', img.getAttribute('data-src'));
      }
    })
  })

  imgDoms.forEach(img => {
    observer.observe(img)
  })
}
