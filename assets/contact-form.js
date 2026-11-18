/* Public contact form: count accepted submissions, never clicks as purchases. */
(function () {
  'use strict';
  var form = document.getElementById('contactForm');
  if (!form) return;
  var pending = false;
  var button = form.querySelector('button[type="submit"]');
  var status = document.createElement('p');
  status.setAttribute('role', 'status');
  form.appendChild(status);
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (pending) return;
    pending = true;
    if (button) button.disabled = true;
    status.textContent = 'Sending…';
    fetch(form.action, {method: 'POST', body: new FormData(form), headers: {'Accept': 'application/json'}})
      .then(function (response) {
        if (!response.ok) throw new Error('Submission not accepted');
        document.getElementById('contactModal').style.display = 'none';
        document.getElementById('thankYouModal').style.display = 'flex';
        form.reset();
        status.textContent = '';
        // No names, email, phone, company or message are attached to this event.
        document.dispatchEvent(new Event('earlylight:lead-submitted'));
      }).catch(function () {
        status.textContent = 'Your message could not be sent. Please try again.';
      }).finally(function () {
        pending = false;
        if (button) button.disabled = false;
      });
  });
})();
