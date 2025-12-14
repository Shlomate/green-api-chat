import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import MiniChat from 'components/mini-chat/chat.component';
import { MessageEventTypeEnum } from 'types';

const Main: FC = () => {
  const {
    i18n: { resolvedLanguage },
  } = useTranslation();

  // Keep notifying the parent frame about locale (optional)
  useEffect(() => {
    if (resolvedLanguage) {
      window.parent.postMessage(
        {
          type: MessageEventTypeEnum.LOCALE_CHANGE,
          payload: { locale: resolvedLanguage },
        },
        '*'
      );
    }
  }, [resolvedLanguage]);

  // MiniChat handles auth + empty state internally
  return <MiniChat />;
};

export default Main;

