(function () {

    var scriptName = 'widget.js';
    var jqueryPath = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.3/jquery.min.js';
    var jqueryVersion = '1.12.3';
    var scriptTag;
    var pathLocal = './app/';
    var pathCDN = 'https://s3.amazonaws.com/campaign-zero-widget/';
    var elementName = 'campaign-zero-widget';
    var loadedCSS = false;
    var loadedJS = false;
    var version = '1.5.0';
  
    /** Get reference to self (scriptTag) */
    var allScripts = document.getElementsByTagName('script');
    var targetScripts = [];
  
    /** Helper function to load external scripts */
    function loadScript(src, onLoad, onError) {
      var script_tag = document.createElement('script');
          script_tag.setAttribute('type', 'text/javascript');
          script_tag.setAttribute('src', src);
  
      if (script_tag.readyState) {
        script_tag.onreadystatechange = function () {
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
            onLoad();
          }
        };
      } else {
        script_tag.onload = onLoad;
      }
  
      if (typeof onError === 'function') {
        script_tag.onerror = onError;
      }
  
      // append loaded script to head
      (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(script_tag);
    }
  
    /** Helper function to load external css  */
    function loadCss(href, onLoad) {
      var link_tag = document.createElement('link');
          link_tag.setAttribute('type', 'text/css');
          link_tag.setAttribute('rel', 'stylesheet');
          link_tag.setAttribute('href', href);
  
      if (link_tag.readyState) {
        link_tag.onreadystatechange = function () {
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
            onLoad();
          }
        };
      } else {
        link_tag.onload = onLoad;
      }
  
      // append loaded style sheet to head
      (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(link_tag);
    }
  
    /** Check if jQuery is already on page, otherwise load it */
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== jqueryVersion) {
      loadScript(jqueryPath, init);
    } else {
      init();
    }
  
    /**
     * Debounce Resize
     * @param func
     * @param wait
     * @param immediate
     * @returns {Function}
     */
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }
  
    /** Initialize widget */
    function init() {
  
      // figure out scripts on the page
      for (var i in allScripts) {
        var name = allScripts[i].src;
        if(name && name.indexOf(scriptName) > 0) {
          targetScripts.push(allScripts[i]);
        }
      }
  
      // reference scripts position on the page
      scriptTag = targetScripts[targetScripts.length - 1];
  
      // check if this is production
      var assets = (scriptTag.src && scriptTag.src === 'https://embed.joincampaignzero.org/widget.js') ? pathCDN : pathLocal;
  
      // load widget css before DOM ready
      loadCss(assets + 'style.css?v=' + version, function(){
        loadedCSS = true;
        if(typeof appWidget !== 'undefined' && loadedCSS && loadedJS){
          appWidget.init();
        }
      });
  
      // wait for DOM ready to load other script to prevent page blocking
      jQuery(document).ready(function ($) {
  
        var resizeHandeler = debounce(function() {
          appWidget.resize();
        }, 100);
  
        window.addEventListener('resize', resizeHandeler);
  
        var isProduction = (scriptTag.src === 'https://embed.joincampaignzero.org/widget.js');
  
        var validWidgetTypes = ['default', 'resistance'];
  
        var widgetTitleText = 'Email your rep';
        var widgetSubTitleText = 'Where does your rep stand?';
        var widgetButtonText = 'Find your rep';
        var widgetPicRepText = 'Find your rep';
        var widgetType = 'default';
        var widgetCallText = 'Call and demand action:';
        var widgetEmailText = 'Email and demand action:';
  
        var emailSubject = 'Police Reform Bills & NYC Budget Review';
        var emailGreeting = 'Dear Council Member ';
        var emailBody = 'My name is [YOUR NAME] and I am a resident at [YOUR ADDRESS]. Last Sunday, NYC Mayor Bill De Blasio announced that he will review the city\'s preliminary FY2021 budget and shift funding from the NYPD to your\/social services. \nI SUPPORT this reallocation of funds. It is time to defund the NYPD\'s harmful expansion into homelsess services, schools, youth services, mental health and other social services where police don\'t belong.\n';
        var emailAction = 'In addition, I would also like to voice my SUPPORT for the five pieces of legislation (listed below) to reform the police and increase accountability. I urge you to pressure the office of the mayor to support the passing of thses innitiatives.\nInitiative 5360A: No person shall restrain an individual in a manner that restricts the flow of air or blood by compressing the windpipe, diaphragm, or the carotid arteries on each side of the neck in the course of effecting or attempting to effect an arrest\nInitiative 721-A: A person may record police activities and maintain custody and control of any such recording and of any property or instruments used in such recording\nInitiative 760-A: Require NYPD to maintain a centralized system that is used to record, track, review, and evaluate officer activity and to identify officers that may be in need of enhanced training, monitoring, or reassignment\nT2020-6267: An officer’s shield number or rank designation shall be visible at all times while such officer is in uniform and performing any activity under the color of law\nResolution 0027: Call on the New York State Legislature to pass bills that establish the crime of strangulation in the first degree\n';
  
        var twitterText = 'Learn where your representatives stand on police violence and demand action now! http://JoinCampaignZero.org/action';
        var twitterHashTags = 'CampaignZero';
  
        var facebookLink = 'http://www.joincampaignzero.org/action';
        var facebookDescription = 'Learn where your representatives stand on police violence and demand action now!';
  
        var googleAnalytics = 'UA-77948909-1';
  
        var $elm = jQuery('#' + elementName);
  
        /**
         * Check for Data Attributes on Element
         */
        if($elm.data('widget-title-text')) {
          widgetTitleText = $elm.data('widget-title-text');
        }
        if($elm.data('widget-subtitle-text')) {
          widgetSubTitleText = $elm.data('widget-subtitle-text');
        }
        if($elm.data('widget-button-text')) {
          widgetButtonText = $elm.data('widget-button-text');
        }
        if($elm.data('widget-pick-rep-text')) {
          widgetPicRepText = $elm.data('widget-pick-rep-text');
        }
        if($elm.data('widget-type') && validWidgetTypes.indexOf($elm.data('widget-type')) > -1) {
          widgetType = $elm.data('widget-type');
        }
        if($elm.data('widget-call-action-text')) {
          widgetCallText = $elm.data('widget-call-action-text');
        }
        if($elm.data('widget-email-action-text')) {
          widgetEmailText = $elm.data('widget-email-action-text');
        }
  
        if($elm.data('widget-email-subject')) {
          emailSubject = $elm.data('widget-email-subject');
        }
        if($elm.data('widget-email-greeting')) {
          emailGreeting = $elm.data('widget-email-greeting');
        }
        if($elm.data('widget-email-body')) {
          emailBody = $elm.data('widget-email-body');
        }
        if($elm.data('widget-email-action')) {
          emailAction = $elm.data('widget-email-action');
        }
  
        if($elm.data('widget-twitter-text')) {
          twitterText = $elm.data('widget-twitter-text');
        }
        if($elm.data('widget-twitter-hashtags')) {
          twitterHashTags = $elm.data('widget-twitter-hashtags');
        }
  
        if($elm.data('widget-facebook-link')) {
          facebookLink = $elm.data('widget-facebook-link');
        }
        if($elm.data('widget-facebook-description')) {
          facebookDescription = $elm.data('widget-facebook-description');
        }
  
        if($elm.data('widget-google-analytics')) {
          googleAnalytics = $elm.data('widget-google-analytics');
        }
  
        /**
         * Check for Data Attributes on Script Tag
         */
        if(scriptTag.getAttribute('data-widget-title-text')) {
          widgetTitleText = scriptTag.getAttribute('data-widget-title-text');
        }
        if(scriptTag.getAttribute('data-widget-subtitle-text')) {
          widgetSubTitleText = scriptTag.getAttribute('data-widget-subtitle-text');
        }
        if(scriptTag.getAttribute('data-widget-button-text')) {
          widgetButtonText = scriptTag.getAttribute('data-widget-button-text');
        }
        if(scriptTag.getAttribute('data-widget-pick-rep-text')) {
          widgetPicRepText = scriptTag.getAttribute('data-widget-pick-rep-text');
        }
        if(scriptTag.getAttribute('data-widget-type') && validWidgetTypes.indexOf(scriptTag.getAttribute('data-widget-type')) > -1) {
          widgetType = scriptTag.getAttribute('data-widget-type');
        }
        if(scriptTag.getAttribute('data-widget-call-action-text')) {
          widgetCallText = scriptTag.getAttribute('data-widget-call-action-text');
        }
        if(scriptTag.getAttribute('data-widget-email-action-text')) {
          widgetEmailText = scriptTag.getAttribute('data-widget-email-action-text');
        }
  
        if(scriptTag.getAttribute('data-widget-email-subject')) {
          emailSubject = scriptTag.getAttribute('data-widget-email-subject');
        }
        if(scriptTag.getAttribute('data-widget-email-greeting')) {
          emailGreeting = scriptTag.getAttribute('data-widget-email-greeting');
        }
        if(scriptTag.getAttribute('data-widget-email-body')) {
          emailBody = scriptTag.getAttribute('data-widget-email-body');
        }
        if(scriptTag.getAttribute('data-widget-email-action')) {
          emailAction = scriptTag.getAttribute('data-widget-email-action');
        }
  
        if(scriptTag.getAttribute('data-widget-twitter-text')) {
          twitterText = scriptTag.getAttribute('data-widget-twitter-text');
        }
        if(scriptTag.getAttribute('data-widget-twitter-hashtags')) {
          twitterHashTags = scriptTag.getAttribute('data-widget-twitter-hashtags');
        }
  
        if(scriptTag.getAttribute('data-widget-facebook-link')) {
          facebookLink = scriptTag.getAttribute('data-widget-facebook-link');
        }
        if(scriptTag.getAttribute('data-widget-facebook-description')) {
          facebookDescription = scriptTag.getAttribute('data-widget-facebook-description');
        }
  
        if(scriptTag.getAttribute('data-widget-google-analytics')) {
          googleAnalytics = scriptTag.getAttribute('data-widget-google-analytics');
        }
  
        window.CAMPAIGN_ZERO_WIDGET = {
          environment: isProduction ? 'production' : 'development',
          base: isProduction ? 'https://embed.joincampaignzero.org/app/' : './app/',
          data: isProduction ? 'https://embed.joincampaignzero.org/data/' : './data/',
          type: widgetType,
          api: {
            base: isProduction ? 'https://api.civil.services/v1/' : 'http://127.0.0.1:5000/v1/',
            key: isProduction ? '99BB6429-D251-6AF4-D9F2-6FE3D79DF034' : '7E07D864-209A-F9E4-819F-2DD7E76B6F24'
          },
          version: version,
          labels: {
            title: widgetTitleText,
            subtitle: widgetSubTitleText,
            button: widgetButtonText,
            pickRep: widgetPicRepText,
            call: widgetCallText,
            email: widgetEmailText
          },
          email: {
            subject: emailSubject,
            greeting: emailGreeting,
            body: emailBody,
            action: emailAction
          },
          twitter: {
            text: twitterText,
            hashtags: twitterHashTags
          },
          facebook: {
            link: facebookLink,
            description: facebookDescription
          }
        };
  
        // check for existing element, otherwise create it
        if($elm.length === 0){
          jQuery('<div id="' + elementName + '"></div>').insertBefore(scriptTag);
        }
  
        // Load Required Libraries first then init widget
        loadScript('https://www.google-analytics.com/analytics.js', function(){
          if(typeof window.ga !== 'undefined'){
            ga('create', googleAnalytics, 'auto', 'campaignZeroWidget');
            ga('campaignZeroWidget.send', 'pageview');
          }
  
          // load widgets main app's script file
          loadScript(assets + 'app.js?v=' + version, function(){
            loadedJS = true;
            if(typeof appWidget !== 'undefined' && loadedCSS && loadedJS){
              appWidget.init();
            }
          });
        }, function (){
          // load widgets main app's script file
          loadScript(assets + 'app.js?v=' + version, function(){
            loadedJS = true;
            if(typeof appWidget !== 'undefined' && loadedCSS && loadedJS){
              appWidget.init();
            }
          });
        });
      });
    }
  })();
