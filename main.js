import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const statusText = document.querySelector('#status');
const googleLoginBtn = document.querySelector('#googleLoginBtn');
const loginView = document.querySelector('#loginView');
const appView = document.querySelector('#appView');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

const { SUPABASE_URL, SUPABASE_ANON_KEY } = window.APP_CONFIG ?? {};

const setStatus = (message) => {
  statusText.textContent = message;
};

const showLoginView = () => {
  loginView.classList.remove('hidden');
  appView.classList.add('hidden');
};

const showAppView = () => {
  loginView.classList.add('hidden');
  appView.classList.remove('hidden');
};

const activateTab = (tabName) => {
  tabButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tabName);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle('hidden', panel.id !== `tab-${tabName}`);
  });
};

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activateTab(button.dataset.tab);
  });
});

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
  googleLoginBtn.disabled = true;
  googleLoginBtn.style.opacity = '0.6';
  googleLoginBtn.style.cursor = 'not-allowed';
  setStatus('먼저 config.js에 SUPABASE_ANON_KEY를 입력해 주세요.');
  showLoginView();
} else {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const syncSessionView = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      setStatus(`세션 확인 오류: ${error.message}`);
      showLoginView();
      return;
    }

    if (session) {
      showAppView();
      return;
    }

    showLoginView();
  };

  googleLoginBtn.addEventListener('click', async () => {
    setStatus('Google 로그인 페이지로 이동 중...');

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setStatus(`로그인 시작 중 오류: ${error.message}`);
      return;
    }

    setStatus('리디렉션을 기다리는 중...');
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      showAppView();
      return;
    }

    showLoginView();
  });

  syncSessionView();
}
