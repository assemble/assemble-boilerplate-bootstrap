/*
 * Replacement patterns for converting Bootstrap's liquid templates to Handlebars.
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

module.exports = {
  examples: [
    {
      // Fix example assets
      pattern: /(..\/..\/(dist|docs-assets)\/)/g,
      replacement: '../../assets/'
    }
  ],
  bootstrap: [

    /**
     * Layouts
     */

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
    {
      // Remove `page.` variable
      pattern: /({%|{{)\s*?page\./g,
      replacement: '$1 '
    },


    /**
     * Navigation
     */

    {
     /**
      * Replace liquid tags in nav anchors with Handlebars helpers.
      * @example:
      *   From: {% if page.slug == "getting-started" %} class="active"{% endif %}
      *   To:   {{#is basename "getting-started"}} class="active"{{/is}}
      */
      pattern: /({%\s*?if\s*?)(page\..+?)(\s*?==\s*?)(.*?)(\s*?%})(.*?)({% endif %})/gi,
      replacement: '{{#is $2$4}}$6{{/is}}'
    },
    {
      // Replace liquid {% if/elseif %} navigation blocks with Handlebars {{#is/unless}}
      pattern: /({%\s*)\b(.*)\b\s(\b(.*)\b\.(.*)\s==\s)(.*\s*)(\s*?%})(\s.*)(\s*)({(%|\{)\s*\b(.*)\b)\s(.*)(?:\.html)(\s*%})(\s*)/g,
      replacement: '{{#is slug $6}}$8$9{{> $13 }}$15{{/is}}$15'
    },
    {
     /**
      * Replace liquid tags in footer.html with Handlebars helpers.
      * @example:
      *  From:
      *    {% if page.slug == "customize" %}
      *    <script src="{{ page.base_url }}assets/js/less.js"></script>
      *    ...
      *    <script src="{{ page.base_url }}assets/js/customizer.js"></script>
      *    {% endif %}
      *  To:
      *    {{#is slug == "customize" }}
      *    <script src="{{ page.base_url }}assets/js/less.js"></script>
      *    ...
      *    <script src="{{ page.base_url }}assets/js/customizer.js"></script>
      *    {{/is}}
      */
      pattern: /({%\s*?if\s*?)(page\..+?)(\s*?==\s*?)(.*?)(\s*?%})([\s\S]*?)({% endif %})/gi,
      replacement: '{{#is $2$4}}$6{{/is}}'
    },
    {
      // Clean up any remaining {% endif %}'s
      pattern: /(?:\n\s*?{%\s*endif\s*%})/g,
      replacement: ''
    },
    {
      pattern: /\{% comment %}/g,
      replacement: '{{#comment}}'
    },
    {
      pattern: /\{% endcomment %}/g,
      replacement: '{{/comment}}'
    },
    {
      pattern: /({% for iconClassName .+ %})([\s\S]+)({% endfor %})/,
      replacement: function(a, b, c, d) {
        b = '{{#each glyphicons}}\n';
        c = [
          '<li>',
          '  <span class="glyphicon {{.}}"></span>',
          '  <span class="glyphicon-class">glyphicon {{.}}</span>',
          '</li>\n'
        ].join('\n');
        d = '{{/each}}\n';
        return b + c + d;
      }
    },


    /**
     * Tags
     */

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
      pattern: /(?:\{\{\s*base_url\s*\}\}(assets|dist|docs-assets))/g,
      replacement: '{{ assets }}'
    },
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
      pattern: /\{%\s?(else|else if)\s?%}/g,
      replacement: '{{ else }}'
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


    /**
     * Code blocks and syntax highlighting
     */

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
    {
      // Fix example assets
      pattern: /"..\/examples/g,
      replacement: '"examples'
    },


    /**
     * Add script and link tags for highlight.js
     */
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
    },
    {
      pattern: /(<link.+)(bootstrap.min.css)".+/g,
      replacement: '<link href="{{ assets }}/css/site.css" rel="stylesheet">'
    },
    {
      pattern: /_gaq.+'_setAccount.+/g,
      replacement: '_gaq.push([\'_setAccount\', \'{{ site.ga.id }}\']);'
    },
    {
      pattern: /<meta name="description.+/gm,
      replacement: '<meta name="description" content="{{ site.description }}">'
    },
    {
      pattern: /<meta name="keywords.+/gm,
      replacement: '<meta name="keywords" content="{{ site.keywords }}">'
    },
    {
      pattern: /<meta name="author.+/gm,
      replacement: '<meta name="author" content="{{ site.author }}">'
    },
  ]
};

