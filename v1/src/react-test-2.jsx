import { useState } from "react";
import { marked } from "marked";

const renderer = {
  heading(args) {
    const depth = args.depth;
    const text = this.parser.parseInline(args.tokens);

    if (depth > 3) {
      return `<h${depth}>${text}</h${depth}>`;
    }

    return `
            <h${depth}>
              <a name="${text}" class="anchor" href="#${text}">
                <span class="header-link">${text}</span>
              </a>
            </h${depth}>`;
  },

  blockquote(args) {
    const text = args.text
    
    return `<blockquote onClick="navigator.clipboard.writeText('${text}'); alert('클립보드에 복사되었습니다')">${text}</blockquote>`;
  },
}

marked.use({ renderer })

export const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div>
      <textarea
        value={markdown}
        onChange={handleChange}
        placeholder="마크다운을 입력하세요."
      />
      <h3>마크다운 결과물</h3>
      <div
        className="output"
        dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
      ></div>
    </div>
  );
};