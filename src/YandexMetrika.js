import React, { useEffect } from 'react';

const YandexMetrika = () => {
  useEffect(() => {
    // Inject Yandex.Metrika script
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
      m[i].l = 1 * new Date();
      for (let j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) {
          return;
        }
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    // Initialize Yandex.Metrika
    window.ym = window.ym || function () {};
    window.ym(98974405, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
  }, []); // Empty dependency array to ensure this runs only once

  return (
    <>
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/98974405"
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
};

export default YandexMetrika;
