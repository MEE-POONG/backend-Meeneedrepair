// HtmlContent.tsx
import React from 'react';

interface HtmlContentProps {
  content: string | undefined;
}

const HtmlContent: React.FC<HtmlContentProps> = ({ content }) => {
  return <div className='html-text' dangerouslySetInnerHTML={{ __html: content || '' }} />;
};

export default HtmlContent;
