  (function () {
    // 디버그모드 설정
    var DEBUG_MODE = true;

    // 맞춤 이벤트 이름
    var EVENT_NAME = 'shadow_dom_click';

    // 특정 Shadow DOM Element만 추적하고 싶은 경우 css selector를 포함하여 입력
    // ex. #ch-plugin, .some_class
    var elementToObserveSelector = '';

    function logger(k,v) {
      if(DEBUG_MODE) {
        console.log(k, v);
      }
    }

    function documentClickHandler(event) {
      var path = event.composedPath();

      for (var i = 0; i < path.length; i++) {
        var element = path[i];
        if (isShadowDOM(element)) {
          setDataLayer(element);
          break;
        }
      }
    }

    function setDataLayer(element) {
      window.dataLayer.push({
        'event' : EVENT_NAME
      });
      logger('Completed dataLayer pushed : ', window.dataLayer);
      logger('Clicked Shadow DOM Element : ', element);
    }

    function isShadowDOM(element) {
      return element instanceof ShadowRoot;
    }

    function onElementLoaded(element) {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            var addedNode = mutation.addedNodes[0];
            setTimeout(function () {
              if (addedNode.shadowRoot) {
                logger('******', 'Found Shadow Root');
                logger('******', 'Wait Completed Render For 0.3s');
                addedNode.shadowRoot.addEventListener('click', function (e) {
                  setDataLayer(e.target);
                });
              }
            }, 300);
          }
        });
      });

      observer.observe(element, {
        childList: true
      });
    }

    function waitForElementToLoad(selector, callback, timeout) {
      var startTime = Date.now();
      var checkInterval = 100;
      var checkTimeout = timeout || 3000;

      function checkElement() {
        var element = document.querySelector(selector);
        if (element) {
          logger('******', 'Completed Wait For Element To load');
          callback(element);
        } else {
          if (Date.now() - startTime < checkTimeout) {
            setTimeout(checkElement, checkInterval);
          } else {
            logger('******', 'Timeout waiting for element');
          }
        }
      }

      checkElement();
    }

    function init() {
      if(!elementToObserveSelector) {
        document.addEventListener('click', documentClickHandler);
      } else {
        waitForElementToLoad(elementToObserveSelector, onElementLoaded, 5000);
      }
    }

    init();
  })();