import ReactMarkdown from "react-markdown";
import styles from "./MarkdownContent.module.css";

export function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <div className={styles.content}>
      <ReactMarkdown
        components={{
          h1: "h2",
          h2: "h2",
          h3: "h3",
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
