# Add a Safe Query String Printer Page

## Summary

Create a small web page that reads a value from the URL query string and prints it only after the user clicks a button.

Example URL:

```text
query.html?message=Hello%20Ziggy
```

## Task

Add a page named `query.html` with:

- A heading
- A short empty output area
- A button labeled `Show message`

When the button is clicked, read the `message` query parameter and display it on the page.

## Requirements

- Use `URLSearchParams` to read the query string.
- Use `textContent`, not `innerHTML`, when writing the message to the page.
- If `message` is missing or blank, show `No message provided.`
- Keep the page simple and usable without a build step.

## Acceptance Criteria

- Opening `query.html?message=Hello%20Ziggy` and clicking the button shows `Hello Ziggy`.
- Opening `query.html?message=<script>alert(1)</script>` prints the text instead of running it.
- Opening `query.html` and clicking the button shows `No message provided.`
