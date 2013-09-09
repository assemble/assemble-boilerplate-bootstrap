/*
 * Regex for converting Bootstrap's liquid
 * templates over to Handlebars.
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

module.exports.regex = exports.regex = {
  patterns: [
    // Layouts
    // -------------------------------------------------
    {
      // Replace {{content}} tag with {{> body }} partial
      pattern: /(?:\{\{\s*content\s*\}\})/g,
      replacement: '{{> body }}'
    },
    {
      // Append `.html` ext to layouts defined in YFM
      pattern: /(---\s*layout:.*)/g,
      replacement: '$1.hbs'
    },

    // Titles and basic variables
    // -------------------------------------------------
    {
      pattern: /(\{%\s*)(if\s(page\..+)\s==\s(.+))\s(%\})\s*(.+)(\{\{.*\}\}.*)/g,
      replacement: '{{#is $3 $4}}\n    $7\n  {{/is}}'
    },
    {
      pattern: /(\{% else if %\})\s*(\{\{.*)\s*(\{% endif %\})/g,
      replacement: '{{#isnt title "Bootstrap"}}\n    $2\n  {{/isnt}}'
    },

    // Navigation
    // -------------------------------------------------
    {
      // Replace liquid tags in nav anchors with Handlebars helpers.
      //
      // Example:
      //    From: {% if page.slug == "getting-started" %} class="active"{% endif %}
      //    To:   {{#is basename "getting-started"}} class="active"{{/is}}
      //
      pattern: /(\{%\s*if|elsif)\s(page\.slug[ ]?==[ ]?)(".*)[ ]%\}(.*)(?:\{% endif %\})/g,
      replacement: '{{#is slug $3}}$4{{/is}}'
    },
    {
      // Replace liquid {% if/elseif %} navigation blocks with Handlebars {{#is/unless}}
      pattern: /(\{%\s*)\b(.*)\b\s(\b(.*)\b\.(.*)\s==\s)(.*\s*)(%\})(\s.*)(\s*)(\{(%|\{)\s*\b(.*)\b)\s(.*)(?:\.html)(\s*%\})/g,
      replacement: '{{#is slug $6}} $9 {{> $13 }}\n              {{/is}}'
    },
    {
      // Clean up any remaining {% endif %}'s
      pattern: /(?:\{%\s*endif\s*%\})/g,
      replacement: '\n'
    },

    // Tags
    // -------------------------------------------------
    {
      // Replace liquid includes with Handlebars partials
      pattern: /(\{%\s*include\s*)(|(?:.*)+)(?:\.html\s*%\})/g,
      replacement: '{{> $2 }}'
    },
    {
      // Strip 'page' path from tag variables
      pattern: /(\{\{\s*page\.)(.*)(?:\}\})/g,
      replacement: '{{ $2}}'
    },
    {
      // Remove leftover "page" variables
      pattern: /\b(is )(?:page\.)\b/g,
      replacement: '$1'
    },
    {
      // Replace "{{ base_url }}/dist" and "{{ base_url }}/assets" with "{{ assets }}"
      pattern: /(?:\{\{\s*base_url\s*\}\}(assets|dist))/g,
      replacement: '{{ assets }}'
    },
    // Use {{root}} variable once it's implemented in Assemble
    // {
    //   // Replace "{{ base_url }}/dist" and "{{ base_url }}/assets" with "{{ assets }}"
    //   pattern: /(href=")(\{\{[ ]?base_url[ ]?\}\})[\/]?(|.*)[ ]?"/g,
    //   replacement: 'href="{{root}}/$3.html\"'
    // },
    // {
    //   // cleanup from previous regex
    //   pattern: /({{root}}\/.html)/g,
    //   replacement: '{{root}}\/'
    // },

    {
      // Replace "{{ base_url }}/dist" and "{{ base_url }}/assets" with "{{ assets }}"
      pattern: /(\{\{ base_url \}\}2\.3\.2)/g,
      replacement: 'http://getbootstrap.com/2.3.2'
    },
    {
      // Replace "{{ base_url }}/dist" and "{{ base_url }}/assets" with "{{ assets }}"
      pattern: /(href=")(\{\{[ ]?base_url[ ]?\}\})[\/]?(|.*)[ ]?"/g,
      replacement: 'href="./$3.html\"'
    },
    {
      // cleanup from previous regex
      pattern: /.\/.html/g,
      replacement: 'index.html'
    },
    {
      // Replace liquid filter with {{now}} helper
      pattern: /site\.time \| date\:/g,
      replacement: 'now'
    },

    // Code blocks and syntax highlighting
    // -------------------------------------------------
    {
      // highlight.js doesn't support line numbers, so convert the
      // language definition to just "html"
      pattern: /html linenos/g,
      replacement: 'html'
    },
    {
      // Identify the language definitions after the first code
      // fence (```) for each highlighted code block.
      pattern: /(\{%\s*)\s*(?:highlight)\s*(bash|js|html|css|less)\s*(%\})/g,
      replacement: '\n{{#markdown}}\n```$2'
    },
    {
      pattern: /(\{%\s*endhighlight\s*%\})/g,
      replacement: '```\n{{/markdown}}\n'
    },

    // Add script and link tags for highlight.js
    // -------------------------------------------------
    {
      pattern: /(\<meta name=\"description\" content=\"\"\>)/g,
      replacement: '<meta name="description" content="{{pkg.description}}">'
    },
    {
      // Find the holder.js script tag, then just add it back
      // with highlight.js directly afterwards
      pattern: /(<script.*holder.js"><\/script>)/g,
      replacement: '$1\n<script src="{{ assets }}\/js/highlight.js"><\/script>' +
                   '\n<script>hljs.initHighlightingOnLoad();<\/script>'
    },
    {
      // replace Jekyll's 'pygments-manni.css' with 'github.css' for highlight.js,
      // and override the background color on github.css so it won't conflict
      // with Bootstrap's styles.
      pattern: /(pygments-manni)(.*">)/,
      replacement: 'github$2\n<style>pre code { background: transparent; }<\/style>'
    }
  ]
};

