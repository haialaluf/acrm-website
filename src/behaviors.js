/**
 * Everything on the page that moves, ported from the design's site/v2.js:
 * reveals, the nav's theme and progress bar, the side dots, the scripted
 * chats, the work tabs, the hub's lines and the hero inbox.
 *
 * React draws the markup once per language and never re-renders it, so this
 * works on the DOM directly, as the design does. `start` returns a cleanup
 * that stops every timer, observer and listener, so the language switch (and
 * StrictMode's double mount) can tear it down and start over.
 */
import { REDUCED as RM } from './reduced-motion.js'

const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => [...r.querySelectorAll(s)]

export function start(root, t) {
  const timers = new Set()
  const observers = []
  const offs = []
  let alive = true

  const later = (fn, ms) => {
    const id = setTimeout(() => {
      timers.delete(id)
      fn()
    }, ms)
    timers.add(id)
    return id
  }
  const cancel = (id) => {
    clearTimeout(id)
    timers.delete(id)
  }
  const wait = (ms) => new Promise((r) => later(r, ms))
  const on = (el, type, fn, opts) => {
    el.addEventListener(type, fn, opts)
    offs.push(() => el.removeEventListener(type, fn, opts))
  }
  const observe = (cb, opts, els) => {
    const io = new IntersectionObserver(cb, opts)
    els.forEach((el) => io.observe(el))
    observers.push(io)
    return io
  }

  /* reveal */
  const io = observe(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      }),
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    $$('[data-rv],.p-was', root),
  )

  /* nav theme, progress, dots */
  const nav = $('#nav', root)
  const dots = $('#dots', root)
  const prog = $('#prog', root)
  const burger = $('#burger', root)
  const secs = $$('main>section', root)
  const dlinks = $$('a', dots)
  const nlinks = $$('.nav-links a', nav)
  const close = () => {
    nav.classList.remove('open')
    burger.setAttribute('aria-expanded', 'false')
  }
  on(burger, 'click', () => burger.setAttribute('aria-expanded', nav.classList.toggle('open')))
  $$('#mmenu a', nav).forEach((a) => on(a, 'click', close))
  on(document, 'keydown', (e) => e.key === 'Escape' && close())

  const map = { work: '#work', build: '#build', ways: '#build', pricing: '#pricing', faq: '#faq' }
  function onScroll() {
    const y = scrollY
    const h = innerHeight
    nav.classList.toggle('stuck', y > 8)
    prog.style.transform = `scaleX(${y / (document.documentElement.scrollHeight - h) || 0})`
    let navSec = secs[0]
    let midSec = secs[0]
    for (const s of secs) {
      const r = s.getBoundingClientRect()
      if (r.top <= 36) navSec = s
      if (r.top <= h * 0.5) midSec = s
    }
    nav.dataset.theme = navSec.dataset.theme
    dots.dataset.theme = midSec.dataset.theme
    dlinks.forEach((a, i) => a.classList.toggle('cur', secs[i] === midSec))
    nlinks.forEach((a) => a.classList.toggle('cur', a.getAttribute('href') === map[midSec.id]))
  }
  on(window, 'scroll', onScroll, { passive: true })
  on(window, 'resize', onScroll)
  onScroll()

  /* scripted player: [data-at] reveal, [data-add] class, [data-off] hide, [data-type] typewriter */
  function player(el0) {
    let T = []
    const els = $$('[data-at]', el0)
    const push = (fn, ms) => T.push(later(fn, ms))
    function reset() {
      T.forEach(cancel)
      T = []
      els.forEach((el) => {
        el.classList.remove('on', 'typing-c')
        if (el.dataset.add) el.classList.remove(el.dataset.add)
        if (el.dataset.type !== undefined) el.textContent = ''
      })
    }
    function type(el) {
      const s = el.dataset.type
      el.classList.add('typing-c')
      let i = 0
      const step = () => {
        el.textContent = s.slice(0, ++i)
        if (i < s.length) push(step, RM ? 0 : 22 + Math.random() * 24)
        else push(() => el.classList.remove('typing-c'), 400)
      }
      step()
    }
    function play() {
      reset()
      els.forEach((el) => {
        push(() => {
          if (el.dataset.add) el.classList.add(el.dataset.add)
          else el.classList.add('on')
          if (el.dataset.type !== undefined) type(el)
        }, RM ? 0 : +el.dataset.at)
        if (el.dataset.off)
          push(() => {
            el.classList.remove('on')
            if (el.dataset.add) el.classList.remove(el.dataset.add)
          }, RM ? 0 : +el.dataset.off)
      })
    }
    return { play, reset }
  }
  const whenVisible = (el, show, hide) =>
    observe(([e]) => (e.isIntersecting ? show() : hide()), { threshold: 0.3 }, [el])
  function loop(el, dur) {
    const p = player(el)
    let id
    const run = () => {
      p.play()
      id = later(run, dur)
    }
    whenVisible(
      el,
      () => {
        cancel(id)
        run()
      },
      () => {
        cancel(id)
        p.reset()
      },
    )
  }

  /* work tabs */
  const items = $$('.wi', root)
  const demos = $$('.demo', root)
  const pl = demos.map(player)
  const wcap = $('#wcap', root)
  let cur = -1
  let wt
  let wvis = false
  function show(i) {
    cur = i
    cancel(wt)
    items.forEach((b, k) => b.classList.toggle('cur', k === i))
    demos.forEach((d, k) => {
      d.classList.toggle('cur', k === i)
      if (k !== i) pl[k].reset()
    })
    const dur = +demos[i].dataset.dur
    items[i].style.setProperty('--dur', dur + 'ms')
    const bar = $('.bar', items[i])
    bar.style.animation = 'none'
    void bar.offsetWidth
    bar.style.animation = ''
    wcap.textContent = `0${i + 1} / 0${items.length}`
    pl[i].play()
    if (wvis) wt = later(() => show((i + 1) % items.length), dur)
  }
  items.forEach((b, i) => on(b, 'click', () => show(i)))
  show(0)
  whenVisible(
    $('#workBox', root),
    () => {
      wvis = true
      show(cur)
    },
    () => {
      wvis = false
      cancel(wt)
    },
  )

  /* build + start */
  const aiwin = $('#aiwin', root)
  const startBox = $('#start', root)
  loop(aiwin, +aiwin.dataset.dur)
  loop(startBox, +startBox.dataset.dur)

  /* ways spotlight */
  $$('.way', root).forEach((w) =>
    on(w, 'pointermove', (e) => {
      const r = w.getBoundingClientRect()
      w.style.setProperty('--mx', e.clientX - r.left + 'px')
      w.style.setProperty('--my', e.clientY - r.top + 'px')
    }),
  )

  /* hub lines. Which side a tile is on comes from where it is, not which
     column it's in, so right-to-left draws the same picture mirrored. */
  const hub = $('#hub', root)
  const svg = $('#hubsvg', root)
  const core = $('.core', hub)
  function lines() {
    if (innerWidth <= 960) {
      svg.innerHTML = ''
      return
    }
    const H = hub.getBoundingClientRect()
    const C = core.getBoundingClientRect()
    const cx = C.left + C.width / 2 - H.left
    const cy = C.top + C.height / 2 - H.top
    const rad = C.width / 2
    let out = ''
    $$('.tile', hub).forEach((tile, i) => {
      const r = tile.getBoundingClientRect()
      const left = r.left + r.width / 2 - H.left < cx
      const x1 = (left ? r.right : r.left) - H.left
      const y1 = r.top + r.height / 2 - H.top
      const ang = Math.atan2(y1 - cy, x1 - cx)
      const x2 = cx + Math.cos(ang) * rad
      const y2 = cy + Math.sin(ang) * rad
      const mx = (x1 + x2) / 2
      const d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`
      out += `<path class="ln" d="${d}"/><path class="lp" pathLength="100" d="${d}" style="animation-delay:${-(i * 0.41)}s"/>`
    })
    svg.innerHTML = out
  }
  on(window, 'resize', lines)
  document.fonts?.ready.then(() => alive && lines())
  later(lines, 300)
  lines()

  /* hero device: tilt */
  const dev = $('#device', root)
  const hero = $('#top', root)
  if (!RM && matchMedia('(pointer:fine)').matches) {
    on(hero, 'pointermove', (e) => {
      const r = hero.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      dev.style.transform = `rotateY(${x * -6}deg) rotateX(${y * 5}deg)`
    })
    on(hero, 'pointerleave', () => (dev.style.transform = ''))
  }

  /* hero device: live scenes */
  scenes(root, t.hero.device, wait, () => alive)

  return () => {
    alive = false
    timers.forEach(clearTimeout)
    timers.clear()
    observers.forEach((o) => o.disconnect())
    offs.forEach((off) => off())
    svg.innerHTML = ''
  }
}

const el = (tag, cls, text) => {
  const d = document.createElement(tag)
  if (cls) d.className = cls
  if (text != null) d.textContent = text
  return d
}

/** One message in the hero inbox, the same shapes as `Msg` in Chat.jsx. */
function bubble(m) {
  if (m.k === 'typing') {
    const d = el('div', 'typing out pop')
    d.append(el('i'), el('i'), el('i'))
    return d
  }
  if (m.k === 'lead') {
    const d = el('div', 'mc pop')
    const mt = el('div', 'mt')
    mt.append(el('span', 'chip-s fb', m.chip), el('span', null, m.time))
    d.append(mt, el('b', null, m.name), el('span', null, m.detail))
    return d
  }
  if (m.k === 'sys') {
    const d = el('div', 'b-sys pop' + (m.tone ? ' ' + m.tone : ''))
    if (m.tone === 'ok') d.append(el('span', 'ck'))
    d.append(m.text)
    return d
  }
  const d = el('div', `b pop b-${m.k}`)
  if (m.who) d.append(el('span', 'who' + (m.you ? ' you' : ''), m.who))
  d.append(m.text)
  return d
}

async function scenes(root, device, wait, alive) {
  const $r = (s) => $(s, root)
  const msgs = $r('#msgs')
  const convs = $$('.conv', root)
  const chipA = $r('#chipA')
  const chipB = $r('#chipB')
  const S = device.scenes

  if (RM) {
    S[1].steps.forEach((m) => m.k !== 'typing' && msgs.appendChild(bubble(m)))
    convs[1].classList.add('active')
    return
  }
  for (let k = 0; ; k++) {
    const s = S[k % S.length]
    const c = device.convs[s.c]
    convs.forEach((row, i) => row.classList.toggle('active', i === s.c))
    const row = convs[s.c]
    row.classList.add('unread')
    $r('#th-av').textContent = c.av
    $r('#th-name').textContent = c.name
    $r('#th-sub').textContent = s.sub
    $r('#th-tag').textContent = s.tag
    msgs.innerHTML = ''
    msgs.classList.remove('fade')
    let typ = null
    for (const m of s.steps) {
      await wait(m.d)
      if (!alive()) return
      if (typ) {
        typ.remove()
        typ = null
      }
      const b = bubble(m)
      msgs.appendChild(b)
      if (m.k === 'typing') typ = b
      if (m.k === 'out' || (m.k === 'sys' && m.tone === 'ok')) {
        $r('#chipA-k').textContent = s.a[0]
        $r('#chipA-v').textContent = s.a[1]
        chipA.classList.remove('hide')
      }
      if (m.k === 'in' && msgs.children.length > 2) {
        $r('#chipB-k').textContent = s.b[0]
        $r('#chipB-v').textContent = s.b[1]
        chipB.classList.remove('hide')
      }
    }
    if (typ) typ.remove()
    row.classList.remove('unread')
    $('p', row).textContent = s.prev
    $('small', row).textContent = device.now
    await wait(3000)
    if (!alive()) return
    chipA.classList.add('hide')
    chipB.classList.add('hide')
    msgs.classList.add('fade')
    await wait(600)
    if (!alive()) return
  }
}
