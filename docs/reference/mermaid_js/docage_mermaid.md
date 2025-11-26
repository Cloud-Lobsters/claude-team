# Cloudflare Error 522 – “Connection Timed Out”

This document explains the Cloudflare **Error 522** (“Connection timed out”) that you may encounter when trying to access a website that is protected by Cloudflare. It covers:

* What the error means  
* Typical causes  
* Recommended troubleshooting steps  
* Example of the error page you might see

---

## 1. Overview

| Item | Description |
|------|-------------|
| **Error Code** | `522` |
| **Title** | Connection timed out |
| **Trigger** | Cloudflare’s edge server successfully connects to the origin web server, but the origin fails to respond within the allotted time. |
| **Typical Status Code** | HTTP 522 |

---

## 2. What Happens?

When a visitor requests a page, Cloudflare’s edge server establishes a TCP connection to the origin server. If the origin server does **not** finish the request within Cloudflare’s timeout window (typically 100 seconds), Cloudflare aborts the connection and returns a 522 error to the visitor.

---

## 3. Common Causes

| Cause | Explanation |
|------|------------|
| **High CPU / Memory usage** | The origin server is busy or overloaded, preventing it from completing the request. |
| **Long-running scripts** | PHP, Node.js, or other backend processes take too long. |
| **Database bottlenecks** | Slow queries or locked tables. |
| **Network issues** | Packet loss or routing problems between Cloudflare and the origin. |
| **Firewall / Security rules** | Misconfigured rules that block or delay traffic. |

---

## 4. Troubleshooting Checklist

| Step | Action | Tool / Command |
|------|-------|---------------|
| 1 | **Check server load** | `top`, `htop`, `vmstat` |
| 2 | **Inspect logs** | `/var/log/nginx/access.log`, `/var/log/nginx/error.log` |
| 3 | **Profile slow scripts** | `php -d xdebug.profiler_enable=1` or Node profiler |
| 4 | **Verify database health** | `SHOW PROCESSLIST;` (MySQL) |
| 5 | **Review firewall rules** | Cloudflare dashboard → Firewall → Rules |
| 6 | **Test connectivity** | `curl -v https://yourdomain.com` from the origin |
| 7 | **Increase timeout** | Adjust Cloudflare timeout settings (if possible) |

---

## 5. Example Error Page

Below is a sanitized example of the Cloudflare error page you might see:

```text
Connection timed out Error code 522
Visit cloudflare.com for more information.
2025-08-11 16:51:21 UTC
You
Browser
Working
London
Cloudflare
Working
bundlephobia.com
Host
Error
What happened?
The initial connection between Cloudflare's network and the origin web server timed out. As a result, the web page can not be displayed.
What can I do?
If you're a visitor of this website:
Please try again in a few minutes.
If you're the owner of this website:
Contact your hosting provider letting them know your web server is not completing requests. An Error 522 means that the request was able to connect to your web server, but that the request didn't finish. The most likely cause is that something on your server is hogging resources. Additional troubleshooting information here.
Cloudflare Ray ID: 96d93c3d1e94911c • Your IP: Click to reveal • Performance & security by Cloudflare
```

---

## 6. Quick Reference

| Item | Value |
|------|-------|
| **Error Code** | 522 |
| **Meaning** | Origin server timed out |
| **Typical Fix** | Reduce load, optimize scripts, check database, adjust firewall |
| **Cloudflare Support** | https://support.cloudflare.com |

---

### End of Documentation