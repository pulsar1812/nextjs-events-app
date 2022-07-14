import { useState, useContext } from 'react';

import NotificationContext from '../../store/NotificationContext';
import styles from './NewsletterRegistration.module.css';

export default function NewsletterRegistration() {
  const [email, setEmail] = useState('');

  const notificationCtx = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter',
      status: 'pending',
    });

    try {
      const res = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter',
          status: 'success',
        });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong',
        status: 'error',
      });
    }
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
