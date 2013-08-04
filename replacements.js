/*
 * Regex for converting Bootstrap's liquid
 * templates over to Handlebars.
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

exports.init = function(grunt) {

  exports.regex = {
    patterns: [
      // Layouts
      // -------------------------------------------------
      {
        // Replace {{content}} tag with {{> body }} partial
        pattern: /(\{\{\s*content\s*\}\})/g,
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
        pattern: /(\{%\s*)(if|elsif)\s(page\.slug[ ]?==[ ]?)(".*)[ ]%\}(.*)({% endif %})/g,
        replacement: '{{#is slug $4}}$5{{/is}}'
      },
      {
        // Replace liquid {% if/elseif %} navigation blocks with Handlebars {{#is/unless}}
        pattern: /(\{%\s*)\b(.*)\b\s(\b(.*)\b\.(.*)\s==\s)(.*\s*)(%\})(\s.*)(\s*)(\{(%|\{)\s*\b(.*)\b)\s(.*)(?:\.html)(\s*%\})/g,
        replacement: '{{#is slug $6}} $8 {{> $13 }}\n              {{/is}}'
      },

      // Tags
      // -------------------------------------------------
      {
        // Delete remaining {% endif %}'s
        pattern: /(\{%\s*endif\s*%\})/g,
        replacement: ''
      },
      {
        // Replace liquid includes with Handlebars partials
        pattern: /(\{%\s*include\s*)(|(?:.*)+)(\.html\s*%\})/g,
        replacement: '{{> $2 }}'
      },
      {
        // Strip 'page' path from tag variables
        pattern: /(\{\{\s*page\.)(.*)(\}\})/g,
        replacement: '{{ $2}}'
      },
      {
        // Remove leftover "page" variables
        pattern: /\b(is )(page\.)\b/g,
        replacement: '$1'
      },
      {
        // Replace "{{ base_url }}/dist" and "{{ base_url }}/assets" with "{{ assets }}"
        pattern: /(\{\{\s*base_url\s*\}\}(assets|dist))/g,
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
        pattern: /(href=")(\{\{[ ]?base_url[ ]?\}\})[\/]?(|.*)[ ]?"/g,
        replacement: 'href="./$3.html\"'
      },
      {
        // cleanup from previous regex
        pattern: /(.\/.html)/g,
        replacement: 'index.html'
      },
      {
        // Replace liquid filter with {{now}} helper
        pattern: /(site\.time \| date\:)/g,
        replacement: 'now'
      },

      // Code blocks and syntax highlighting
      // -------------------------------------------------
      {
        pattern: /html linenos/g,
        replacement: 'html'
      },
      {
        pattern: /(\{%\s*)\s*(highlight)\s*(bash|js|html|css|less)\s*(%\})/g,
        replacement: '\n{{#markdown}}\n```$3'
      },
      {
        pattern: /(\{%\s*endhighlight\s*%\})/g,
        replacement: '```\n{{/markdown}}\n'
      },

      // Add script and link tags for highlight.js
      // -------------------------------------------------
      {
        pattern: /(<script.*holder.js"><\/script>)/g,
        replacement: '$1\n<script src="{{ assets }}\/js/highlight.js"><\/script>' +
                     '\n<script>hljs.initHighlightingOnLoad();<\/script>'
      },
      {
        pattern: /(pygments-manni)(.*">)/,
        replacement: 'github$2\n<style>pre code { background: transparent; }<\/style>'
      }
    ]
  };

  return exports;
};