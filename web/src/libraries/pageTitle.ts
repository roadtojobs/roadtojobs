const SITE_NAME = 'Road To Jobs | Your Interview Tracking App';

export const setPageTitle = (title: string | null) => {
  if (!title) {
    window.document.title = SITE_NAME;
  }

  window.document.title = `${title} - ${SITE_NAME}`;
};
