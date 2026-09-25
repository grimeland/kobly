#!/usr/bin/env python3
from __future__ import annotations
"""Lager annonsesett for Kobly: Unsplash-/egne foto med lys logo, overskrift og knapp.

Kjør: python3 scripts/lag-annonser.py
Skriver til brand/annonser/*.jpg (1080×1350, feed-format for Instagram/Facebook).
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROT = Path(__file__).resolve().parent.parent
UT = ROT / "brand" / "annonser"
FOTO = UT / "foto"
IMG = ROT / "public" / "images"
FONT = ROT / "brand" / "fonter"

W, H = 1080, 1350
MARG = 72
LIME = (214, 232, 168)
LIME_INK = (61, 85, 7)
LYS = (244, 241, 234)

ANNONSER = [
    # (overskrift, bilde, knapp)
    ("Ett skjema. Tre tilbud. Du velger.", IMG / "boxes-and-plants.jpg", "Få 3 tilbud gratis"),
    ("Vi finner det beste flyttebyrået for deg", IMG / "travis-fish-2qZZu8lWDZo-unsplash.jpg", "Få 3 tilbud gratis"),
    ("La flyttebyråene konkurrere om deg", FOTO / "unsplash-1615873968403-89e068629265.jpg", "Få 3 tilbud gratis"),
    ("Tre tilbud på flytting. Under to minutter.", IMG / "lawrence-krowdeed-2vTqgr6sXsI-unsplash.jpg", "Start nå"),
    ("Slipp å ringe ti flyttebyråer", IMG / "R1-09131-0032.JPG", "Få 3 tilbud gratis"),
    ("Flytt uten å betale for mye", IMG / "foto__2.jpg", "Sammenlign tilbud"),
    ("Kvalitetssjekkede byråer. Ingen overraskelser.", IMG / "rull3_26.jpg", "Få 3 tilbud gratis"),
    ("Flyttehjelp fra dør til dør", IMG / "R1-07829-0034.jpg", "Få 3 tilbud gratis"),
    ("Flyttevask med garanti", IMG / "R1-09476-0028.jpg", "Få 3 tilbud gratis"),
    ("Trygg lagring i nærområdet", IMG / "R1-09476-0023-kopi.jpg", "Se tilbud"),
    ("Kontorflytting utenom arbeidstid", FOTO / "unsplash-1533779283484-8ad4940aa3a8.jpg", "Få 3 tilbud gratis"),
    ("Skal du flytte i høst?", IMG / "megler" / "megler-1-hytte.jpg", "Få 3 tilbud gratis"),
    ("Vi finner den beste eiendomsmegleren for deg", FOTO / "unsplash-1522708323590-d24dbb6b0267.jpg", "Få 3 tilbud gratis"),
    ("La meglerne konkurrere om boligen din", IMG / "megler" / "megler-3-trehus.jpg", "Få 3 tilbud gratis"),
    ("Selg boligen til riktig pris", IMG / "megler" / "megler-4-murhus.jpg", "Sammenlign meglere"),
    ("Tre meglere. Ett skjema. Du velger.", FOTO / "unsplash-1554995207-c18c203602cb.jpg", "Få 3 tilbud gratis"),
    ("Hva er boligen din verdt?", FOTO / "unsplash-1513694203232-719a280e022f.jpg", "Få gratis verdivurdering"),
    ("Norges smarteste tilbudstjeneste", IMG / "megler" / "megler-2-stue-blaa.jpg", "Velg tjeneste"),
    ("5 000 fornøyde kunder. Bli den neste.", FOTO / "unsplash-1556228453-efd6c1ff04f6.jpg", "Få 3 tilbud gratis"),
    ("Gratis og uforpliktende. Alltid.", IMG / "megler" / "megler-5-stue-planter.jpg", "Få 3 tilbud gratis"),
]


def font(navn: str, px: int, vekt: int | None = None) -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(str(FONT / navn), px)
    if vekt is not None:
        try:
            f.set_variation_by_axes([vekt])
        except Exception:
            pass
    return f


def dekk(bilde: Path) -> Image.Image:
    """Skalér og beskjær til 1080×1350, litt lettere komprimert enn objekt-fit: cover."""
    im = Image.open(bilde).convert("RGB")
    s = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x = (im.width - W) // 2
    y = (im.height - H) // 2
    return im.crop((x, y, x + W, y + H))


def gradient() -> Image.Image:
    """Mørk tone nederst så hvit tekst alltid er lesbar, pluss lett tone øverst for logoen."""
    g = Image.new("L", (1, H))
    px = []
    for y in range(H):
        t = y / H
        a = 0.0
        if t > 0.45:
            a = ((t - 0.45) / 0.55) ** 1.4 * 0.78
        if t < 0.18:
            a = max(a, (1 - t / 0.18) * 0.28)
        px.append(int(a * 255))
    g.putdata(px)
    return g.resize((W, H))


def brekk(tekst: str, f: ImageFont.FreeTypeFont, maks: int, d: ImageDraw.ImageDraw) -> list[str]:
    ord_ = tekst.split()
    linjer, akt = [], ""
    for o in ord_:
        prov = (akt + " " + o).strip()
        if d.textlength(prov, font=f) <= maks or not akt:
            akt = prov
        else:
            linjer.append(akt)
            akt = o
    if akt:
        linjer.append(akt)
    return linjer


def lag(i: int, overskrift: str, bilde: Path, knapp: str) -> Path:
    im = dekk(bilde)
    im = Image.composite(Image.new("RGB", (W, H), (12, 10, 9)), im, gradient())
    d = ImageDraw.Draw(im)

    # Logo, lys versjon
    logo = Image.open(ROT / "brand" / "logo" / "png" / "kobly-logo-lys-1200.png").convert("RGBA")
    lb = 250
    logo = logo.resize((lb, round(logo.height * lb / logo.width)), Image.LANCZOS)
    im.paste(logo, (MARG, MARG), logo)

    # Knapp nederst
    kf = font("Moderat-Semibold.otf", 34)
    kb = d.textbbox((0, 0), knapp, font=kf)
    kw, kh = kb[2] - kb[0], kb[3] - kb[1]
    ph, pw = 96, kw + 84
    py = H - MARG - ph
    d.rounded_rectangle((MARG, py, MARG + pw, py + ph), radius=ph // 2, fill=LIME)
    d.text((MARG + 42 - kb[0], py + (ph - kh) / 2 - kb[1]), knapp, font=kf, fill=LIME_INK)

    # Overskrift over knappen
    stor = 104 if len(overskrift) <= 30 else 88
    hf = font("CrimsonPro-Variable.ttf", stor, 600)
    linjer = brekk(overskrift, hf, W - 2 * MARG, d)
    lh = round(stor * 1.02)
    y = py - 44 - lh * len(linjer)
    for l in linjer:
        d.text((MARG - 4, y), l, font=hf, fill=LYS)
        y += lh

    ut = UT / f"{i:02d}.jpg"
    im.save(ut, quality=88, subsampling=0)
    return ut


if __name__ == "__main__":
    UT.mkdir(parents=True, exist_ok=True)
    for i, (o, b, k) in enumerate(ANNONSER, 1):
        print(lag(i, o, b, k).name, "·", o)
