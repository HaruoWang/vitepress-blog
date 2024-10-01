---
description: Using Strudel to cover Shiro Sagisu's Persecution Of The Masses
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/live-coding/tidal/potm.html
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/live-coding/tidal/potm.html
  - - meta
    - property: og:title
      content: Strudel Work：Persecution Of The Masses
  - - meta
    - name: og:description
      content: Using Strudel to cover Shiro Sagisu's Persecution Of The Masses
  - - meta
    - name: og:image
      content: /og-image.webp
  - - meta
    - property: twitter:title
      content: Strudel Work：Persecution Of The Masses
  - - meta
    - name: twitter:description
      content: Using Strudel to cover Shiro Sagisu's Persecution Of The Masses
  - - meta
    - name: twitter:image
      content: https://haruowang.vercel.app/og-image.webp
---

# 【Strudel Work：Persecution Of The Masses】

<p><Badge type="info" text="🌳 Evergreen" /></P>

<div class="videobox">
    <iframe frameborder="0" src="https://www.youtube.com/embed/LcXZvQNIc6U" allowFullScreen>
    </iframe>
</div>

## CPM
- cpm = bpm / bpc
- bpc: How many beats are required to complete a cycle? The smaller the number, the faster the speed.

## Drum
- stack(sound.bank)
- e.g. `stack(s("<hh ~>*8").bank("LinnDrum"), s("<bd>*8").bank("RolandTR909"));`

## Note
- cat.note.sound
- e.g. `cat("<eb3!2 f3@2>*4", "<c3>*4").note().n(3).s("gm_synth_bass_1");`

## Tips
- ~ / -: rests
- !: replicate
- @: elongate
- n(3).s("gm_synth_bass_1") = s("gm_synth_bass_1":3)
- transpose(+-12): pitch shifting
- arrange.cpm(cpm): as an integration

## Demo

<div class="videobox one1">
    <iframe src="https://strudel.cc/?ObIDhpp7APMx"></iframe>
</div>