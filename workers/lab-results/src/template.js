/* ---------------- email template ----------------
 * The studio's email standard, shared with the site's contact-form Worker (avantgarde-contact):
 * table layout with inline styles, 600 px wide, so Gmail, Outlook, Apple Mail, QQ Mail and phones
 * render the same. Brand: ink #0e0f0e, paper #f4f5f3, panel grey #d6d6d5, secondary text #4d4e4c.
 * Dark mode: Apple Mail honours "light only" below. Gmail and Outlook apps recolour backgrounds and
 * text but never images, so the logo is badge.png: a rounded ink tile with the light logo and
 * transparent corners. It reads as a deliberate tile on any background, light or dark.
 * Every email also has a plain-text twin. Keep the two Workers' templates in step.
 */

export const SITE_URL = "https://www.a-v-a-n-t-g-a-r-d-e.com";
export const STUDIO_EMAIL = "hello@a-v-a-n-t-g-a-r-d-e.com";
const EMAIL_ASSETS = SITE_URL + "/assets/img/email/";

export const FONT = "-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif";
export const C = { ink: "#0e0f0e", paper: "#f4f5f3", grey: "#d6d6d5", mid: "#4d4e4c", line: "#e4e4e3", white: "#ffffff" };

export function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export function emailShell({ lang, preheader, kicker, body }) {
  const year = new Date().getFullYear();
  const foot = lang === "zh"
    ? { org: "先端艺培 Avantgarde Studio · 尚岸光景（ASHORE TIME）旗下", place: "伦敦 · 上海 · 苏州" }
    : { org: "Avantgarde Studio 先端艺培 · part of ASHORE TIME", place: "London · Shanghai · Suzhou" };
  return '<!doctype html><html lang="' + (lang === "zh" ? "zh-CN" : "en") + '"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only">' +
    "<style>:root{color-scheme:light only;supported-color-schemes:light only;}</style>" +
    "<title>Avantgarde Studio</title></head>" +
    '<body style="margin:0;padding:0;background:' + C.paper + ';-webkit-text-size-adjust:100%;">' +
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">' + escapeHtml(preheader) + "&#8203;&nbsp;".repeat(30) + "</div>" +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' + C.paper + ';"><tr><td align="center" style="padding:32px 12px;">' +
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;border-collapse:separate;">' +
    // header
    '<tr><td style="background:' + C.ink + ';border-radius:18px 18px 0 0;padding:20px 28px;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
    '<td valign="middle"><a href="' + SITE_URL + '" style="text-decoration:none;"><img src="' + EMAIL_ASSETS + 'badge.png" width="108" height="84" alt="Avantgarde Studio 先端艺培" style="display:block;border:0;width:108px;height:84px;color:' + C.paper + ';font:600 18px ' + FONT + ';"></a></td>' +
    '<td valign="bottom" align="right" style="font:600 11px/1.4 ' + FONT + ';letter-spacing:2px;text-transform:uppercase;color:' + C.grey + ';">' + escapeHtml(kicker) + "</td>" +
    "</tr></table></td></tr>" +
    // card
    '<tr><td style="background:' + C.white + ';border-radius:0 0 18px 18px;padding:40px 36px 36px;font:16px/1.7 ' + FONT + ';color:' + C.ink + ';">' + body + "</td></tr>" +
    // footer
    '<tr><td style="padding:28px 36px 8px;font:13px/1.7 ' + FONT + ';color:' + C.mid + ';">' +
    '<img src="' + EMAIL_ASSETS + 'badge.png" width="54" height="42" alt="" style="display:block;border:0;width:54px;height:42px;margin:0 0 12px;">' +
    escapeHtml(foot.org) + "<br>" + escapeHtml(foot.place) + " · " +
    '<a href="mailto:' + STUDIO_EMAIL + '" style="color:' + C.mid + ';">' + STUDIO_EMAIL + "</a> · " +
    '<a href="' + SITE_URL + '" style="color:' + C.mid + ';">a-v-a-n-t-g-a-r-d-e.com</a><br>© ' + year + " Avantgarde Studio</td></tr>" +
    "</table></td></tr></table></body></html>";
}

export function heading(text) {
  return '<h1 style="margin:0 0 16px;font:800 28px/1.25 ' + FONT + ';letter-spacing:-0.3px;color:' + C.ink + ';">' + escapeHtml(text) + "</h1>";
}
export function para(text, style) {
  return '<p style="margin:0 0 18px;' + (style || "") + '">' + text + "</p>";
}
export function label(text) {
  return '<div style="font:600 11px/1.4 ' + FONT + ';letter-spacing:1.6px;text-transform:uppercase;color:' + C.mid + ';margin:0 0 6px;">' + escapeHtml(text) + "</div>";
}
export function detailRows(rows) {
  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 28px;border-top:1px solid ' + C.line + ';">' +
    rows.map(([k, v]) =>
      '<tr><td valign="top" style="padding:12px 16px 12px 0;border-bottom:1px solid ' + C.line + ';width:34%;font:500 13px/1.5 ' + FONT + ';color:' + C.mid + ';">' + escapeHtml(k) + "</td>" +
      '<td valign="top" style="padding:12px 0;border-bottom:1px solid ' + C.line + ';font:600 15px/1.5 ' + FONT + ';color:' + C.ink + ';word-break:break-word;">' + v + "</td></tr>").join("") +
    "</table>";
}
export function button(href, text) {
  return '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 8px;"><tr><td style="background:' + C.ink + ';border-radius:999px;">' +
    '<a href="' + escapeHtml(href) + '" style="display:inline-block;padding:14px 28px;font:600 15px/1 ' + FONT + ';color:' + C.paper + ';text-decoration:none;border-radius:999px;">' + escapeHtml(text) + " &rarr;</a></td></tr></table>";
}
/** Numbered rows, as in the contact acknowledgement's "what happens next". items: [[title, html]] */
export function steps(items) {
  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">' +
    items.map(([title, d], n) =>
      '<tr><td valign="top" style="width:44px;padding:14px 0;border-top:1px solid ' + C.line + ';font:800 15px/1.5 ' + FONT + ';color:' + C.ink + ';">0' + (n + 1) + "</td>" +
      '<td valign="top" style="padding:14px 0;border-top:1px solid ' + C.line + ';"><div style="font:600 15px/1.5 ' + FONT + ';color:' + C.ink + ';">' + escapeHtml(title) + "</div>" +
      '<div style="font:400 14px/1.7 ' + FONT + ';color:' + C.mid + ';">' + d + "</div></td></tr>").join("") +
    "</table>";
}
/** The quoted tip with a black rule on the left. */
export function quote(html) {
  return '<div style="border-left:3px solid ' + C.ink + ';padding:2px 0 2px 16px;margin:0 0 28px;font:400 15px/1.7 ' + FONT + ';color:' + C.ink + ';">' + html + "</div>";
}
/** WeCom card. `who` is initials only (public repo; tutors appear by initials). */
export function wechat(title, who) {
  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;background:' + C.paper + ';border-radius:14px;"><tr>' +
    '<td style="padding:18px;width:112px;"><img src="' + EMAIL_ASSETS + 'wechat-qr.png" width="112" height="112" alt="WeCom QR" style="display:block;border:0;width:112px;height:112px;border-radius:8px;background:#ffffff;"></td>' +
    '<td valign="middle" style="padding:18px 18px 18px 4px;"><div style="font:600 15px/1.5 ' + FONT + ';color:' + C.ink + ';">' + escapeHtml(title) + "</div>" +
    '<div style="font:400 13px/1.6 ' + FONT + ';color:' + C.mid + ';">' + escapeHtml(who) + "</div></td></tr></table>";
}
