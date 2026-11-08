import { SITE } from "@/lib/content";

// Search and AI crawlers are explicitly allowed so the site can be cited in AI answers.
const AI = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot", "cohere-ai", "Bytespider", "Meta-ExternalAgent", "Amazonbot", "DuckAssistBot", "MistralAI-User"];

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...AI.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
