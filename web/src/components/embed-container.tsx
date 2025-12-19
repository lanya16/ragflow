import { useTheme } from '@/components/theme-provider';
import { useTranslate } from '@/hooks/common-hooks';
import { RefreshCcw } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { RAGFlowAvatar } from './ragflow-avatar';
import { Button } from './ui/button';

import { ThemeEnum } from '@/constants/common';
import { MoonIcon, SunIcon } from 'lucide-react';
import React from 'react';

type EmbedContainerProps = {
  title: string;
  avatar?: string;
  handleReset?(): void;
} & PropsWithChildren;

export function EmbedContainer({
  title,
  avatar,
  children,
  handleReset,
}: EmbedContainerProps) {
  const { t } = useTranslate('common');

  const { setTheme, theme } = useTheme();

  const onMoonClick = React.useCallback(() => {
    setTheme(ThemeEnum.Light);
  }, [setTheme]);

  const onSunClick = React.useCallback(() => {
    setTheme(ThemeEnum.Dark);
  }, [setTheme]);

  return (
    <section className="flex flex-col h-full w-full bg-white text-[#1F1F1F] font-sans">
      {/* 头部 Header - 对应 Gemini 顶部栏 */}
      <header className="flex-none flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100 z-10">
        <div className="flex gap-3 items-center">
          {/* 头像与标题 */}
          <div className="transition-transform hover:scale-105">
            <RAGFlowAvatar
              avatar={avatar}
              name={title}
              isPerson
              className="w-8 h-8"
            />
          </div>
          <div className="text-lg font-medium text-[#1F1F1F] tracking-tight">
            {title}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* 重置按钮 - 改为 Gemini 风格的灰色胶囊按钮 */}
          <Button
            variant={'ghost'} // 建议改为 ghost 或自定义样式
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0F4F9] hover:bg-[#E1E3E1] text-[#444746] hover:text-[#1F1F1F] transition-colors border-none h-auto"
            onClick={handleReset}
          >
            <RefreshCcw size={16} />
            <span className="text-sm font-medium">{t('reset')}</span>
          </Button>
          <span>
            {theme === 'dark' ? (
              <MoonIcon onClick={onMoonClick} size={20} />
            ) : (
              <SunIcon onClick={onSunClick} size={20} />
            )}
          </span>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="flex-1 flex flex-col min-h-0 relative">{children}</main>
    </section>
  );
}
