import { FC } from 'react';
import { Flex } from 'antd';

import ContentSide from './content-side/content-side.component';
import { useAppSelector } from 'hooks';
import { selectType } from 'store/slices/chat.slice';

function getHeightFromUrl(defaultPx = 520) {
  const params = new URLSearchParams(window.location.search);

  // allow either ?h=420 or ?height=420 or ?height=420px
  const raw = params.get('h') ?? params.get('height');
  if (!raw) return `${defaultPx}px`;

  const m = raw.trim().match(/^(\d{2,4})(px)?$/i);
  if (!m) return `${defaultPx}px`;

  const n = Number(m[1]);
  if (Number.isNaN(n)) return `${defaultPx}px`;

  // clamp so it can't break layout
  const clamped = Math.max(240, Math.min(1200, n));
  return `${clamped}px`;
}

const Chat: FC = () => {
  const type = useAppSelector(selectType);
  const height = getHeightFromUrl(520);

  return (
    <Flex
      className={`full-chat full-chat--single ${type === 'console-page' ? 'console-page' : ''}`}
      style={{
        overflow: 'hidden',
        height,
        width: '100%',
      }}
    >
      <ContentSide />
    </Flex>
  );
};

export default Chat;
