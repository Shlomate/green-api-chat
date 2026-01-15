import { forwardRef } from 'react';

import { Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks';
import { selectMiniVersion } from 'store/slices/chat.slice';

interface TextAreaProps {
  value?: string;
  onChange?: (value: string) => void;
  minRows?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ value = '', onChange, minRows }, ref) => {
    const isMiniVersion = useAppSelector(selectMiniVersion);
    const { t } = useTranslation();

    const computedMinRows = typeof minRows === 'number' ? minRows : isMiniVersion ? 5 : 1;

    return (
      <Input.TextArea
        ref={ref}
        style={{
          height: isMiniVersion ? undefined : 42, // (inline styles can't use '!important')
        }}
        autoSize={{ minRows: computedMinRows, maxRows: 5 }}
        maxLength={500}
        placeholder={t('MESSAGE_PLACEHOLDER')}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === 'Enter') {
            // add newline to current value
            const next = value + '\n';
            onChange?.(next);
          }
        }}
        onPressEnter={(e) => e.preventDefault()}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    );
  }
);

export default TextArea;

