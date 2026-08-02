---
layout: page
permalink: /publications/
title: publications
description: Research publications in reverse chronological order.
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<style>
  @media (min-width: 576px) {
    .publications .bibliography .abbr:has(.preview) {
      flex: 0 0 22%;
      max-width: 22%;
    }
  }

  .publications .bibliography .preview {
    width: 100%;
    height: auto;
  }
</style>

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography %}

</div>
