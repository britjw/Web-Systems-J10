document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.subscribe-form');
  if (!form) return;

  const firstName = form.querySelector('#first');
  const lastName = form.querySelector('#last');
  const email = form.querySelector('#email');

  const status = document.createElement('p');
  status.className = 'form-status';
  status.setAttribute('aria-live', 'polite');
  form.appendChild(status);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(input, message) {
    input.classList.add('input-error');
    input.setAttribute('aria-invalid', 'true');
    input.dataset.error = message;
  }

  function clearError(input) {
    input.classList.remove('input-error');
    input.removeAttribute('aria-invalid');
    delete input.dataset.error;
  }

  function validateField(input, message) {
    const value = input.value.trim();

    if (!value) {
      setError(input, message);
      return false;
    }

    if (input === email && !emailPattern.test(value)) {
      setError(input, 'Please enter a valid email address.');
      return false;
    }

    clearError(input);
    return true;
  }

  [firstName, lastName, email].forEach((input) => {
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        validateField(
          input,
          input === firstName
            ? 'First name is required.'
            : input === lastName
              ? 'Last name is required.'
              : 'Email address is required.'
        );
      } else {
        clearError(input);
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isFirstValid = validateField(firstName, 'First name is required.');
    const isLastValid = validateField(lastName, 'Last name is required.');
    const isEmailValid = validateField(email, 'Email address is required.');

    if (isFirstValid && isLastValid && isEmailValid) {
      status.textContent = `Thanks, ${firstName.value.trim()}! You are signed up for updates.`;
      status.classList.remove('form-status--error');
      status.classList.add('form-status--success');
      form.reset();
      [firstName, lastName, email].forEach(clearError);
      firstName.focus();
      return;
    }

    const firstInvalid = [firstName, lastName, email].find((input) =>
      input.classList.contains('input-error')
    );
    if (firstInvalid) firstInvalid.focus();

    status.textContent = 'Please fix the highlighted fields and try again.';
    status.classList.remove('form-status--success');
    status.classList.add('form-status--error');
  });
});