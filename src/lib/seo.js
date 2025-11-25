// Minimal SEO helper to set title, meta description and common social tags at runtime
export default function setMeta({ title, description, url, image } = {}) {
  try {
    if (title) document.title = title;

    const upsertMeta = (attrName, attrValue, content) => {
      const selector = `meta[${attrName}="${attrValue}"]`;
      let el = document.head.querySelector(selector);
      if (el) el.setAttribute('content', content);
      else {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    if (description) upsertMeta('name', 'description', description);
    if (title) upsertMeta('property', 'og:title', title);
    if (description) upsertMeta('property', 'og:description', description);
    if (url) upsertMeta('property', 'og:url', url);
    if (image) upsertMeta('property', 'og:image', image);
    if (title) upsertMeta('name', 'twitter:title', title);
    if (description) upsertMeta('name', 'twitter:description', description);
    if (image) upsertMeta('name', 'twitter:image', image);

    // canonical link
    if (url) {
      let link = document.head.querySelector('link[rel="canonical"]');
      if (link) link.setAttribute('href', url);
      else {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', url);
        document.head.appendChild(link);
      }
    }
  } catch (e) {
    // fail silently in non-browser environments
    // console.warn('setMeta error', e);
  }
}
