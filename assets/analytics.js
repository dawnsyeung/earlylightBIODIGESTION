/* Public-site analytics only. Configuration is generated at build time. */
(function () {
  'use strict';
  var allowed = ['earlylight.bio', 'www.earlylight.bio'];
  var pages = ['/', '/index.html', '/agriculture-organic-waste/', '/commercial-food-waste-solutions/', '/composters-and-aggregation-sites/', '/institutional-organics-solutions/'];
  var page = location.pathname.replace(/\/index\.html$/, '/');
  if (page !== '/' && page.indexOf('.') === -1 && page.slice(-1) !== '/') page += '/';
  if (allowed.indexOf(location.hostname) === -1 || pages.indexOf(page) === -1) return;
  if (navigator.globalPrivacyControl || navigator.doNotTrack === '1') return;
  var config = window.EARLYLIGHT_ANALYTICS;
  if (!config || !config.key || !config.host || window.__earlylightAnalyticsStarted) return;
  window.__earlylightAnalyticsStarted = true;
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog&&window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="Mi Ri init Vi Gi Rr Wi Ji Bi capture calculateEventProperties tn register register_once register_for_session unregister unregister_for_session an getFeatureFlag getFeatureFlagPayload getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync un identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty nn Xi createPersonProfile setInternalOrTestUser sn Hi cn opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Ki debug Lr rn getPageViewId captureTraceFeedback captureTraceMetric Di".split(" ") ,n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  function cleanUrl(value) {
    try { var u = new URL(value); return /^https?:$/.test(u.protocol) ? u.origin : ''; } catch (_) { return ''; }
  }
  posthog.init(config.key, {
    api_host: config.host,
    ui_host: 'https://us.posthog.com',
    defaults: '2026-01-30',
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    disable_session_recording: true,
    person_profiles: 'never',
    disable_persistence: true,
    ip: false,
    save_campaign_params: false,
    disable_surveys: true,
    disable_product_tours: true,
    disable_conversations: true,
    before_send: function (event) {
      if (!event || ['$pageview', 'contact_link_clicked', 'outbound_link_clicked', 'lead_submitted'].indexOf(event.event) === -1) return null;
      var original = event.properties || {};
      var safe = {site: 'earlylight.bio', page_path: page, $current_url: location.origin + page,
        $referrer: cleanUrl(document.referrer), $process_person_profile: false, $geoip_disable: true};
      ['token', 'distinct_id', '$device_id', '$session_id', '$window_id', '$lib', '$lib_version'].forEach(function (key) {
        if (typeof original[key] === 'string') safe[key] = original[key];
      });
      if (event.event === 'outbound_link_clicked' && typeof original.destination_host === 'string' && /^[a-z0-9.-]+$/i.test(original.destination_host)) safe.destination_host = original.destination_host;
      if (event.event === 'lead_submitted') safe.form_id = 'public_contact';
      event.properties = safe;
      return event;
    },
    loaded: function (client) {
      client.register({site: 'earlylight.bio'});
      client.capture('$pageview');
    }
  });
  document.addEventListener('earlylight:lead-submitted', function () {
    posthog.capture('lead_submitted', {form_id: 'public_contact'});
  });
  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href) return;
    if (href.toLowerCase().indexOf('mailto:') === 0) {
      posthog.capture('contact_link_clicked', {page_path: location.pathname});
      return;
    }
    try {
      var target = new URL(href, location.href);
      if (target.protocol === 'https:' && target.hostname !== location.hostname) {
        posthog.capture('outbound_link_clicked', {destination_host: target.hostname, page_path: location.pathname});
      }
    } catch (_) {}
  });
})();
