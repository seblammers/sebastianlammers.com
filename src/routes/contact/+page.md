---
title: 'Contact'
description: 'The contact page of sebastianlammers.com, my personal homepage, where I play with code and share some notes and projects.' 
---

<script>
    
</script>

If you want to talk, find me [on Mastodon](https://vis.social/@seblammers) or use the form below.


<form class="flow" name="contact-form" method="POST" netlify-honeypot="bot-field" data-netlify="true">
    <input type="hidden" name="form-name" value="contact-form" />

    <section>
        <label for="name">Name</label>
        <input name="name" id="name" required placeholder="Your Name" type="text" />
    </section>
    <section>
        <label for="email">Email</label>
        <input name="email" id="email" required placeholder="Your Email" type="email" />
    </section>
    <section>
        <label for="message">Message</label>
        <textarea name="message" id="message" required placeholder="Your Message" rows="12" cols="60"></textarea>
    </section>
  
  <input class="button" type="submit" value="Submit" />
</form>

<style>
    section {
        margin-top: var(--space-s);
    }
    input {
        background-color: var(--surface2-light);
    }

    .button {
        background-color: var(--ink);
        color: var(--surface2-light);
    }
    textarea {
        border-radius: var(--radiusSection);
    }
</style>