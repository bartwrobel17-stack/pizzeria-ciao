"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type GalleryItem = { id: string; src: string; alt: string };
type MenuItem = { id: string; name: string; desc: string; image?: string };

const starterGallery: GalleryItem[] = [
  { id: "pizza-1", src: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1400&q=85", alt: "Pizza prosto z pieca" },
  { id: "pizza-2", src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85", alt: "Pizza z chrupiącym brzegiem" },
  { id: "pizza-3", src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=85", alt: "Pizza neapolitańska" },
  { id: "pizza-4", src: "https://images.unsplash.com/photo-1574125177625-9c7e3d8f1d52?auto=format&fit=crop&w=1200&q=85", alt: "Pizza z rukolą" }
];

const starterMenu: MenuItem[] = [
  { id: "m1", name: "Ciao Pizza", desc: "nasz charakterystyczny wybór" },
  { id: "m2", name: "Prosciutto e Funghi", desc: "klasyka z włoskim temperamentem" },
  { id: "m3", name: "Quattro Formaggi", desc: "cztery sery, zero nudy" },
  { id: "m4", name: "Spinaci", desc: "zielono, świeżo, konkretnie" },
  { id: "m5", name: "Caprino", desc: "kozi ser i wyrazisty smak" },
  { id: "m6", name: "Crudo e Rukola", desc: "prosciutto crudo, rukola i świeżość" },
  { id: "m7", name: "Pizza Neapoli", desc: "neapolitański klimat" },
  { id: "m8", name: "Pizza Miesiąca", desc: "zawsze coś nowego" }
];

const reviews = [
  ["M R", "Pizza z pieca opalanego drewnem, idealnie wypieczone ciasto i świetny aromat."],
  ["kubaba5", "Bardzo solidna, smaczna włoska pizza. Dobre składniki i uczciwe ceny."],
  ["Krytyk Kulinarny", "Pizza PETARDA. Świetny piec, premium składniki i bardzo dobra oliwa."]
];

export default function Home() {
  const [gallery, setGallery] = useState<GalleryItem[]>(starterGallery);
  const [menu, setMenu] = useState<MenuItem[]>(starterMenu);
  const [ownerTab, setOwnerTab] = useState<"gallery" | "menu">("gallery");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : gallery[activeIndex] ?? null;
  const [panel, setPanel] = useState(false);
  const [logged, setLogged] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [menuName, setMenuName] = useState("");
  const [menuDesc, setMenuDesc] = useState("");
  const [menuImage, setMenuImage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("ciao-gallery");
    if (saved) setGallery(JSON.parse(saved));
    const savedMenu = localStorage.getItem("ciao-menu");
    if (savedMenu) setMenu(JSON.parse(savedMenu));
  }, []);

  useEffect(() => {
    localStorage.setItem("ciao-gallery", JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem("ciao-menu", JSON.stringify(menu));
  }, [menu]);

  const routeUrl = "https://www.google.com/maps/dir/?api=1&destination=Karczemna+1b,+54-067+Wrocław";
  const mapsEmbed = "https://www.google.com/maps?q=Karczemna+1b,+54-067+Wrocław&output=embed";

  const visibleReviews = useMemo(() => reviews, []);

  function login() {
    if (password === "CIAO2026") { setLogged(true); setStatus(""); }
    else setStatus("Nieprawidłowe hasło.");
  }

  function addPhotos(files: FileList | null) {
    if (!files) return;
    Array.from(files).slice(0, 8).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => setGallery(prev => [...prev, { id: crypto.randomUUID(), src: String(reader.result), alt: file.name }]);
      reader.readAsDataURL(file);
    });
  }

  function addMenuImage(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setMenuImage(String(reader.result));
    reader.readAsDataURL(file);
  }

  function addMenuItem() {
    if (!menuName.trim()) return;
    setMenu(prev => [...prev, { id: crypto.randomUUID(), name: menuName.trim(), desc: menuDesc.trim() || "Nowa pozycja menu", image: menuImage || undefined }]);
    setMenuName("");
    setMenuDesc("");
    setMenuImage("");
  }

  return (
    <main className={styles.pageRoot}>
      <nav className={styles.nav}>
        <a className={styles.brand} href="#top">CIAO<span>!</span></a>
        <div className={styles.navLinks}>
          <a href="#o-nas">O nas</a><a href="#menu">Menu</a><a href="#galeria">Galeria</a><a href="#opinie">Opinie</a><a href="#kontakt">Kontakt</a>
        </div>
        <a className={styles.navCta} href="tel:+48722148445">722 148 445</a>
      </nav>

      <section id="top" className={styles.hero}>
        <div className={styles.heroPhoto} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.kicker}>PIZZERIA CIAO! · WROCŁAW</p>
          <h1>Pizza, która<br /><em>zaczyna się od ognia.</em></h1>
          <p className={styles.heroText}>Włoski charakter, piec opalany drewnem i składniki, które nie potrzebują przesady.</p>
          <div className={styles.heroActions}>
            <a className={styles.primary} href="#menu">Zobacz menu <span>↗</span></a>
            <a className={styles.secondary} href={routeUrl} target="_blank" rel="noreferrer">Wyznacz trasę</a>
          </div>
        </div>
        <div className={styles.rating}><strong>4,8</strong><span>★★★★★</span><small>833 opinie</small></div>
        <div className={styles.heroBottom}>NA MIEJSCU <i>·</i> NA WYNOS <i>·</i> DOSTAWA BEZ KONTAKTU</div>
      </section>

      <section id="o-nas" className={styles.intro}>
        <div><p className={styles.kickerDark}>CIAO, WROCŁAW</p><h2>Prosto. Włosko.<br /><em>Po naszemu.</em></h2></div>
        <div className={styles.introCopy}><p>W Pizzerii CIAO! liczy się ogień, dobre ciasto i składniki, które robią robotę. Pieczemy w piecu opalanym drewnem, stawiając na włoski charakter i swobodną atmosferę.</p><p>Wpadnij na miejsce, zabierz pizzę ze sobą albo zamów dostawę. Bez ceremonii. Z dużą ilością smaku.</p></div>
      </section>

      <section id="menu" className={styles.menuSection}>
        <div className={styles.sectionHead}><div><p className={styles.kickerDark}>CO LECI Z PIECA</p><h2>Ulubione <em>CIAO!</em></h2></div><span>20–40 zł / osoba</span></div>
        <div className={styles.menuGrid}>
          {menu.map((item, i) => <article className={styles.menuItem + (item.image ? " " + styles.hasImage : "")} key={item.id}><span>{String(i + 1).padStart(2, "0")}</span>{item.image ? <img className={styles.menuPublicThumb} src={item.image} alt="" /> : <span /> }<div><h3>{item.name}</h3><p>{item.desc}</p></div><b>→</b></article>)}
        </div>
      </section>

      <section id="galeria" className={styles.gallerySection}>
        <div className={styles.sectionHead}><div><p className={styles.kickerDark}>ZOBACZ NA WŁASNE OCZY</p><h2>Galeria <em>CIAO!</em></h2></div><span>kliknij zdjęcie, aby powiększyć</span></div>
        <div className={styles.galleryGrid}>{gallery.map((item, i) => <button className={styles.galleryCard + " " + (i % 4 === 0 ? styles.tall : "")} key={item.id} onClick={() => setActiveIndex(i)}><img src={item.src} alt={item.alt} /><span>↗</span><div className={styles.galleryCaption}>{item.alt}</div></button>)}</div>
      </section>

      <section id="opinie" className={styles.reviews}>
        <div className={styles.reviewLead}><p className={styles.kicker}>GOŚCIE MÓWIĄ</p><h2>4,8 <span>★★★★★</span></h2><p>na podstawie 833 opinii w Google</p></div>
        <div className={styles.reviewList}>{visibleReviews.map(([name, text]) => <article key={name}><div><strong>{name}</strong><span>★★★★★</span></div><p>„{text}”</p></article>)}</div>
      </section>

      <section id="kontakt" className={styles.contact}>
        <div className={styles.contactInfo}><p className={styles.kickerDark}>WPADAJ</p><h2>Znajdziesz nas<br /><em>we Wrocławiu.</em></h2><div className={styles.details}><div><small>ADRES</small><p>Karczemna 1b<br />54-067 Wrocław</p></div><div><small>TELEFON</small><p><a href="tel:+48722148445">722 148 445</a></p></div><div><small>GODZINY</small><p>Pon.–Nd. · do 22:00<br /><span>Sprawdź aktualne godziny przed wizytą</span></p></div></div><a className={styles.primaryDark} href={routeUrl} target="_blank" rel="noreferrer">Wyznacz trasę <span>↗</span></a></div>
        <div className={styles.mapWrap}><iframe title="Pizzeria CIAO! na mapie" src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </section>

      <footer className={styles.footer}><div className={styles.brand}>CIAO<span>!</span></div><p>Pizza z ogniem. Wrocław, Karczemna 1b.</p><div><a href="https://m.facebook.com" target="_blank" rel="noreferrer">Facebook</a><button onClick={() => {setPanel(true); setLogged(false); setPassword("");}}>Panel właściciela</button></div></footer>

      {active && <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={() => setActiveIndex(null)}>
        <button className={styles.lightboxClose} aria-label="Zamknij" onClick={() => setActiveIndex(null)}>×</button>
        <button className={styles.lightboxPrev} aria-label="Poprzednie zdjęcie" onClick={e => { e.stopPropagation(); setActiveIndex(i => i === null ? null : (i - 1 + gallery.length) % gallery.length); }}>‹</button>
        <img src={active.src} alt={active.alt} onClick={e => e.stopPropagation()} />
        <button className={styles.lightboxNext} aria-label="Następne zdjęcie" onClick={e => { e.stopPropagation(); setActiveIndex(i => i === null ? null : (i + 1) % gallery.length); }}>›</button>
      </div>}

      {panel && <div className={styles.modalBackdrop} onClick={() => setPanel(false)}><div className={styles.ownerPanel} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={() => setPanel(false)}>×</button>
        {!logged ? <div><p className={styles.kickerDark}>STREFA WŁAŚCICIELA</p><h2>Panel <em>CIAO!</em></h2><p className={styles.panelHint}>Demo lokalne. Docelowo podłączymy trwały storage, np. Supabase.</p><label>Hasło<input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} /></label>{status && <p className={styles.error}>{status}</p>}<button className={styles.primaryDark} onClick={login}>Zaloguj się</button><small>Hasło demonstracyjne: CIAO2026</small></div> :
        <div><p className={styles.kickerDark}>STREFA WŁAŚCICIELA</p><h2>Zarządzaj <em>stroną.</em></h2><div className={styles.ownerTabs}><button className={styles.ownerTab + (ownerTab === "gallery" ? " " + styles.ownerTabActive : "")} onClick={() => setOwnerTab("gallery")}>Galeria</button><button className={styles.ownerTab + (ownerTab === "menu" ? " " + styles.ownerTabActive : "")} onClick={() => setOwnerTab("menu")}>Menu</button></div>{ownerTab === "gallery" ? <div><label className={styles.upload}>+ Dodaj zdjęcia<input type="file" accept="image/*" multiple onChange={e => addPhotos(e.target.files)} /></label><div className={styles.adminGrid}>{gallery.map(item => <div key={item.id}><img src={item.src} alt="" /><button onClick={() => setGallery(gallery.filter(x => x.id !== item.id))}>Usuń</button></div>)}</div></div> : <div><div className={styles.menuAdminForm}><input value={menuName} onChange={e => setMenuName(e.target.value)} placeholder="Nazwa pizzy / pozycji" /><textarea value={menuDesc} onChange={e => setMenuDesc(e.target.value)} placeholder="Opis pizzy..." /><label className={styles.upload}>+ Wybierz zdjęcie<input type="file" accept="image/*" onChange={e => addMenuImage(e.target.files?.[0])} /></label>{menuImage && <img className={styles.menuFormPreview} src={menuImage} alt="" />}<button onClick={addMenuItem}>Dodaj do menu</button></div><div className={styles.menuAdminList}>{menu.map(item => <div className={styles.menuAdminItem} key={item.id}>{item.image ? <img src={item.image} alt="" /> : <div /> }<div><h3>{item.name}</h3><p>{item.desc}</p></div><button onClick={() => setMenu(menu.filter(x => x.id !== item.id))}>Usuń</button></div>)}</div></div>}</div>}
      </div></div>}
    </main>
  );
}