# -*- coding: utf-8 -*-
"""Converte o markdown da documentacao em PDF usando markdown + xhtml2pdf."""
import sys
import markdown
from xhtml2pdf import pisa
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

SRC = "docs/BookForum-Documentacao.md"
OUT = "docs/BookForum-Documentacao.pdf"

# Registra fontes do Windows (suportam acentos e setas → ↔ ·)
pdfmetrics.registerFont(TTFont("Arial", "C:/Windows/Fonts/arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", "C:/Windows/Fonts/arialbd.ttf"))
pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="Arial-Bold")
pdfmetrics.registerFont(TTFont("Consola", "C:/Windows/Fonts/consola.ttf"))

CSS = """
@page {
    size: a4;
    margin: 1.8cm 1.6cm 2cm 1.6cm;
    @frame footer {
        -pdf-frame-content: footerContent;
        bottom: 1cm; left: 1.6cm; right: 1.6cm; height: 1cm;
    }
}

body { font-family: "Arial"; font-size: 10pt; color: #1a1a1a; line-height: 1.4; }

h1 { font-size: 20pt; color: #5851DB; border-bottom: 2pt solid #5851DB; padding-bottom: 4pt; }
h2 { font-size: 14pt; color: #833AB4; margin-top: 16pt; border-bottom: 0.5pt solid #cccccc; padding-bottom: 2pt; }
h3 { font-size: 11.5pt; color: #C13584; margin-top: 12pt; }

p, li { font-size: 10pt; }

blockquote {
    background-color: #f4f0fb;
    border-left: 3pt solid #833AB4;
    margin-left: 0; padding: 4pt 8pt; color: #333333; font-size: 9pt;
}

table { width: 100%; border: 0.5pt solid #bbbbbb; margin: 6pt 0; }
th { background-color: #5851DB; color: #ffffff; font-size: 7.5pt; padding: 3pt; text-align: left; }
td { font-size: 7.5pt; padding: 3pt; border: 0.5pt solid #dddddd; }

code { font-family: "Consola"; font-size: 8.5pt; background-color: #f0f0f0; color: #C13584; }
pre { background-color: #f6f6f6; border: 0.5pt solid #dddddd; padding: 5pt; font-family: "Consola"; font-size: 8pt; }
pre code { background-color: transparent; color: #1a1a1a; }
"""

FOOTER = '<div id="footerContent" style="font-size:7pt;color:#888;text-align:center;">BookForum — Documentação do Sistema e Especificação da API · <pdf:pagenumber> </div>'


def main():
    with open(SRC, encoding="utf-8") as f:
        text = f.read()
    body = markdown.markdown(
        text,
        extensions=["tables", "fenced_code", "sane_lists"],
    )
    html = f"""<!DOCTYPE html><html><head><meta charset="utf-8">
<style>{CSS}</style></head><body>{FOOTER}{body}</body></html>"""

    with open(OUT, "wb") as out:
        result = pisa.CreatePDF(html, dest=out, encoding="utf-8")
    if result.err:
        print("ERRO na geracao do PDF", file=sys.stderr)
        sys.exit(1)
    print("PDF gerado:", OUT)


if __name__ == "__main__":
    main()
